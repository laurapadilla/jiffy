// we need to import our components from other files
import React, { Component } from "react";
// here we import our loader spinner image
import loader from "./images/loader.svg";

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {/* here we check wether we have loading text and render out 
     either our spinner or hintText based on that, using a ternary operator (if/else)*/}
    {loading ? (
      <img src={loader} className="block mx-auto" alt="gif" />
    ) : (
      hintText
    )}
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hintText: "",
    };
  }

  //with create react app, we can write our methods
  // as arrow functions, meaning we don't need the
  // constructor and bind

  handleChange = (event) => {
    // const value = event.target.value
    const { value } = event.target;
    // by setting the search term in our state,
    // and also using it on the input as the value,
    // we have created what is called a controlled inout
    this.setState((prevState, props) => ({
      // we take our old props and spread them out here
      ...prevState,
      // and then we overwrite the ones we want to
      searchTerm: value,
      // we set the hint text only when have more than 2 characters in our input,
      // otherwise we make it an empty string
      hintText: value.length > 2 ? `Hit enter to search ${value}` : "",
    }));
  };

  // when we have two or more characters in our search box
  // and we have pressed enter, we then want to run a search

  handleKeyPress = (event) => {
    const { value } = event.target;
    if (value.length > 2 && event.key === "Enter") {
      alert(`search for ${value}`);
    }
    console.log(event.key);
  };

  render() {
    // const searchTerm = this.state.searchTerm
    const { searchTerm } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* our stack of gif images */}
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>

        {/* here we pass our userHint all of our state using a spread */}
        <UserHint {...this.state} />
      </div>
    );
  }
}

// we need to export our components,
// otherwise files have no idea about it
export default App;
