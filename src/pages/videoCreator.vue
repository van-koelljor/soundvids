<script setup lang="ts">
import VideoCreator from '@/components/VideoCreator/VideoCreator.vue'
definePage({
  meta: {
    icon: 'mdi-video',
    title: 'Video Creator',
    drawerIndex: 1,
  },
})
</script>

<template>
  <v-container fluid>
    <VideoCreator />
  </v-container>
</template>
