import React from 'react'
import { Button, Row, Col, Form, Input } from 'antd';

export default function messageInput(props) {
    const { handleSendMessage } = props;
    const [formRef] = Form.useForm();

    return (
        <Row className="messageInput">
            <Form onFinish={(values) => handleSendMessage(values, formRef)} form={formRef}>
                <Row>
                    <Col span={21}>
                        <Form.Item name="message">
                            <Input placeholder="type here..." />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Send</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Row>
    )
}