<template>
  <v-row>
    <v-col
      cols="12" sm="6" lg="4" xl="2"
      v-for="video in videos"
      :key="video.id"
    >
      <VideoCreatorVideoListItem :video="video" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import VideoCreatorVideoListItem from './VideoCreatorVideoListItem.vue';
import type { Video } from '@/types/video';

const props = defineProps<{
  videos: Video[]
}>()
</script>
