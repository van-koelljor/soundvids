<template>
<v-list-item
  :key="job?.id"
  class="hover-item"
  :title="job ? job.audioFile.name + ' & ' + job.imageFile.name : ''"
  :subtitle="job ? 'Status: ' + job.status : ''"
>
  <template #prepend>
    <v-list-item-action class="d-flex align-center"/>
  <v-avatar color="primary">
    <v-icon color="white">mdi-file-video</v-icon>
  </v-avatar>
  </template>

  <template #append>
    <v-btn
      color="grey-lighten-1"
      icon="mdi-close"
      variant="text"
      @click="job && removeJob(job.id)"
    />
  </template>
</v-list-item>
</template>

<script setup lang="ts">
const props = defineProps({
  job: Object
})
const emit = defineEmits(['update:job-removed'])

const removeJob = (id: number | undefined) => {
  if (id !== undefined) {
    emit('update:job-removed', id)
  }
}
</script>

<style scoped>
.hover-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
