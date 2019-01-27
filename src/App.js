import React, { Component } from 'react';
import BarChart from './BarChart';
import './App.scss';

class App extends Component {
  state = { isLoading: false, domStats: [], urlInput: '' };

  handleUrlInputChange = e => {
    this.setState({ urlInput: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const res = await fetch(`http://localhost:3001/${this.state.urlInput}`);
    const json = await res.json();
    this.setState({
      isLoading: false,
      domStats: this.mapElementsToChartData(json)
    });
  };

  mapElementsToChartData(data) {
    const tagList = [];
    for (let htmlTag in data) {
      if (data.hasOwnProperty(htmlTag)) {
        tagList.push({ tag: htmlTag, count: data[htmlTag] });
      }
    }
    return tagList;
  }

  render() {
    return (
      <div className="App">
        <h5 style={{ visibility: this.state.isLoading ? 'visible' : 'hidden' }}>
          Loading...
        </h5>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.urlInput}
            onChange={this.handleUrlInputChange}
          />
        </form>
        {this.state.domStats.length > 0 && (
          <BarChart data={this.state.domStats} />
        )}
      </div>
    );
  }
}

export default App;
