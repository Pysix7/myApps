import React, { Component, Fragment } from "react";
import Booking from "./containers/Booking";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import './App.css';
import AppContextProvider from "./contexts/AppContext";

const stripePromise = loadStripe("pk_test_zLIW6khiozz8A7flRbrFFDfy00bDWYuCav");

class App extends Component {
  render() {
    return (
      <Fragment>
        <Elements stripe={stripePromise}>
          <AppContextProvider>
            <Booking />
          </AppContextProvider>
        </Elements>
      </Fragment>
    );
  }
}

export default App;
