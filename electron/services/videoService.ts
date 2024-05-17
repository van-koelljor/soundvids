import ffmpeg from 'fluent-ffmpeg';
import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import ffprobePath from 'ffprobe-static';

if (!ffprobePath) {
  throw new Error('ffprobe path is null');
}
const adjustedFfprobePath = ffprobePath.path.replace('app.asar', 'app.asar.unpacked');

if (!ffmpegPath) {
  throw new Error('ffmpeg path is null');
}
const adjustedFfmpegPath = ffmpegPath.replace('app.asar', 'app.asar.unpacked');

ffmpeg.setFfmpegPath(adjustedFfmpegPath);

async function createVideoWithImageAndAudio(imagePath: string, audioPath: string, outputPath: string): Promise<void> {
  const audioDuration = await getMediaDuration(audioPath);

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(imagePath)
      .inputOption('-loop 1')
      .input(audioPath)
      .outputOptions([
        '-c:v', 'libx264',
        '-tune', 'stillimage',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-pix_fmt', 'yuv420p',
        '-s', '1920x1080',
        '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black',
        '-t', audioDuration.toString(),
        '-max_interleave_delta', '500M',
        '-map 0:v:0',
        '-map 1:a:0',
      ])
      .save(outputPath)
      .on('end', () => {
        console.log('Video creation successful');
        resolve();
      })
      .on('error', (err: any) => {
        console.error('Error creating video:', err);
        reject(err);
      });
  });
}

async function getMediaDuration(mediaPath: string): Promise<number> {
  const ffprobeOutput = execSync(`${adjustedFfprobePath} -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${mediaPath}"`);
  return parseFloat(ffprobeOutput.toString().trim());
}

export { createVideoWithImageAndAudio };

