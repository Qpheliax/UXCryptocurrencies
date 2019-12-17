import React from "react";
import './Top.css';
import axios from 'axios';
import TopGraph from "./TopGraph";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import SelectedData from './SelectedData';

const API = 'https://my.api.mockaroo.com/cryptocurrency-data.json?key=8eb9e6f0';

export class Top extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      Currentname: '',
      Currentprice: '',
      Currentmarket: '',
      Currentvalue: '',
      GraphSelectedData: 'Volume24h',
      Currentdescr: ''
    }
  }

  navBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {

    const currentid = this.props.match.params.id;
    console.log(currentid);
    console.log(this.state.list);

    axios.get(API)
      .then(result => this.setState({
        Currentname: result.data[currentid - 1].Name,
        Currentprice: result.data[currentid - 1].quotes.EUR.price,
        Currentmarket: result.data[currentid - 1].quotes.EUR.market_cap,
        Currentvalue: result.data[currentid - 1].quotes.EUR.volume_24h,
        Currentdescr: result.data[currentid - 1].description
      }));

    axios.get(API)
      .then(res => {
        let result = res.data;
        //måste här pusha o filtra cryptodata.filter(val => val.Rank <= 10); 
        this.setState({ list: result, loading: false });
      })
     

  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          <p> Loading... </p>
        </div>
      )
    }

    const tablePrice = this.state.list.slice(0, 10).sort((a, b) => b.quotes.EUR.price - a.quotes.EUR.price).slice(0, 3).map((crypto, index, id, name, price) => (
      <div className="divTableBody" id={index} key={index}>
        <div className="divTableRow" key={id}>
          <div className="divTableCell" key={name}>{crypto.Name}</div>
          <div className="divTableCell" key={price}>{crypto.quotes.EUR.price}<span> €</span></div>
        </div>
      </div>

    ));
    
      const tableMarket = this.state.list.slice(0, 10).sort((a, b) => b.quotes.EUR.market_cap - a.quotes.EUR.market_cap).slice(0, 3).map((crypto, index, id, name, market) => (
      <div className="divTableBody" id={index} key={index}>
        <div className="divTableRow" key={id}>
          <div className="divTableCell" key={name}>{crypto.Name}</div>
          <div className="divTableCell" key={market}>{crypto.quotes.EUR.market_cap}<span> M</span></div>
        </div>
      </div>

    ));
    const tableValue = this.state.list.slice(0, 10).sort((a, b) => b.quotes.EUR.volume_24h).slice(0, 3).map((crypto, index, id, name, volume) => (
      <div className="divTableBody" id={index} key={index}>
        <div className="divTableRow" key={id}>
          <div className="divTableCell" key={name}>{crypto.Name}</div>
          <div className="divTableCell" key={volume}>{crypto.quotes.EUR.volume_24h}<span> M</span></div>
        </div>
      </div>

    ));
    
    const desc = this.state.Currentdescr;
    const dataChart = this.state.list;
    
    console.log(desc);
    return (
      <React.Fragment>
        <div className="cryptotable">
  
          <div className="TableHeader"><h2>Selected currency:</h2></div>

          <div className="divTable blueTable">
            <div className="divTableHeading">
              <div className="divTableRow">
                <div className="divTableHead">Name</div>
                <div className="divTableHead">Price</div>
                <div className="divTableHead">Market</div>
                <div className="divTableHead">Value</div>
              </div>
            </div>
            <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableCell">{this.state.Currentname}</div>
                <div className="divTableCell">{this.state.Currentprice}<span> €</span></div>
                <div className="divTableCell">{this.state.Currentmarket}<span> M</span></div>
                <div className="divTableCell">{this.state.Currentvalue}<span> M</span></div>
              </div>
            </div>
          </div>
          <div className="TableHeader"><h2>Top 3 by Price:</h2></div>
          <div className="divTable blueTable">
            <div className="divTableHeading">
              <div className="divTableRow">
                <div className="divTableHead">Name</div>
                <div className="divTableHead">Price</div>
              </div>
            </div>
            {tablePrice}
          </div>

          <div className="TableHeader"><h2>Top 3 by Market Value:</h2></div>
          <div className="divTable blueTable">
            <div className="divTableHeading">
              <div className="divTableRow">
                <div className="divTableHead">Name</div>
                <div className="divTableHead">Market</div>
              </div>
            </div>
            {tableMarket}
          </div>

          <div className="TableHeader"><h2>Top 3 by Value in 24h:</h2></div>
          <div className="divTable blueTable">
            <div className="divTableHeading">
              <div className="divTableRow">
                <div className="divTableHead">Name</div>
                <div className="divTableHead">Value</div>
              </div>
            </div>
            {tableValue}
          </div>
          </div>
          <div className="graph">
          <BarChart
            width={1200}
            height={400}
            data={this.state.list}
            margin={{
              top: 50, right: 30, left: 200, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="max_supply" fill="#8884d8" />
            
          </BarChart>
          </div>
          <div className="upper">
            <span className="Backarrow" onClick={this.navBack}>Back</span>
          </div>
          <SelectedData />
          
          <div className="curr_descr">
          <h2 style={{marginLeft: "375px"}}>{this.state.Currentname}</h2>
          <p>{this.state.Currentdescr}</p>
          </div>
          
           
        </React.Fragment>
    );

  }
}

export default Top;
