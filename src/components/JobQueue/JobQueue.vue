<template>
  <v-list dense>
    <v-list-subheader>Video Creation Jobs</v-list-subheader>
    <JobQueueItem
      v-for="job in jobs"
      :key="job.id"
      :job="job"
      @update:job-removed="onJobRemoved"
    />
  </v-list>
</template>

<script setup lang="ts">
import JobQueueItem from './JobQueueItem.vue'
import type { Job } from '@/types/job'

const props = defineProps<{
  jobs: Job[]
}>()

const emit = defineEmits(['update:jobs'])

const onJobRemoved = (id) => {
  const updatedJobs = props.jobs.filter(job => job.id !== id)
  emit('update:jobs', updatedJobs)
}
</script>
