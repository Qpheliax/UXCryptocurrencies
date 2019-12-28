import React from "react";
import './Start.css';
import bitcoin from '../img/icons/bitcoin.png';
import binancecoin from '../img/icons/binancecoin.png';
import bitcoincash from '../img/icons/bitcoincash.png';
import bitcoinsv from '../img/icons/bitcoinsv.png';
import eos from '../img/icons/eos.png';
import ethereum from '../img/icons/ethereum.png';
import litecoin from '../img/icons/litecoin.png';
import stellar from '../img/icons/stellar.png';
import tether from '../img/icons/tether.png';
import xrp from '../img/icons/xrp.png';

import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'https://my.api.mockaroo.com/cryptocurrency-data.json?key=8eb9e6f0';

export class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      CryptoName: 'What Is Cryptocurrency?',
      CryptoDesc: <div>
        <p>As the name suggests, a cryptocurrency is a digital currency that is secured by cryptography. One of its primary functions is to work as a medium of exchange within a peer-to-peer (P2P) economic system, which relies on cryptography to prevent frauds and counterfeiting. Most cryptocurrency systems are decentralized and maintained by a distributed network of computers (nodes) spread around the world. However, there are varying degrees of decentralization and some cryptocurrencies are considered more centralized than others (depending on their network structure and nodes distribution).</p>

        <p>Being decentralized means that cryptocurrencies cannot be controlled by a single entity and do not rely on a central authority, like governments and banks. Financial transactions may occur directly between users (P2P) without the need for intermediaries.</p>

        <p>Unlike centralized economic systems, the issuance and management of cryptocurrency units are determined by the network architecture, which is based on programmed algorithms and cryptographic proofs. In other words, there is a predefined set of rules (protocol) that defines how the cryptocurrency system should operate.</p>

        <p>All transactions are verified by the communicating network nodes and confirmed transactions are permanently recorded in a public distributed ledger, called Blockchain – which is one of the core components and underlying technology of most cryptocurrency systems.</p></div>
    }
  }

  setInfo = (e) => {

    const id = e.target.id;
    console.log(id);

    this.setState({ loading: true }, () => {
      axios.get(API)
        .then(result => this.setState({
          loading: false,
          CryptoName: result.data[id].Name,
          CryptoDesc: result.data[id].description
        }));
    });

  }


  render() {
    const { loading } = this.state;
    return (

      <div className="Main">

        <div className="mright">

          <div className="cryptoimgs">

            <div className="img"><img className="logos" id="0" onClick={this.setInfo} src={bitcoin} alt="Bitcoin" /></div>
            <div className="img"><img className="logos" id="7" onClick={this.setInfo} src={binancecoin} alt="Binancecoin" /></div>
            <div className="img"><img className="logos" id="4" onClick={this.setInfo} src={bitcoincash} alt="Bitcoincash" /></div>
            <div className="img"><img className="logos" id="8" onClick={this.setInfo} src={bitcoinsv} alt="Bitcoinsv" /></div>
            <div className="img"><img className="logos" id="6" onClick={this.setInfo} src={eos} alt="Eos" /></div>
            <div className="img"><img className="logos" id="5" onClick={this.setInfo} src={litecoin} alt="Litecoin" /></div>
            <div className="img"><img className="logos" id="9" onClick={this.setInfo} src={stellar} alt="Stellar" /></div>
            <div className="img"><img className="logos" id="3" onClick={this.setInfo} src={tether} alt="Tether" /></div>
            <div className="img"><img className="logos" id="2" onClick={this.setInfo} src={xrp} alt="Xrp" /></div>
            <div className="img"><img className="logosE" id="1" onClick={this.setInfo} src={ethereum} alt="Ethereum" /></div>
          </div>
        </div>

        <div className="mleft">
          <div className="based" >
            {loading ? <div>Loading...</div> : <div>
              <div> <h1> {this.state.CryptoName} </h1> </div>
              <div> {this.state.CryptoDesc} </div>
              <div className='moreInfo' ><Link className='Dlink' to="/comparison">Detailed information</Link></div>
            </div>}
          </div>
        </div>
        {/* Main */}
      </div>
    )
  }
}
export default Start;
