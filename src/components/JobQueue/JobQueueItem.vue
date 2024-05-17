<template>
<v-list-item
  class="hover-item"
  :key="job.id"
  :title="job.audioFile.name + ' & ' + job.imageFile.name"
  :subtitle="'Status: ' + job.status"
>
  <template v-slot:prepend>
    <v-list-item-action class="d-flex align-center">
  </v-list-item-action>
  <v-avatar color="primary">
    <v-icon color="white">mdi-file-video</v-icon>
  </v-avatar>
  </template>

  <template v-slot:append>
    <v-btn
      color="grey-lighten-1"
      icon="mdi-close"
      variant="text"
      @click="removeJob(job.id)"
    ></v-btn>
  </template>
</v-list-item>
</template>

<script setup lang="ts">
const props = defineProps({
  job: Object
})
const emit = defineEmits(['update:job-removed'])

const removeJob = (id) => {
  emit('update:job-removed', id)
}
</script>

<style scoped>
.hover-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
