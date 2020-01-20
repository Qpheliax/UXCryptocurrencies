import React, { Component } from "react";

{/* Select knapp skapas, där användaren kan välja vilka datatyper som ska visas i grafen.*/}
class SelectData extends Component {
  state = {};

  render() {
    return (
      <div className="selectButton">
        <label>
          Select data type {}
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
