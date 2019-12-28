import React from "react";
import './Top3.css';
import axios from 'axios';
import TopGraph from "./TopGraph";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import SelectedData from './SelectedData';
import { validate } from "@babel/types";
import Top3Table from './Top3Table';

const API = 'https://my.api.mockaroo.com/cryptocurrency-data.json?key=8eb9e6f0';

export class Top3 extends React.Component {

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
        this.setState({ list: result, loading: false });
      })
  }
  handleDataChange = event =>{
    this.setState({GraphSelectedData: event.target.value})
  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          <p> Loading... </p>
        </div>
      )
    }
    
    return (
      <React.Fragment>
        <div className="upper">
            <span className="Backarrow" onClick={this.navBack}>Back</span>
          </div>
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
          <Top3Table type={'Price'} list={this.state.list}/>
          <Top3Table type={'Market'} list={this.state.list}/>
          <Top3Table type={'Volume'} list={this.state.list}/>
          </div>
          <TopGraph />
          <div className="curr_descr">
          <h2 style={{marginLeft: "375px"}}>{this.state.Currentname}</h2>
          <p>{this.state.Currentdescr}</p>
          </div>
        </React.Fragment>
    );

  }
}

export default Top3;

/* <div className="graph">
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
            <Bar dataKey="quotes.EUR.price" fill="#8884d8" />
            
          </BarChart>
          </div>
          <div className="upper">
            <span className="Backarrow" onClick={this.navBack}>Back</span>
          </div>
          <SelectedData />
          
          <div className="curr_descr">
          <h2 style={{marginLeft: "375px"}}>{this.state.Currentname}</h2>
          <p>{this.state.Currentdescr}</p>
          </div>*/