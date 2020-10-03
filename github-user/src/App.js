import React from 'react';
import axios from 'axios';
import './App.css';

const followers = [];
const user = [];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      user: [],
      followers: []
    };
  };
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      ...this.state,
      username: e.target.value
    });
  };

  componentDidMount() {
    console.log("Component did mount");
    axios
      .get(`https://api.github.com/users/Veilios`)
      .then((res) => {
        this.setState({
          ...this.state,
          user: res.data.message
        })
        .catch((err) => console.log("Error 1", err));
      });
  };

  componentDidUpdate(PrevState) {
    if (PrevState !== this.state.user) {
      console.log("User has changed")
    }
  };

  getUser = () => {
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then((res) => {
        this.setState({
          ...this.state,
          username: "",
          user: res.data.message
        });
      })
      .catch((err) => console.log("Error 2", err))
  };

  render() {
    return (
      <div>
        <h1>
          Github User
        </h1>
        <input type="text" className="user-search" onChange={this.handleChange} value={this.state.username} placeholder="Github Username" />
      </div>
    );
  }
}

export default App;
