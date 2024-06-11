<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <VideoCreatorDropzone @update:files="onFilesUpdated" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn :disabled="!canStartCreation" @click="startCreation">
          Start Creation
        </v-btn>
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
import VideoCreatorDropzone from './VideoCreatorDropzone.vue'
import VideoCreatorVideoList from './VideoCreatorVideoList.vue';
import { addMediaLoaderPrefix } from '@/utils/pathUtils';

const files = ref<File[]>([])
const videoStore = useVideoStore();
const settingsStore = useSettingsStore();
const videoOutputPath = computed(() => settingsStore.videoOutputPath);
const createdVideos = computed(() => videoStore.createdVideos);

const canStartCreation = computed(() => {
  const hasAudio = files.value.some(f => f.type === 'audio');
  const hasImage = files.value.some(f => f.type === 'image');
  return hasAudio && hasImage;
});

function onFilesUpdated(updatedFiles: File[]) {
  files.value = updatedFiles;
}

async function startCreation() {
  if (!videoOutputPath.value) {
    const result = await window.electronAPI.openDirectoryDialog();
    if (!result.canceled && result.path) {
      await settingsStore.setVideoOutputPath(result.path);
    }
  }
  if (videoOutputPath.value) {
    const audioFile = files.value.find(f => f.type === 'audio');
    const imageFile = files.value.find(f => f.type === 'image');
    if (audioFile && imageFile) {
      const job: VideoCreationJob = {
        id: Date.now().toString(),
        audioFile,
        imageFile,
        status: 'pending'
      };
      try {
        const imageFilePath = await saveFileTemporarily(job.imageFile.blob, `${job.id}-image`);
        const audioFilePath = await saveFileTemporarily(job.audioFile.blob, `${job.id}-audio`);
        const outputPath = await window.electronAPI.joinPath(videoOutputPath.value, `${job.id}.mp4`);

        await window.electronAPI.createVideo(imageFilePath, audioFilePath, outputPath);

        videoStore.addCreatedVideo({
          id: job.id,
          src: addMediaLoaderPrefix(outputPath)
        });

        job.status = 'completed';
      } catch (error) {
        console.error(`Video creation error for job ${job.id}: ${error}`);
        job.status = 'failed';
      }
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
