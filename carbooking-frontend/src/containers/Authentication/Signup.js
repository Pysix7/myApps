import React, { PureComponent, Fragment } from "react";
import { Form, Input, Modal, Card, Button, message } from "antd";
import axios from "axios";
import * as CONFIGS from "../../configs";

class Signup extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, closeModal } = this.props;
    form.validateFields((err, values) => {
      if (err) throw err;
      axios
        .post(CONFIGS.SRVR_URI + "/auth/signup", {
          ...values
        })
        .then(response => {
          if (
            response &&
            response.data &&
            response.data.message === "success"
          ) {
            message.success("SignUp Successful");
            closeModal();
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
        {/* <Modal
          title="Sign Up"
          visible={true}
          closable
          onCancel={closeModal}
          footer={null}
        > */}
        <Card bordered={false} bodyStyle={{ padding: "5% 30%" }}>
          <Form>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Name"
                  }
                ]
              })(<Input />)}
            </Form.Item>
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
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          {/* </Modal> */}
        </Card>
      </Fragment>
    );
  }
}
export default Form.create({ name: "signup" })(Signup);
