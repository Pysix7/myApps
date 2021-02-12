import React, { Fragment, PureComponent } from 'react'
import { Card, Row, Col, Typography, Button, Form, Input } from 'antd';
import Router from 'next/router';
import io from 'socket.io-client';
import MessageInput from '~/components/MessageInput';
import MessageList from '~/components/MessageList';
import { IMessageFormValues, IMessage } from '~/interfaces/props';

import '~/styles/index.less';

const { Title, Text } = Typography;

interface IMessageType {
    body: string;
    senderId: string;
}

interface IState {
    messages: IMessage[];
    username: string;
}

export default class index extends PureComponent<{}, IState> {
    state = {
        messages: [],
        username: ''
    }

    socket: any = React.createRef();

    componentDidUpdate(_: {}, prevState: IState) {
        const { username } = this.state;
        if (prevState.username !== username) {
            this.socket = io(process.env.NEXT_PUBLIC_CHAT_SERVER_API || '', {
                query: {
                    username
                }
            });

            if (this.socket !== null) {
                this.scrollToLatestMsg();

                this.socket.on('chat-message', (message: IMessageType) => {
                    const { body, senderId } = message;
                    this.setState((prevState) => {
                        const msgs = [
                            ...prevState.messages,
                            {
                                key: `${senderId}-${body}`,
                                msg: body,
                                user: senderId
                            }
                        ]
                        return {
                            messages: msgs
                        };
                    }, () => this.scrollToLatestMsg());
                });
            }
        }
    }

    scrollToLatestMsg = () => {
        const msgListDiv = document.getElementById("MSGSLIST");
        if (msgListDiv) msgListDiv.scrollTop = msgListDiv.scrollHeight;
    }

    handleSendMessage = (values: IMessageFormValues, formRef: any) => {
        const { username } = this.state;

        if (this.socket !== null) {
            this.socket.emit('chat-message', {
                body: values.message,
                senderId: username,
            });
            formRef.resetFields();
        }
    }

    render() {
        const { messages, username } = this.state;
        return (
            <div className="pageContainer">
                <Card>
                    <Row className="chatContainer">
                        <Col xs={12} sm={12} md={10} lg={8} xl={8} className="headings">
                            <Row
                                onClick={() => Router.push('/')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Title>Anony Chat</Title>
                            </Row>
                            <Row
                                onClick={() => Router.push('/auth/login')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Title level={3}>Login</Title>
                            </Row>
                            <Row
                                onClick={() => Router.push('/auth/signup')}
                                style={{ cursor: 'pointer' }}
                            >
                                <Title level={3}>Sign Up</Title>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={14} lg={16} xl={16} className="chatBox">
                            {username && username !== '' ? (
                                <Fragment>
                                    <Row className="contactInfo">
                                        <Col>
                                            <Text>{username}</Text>
                                        </Col>
                                    </Row>
                                    <MessageList messages={messages} socketId={username} chatType="global" />
                                    <MessageInput handleSendMessage={this.handleSendMessage} />
                                </Fragment>
                            ) : (
                                    <Row className="messageInput">
                                        <Form onFinish={(values) => {
                                            this.setState({
                                                username: values.username
                                            })
                                        }}>
                                            <Row>
                                                <Col span={21}>
                                                    <Form.Item
                                                        name="username"
                                                        rules={[{ required: true, message: 'username is required to continue chat' }]}
                                                    >
                                                        <Input placeholder="enter username to start chat" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={3}>
                                                    <Form.Item>
                                                        <Button type="primary" htmlType="submit">Chat</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Row>
                                )}
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}