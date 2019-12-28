//skicka data table data
import React, { Component } from "react";
//destructing blir till 5 constanter

class Top3Table extends Component {
  render() {
    const { type, list } = this.props;
    let sortedList;
    if (type === "Price") {
      sortedList = list.slice(0, 10).sort((a, b) => b.quotes.EUR.price - a.quotes.EUR.price).slice(0, 3);
    }
    if (type === "Market") {
      sortedList = list.slice(0, 10).sort((a, b) => b.quotes.EUR.market_cap - a.quotes.EUR.market_cap).slice(0, 3);
    }
    if (type === "Volume") {
      sortedList = list.slice(0, 10).sort((a, b) => b.quotes.EUR.volume_24h).slice(0, 3);
    }
    return (
      <React.Fragment>
        <div className="TableHeader"><h2>Top 3 by {type}:</h2></div>
        <div className="divTable blueTable">
          <div className="divTableHeading">
            <div className="divTableRow">
              <div className="divTableHead">Name</div>
              <div className="divTableHead">{type}</div>
            </div>
          </div>
          {sortedList.map(
            (crypto, index, id, name, price, market, volume) => (

              <div className="divTableBody" id={index} key={index}>
                <div className="divTableRow" key={id}>
                  <div className="divTableCell" key={name}>
                    {crypto.Name}
                  </div>
                  {type === "Price" ? (
                    <div className="divTableCell" key={price}>
                      {crypto.quotes.EUR.price}
                      <span> €</span>
                    </div>
                  ) : type === "Market" ? (
                    <div className="divTableCell" key={market}>{crypto.quotes.EUR.market_cap}<span> M</span></div>
                  ) : (
                        <div className="divTableCell" key={volume}>{crypto.quotes.EUR.volume_24h}<span> M</span></div>
                      )
                  }
                </div>
              </div>
            ))}
      </div>
      </React.Fragment>
    );
  }

}


export default Top3Table;
