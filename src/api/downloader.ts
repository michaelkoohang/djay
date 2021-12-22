import ytdl from 'ytdl-core';
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import os from 'os';
import { DownloadProgress } from '../types/DownloadProgress';
import { VideoInfo } from '../types/VideoInfo';

export const downloadAudio = (
  url: string, 
  progressCallback: (data: DownloadProgress) => void, 
  infoCallback: (info: VideoInfo) => void,
  errorCallback: (error: any) => void
): void => {
  let videoInfo: VideoInfo;

  ytdl.getInfo(url)
    .then(info => {
      videoInfo = {
        title: info.videoDetails.title,
        duration: parseInt(info.videoDetails.lengthSeconds),
        thumbnailURL: info.videoDetails.thumbnails[0].url
      };
      infoCallback(videoInfo);
    })
    .then(() => {
      return ytdl(url, { filter: 'audioonly' })
      .on('progress', (_, downloaded, total) => {
        progressCallback({downloaded, total})
      });
    })
    .then(audio => {
      console.log(path.resolve('Downloads', `${videoInfo.title}.mp3`))
      ffmpeg.setFfmpegPath(ffmpegPath.path);
      ffmpeg(audio)
        .audioBitrate(128)
        .save(path.resolve(os.homedir() + '/Downloads/', `${videoInfo.title}.mp3`));
    })
    .catch(error => { 
      errorCallback(error);
    });
};