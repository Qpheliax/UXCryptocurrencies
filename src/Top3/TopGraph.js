import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Top3 from './Top3';
import SelectedData from './SelectedData';
import './Top3.css';
import { HelpBlock } from 'react-bootstrap';


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
        Price: item.quotes.EUR.price,
        Volume24h: item.quotes.EUR.volume_24h,
        MarketCap: item.quotes.EUR.market_cap,
        Change24h: item.quotes.EUR.percentage_change_24h
      }
      )
    }
    );
    
    cryptodata = cryptodata.filter(val => val.Rank <= 5);
    const selectedCurrency = this.props.ClickedCurrency;
    const selectedCurrPrice = this.props.CurrentPrice;
    const selectedCurrMarket = this.props.CurrentMarket;
    const selectedCurrValue = this.props.CurrentValue;
    const selectedCurrRank = this.props.CurrentRank;
    const selectedCurrPerc24h = this.props.CurrentPercent24h;

    const SelectedCurrencyArr = {Name: selectedCurrency, Price: selectedCurrPrice, MarketCap: selectedCurrMarket, 
                                Volume24h: selectedCurrValue, Rank: selectedCurrRank, Change24h: selectedCurrPerc24h};
    

    cryptodata.push(SelectedCurrencyArr);
    
    /*  FÖRSÖK filtra brot duplicate kolla länk
    const uniqueSet = new Set(cryptodata);
    const backToArray = [...uniqueSet];*/
    function removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject  = {};
 
      for(var i in originalArray) {
         lookupObject[originalArray[i][prop]] = originalArray[i];
      }
 
      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
       return newArray;
  }
 
 const uniqueArray = removeDuplicates(cryptodata, "Name");
   
    this.setState(
      {
        allData: data,
        CryptoChart: uniqueArray
      }
    ); 
  }

  handleDataChange = event => {
    this.setState({ selectedData: event.target.value })
  }
  
  /*1050 och 500height på chart*/
 
  render() {
    
  
    return (
      <React.Fragment>
        <div className="graph">
        
          <BarChart
            width={750}
            height={475}
            data={this.state.CryptoChart}
            margin={{
              top: 150, right: 50, left: 50, bottom: 5,
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