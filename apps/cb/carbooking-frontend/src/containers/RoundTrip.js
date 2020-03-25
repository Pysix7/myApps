import React, { PureComponent, Fragment } from "react";
import * as CONFIGS from "../configs";
import axios from "axios";
import { Button, Input, Form, Select, DatePicker, Row, Col, Card } from "antd";
import moment from "moment";
import { AppContext } from "../contexts/AppContext";

const { Option } = Select;

class RoundTrip extends PureComponent {
  state = {
    origin: "Bengaluru",
    destination: null,
    fromDate: null,
    toDate: null,
    cities: []
  };

  static contextType = AppContext;

  searchCity = e => {
    const searchQuery = e;
    if (searchQuery.length > 2) {
      const searchURI = `${CONFIGS.SRVR_URI}/data/places?searchkey=${searchQuery}`;
      axios
        .get(searchURI)
        .then(cities => {
          if (
            cities &&
            cities.data &&
            cities.data.places &&
            cities.data.places.length > 0
          )
            this.setState({
              cities: cities.data.places
            });
        })
        .catch(err => console.log("err :", err));
    }
  };

  bookTrip = e => {
    const { cities } = this.state;
    const { setBookingData } = this.context;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const fromDate = moment(values.fromDate).format("MM-DD-YYYY");
        const toDate = moment(values.toDate).format("MM-DD-YYYY");
        const origin = values.origin;
        const destination = values.destination;
        const { distance } = cities.find(item => item.name === destination);

        setBookingData({
          fromDate,
          toDate,
          origin,
          destination,
          distance
        });

        this.props.history.push("/book-trip");
      }
    });
  };

  disableFromDate = currentDate => {
    // Can not select days before today
    return currentDate && currentDate < moment().subtract(1, "days");
  };

  disableToDate = value => {
    const { form } = this.props;
    return value < form.getFieldValue("fromDate");
  };

  render() {
    const { origin, cities } = this.state;
    const { getFieldDecorator } = this.props.form;
    let cityOptions;

    if (cities && cities.length > 0) {
      cityOptions = cities.map(item => {
        return (
          <Option key={item._id} value={item.name}>
            {item.name}
          </Option>
        );
      });
    }

    return (
      <Fragment>
        <div style={{ background: "#ECECEC", padding: "30px", height: "100%" }}>
          <Card bodyStyle={{ padding: "100px", textAlign: "center" }}>
            <Form layout="inline" onSubmit={this.bookTrip}>
              <Form.Item>
                {getFieldDecorator("origin", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ],
                  initialValue: origin
                })(<Input type="text" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("destination", {
                  rules: [
                    { required: true, message: "Destination is required" }
                  ]
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a Destination"
                    optionFilterProp="children"
                    // onChange={this.oncitySelect}
                    onSearch={this.searchCity}
                  >
                    {cityOptions}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("fromDate", {
                  rules: [{ required: true, message: "From Date is required!" }]
                })(
                  <DatePicker
                    // onChange={this.onFromDateChange}
                    disabledDate={this.disableFromDate}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("toDate", {
                  rules: [{ required: true, message: "To Date is required" }]
                })(<DatePicker disabledDate={this.disableToDate} />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Book
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Fragment>
    );
  }
}
export default Form.create({ name: "booking" })(RoundTrip);
