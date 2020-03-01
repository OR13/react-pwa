import React from 'react';
import GithubCorner from 'react-github-corner';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.css';

const cachedUrl = 'https://pwa.transmute.world/logo-cached.svg'

function App() {

  const [state, setState] = React.useState({});

  return (
    <div className="App">
      <GithubCorner bannerColor={'#64CEAA'} href="https://github.com/OR13/react-pwa" />
      <section className="sw-section">
        <h3>Serving SVGs from SW...</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={`${cachedUrl}`} className="App-logo" alt="service-worker-logo" />
      </section>

      <section className="sw-section">
        <h3>HTTP Interceptor...</h3>
        <Button variant="contained" color="primary" onClick={async ()=>{
  
          const data = await fetch('https://pwa.transmute.world/kms/keystore').then((res)=>{
            return res.json()
          });
        
          setState({
            data
          })
        }}>
          Make Request
        </Button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
