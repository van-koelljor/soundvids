export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Job {
  id: string;
  status: JobStatus;
}

export interface VideoCreationJob extends Job {
  audioFile: File;
  imageFile: File;
}

export interface VideoUploadJob extends Job {
  videoFile: File;
}

export interface JobQueue {
  jobs: Job[];
  status: 'active' | 'inactive';
}
