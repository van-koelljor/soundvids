<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <VideoCreatorDropzone @update:files="onFilesUpdated" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn :disabled="!canAddToQueue" @click="addToQueue">
          Add to Queue
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <JobQueue :jobs="queueItems" @update:jobs="onJobsUpdated"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn :disabled="queueItems.length === 0" @click="startCreation">Start Creation</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <VideoCreatorVideoList :videos="createdVideos" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Buffer } from 'buffer';
import type { File } from '@/types/file'
import type { VideoCreationJob } from '@/types/job'
import JobQueue from '../JobQueue/JobQueue.vue'
import VideoCreatorDropzone from './VideoCreatorDropzone.vue'
import VideoCreatorVideoList from './VideoCreatorVideoList.vue';
import { addMediaLoaderPrefix } from '@/utils/pathUtils';

const queueItems = ref<VideoCreationJob[]>([])
const files = ref<File[]>([])

const settingsStore = useSettingsStore();
const videoStore = useVideoStore();
const videoOutputPath = computed(() => settingsStore.videoOutputPath);
const createdVideos = computed(() => videoStore.createdVideos);

function addToQueue() {
  const audioFile = files.value.find(f => f.type === 'audio');
  const imageFile = files.value.find(f => f.type === 'image');
  if (audioFile && imageFile) {
    const newJob: VideoCreationJob = {
      id: Date.now().toString(),
      audioFile,
      imageFile,
      status: 'pending'
    };
    queueItems.value.push(newJob);
  }
}

const canAddToQueue = computed(() => {
  const hasAudio = files.value.some(f => f.type === 'audio');
  const hasImage = files.value.some(f => f.type === 'image');
  return hasAudio && hasImage;
});

function onFilesUpdated(updatedFiles: File[]) {
  files.value = updatedFiles;
}

function onJobsUpdated(updatedJobs: VideoCreationJob[]) {
  queueItems.value = updatedJobs;
}

async function startCreation() {
  for (const job of queueItems.value) {
    try {
      const imageFilePath = await saveFileTemporarily(job.imageFile.blob, `${job.id}-image`);
      const audioFilePath = await saveFileTemporarily(job.audioFile.blob, `${job.id}-audio`);
      const outputPath = await window.electronAPI.joinPath(videoOutputPath.value, `${job.id}.mp4`);

      await window.electronAPI.createVideo(imageFilePath, audioFilePath, outputPath);

      videoStore.addCreatedVideo({
       id: job.id,
       src: addMediaLoaderPrefix(outputPath),
       poster: 'https://picsum.photos/320/180'
   });

      job.status = 'completed';
    } catch (error) {
      console.error(`Video creation error for job ${job.id}: ${error}`);
      job.status = 'failed';
    }
  }
}

async function saveFileTemporarily(fileBlob: Blob, fileName: string) {
  const arrayBuffer = await fileBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const tempDir = await window.electronAPI.getTempDir();
  const filePath = await window.electronAPI.joinPath(tempDir, fileName);
  await window.electronAPI.writeFile(filePath, buffer);
  return filePath;
}
</script>

<style scoped>
.d-flex.justify-end {
  display: flex;
  justify-content: flex-end;
}
</style>
