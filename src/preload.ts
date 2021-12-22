
import os from 'os';
import path from 'path';
import { contextBridge, shell } from "electron";
import { downloadAudio } from './api/downloader';
import { DownloadProgress } from './types/DownloadProgress';
import { VideoInfo } from './types/VideoInfo';

contextBridge.exposeInMainWorld("djay", {
  downloadAudio: (
    url: string, 
    progress: (data: DownloadProgress) => void, 
    videoInfo: (data: VideoInfo) => void, 
    error: (error: boolean) => void) => {
      downloadAudio(url, progress, videoInfo, error);
  },
  openDownloads: () => {
    shell.openPath(path.resolve(os.homedir() + '/Downloads'));
  }
});