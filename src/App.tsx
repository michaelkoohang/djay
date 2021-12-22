import * as React from 'react'
import * as ReactDOM from 'react-dom'
import HomePage from './pages/Home/HomePage'
import "tailwindcss/tailwind.css";

declare global {
  interface Window {
    djay: any;
  }
}

function render() {
  ReactDOM.render(
    <React.StrictMode><HomePage/></React.StrictMode>, 
    document.getElementById('root')
  );
}

render();