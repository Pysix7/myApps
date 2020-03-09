import React, { Component, Fragment } from "react";
import Booking from "./containers/Booking";
// import './App.css';
import AuthContextProvider from "./contexts/AuthContext";

class App extends Component {
  render() {
    return (
      <Fragment>
        <AuthContextProvider>
          <Booking />
        </AuthContextProvider>
      </Fragment>
    );
  }
}

export default App;
