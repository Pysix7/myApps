import React, { Component, Fragment } from "react";
import { Route, Link, Switch } from "react-router-dom";
import RoundTrip from "./RoundTrip";
import Drivers from "./Drivers";
import styles from "./Booking.css";
import SignUpModal from "./Authentication/Signup";

class Blog extends Component {
  state = {
    showSignupModal: false
  };

  handleSignUpClick = () => {
    this.setState(prevState => {
      return { showSignupModal: !prevState.showSignupModal };
    });
  };

  render() {
    const { showSignupModal } = this.state;
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
                <li style={{ float: "right" }}>
                  <Link
                    onClick={this.handleSignUpClick}
                    style={{ marginRight: "30px" }}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
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
                      <h3 className={styles.welcome}>Welcome to Instacar</h3>
                    </div>
                  </Fragment>
                );
              }}
            />
            <Route path="/roundtrip" component={RoundTrip} />
            <Route path="/book-trip" component={Drivers} />
          </Switch>
        </div>
        {showSignupModal ? (
          <SignUpModal
            closeModal={this.handleSignUpClick}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default Blog;
