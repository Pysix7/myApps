import React, { createContext, PureComponent } from "react";

export const AuthContext = createContext();

class AuthContextProvider extends PureComponent {
  state = {
    isLoggedIn: false
  };

  toggleLoginState = () => {
    this.setState(prevState => {
      return {
        isLoggedIn: !prevState.isLoggedIn
      };
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{ ...this.state, toggleLoginState: this.toggleLoginState }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
