<template>
  <div class="file-dropzone" @drop.prevent="onFileDrop" @dragover.prevent>
    <v-row>
      <v-col cols="12">
        <div v-if="audioFiles.length === 0" class="placeholder">
          <v-icon>mdi-upload</v-icon>
          <p>Drop the audio file here</p>
        </div>
        <VideoCreatorDropzoneAudio v-else v-for="file in audioFiles" :key="file.name" :file-blob="file.blob" :file-name="file.name" :remove-file="() => removeFile(file.name)" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div v-if="imageFiles.length === 0" class="placeholder">
          <v-icon>mdi-upload-multiple</v-icon>
          <p>Drop one or multiple image files here</p>
        </div>
        <v-row v-else>
          <v-col cols="12" sm="6" md="3" v-for="file in imageFiles" :key="file.name">
            <v-hover v-slot:default="{ hover }">
              <v-card :class="{ 'highlight': hover }" class="square-image-card">
                <v-img :src="createObjectURL(file.blob)" class="preview-image" cover>
                  <v-card-title class="image-title">{{ file.name }}</v-card-title>
                  <v-btn class="close-btn" icon color="white" variant="text" @click="removeFile(file.name)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { File } from '@/types/file'
import VideoCreatorDropzoneAudio from './VideoCreatorDropzoneAudio.vue';

const files = ref<File[]>([])
const emit = defineEmits(['update:files'])

const imageFiles = computed(() => files.value.filter(f => f.type === 'image'));
const audioFiles = computed(() => files.value.filter(f => f.type === 'audio'));

function createObjectURL(blob: Blob) {
  return URL.createObjectURL(blob);
}

function onFileDrop(event) {
  const filesList = event.dataTransfer.files
  for (let i = 0; i < filesList.length; i++) {
    const file = filesList[i]
    const type = file.type.startsWith('audio/') ? 'audio' : 'image'
    if (!files.value.some(f => f.name === file.name)) {
      files.value.push({ type, name: file.name, blob: file })
    }
    emit('update:files', files.value);
  }
}

function removeFile(fileName) {
  files.value = files.value.filter(file => file.name !== fileName);
  emit('update:files', files.value);
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
.file-dropzone {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}
.placeholder {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  color: #ccc;
}
.image-title {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  font-size: medium;
  background-color: rgba(0, 0, 0, 0.5);
}
.preview-image {
  width: 100%;
  aspect-ratio: 1 / 1;
}
.square-image-card {
  max-width: 100%;
  overflow: hidden;
}
</style>
