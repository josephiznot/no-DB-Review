import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      arrests: [],
      outcome: "",
      month: "",
      category: ""
    };
    this.acquit = this.acquit.bind(this);
  }
  componentDidMount() {
    axios.get("/api/get-me-data").then(response => {
      this.setState({ arrests: response.data });
    });
  }

  acquit(id) {
    axios.delete(`/api/acquit/${id}`).then(response => {
      this.setState({ arrests: response.data });
    });
  }

  handleCategory(val) {
    this.setState({ category: val });
  }
  handleOutcome(val) {
    this.setState({ outcome: val });
  }
  handleMonth(val) {
    this.setState({ month: val });
  }

  makeArrest() {
    axios
      .post("/api/make-arrest", {
        outcome_status: {
          category: this.state.outcome
        },
        month: this.state.month,
        category: this.state.category
      })

      //WAITING FROM SERVER.....
      .then(response => {
        this.setState({ arrests: response.data });
      });
  }

  render() {
    let mappedArrests = this.state.arrests.map((e, i) => {
      return (
        <div key={e.id}>
          <h1>{e.category}</h1>
          <h2>{e.outcome_status.category}</h2>
          <h3>{e.month}</h3>
          <button onClick={() => this.acquit(e.id)}>Acquit</button>
        </div>
      );
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Joes review</h1>
        </header>
        <div>
          <h4>Arrest</h4>
          <input
            onChange={e => this.handleCategory(e.target.value)}
            placeholder="category"
          />
          <input
            onChange={e => this.handleOutcome(e.target.value)}
            placeholder="outcome"
          />
          <input
            onChange={e => this.handleMonth(e.target.value)}
            placeholder="month"
          />
          <button onClick={() => this.makeArrest()}>Make an arrest</button>
        </div>
        {mappedArrests}
      </div>
    );
  }
}

export default App;
