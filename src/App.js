import React from "react";
import { BrowserRouter, Link, NavLink, Route, Switch } from "react-router-dom";

const BreedsUrl = "https://dog.ceo/api/breeds/list/all";
const BreedRandomUrl = " https://dog.ceo/api/breeds/image/random";

class Breeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const listOfBreeds = Object.keys(this.props.breeds);
    console.log(listOfBreeds);
    return (
      <>
        <ul>
          {listOfBreeds.map((breed, index) => (
            <li key={index}>
              <Link to={`/breeds/${breed}`}>{breed}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: [],
      isLoading: true,
      error: null,
    };
  }

  async componentWillMount() {
    try {
      const response = await fetch(BreedsUrl);
      const breeds = await response.json();
      this.setState({ breeds: breeds.message });
    } catch (error) {
      this.setState(() => ({ error }));
    } finally {
      this.setState(() => ({ isLoading: false }));
    }
  }

  render() {
    if (this.state.isLoading) {
      return "...Loading...";
    }

    if (this.state.error) {
      return "...Error...";
    }

    
    return (
      <BrowserRouter>
        <ul>
          <li>
            <NavLink to="/breeds">Breeds</NavLink>
          </li>
          <li>
            <NavLink to="/breed">Breed</NavLink>
          </li>
          <li>
            <NavLink to="/random">Random</NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/breeds">
            <Breeds breeds={this.state.breeds} />
          </Route>
          <Route path="/breed"></Route>
          <Route path="/random"></Route>

          <Route>No found</Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
