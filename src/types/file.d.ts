export interface File {
  name: string;
  type: 'audio' | 'image';
  blob: Blob;
}
