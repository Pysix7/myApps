import React from 'react';
import { Button, Row, Form, Input, notification } from 'antd';
import AuthLayout from '~/layouts/AuthLayout';
import Link from 'next/link';
import Router from 'next/router';
import { ILoginFormValues } from '~/interfaces/props';
import { loginMethod } from '~/services/apiMethods';

const login = () => {
    const [formRef] = Form.useForm();
    const handleLogin = async (values: ILoginFormValues) => {
        const resp = await loginMethod(values);
        if (resp && resp.status === 'ok') {
            notification.success({
                message: `User Logged in`,
                onClose: () => Router.push('/'),
                duration: 2,
            });
        } else {
            notification.error({ message: resp.message });
        }
    }

    return (
        <AuthLayout title="Login">
            <Row className="loginForm">
                <Form onFinish={handleLogin} form={formRef}>
                    <Form.Item name="username" rules={[
                        {
                            required: true,
                            message: 'Please provide Username'
                        }
                    ]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[
                        {
                            required: true,
                            message: 'Please provide Password'
                        }
                    ]}>
                        <Input.Password placeholder="Password" type="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Login</Button>
                    </Form.Item>
                </Form>
            </Row>
            <Row>Don't have an account?&nbsp;<Link href="/auth/signup"><a>Signup</a></Link></Row>
        </AuthLayout>
    )
}

export default login;