import React, { useEffect, useState } from 'react';
import { ExclamationIcon, LinkIcon } from '@heroicons/react/solid';
import { CircularProgress, Fade } from '@mui/material';

type SearchBarProps = {
  triggerDownload: (url: string) => void
  loadingInfo: boolean
  showError: boolean
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    window.addEventListener('blur', () => {
      if (document.activeElement.id === 'search-box') {
        setSearchActive(true);
      }
    });
  }, []);

  const download = (event: React.FormEvent) => {
    event.preventDefault();
    props.triggerDownload(searchText);
  };

  const updateText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <div className={
      'w-full border-2 rounded-full h-12 pl-4 pr-4 flex flex-row justify-center items-center max-w-screen-sm hover:shadow hover:border-white'
      + (searchActive ? ' shadow border-white' : ' border-gray-200')}>
      <LinkIcon className='h-5 w-5 text-gray-400'/>
      <form className='w-full flex flex-row mr-3 ml-3' onSubmit={(event) => download(event)}>
        <input 
          type="text" 
          id="search-box" 
          name="fname" 
          className="h-10 w-full border-0 font-bold focus:outline-none bg-transparent" 
          placeholder='Paste a YouTube song link here'
          onClick={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
          onChange={(event) => updateText(event)}/>
      </form>
      <div className='relative flex justify-right items-center'>
        <Fade in={props.loadingInfo} className='absolute right-0.5'>
          <CircularProgress 
            size={25} 
            thickness={4} 
            color='primary'
            sx={{
              color: (theme) => (theme.palette.mode === 'light' ? '#888888' : '#ffffff')
            }}/>
        </Fade>
        <Fade in={props.showError} className='absolute right-0.5'>
          <div>
            <ExclamationIcon className='h-6 w-6' color='red'/>
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default SearchBar;