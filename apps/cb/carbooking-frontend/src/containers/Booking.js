import React, { Component, Fragment } from "react";
import { Route, Link, Switch } from "react-router-dom";
import RoundTrip from "./RoundTrip";
import Drivers from "./Drivers";
import styles from "./Booking.css";
import SignUpModal from "./Authentication/Signup";
import LoginModal from "./Authentication/Login";
import CheckoutForm from "../components/CheckoutForm";
import { AppContext } from "../contexts/AppContext";
import { getLSItem } from "../utils/localStorage";

class Blog extends Component {
  state = {
    showSignupModal: false,
    showLoginModal: false
    // isLoggedIn: false
  };

  static contextType = AppContext;

  componentDidMount() {
    const authData = getLSItem("auth");
    if (authData && authData.token) {
      // console.log("Date.now() :", Date.now(), authData.expiryTime);
      // if (Date.now() > authData.expiryTime) {
      //   this.setState({
      //     isLoggedIn: false
      //   });
      // } else {
      // this.setState({
      //   isLoggedIn: true
      // });
      // }
      this.context.toggleLoginState();
    }
  }

  handleSignUpClick = () => {
    this.setState(prevState => {
      return { showSignupModal: !prevState.showSignupModal };
    });
  };

  handleLoginClick = () => {
    this.setState(prevState => {
      return { showLoginModal: !prevState.showLoginModal };
    });
  };

  handleLogoutClick = () => {
    const { toggleLoginState } = this.context;
    window.localStorage.removeItem("auth");
    toggleLoginState();
  };

  render() {
    const { showSignupModal, showLoginModal } = this.state;
    const { isLoggedIn } = this.context;
    console.log("this.context :", this.context);
    return (
      <Fragment>
        <div className={styles.booking}>
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/">
                    <span>Car Booking</span>
                  </Link>
                </li>
                <li>
                  <Link to="/roundtrip">RoundTrip</Link>
                </li>
                {!isLoggedIn ? (
                  <li style={{ float: "right", margin: "15px 30px 0 0" }}>
                    <Link onClick={this.handleLoginClick} to="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li style={{ float: "right", margin: "15px 30px 0 0" }}>
                    <Link onClick={this.handleLogoutClick} to="/logout">
                      Logout
                    </Link>
                  </li>
                )}
                {!isLoggedIn ? (
                  <li style={{ float: "right", margin: "15px 30px 0 0" }}>
                    <Link onClick={this.handleSignUpClick} to="/signup">
                      Sign Up
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </header>
        </div>
        <div className={styles.renderBody}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <Fragment>
                    <div
                      style={{
                        background: "#ECECEC",
                        padding: "30px",
                        height: "100%"
                      }}
                    >
                      <h3 className={styles.welcome}>Welcome to Car Booking</h3>
                    </div>
                  </Fragment>
                );
              }}
            />
            <Route path="/roundtrip" component={RoundTrip} />
            <Route path="/book-trip" component={Drivers} />
            <Route path="/login" component={LoginModal} />
            <Route path="/signup" component={SignUpModal} />
            <Route path="/checkout" component={CheckoutForm} />
          </Switch>
        </div>
        {/* {showSignupModal ? (
          <SignUpModal closeModal={this.handleSignUpClick} />
        ) : null}
        {showLoginModal ? (
          <LoginModal closeModal={this.handleLoginClick} />
        ) : null} */}
      </Fragment>
    );
  }
}

export default Blog;
