import React, { PureComponent, Fragment } from "react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";
import * as CONFIGS from "../../configs";

class Signup extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values :", values);
      axios.post(CONFIGS.SRVR_URI + "/auth/signup", {
        ...values
      });
      if (!err) {
      }
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
          title="Sign Up"
          visible={true}
          closable
          onCancel={closeModal}
          footer={null}
        >
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
              <Button onClick={this.handleSubmit}>Sign Up</Button>
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}
export default Form.create({ name: "signup" })(Signup);
