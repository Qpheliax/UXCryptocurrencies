import React, { Component } from "react";
import Top from './Top';


class SelectData extends Component {
  state = {};

  //select är= valknapp  och beroende på vad som välj skickas props till App.js->SelectedData som i sin tur ändrar state på selecetedData: staten
  //skickar objekt event till parent komponent dvs. selectedData/onDataChange som sedan refererar till en Handler dvs. handleDataChange
  render() {
    return (
      <div>
      
        <label style={{margin: "175px 0px 30px 50px"}}>
          Pick type of data {}
          <select
            value={this.props.selectedData}
            onChange={e => this.props.onDataChange(e)}
            
           >
            <option value="PriceEUR">Price EUR</option>
            <option value="Volume24h">Volume (24H)</option>
            <option value="MarketCap">Market Cap</option>
            <option value="Rank">Ranking</option>
            <option value="Quotes">Change %(24H)</option>
          </select>
        </label>
      </div>
    );
  }
}

export default SelectData;
