import React from 'react';
import { Button, Row, Form, Input } from 'antd';
import AuthLayout from '~/layouts/AuthLayout';

const signup = () => {
    const [formRef] = Form.useForm();

    return (
        <AuthLayout title="Sign up">
            <Row className="signupForm">
                <Form onFinish={(values) => { }} form={formRef}>
                    <Form.Item name="userName">
                        <Input placeholder="Your username" />
                    </Form.Item>
                    <Form.Item name="email">
                        <Input placeholder="Your email" />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Signup</Button>
                    </Form.Item>
                </Form>
            </Row>
        </AuthLayout>
    )
}

export default signup;