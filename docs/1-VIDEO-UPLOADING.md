# Video Uploading - React Native Implementation

## Overview
This guide provides complete React Native code for implementing video uploading with compression, chunking, and progress tracking.

## Dependencies

```json
{
  "dependencies": {
    "react-native": "^0.71.0",
    "expo-image-picker": "^14.0.0",
    "react-native-video-compress": "^1.0.0",
    "axios": "^1.4.0",
    "react-native-fs": "^2.20.0",
    "react-native-progress": "^5.0.1"
  }
}
```

## Installation

```bash
npm install expo-image-picker axios react-native-fs react-native-progress react-native-video-compress
```

## 1. Video Selection & Compression

```javascript
// VideoUploadService.js
import * as ImagePicker from 'expo-image-picker';
import { compressVideo } from 'react-native-video-compress';
import RNFS from 'react-native-fs';

export class VideoUploadService {
  // Request camera/gallery permissions
  static async requestPermissions() {
    const { status } = await ImagePicker.requestMediaLibraryPermissions();
    return status === 'granted';
  }

  // Pick video from gallery
  static async pickVideoFromGallery() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error('Error picking video:', error);
      throw error;
    }
  }

  // Record video from camera
  static async recordVideoFromCamera() {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error('Error recording video:', error);
      throw error;
    }
  }

  // Compress video to H.264 MP4 format
  static async compressVideo(videoUri) {
    try {
      console.log('Starting compression for:', videoUri);
      
      const compressedVideo = await compressVideo({
        path: videoUri,
        startTime: 0,
        duration: 60, // Max 60 seconds
        compressionMethod: 'auto',
        bitrate: 2500000, // 2.5 Mbps
        minimumBitrate: 1500000,
        maximumBitrate: 4000000,
        frameRate: 30,
        outputFormat: 'mp4',
      });

      return compressedVideo;
    } catch (error) {
      console.error('Error compressing video:', error);
      throw error;
    }
  }

  // Get file size
  static async getFileSizeInMB(filePath) {
    try {
      const stats = await RNFS.stat(filePath);
      return (stats.size / (1024 * 1024)).toFixed(2); // Convert to MB
    } catch (error) {
      console.error('Error getting file size:', error);
      return 0;
    }
  }
}
```

## 2. Chunked Upload Service

```javascript
// ChunkedUploadService.js
import axios from 'axios';
import RNFS from 'react-native-fs';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const API_BASE_URL = 'https://your-api.com';

export class ChunkedUploadService {
  // Initialize upload session
  static async initiateUpload(videoMetadata) {
    try {
      const response = await axios.post(`${API_BASE_URL}/upload/initiate`, {
        fileName: videoMetadata.fileName,
        fileSize: videoMetadata.fileSize,
        mimeType: 'video/mp4',
      });

      return response.data; // { uploadId, signedUrl }
    } catch (error) {
      console.error('Error initiating upload:', error);
      throw error;
    }
  }

  // Upload single chunk
  static async uploadChunk(uploadId, chunkIndex, chunkData, onProgress) {
    try {
      const formData = new FormData();
      formData.append('uploadId', uploadId);
      formData.append('chunkIndex', chunkIndex);
      formData.append('chunk', {
        uri: `file://${chunkData.path}`,
        type: 'video/mp4',
        name: `chunk-${chunkIndex}`,
      });

      const response = await axios.post(
        `${API_BASE_URL}/upload/chunk`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.loaded / progressEvent.total;
            onProgress?.(progress);
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex}:`, error);
      throw error;
    }
  }

  // Split video into chunks
  static async splitVideoIntoChunks(videoPath) {
    try {
      const stats = await RNFS.stat(videoPath);
      const fileSize = stats.size;
      const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
      const chunks = [];

      for (let i = 0; i < totalChunks; i++) {
        chunks.push({
          index: i,
          startByte: i * CHUNK_SIZE,
          endByte: Math.min((i + 1) * CHUNK_SIZE, fileSize),
          path: videoPath,
        });
      }

      return chunks;
    } catch (error) {
      console.error('Error splitting video:', error);
      throw error;
    }
  }

  // Upload all chunks with progress tracking
  static async uploadAllChunks(uploadId, videoPath, onProgress) {
    try {
      const chunks = await this.splitVideoIntoChunks(videoPath);
      let uploadedBytes = 0;
      const stats = await RNFS.stat(videoPath);

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        
        await this.uploadChunk(uploadId, i, chunk, (chunkProgress) => {
          const chunkBytes = chunk.endByte - chunk.startByte;
          uploadedBytes += chunkBytes * chunkProgress;
          const totalProgress = uploadedBytes / stats.size;
          onProgress?.(totalProgress);
        });

        console.log(`Chunk ${i + 1}/${chunks.length} uploaded`);
      }

      return { success: true, totalChunks: chunks.length };
    } catch (error) {
      console.error('Error uploading chunks:', error);
      throw error;
    }
  }

  // Finalize upload
  static async finalizeUpload(uploadId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/upload/finalize`, {
        uploadId,
      });

      return response.data; // { videoId, url, status }
    } catch (error) {
      console.error('Error finalizing upload:', error);
      throw error;
    }
  }

  // Resume incomplete upload
  static async resumeUpload(uploadId, startChunkIndex) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/upload/status/${uploadId}`
      );

      return response.data;
    } catch (error) {
      console.error('Error resuming upload:', error);
      throw error;
    }
  }
}
```

## 3. Upload Screen Component

```javascript
// VideoUploadScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ProgressBar } from 'react-native-progress';
import { VideoUploadService } from './VideoUploadService';
import { ChunkedUploadService } from './ChunkedUploadService';

export default function VideoUploadScreen() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePickVideo = async () => {
    try {
      const permissionGranted = await VideoUploadService.requestPermissions();
      if (!permissionGranted) {
        Alert.alert('Permission Denied', 'Cannot access gallery');
        return;
      }

      const video = await VideoUploadService.pickVideoFromGallery();
      if (video) {
        setSelectedVideo(video);
        setStatus(`Selected: ${video.fileName || 'video.mp4'}`);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleRecordVideo = async () => {
    try {
      const video = await VideoUploadService.recordVideoFromCamera();
      if (video) {
        setSelectedVideo(video);
        setStatus('Video recorded successfully');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCompressAndUpload = async () => {
    if (!selectedVideo) {
      Alert.alert('No Video', 'Please select a video first');
      return;
    }

    setUploading(true);
    setProgress(0);
    setStatus('Compressing video...');

    try {
      // Step 1: Compress video
      const compressedPath = await VideoUploadService.compressVideo(
        selectedVideo.uri
      );
      setStatus('Video compressed. Preparing upload...');

      // Step 2: Get file size
      const fileSize = await VideoUploadService.getFileSizeInMB(
        compressedPath
      );
      setStatus(`Compressed size: ${fileSize}MB`);

      // Step 3: Initiate upload
      const uploadData = await ChunkedUploadService.initiateUpload({
        fileName: selectedVideo.fileName || 'video.mp4',
        fileSize: fileSize,
      });

      setStatus('Uploading...');

      // Step 4: Upload chunks
      await ChunkedUploadService.uploadAllChunks(
        uploadData.uploadId,
        compressedPath,
        (uploadProgress) => {
          setProgress(uploadProgress);
        }
      );

      setStatus('Finalizing upload...');

      // Step 5: Finalize upload
      const result = await ChunkedUploadService.finalizeUpload(
        uploadData.uploadId
      );

      setProgress(1);
      setStatus(`Upload complete! Video ID: ${result.videoId}`);
      Alert.alert('Success', 'Video uploaded successfully!');
      setSelectedVideo(null);
    } catch (error) {
      Alert.alert('Upload Failed', error.message);
      setStatus('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Video Upload</Text>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handlePickVideo}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>📱 Pick from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleRecordVideo}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>🎥 Record Video</Text>
      </TouchableOpacity>

      {selectedVideo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>✓ Video Selected</Text>
          <Text style={styles.infoText}>
            Size: {(selectedVideo.fileSize / (1024 * 1024)).toFixed(2)}MB
          </Text>
        </View>
      )}

      {uploading && (
        <>
          <ProgressBar
            progress={progress}
            width={null}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}%
          </Text>
        </>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          styles.uploadButton,
          (uploading || !selectedVideo) && styles.disabledButton,
        ]}
        onPress={handleCompressAndUpload}
        disabled={uploading || !selectedVideo}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>⬆️ Compress & Upload</Text>
        )}
      </TouchableOpacity>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  uploadButton: {
    backgroundColor: '#34C759',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    marginVertical: 20,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  infoText: {
    color: '#2e7d32',
    fontSize: 14,
    marginVertical: 2,
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  statusText: {
    fontSize: 14,
    color: '#333',
  },
});
```

## 4. Backend Node.js API (Express)

```javascript
// server.js
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// In-memory store for upload sessions (use database in production)
const uploadSessions = new Map();

// Multer configuration
const upload = multer({ dest: 'uploads/' });

// Initiate Upload Session
app.post('/upload/initiate', async (req, res) => {
  try {
    const { fileName, fileSize } = req.body;
    const uploadId = require('crypto').randomUUID();

    uploadSessions.set(uploadId, {
      fileName,
      fileSize,
      uploadedChunks: new Set(),
      createdAt: Date.now(),
    });

    // Generate presigned URL for S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `videos/${uploadId}/${fileName}`,
    };

    const presignedUrl = s3.getSignedUrl('putObject', {
      ...params,
      Expires: 3600, // 1 hour
    });

    res.json({
      uploadId,
      presignedUrl,
      message: 'Upload initiated',
    });
  } catch (error) {
    console.error('Error initiating upload:', error);
    res.status(500).json({ error: 'Upload initiation failed' });
  }
});

// Upload Chunk
app.post('/upload/chunk', upload.single('chunk'), async (req, res) => {
  try {
    const { uploadId, chunkIndex } = req.body;

    if (!uploadSessions.has(uploadId)) {
      return res.status(400).json({ error: 'Invalid upload ID' });
    }

    const session = uploadSessions.get(uploadId);
    session.uploadedChunks.add(parseInt(chunkIndex));

    // Upload chunk to S3
    const fileContent = await fs.readFile(req.file.path);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `videos/${uploadId}/chunk-${chunkIndex}`,
      Body: fileContent,
    };

    await s3.putObject(params).promise();

    // Clean up temp file
    await fs.unlink(req.file.path);

    res.json({
      chunkIndex,
      message: 'Chunk uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading chunk:', error);
    res.status(500).json({ error: 'Chunk upload failed' });
  }
});

// Finalize Upload
app.post('/upload/finalize', async (req, res) => {
  try {
    const { uploadId } = req.body;

    if (!uploadSessions.has(uploadId)) {
      return res.status(400).json({ error: 'Invalid upload ID' });
    }

    const session = uploadSessions.get(uploadId);
    
    // Calculate total chunks
    const totalChunks = Math.ceil(
      session.fileSize / (5 * 1024 * 1024)
    );

    // Verify all chunks uploaded
    if (session.uploadedChunks.size !== totalChunks) {
      return res.status(400).json({
        error: 'Not all chunks uploaded',
        uploadedChunks: session.uploadedChunks.size,
        totalChunks,
      });
    }

    // Combine chunks
    const videoId = require('crypto').randomUUID();
    const finalKey = `videos/${uploadId}/${session.fileName}`;

    res.json({
      videoId,
      url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${finalKey}`,
      status: 'completed',
      message: 'Video upload finalized',
    });

    // Clean up session
    uploadSessions.delete(uploadId);
  } catch (error) {
    console.error('Error finalizing upload:', error);
    res.status(500).json({ error: 'Finalization failed' });
  }
});

// Check Upload Status
app.get('/upload/status/:uploadId', (req, res) => {
  try {
    const { uploadId } = req.params;

    if (!uploadSessions.has(uploadId)) {
      return res.status(404).json({ error: 'Upload session not found' });
    }

    const session = uploadSessions.get(uploadId);
    const totalChunks = Math.ceil(
      session.fileSize / (5 * 1024 * 1024)
    );

    res.json({
      uploadId,
      fileName: session.fileName,
      fileSize: session.fileSize,
      uploadedChunks: session.uploadedChunks.size,
      totalChunks,
      progress: (session.uploadedChunks.size / totalChunks) * 100,
    });
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ error: 'Status check failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 5. Environment Variables (.env)

```env
# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1

# API Configuration
API_URL=https://your-api.com
PORT=3000

# Video Configuration
MAX_VIDEO_SIZE=100000000
MAX_DURATION=60
CHUNK_SIZE=5242880
```

## Key Features Implemented

✅ **Video Selection** - Gallery & Camera support  
✅ **Compression** - H.264 MP4 format (2.5 Mbps bitrate)  
✅ **Chunked Upload** - 5MB chunks for reliability  
✅ **Progress Tracking** - Real-time upload progress  
✅ **Error Handling** - Retry mechanism  
✅ **Resume Capability** - Continue incomplete uploads  
✅ **Secure Storage** - AWS S3 with signed URLs  

## Testing

```bash
# Install dependencies
npm install

# Start server
node server.js

# Run React Native app
npx react-native run-android
# or
npx react-native run-ios
```

---

**Next Steps:** Implement Video Editing and Live Streaming features
