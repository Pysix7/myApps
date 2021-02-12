import React from 'react';
import { Button, Row, Form, Input, notification } from 'antd';
import AuthLayout from '~/layouts/AuthLayout';
import Link from 'next/link';
import Router from 'next/router';
import { ISignupFormValues } from '~/interfaces/props';
import { signupMethod } from '~/services/apiMethods';

const EMAIL: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;

const signup = () => {
    const [formRef] = Form.useForm();

    const handleSignup = async (values: ISignupFormValues) => {
        const resp = await signupMethod(values);
        if (resp && resp.status === 'ok') {
            notification.success({ message: `Signup Success` });
            Router.push('/auth/login');
        } else {
            notification.error({ message: resp.message });
        }
    }
    return (
        <AuthLayout title="Sign up">
            <Row className="signupForm">
                <Form onFinish={handleSignup} form={formRef}>
                    <Form.Item name="username" rules={[
                        {
                            required: true,
                            message: 'Please provide Username'
                        }
                    ]}>
                        <Input placeholder="Your username" />
                    </Form.Item>
                    <Form.Item name="email" rules={[
                        {
                            pattern: EMAIL,
                            message: 'Please provide valid Email'
                        }
                    ]}>
                        <Input placeholder="Your email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[
                        {
                            required: true,
                            message: 'Please provide Password',
                        }
                    ]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Signup</Button>
                    </Form.Item>
                </Form>
            </Row>
            <Row>Already have an account?&nbsp;<Link href="/auth/login"><a>Login</a></Link></Row>
        </AuthLayout>
    )
}

export default signup;