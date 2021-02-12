import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { IMessageFormValues } from '~/interfaces/props';

interface IProps {
    handleSendMessage: (values: IMessageFormValues, formRef: any) => void;
}

export default function messageInput(props: IProps) {
    const { handleSendMessage } = props;
    const [formRef] = Form.useForm();

    return (
        <Row className="messageInput">
            <Form onFinish={(values) => handleSendMessage(values, formRef)} form={formRef}>
                <Row>
                    <Col xs={18} sm={18} md={21} lg={21} xl={21}>
                        <Form.Item name="message">
                            <Input placeholder="type here..." />
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Send</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Row>
    )
}
