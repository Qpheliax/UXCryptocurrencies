import React, { Component } from "react";
import Top3 from "./Top3";

class SelectData extends Component {
  state = {};

  //select är= valknapp  och beroende på vad som välj skickas props till App.js->SelectedData som i sin tur ändrar state på selecetedData: staten
  //skickar objekt event till parent komponent dvs. selectedData/onDataChange som sedan refererar till en Handler dvs. handleDataChange
  render() {
    return (
      <div className="selectButton">
        <label>
          Pick type of data {}
          <select
            value={this.props.selectedData}
            onChange={e => this.props.onDataChange(e)}
          >
            <option value="Volume24h">Volume (24H)</option>
            <option value="Price">Price EUR</option>
            <option value="MarketCap">Market Cap</option>
            <option value="Rank">Rank</option>
            <option value="Change24h">Change %(24H)</option>
          </select>
        </label>
      </div>
    );
  }
}

export default SelectData;
