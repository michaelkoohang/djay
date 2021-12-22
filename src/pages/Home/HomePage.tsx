import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Lottie from 'react-lottie';
import DownloadCard from '../../components/DownloadCard';

import * as astronautAnimation from '../../assets/astronaut-home.json'
import * as astronautLoadingAnimation from '../../assets/astronaut-download.json'
import { DownloadProgress } from '../../types/DownloadProgress';
import { VideoInfo } from '../../types/VideoInfo';
import { Slide, Zoom } from '@mui/material';

const HomePage: React.FC = () => {
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [info, setInfo] = useState({} as VideoInfo);

  const astronautOptions = {
    loop: true,
    autoplay: true, 
    animationData: astronautAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const astronautLoadingOptions = {
    loop: true,
    autoplay: true, 
    animationData: astronautLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const downloadAudio = (url: string) => {
    window.djay.downloadAudio(url, updateProgress, updateInfo, handleError);
    setLoadingInfo(true);
    setShowError(false);
  }

  const updateProgress = (data: DownloadProgress) => {
    setDownloading(true);
    setShowDownloadCard(true);
    const progress = Math.round((data.downloaded / data.total) * 100);
    setProgress(progress);
    if (progress === 100) { setDownloading(false); }
  }

  const updateInfo = (data: VideoInfo) => { 
    setInfo(data);
    setLoadingInfo(false);
  }

  const handleError = (error: any) => {
    console.log(error);
    setShowError(true);
    setLoadingInfo(false);
  }

  return (
    <div className='h-full flex flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div className='pb-6'>
          <div className='relative h-36 w-full flex justify-center'>
            <Zoom in={!downloading}>
              <div className='absolute'>
                <Lottie 
                  options={astronautOptions}
                  height={160}
                  width={175}
                  isStopped={downloading}
                  isPaused={downloading}/>
              </div>
            </Zoom>
            <Zoom in={downloading}>
              <div className='absolute'>
                <Lottie 
                  options={astronautLoadingOptions}
                  height={160}
                  width={175}
                  isStopped={!downloading}
                  isPaused={!downloading}/>
              </div>
            </Zoom>
          </div>
        </div>
        <SearchBar triggerDownload={downloadAudio} loadingInfo={loadingInfo} showError={showError}/>
        <div className='absolute right-8 bottom-20'>
          <Slide direction='up' in={showDownloadCard}>
            <div> 
              <DownloadCard progress={progress} info={info} showDownloadCard={setShowDownloadCard}/>
            </div>
          </Slide>
        </div>
      </div>
      <div className='flex flex-row flex-0 items-center h-14 p-4 border-t-2 border-gray-100'>
        <p className='text-gray-900'>&copy; Michael Koohang {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default HomePage;
