import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Top3 from './Top3';
import SelectedData from './SelectedData';
import './Top3.css';


class TopGraph extends Component {
  state = {
    allData: [],
    CryptoChart: [],
    selectedData: 'Volume24h'

  };

  async componentDidMount() {
    const url = "https://my.api.mockaroo.com/cryptocurrency-data.json?key=8eb9e6f0";
    const response = await fetch(url);
    const data = await response.json();

    let cryptodata = [];

    data.map(item => {

      cryptodata.push({
        Name: item.Name,
        Rank: item.rank,
        PriceUSD: item.quotes.USD.price,
        Volume24h: item.quotes.USD.volume_24h,
        MarketCap: item.quotes.USD.market_cap,
        Quotes: item.quotes.USD.percentage_change_24h

      }
      )
    }
    );

    cryptodata = cryptodata.filter(val => val.Rank <= 10);

    this.setState(
      {
        allData: data,
        CryptoChart: cryptodata
      }
    );

  }

  handleDataChange = event => {
    this.setState({ selectedData: event.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <div className="graph">

          <BarChart
            width={1200}
            height={400}
            data={this.state.CryptoChart}
            margin={{
              top: 50, right: 30, left: 50, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={this.state.selectedData} fill="#8884d8" />

          </BarChart>
          <SelectedData GraphSelectedData={this.state.selectedData} onDataChange={this.handleDataChange} />

        </div>
      </React.Fragment>
    );
  }
}

export default TopGraph;