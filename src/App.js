import React from 'react';
import GithubCorner from 'react-github-corner';
import logo from './logo.svg';
import './App.css';

const cachedUrl = 'https://pwa.transmute.world/logo-cached.svg'

function App() {
  return (
    <div className="App">
      <GithubCorner bannerColor={'#64CEAA'} href="https://github.com/OR13/react-pwa" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          style={{marginBottom: '16px'}}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <img src={`${cachedUrl}`} className="App-logo" alt="service-worker-logo" />
      </header>
    </div>
  );
}

export default App;
