import React, { PureComponent, Fragment } from "react";
import { Form, Input, Modal, Card, Button, message } from "antd";
import axios from "axios";
import * as CONFIGS from "../../configs";
import { AppContext } from "../../contexts/AppContext";
import { setLSItem } from "../../utils/localStorage";

class Login extends PureComponent {
  static contextType = AppContext;

  getQueryParams = () => {
    const query = new URLSearchParams(this.props.location.search);
    const stuff = {};
    for (let param of query.entries()) {
      stuff[param[0]] = param[1];
    }

    return stuff;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, closeModal } = this.props;
    const { toggleLoginState } = this.context;
    form.validateFields((err, values) => {
      if (err) throw err;
      axios
        .post(CONFIGS.SRVR_URI + "/auth/login", {
          ...values
        })
        .then(response => {
          if (
            response &&
            response.data &&
            response.data.message === "success"
          ) {
            const qp = this.getQueryParams();
            setLSItem("auth", {
              token: response.data.token,
              expiryTime: response.data.expiryTime
            });
            // closeModal();
            if (qp.redirect) {
              this.props.history.push(qp.redirect);
            } else {
              this.props.history.push("/");
            }
            toggleLoginState();
          }
        })
        .catch(err => {
          message.error(err.response.data.message);
        });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      closeModal
    } = this.props;

    return (
      <Fragment>
        {/* <Modal
          title="Login"
          visible={true}
          closable
          onCancel={closeModal}
          footer={null}
        > */}
        <Card bordered={false} bodyStyle={{ padding: "5% 30%" }}>
          <Form>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </Form.Item>
            {/* <p>
              Don't Have an account? Sign Up
            </p> */}
          </Form>
          {/* </Modal> */}
        </Card>
      </Fragment>
    );
  }
}
export default Form.create({ name: "login" })(Login);
