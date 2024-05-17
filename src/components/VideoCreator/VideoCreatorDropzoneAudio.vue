<template>
  <v-card class="audio-card">
    <div ref="waveform" class="waveform"></div>
    <v-card-title class="audio-title">{{ fileName }}</v-card-title>
    <v-btn class="close-btn" icon color="white" variant="text" @click="removeFile">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js';
import { useTheme } from 'vuetify'

const theme = useTheme();
const primaryColor = computed(() => theme.current.value.colors.primary);

const props = defineProps({
  fileBlob: Blob,
  fileName: String,
  removeFile: Function
});

const waveform = ref(null);
let wavesurfer = null;

watch(primaryColor, () => {
  if (wavesurfer) {
    wavesurfer.destroy();
  }
  createWaveSurfer();
});

function createWaveSurfer() {
  wavesurfer = WaveSurfer.create({
    normalize: true,
    mediaControls: true,
    container: waveform.value,
    waveColor: primaryColor.value
  });
  wavesurfer.loadBlob(props.fileBlob);
}

onMounted(() => {
  createWaveSurfer();
});
</script>

<style scoped>
.audio-card {
  position: relative;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.waveform {
  padding-top: 10px;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.audio-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  font-size: medium;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 0;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
