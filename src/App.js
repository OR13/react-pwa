import React from 'react';
import GithubCorner from 'react-github-corner';
import Button from '@material-ui/core/Button';

import {CapabilityAgent, KeystoreAgent, KmsClient} from 'webkms-client';

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
          const data = await fetch('https://pwa.transmute.world/.well-known/edv-configuration').then((res)=>{
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

      <section className="sw-section">
        <h3>WebKMS...</h3>
        <Button variant="contained" color="primary" onClick={async ()=>{

          const config = {
            server: {
              baseUri: 'http://localhost:3000'
            }
          }

          const KMS_MODULE = 'ssm-v1';

          const secret = new Uint8Array([0, 1, 2, 3]);
          const handle = 'did:example:123';
          const capabilityAgent = await CapabilityAgent.fromSecret({secret, handle});
          // console.log(capabilityAgent)
          // create a keystore and an agent for working with it
          // the baseUrl can be set to a dev API or production API
          const kmsBaseUrl = `${config.server.baseUri}/kms`;
          const keystore = await KmsClient.createKeystore({
            // the url for the keystore is configurable
            url: `${kmsBaseUrl}/keystores`,
            config: {
              // on init the sequence must be 0
              sequence: 0,
              controller: capabilityAgent.id,
              invoker: capabilityAgent.id,
              // this allows the capabilityAgent to delegate zCaps
              delegator: capabilityAgent.id
            },
            /**
             * optional `httpsAgent`,
             * usually not applicable for front-end (you may use axios),
             * for back-end use cases a nodejs `https.Agent`
             * may be used to allow the use of self signed certificates using
             * the `rejectUnauthorized: false` flag in the contructor.
            */
            // httpsAgent
          });

          // console.log(keystore)
          const keystoreAgent = new KeystoreAgent({keystore, capabilityAgent});

          // use the keystore agent to create key agreement and HMAC keys
          // const keyAgreementKey = await keystoreAgent.generateKey({type: 'keyAgreement', kmsModule: KMS_MODULE});
          const hmac = await keystoreAgent.generateKey({type: 'hmac', kmsModule: KMS_MODULE});

          console.log(hmac)

          setState({
            // keyAgreementKey,
            hmac
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
