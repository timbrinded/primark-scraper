import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      searchTerm: "red dress"
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  handleSearchTermChange(event){
    this.setState({searchTerm: event.target.value })
  }

  handleSubmit(event){
    //query the api with our params
    event.preventDefault();
    this.fetchProducts(this.state.searchTerm)
  }
  componentDidMount() {
    this.fetchProducts(this.state.searchTerm);
  }

  async fetchProducts(searchTerm) {
    const resp = await fetch(`http://localhost:4000/primark?term=${searchTerm}`);
    const json = await resp.json();

    console.log(json);
    this.setState({ json });
  }

  render() {
    let products = null;
    if (this.state.json.products) {
      products = this.state.json.products.map((product) => {
        return (
          <div key={product.code}>
            <div key={product.code}>{product.name}</div>
            <img src={product.images[0].url} />
          </div>
        );
      });
    }

    return <div className="App">
      <form onSubmit={this.handleSubmit}>
      <label>Query: </label>
      <input type="text"
      value={this.state.searchTerm}
      onChange={this.handleSearchTermChange}
      />
      <input type="button" value="Submit" onClick={this.handleSubmit}
      />
      </form>
      {products}</div>;
  }
}

export default App;
