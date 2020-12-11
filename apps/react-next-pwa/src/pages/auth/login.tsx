import React from 'react';
import { Button, Row, Form, Input } from 'antd';
import AuthLayout from '~/layouts/AuthLayout';

const login = () => {
    const [formRef] = Form.useForm();

    return (
        <AuthLayout title="Login">
            <Row className="loginForm">
                <Form onFinish={(values) => { }} form={formRef}>
                    <Form.Item name="userName">
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Login</Button>
                    </Form.Item>
                </Form>
            </Row>
        </AuthLayout>
    )
}

export default login;