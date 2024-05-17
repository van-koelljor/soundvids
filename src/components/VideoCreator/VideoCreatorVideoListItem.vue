<template>
  <v-card class="video-card">
    <video-player
      class="video-player"
      :src="video.src"
      :height="200"
      controls
    />
    <v-btn class="close-btn" icon color="white" variant="text" @click="confirmDelete(video.id)">
      <v-icon>mdi-trash-can</v-icon>
    </v-btn>
    <v-dialog v-model="showDialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this video?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="removeVideo(video.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css';
import { VideoPlayer } from '@videojs-player/vue';
import { stripMediaLoaderPrefix } from '@/utils/pathUtils';

const videoStore = useVideoStore();

const props = defineProps({
  video: Object
});
const showDialog = ref(false);

const confirmDelete = (id: string) => {
  showDialog.value = true;
}

const removeVideo = async (id: string) => {
  const video = props.video;
  const filePath = stripMediaLoaderPrefix(video.src);
  const result = await window.electronAPI.deleteFile(filePath);
  if (result.success) {
    videoStore.removeCreatedVideo(id);
  } else {
    console.error(`Failed to delete video with ID: ${id}: ${result.error}`);
  }
}
</script>

<style scoped>
.video-card {
  max-width: 100%;
  overflow: hidden;
}

.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
}
.close-btn {
     position: absolute;
     top: 0;
     right: 0;
   }
</style>
