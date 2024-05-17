<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>Video Creator Settings</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>Video Folder</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <v-icon icon="mdi-folder-outline" size="small"/>
        <span class="ml-2">{{ videoOutputPath }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn text @click="goToFolder">Go to folder</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn text @click="selectNewFolder">Set new folder</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore();
const videoOutputPath = computed(() => settingsStore.videoOutputPath);

const updateVideoOutputPath = (path) => {
  settingsStore.setVideoOutputPath(path);
};

const selectNewFolder = async () => {
  const result = await window.electronAPI.openDirectoryDialog();
  if (!result.canceled && result.path) {
    updateVideoOutputPath(result.path);
    window.electronAPI.setVideoOutputPath(result.path);
  }
};

const goToFolder = () => {
  // TODO: Implement logic to open folder in file explorer
};
</script>
