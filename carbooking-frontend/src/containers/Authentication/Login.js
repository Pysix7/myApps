import React, { PureComponent, Fragment } from "react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";
import * as CONFIGS from "../../configs";
import { AuthContext } from "../../contexts/AuthContext";
import { setLSItem } from "../../utils/localStorage";

class Login extends PureComponent {
  static contextType = AuthContext;

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
            setLSItem("auth", {
              token: response.data.token,
              expiryTime: response.data.expiryTime
            });
            closeModal();
            toggleLoginState();
          }
        })
        .catch(err => console.log("err :", err));
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      closeModal
    } = this.props;

    return (
      <Fragment>
        <Modal
          title="Login"
          visible={true}
          closable
          onCancel={closeModal}
          footer={null}
        >
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
          </Form>
        </Modal>
      </Fragment>
    );
  }
}
export default Form.create({ name: "login" })(Login);
