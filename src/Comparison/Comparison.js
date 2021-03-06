import React from "react";
import axios from 'axios';
import { WaveLoading } from 'react-loadingg';
import {Link} from 'react-router-dom';

{/* Sida bestående av en tabell, där 10 valutor visas med olika värden*/}

const API = 'https://my.api.mockaroo.com/cryptocurrency-data.json?key=8eb9e6f0';

export class Comparison extends React.Component { 

  constructor(props) {
    super(props);    
      this.state = { 
        list: [],
        loading: true
      }   
}

componentDidMount() {           
  
        axios.get(API)
        .then(res => {
          const result = res.data;   
          this.setState({ list: result, loading: false });   
        })

}

render() {
  if (this.state.loading) {
    return(
      <div> 
        <WaveLoading type={"bars"} color={"#ccccff"} size={"large"}/>
      </div> 
    )
  }

  const table = this.state.list.slice(0,10).map((crypto, data, index, id, name, price,market,volume,change) => (
    <div className="divTableBody" id={index} key={index}>
    <div className="divTableRow" key={data}>
    <div className="divTableCell" key={id}><Link style={{ textDecoration: 'none' }} id={id} to={`/comparison/${crypto.id}`}>{crypto.Name}</Link></div>            
    <div className="divTableCell" key={price}>{crypto.quotes.EUR.price}<span> €</span></div>
    <div className="divTableCell" key={market}>{crypto.quotes.EUR.market_cap}<span> M</span></div>   
    <div className="divTableCell" key={volume}>{crypto.quotes.EUR.volume_24h}<span> M</span></div>   
    <div className="divTableCell" key={change}>{crypto.quotes.EUR.percentage_change_24h}<span> %</span></div>   

    </div>                    
    </div>
    
  ));


    return (     
      <div style={{margin: "100px"}} className="cryptotable_1">
              <div className="divTable blueTable">
              <div className="divTableHeading">
              <div className="divTableRow">
              <div className="divTableHead">Name</div>
              <div className="divTableHead">Market Cap</div>
              <div className="divTableHead">Price</div>
              <div className="divTableHead">Volume (24H)</div>
              <div className="divTableHead">Change (24H)</div>
              </div>
              </div>
              {table}
              </div> 
              
      </div>
    );
  }
  }
 
  export default Comparison;