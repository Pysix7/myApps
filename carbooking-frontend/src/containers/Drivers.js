import React, { PureComponent, Fragment } from "react";
import { List, Avatar, Card, Button } from "antd";
import axios from "axios";
import * as CONFIGS from "../configs";
import styles from "./Drivers.css";

class Drivers extends PureComponent {
  state = {
    drivers: []
  };

  componentDidMount() {
    const searchURI = `${CONFIGS.SRVR_URI}/data/drivers`;
    axios
      .get(searchURI)
      .then(drivers => {
        if (
          drivers &&
          drivers.data &&
          drivers.data.drivers &&
          drivers.data.drivers.length > 0
        )
          this.setState({
            drivers: drivers.data.drivers
          });
      })
      .catch(err => console.log("err :", err));
  }

  getQueryParams = () => {
    const query = new URLSearchParams(this.props.location.search);
    const params = [];
    for (let param of query.entries()) {
      const stuff = {};
      stuff[param[0]] = param[1];

      params.push({
        ...stuff
      });
    }
    return params;
  };

  handleDriverSelect = item => {
    console.log("item :", item);
    const bookingData = this.getQueryParams();
    console.log("bookingData :", bookingData);
  };

  render() {
    const { drivers } = this.state;
    return (
      <Fragment>
        <div style={{ background: "#ECECEC", padding: "30px", height: "100%" }}>
          <Card bodyStyle={{ padding: "10px 100px" }}>
            <List
              itemLayout="horizontal"
              dataSource={drivers}
              renderItem={item => (
                <List.Item key={item._id} className={styles.driversList}>
                  <img
                    className={styles.carImage}
                    src="https://imgctcf.aeplcdn.com/thumbs/p-nc-b-ver24/images/car-data/big/toyota-innova-crysta-default.jpg"
                    alt="car"
                  ></img>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={item.description}
                  />
                  <span className={styles.driverPrice}>
                    Driver Charge: <strong>{item.charge}</strong>
                  </span>
                  <Button
                    type="primary"
                    onClick={() => this.handleDriverSelect(item)}
                  >
                    Select Driver
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Fragment>
    );
  }
}
export default Drivers;
