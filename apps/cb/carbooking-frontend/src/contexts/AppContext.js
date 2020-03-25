import React, { createContext, PureComponent } from "react";

export const AppContext = createContext();

class AppContextProvider extends PureComponent {
  state = {
    isLoggedIn: false,
    bookingData: null
  };

  toggleLoginState = () => {
    this.setState(prevState => {
      return {
        isLoggedIn: !prevState.isLoggedIn
      };
    });
  };

  setBookingData = data => {
    this.setState({
      bookingData: data
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          toggleLoginState: this.toggleLoginState,
          setBookingData: this.setBookingData
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
