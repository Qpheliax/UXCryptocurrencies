import React from "react";
import './Top3.css';
import axios from 'axios';
import TopGraph from "./TopGraph";
import Top3Table from './Top3Table';
import { WaveLoading } from 'react-loadingg';

{/*Denna sida sammanbinder/renderar Top3Table,TopGraph och SelectedData.
Här skapas även tabellen "Selected Currency" och beskrivning om vald valuta.*/}

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
      Currentrank: '',
      Currentpercent24h: '',
      GraphSelectedData: '',
      Currentdescr: ''
    }
  }

  navBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {

    const currentid = this.props.match.params.id;
    axios.get(API)
      .then(result => this.setState({
        Currentname: result.data[currentid - 1].Name,
        Currentprice: result.data[currentid - 1].quotes.EUR.price,
        Currentmarket: result.data[currentid - 1].quotes.EUR.market_cap,
        Currentvalue: result.data[currentid - 1].quotes.EUR.volume_24h,
        Currentrank: result.data[currentid - 1].rank,
        Currentpercent24h: result.data[currentid - 1].quotes.EUR.percentage_change_24h,
        Currentdescr: result.data[currentid - 1].description
      }));

    axios.get(API)
      .then(res => {
        let result = res.data;
        this.setState({ list: result, loading: false });
      })
  }
  handleDataChange = event => {
    this.setState({ GraphSelectedData: event.target.value })
  }


  render() {
    if (this.state.loading) {
      return (
        <div>
          <WaveLoading type={"bars"} color={"#ccccff"} size={"large"} />
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="cryptotable">

          <div className="TableHeader"><h2>Selected Currency:</h2></div>

          <div className="divTable blueTable">
            <div className="divTableHeading">
              <div className="divTableRow">
                <div className="divTableHead">Name</div>
                <div className="divTableHead">Price</div>
                <div className="divTableHead">Market</div>
                <div className="divTableHead">Volume</div>
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
          <Top3Table type={'Price'} list={this.state.list} />
          <Top3Table type={'Market'} list={this.state.list} />
        </div>
        <TopGraph ClickedCurrency={this.state.Currentname}
          CurrentPrice={this.state.Currentprice}
          CurrentMarket={this.state.Currentmarket}
          CurrentValue={this.state.Currentvalue}
          CurrentRank={this.state.Currentrank}
          CurrentPercent24h={this.state.Currentpercent24h} />
        <div className="curr_descr">
          <h2>{this.state.Currentname}</h2>
          <p>{this.state.Currentdescr}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Top3;
