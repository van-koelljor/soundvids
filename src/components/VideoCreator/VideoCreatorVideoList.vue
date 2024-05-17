<template>
  <v-row>
    <v-col
      v-for="video in videos" :key="video.id" cols="12" sm="6"
      lg="4"
      xl="2"
    >
      <VideoCreatorVideoListItem :video="video" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import VideoCreatorVideoListItem from './VideoCreatorVideoListItem.vue';
import type { Video } from '@/types/video';

const props = defineProps<{
  videos: Video[]
}>()
</script>
