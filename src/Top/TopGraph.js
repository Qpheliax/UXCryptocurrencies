import React, { Component } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import Top from './Top';


class TopGraph extends Component {
    state = {  }
    render() { 
      
       const inData = this.props.TablePrice;
       console.log(inData);

        return ( 
            <BarChart
        width={1500}
        height={600}
        data={this.props.Tableprice}
        margin={{
          top: 50, right: 30, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.props.Tableprice} fill="#8884d8" />
        
        </BarChart>
         );
    }
}
 
export default TopGraph;