// we need to import our components from other files
import React, { Component } from "react";
// here we import our loader spinner image
import loader from "./images/loader.svg";

import clearButton from "./images/close-icon.svg";
import Gif from "./Gif";

const randomChoice = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

// we can pick out prop inside the header component
// we can pass down functions as props as well as things
// like numbers, strings, arrays, objects, functions (data inside js)
const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {/* if we have reuslts, show clear button, otherwise show title */}
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} alt="clear" />
      </button>
    ) : (
      <h1 className="title">Jiffy</h1>
    )}
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
      loading: false,
      searchTerm: "",
      hintText: "",
      // we have an array of gifs
      gifs: [],
    };
  }

  // we want a function that searches the giphy API using fetch and
  // puts he search term into the query url
  // then we can do something with the results

  // we cn also write async methods into our components
  // that let us use the async/await style of function

  // SEARCH FUNCTION
  searchGiphy = async (searchTerm) => {
    // here we set our loading state to be true
    // and this will show the spinner at the bottom
    this.setState({
      loading: true,
    });

    // first we try fetch
    try {
      // we use the await keyword to wait for a response
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=ftE32xZjBBX3aeAGAKdh1C6pokr2V1tY&q=${searchTerm}&limit=100&offset=0&rating=pg-13&lang=en`
      );
      // we convert our raw response into json data
      // const {data} gets the .data part of our response
      const { data } = await response.json();

      // check if the array of results is empty
      // if it is, we throw an error which will stop the function and handle it in the catch area
      if (!data.length) {
        // eslint-disable-next-line no-throw-literal
        throw `Nothing to see for ${searchTerm}`;
      }

      // grab a random result from the images
      const randomGif = randomChoice(data);

      this.setState((prevState, props) => ({
        ...prevState,
        // here we use spread to take previous gifs and spread them out
        // then we add the new random gif at the end
        gifs: [...prevState.gifs, randomGif],
        // turn off loading spinner again
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`,
      }));

      // if fetch fails, we catch it here
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false,
      }));
    }
  };

  //with create react app, we can write our methods
  // as arrow functions, meaning we don't need the
  // constructor and bind

  handleChange = (event) => {
    // const value = event.target.value
    const { value } = event.target;
    // by setting the search term in our state,
    // and also using it on the input as the value,
    // we have created what is called a controlled input
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
      // we call the searchGiphy function using the search term
      this.searchGiphy(value);
    }
  };

  // reset our state by clearing everything out
  // and making it default again (like the original/default state)
  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: "",
      hintText: "",
      gifs: [],
    }));
    // grab input and then focus the cursor back into it
    this.textInput.focus();
  };

  render() {
    // const searchTerm = this.state.searchTerm
    const { searchTerm, gifs } = this.state;
    // set a variable to see if we have any gifs
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />

        <div className="search grid">
          {/* our stack of gif images */}
          {/* loop over array of gif images from our state 
          and we create multiple videos from it */}
          {this.state.gifs.map((gif) => (
            // spread all properties onto Gif component
            <Gif {...gif} />
          ))}

          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
            ref={(input) => {
              this.textInput = input;
            }}
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
