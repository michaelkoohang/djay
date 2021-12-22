import React from 'react';
import { styled } from '@mui/material/styles';
import { LinearProgress, linearProgressClasses } from '@mui/material';
import { VideoInfo } from '../types/VideoInfo';

type DownloadCardProps = {
  progress: number
  info: VideoInfo
  showDownloadCard: (show: boolean) => void
}

const DownloadCard: React.FC<DownloadCardProps> = (props: DownloadCardProps) => {
  const formatDuration = (duration: number): string => {
    const seconds = duration % 60
    const minutes = Math.floor(duration / 60)
    const secondsString = String(seconds).padStart(2, '0')
    const minutesString = String(minutes)
    return minutesString + ":" + secondsString
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 3.5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#000' : '#fff',
    },
  }));

  return (
    <div className="h-fit w-fit max-w-lg p-6 shadow rounded-xl bg-white">
      <div className='flex flex-row justify-left items-center'>
        <img className='w-32 h-fit rounded-xl' src={props.info.thumbnailURL} alt='image'/>
        <div className='pl-4'>
          <p className='font-bold text-gray-900'>{props.info.title}</p>
          <p className='text-gray-400'>{formatDuration(props.info.duration)}</p>
        </div>
      </div>
      <div className='flex flex-row items-center gap-x-2 pt-4 pb-4'>
        <BorderLinearProgress className='w-full' variant="determinate" value={props.progress} />
        <p>{props.progress}%</p>  
      </div>
      <div className='flex flex-row items-center gap-x-2 justify-end'>
        <button 
          className='font-bold border-2 border-black rounded-full h-10 pr-4 pl-4 hover:border-0 hover:bg-black hover:text-white'
          onClick={() => window.djay.openDownloads()} 
        >
          Open in Folder
        </button>
        <button 
          className='font-bold text-gray-400 border-2 border-gray-400 rounded-full h-10 pr-4 pl-4 hover:border-0 hover:bg-gray-400 hover:text-white'
          onClick={() => props.showDownloadCard(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}

export default DownloadCard;