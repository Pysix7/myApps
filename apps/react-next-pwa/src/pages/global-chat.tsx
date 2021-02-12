import React, { Fragment, PureComponent } from 'react'
import { Card, Row, Col, Typography, Button, Form, Input, Drawer } from 'antd';
import Router from 'next/router';
import io from 'socket.io-client';
import Media from 'react-media';
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
    formRef: any = React.createRef();

    componentDidUpdate(_: {}, prevState: IState) {
        const { username } = this.state;
        if (username !== '' && prevState.username !== username) {
            this.socket = io(process.env.NEXT_PUBLIC_CHAT_SERVER_API || '', {
                query: {
                    username
                }
            });

            if (this.socket !== null) {
                this.scrollToLatestMsg();

                this.socket.on('global-chat-message', (message: IMessageType) => {
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
            this.socket.emit('global-chat-message', {
                body: values.message,
                senderId: username,
            });
            formRef.resetFields();
        }
    }

    setChatUser = (name: string) => {
        this.setState({ username: name });
    };

    handleUsernameSubmit = (values: any) => {
        this.setChatUser(values.username);
        this.formRef.current.resetFields();
    };

    onDrawerClose = () => {
        this.socket = null;
        this.setState({
            messages: [],
            username: ''
        });
        window.location.href = '/global-chat';
    };

    getUserNameInput = () => (
        <Row className="messageInput">
            <Form ref={this.formRef} onFinish={this.handleUsernameSubmit}>
                <Row>
                    <Col xs={18} sm={18} md={21} lg={21} xl={21}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'username is required to continue chat' }]}
                        >
                            <Input placeholder="enter username to start chat" />
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={3} lg={3} xl={3}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Chat</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Row>
    );

    getChatBoxContent = (isMobile: boolean) => {
        const { messages, username } = this.state;
        return (
            <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                <div className="chatBoxContainer">
                    <div className="chatBox">
                        <Fragment>
                            {username === '' && !isMobile ? this.getUserNameInput() : (
                                <Fragment>
                                    <Row className="contactInfo">
                                        <Col>
                                            <Text>{username}</Text>
                                        </Col>
                                    </Row>
                                    <MessageList messages={messages} socketId={username} chatType="global" />
                                    <MessageInput handleSendMessage={this.handleSendMessage} />
                                </Fragment>
                            )}
                        </Fragment>
                    </div>
                </div>
            </Col>
        )
    }

    render() {
        const { username } = this.state;

        return (
            <Media query="(max-width: 599px)">
                {(isMobile: boolean) => (
                    <div className="pageContainer">
                        <Card>
                            <Row gutter={40} className="chatContainer">
                                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="headings">
                                    <Row
                                        onClick={() => Router.push('/')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Title>Chat</Title>
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
                                    {isMobile && (
                                        <div className="chatBoxContainer">
                                            <div className="chatBox">
                                                {this.getUserNameInput()}
                                            </div>
                                        </div>
                                    )}
                                </Col>
                                {isMobile ? (
                                    <Drawer
                                        placement="bottom"
                                        maskClosable
                                        className="mobileChatDrawer"
                                        visible={username !== ''}
                                        onClose={this.onDrawerClose}
                                    >
                                        {this.getChatBoxContent(isMobile)}
                                    </Drawer>
                                ) : (
                                        <Fragment>
                                            {this.getChatBoxContent(isMobile)}
                                        </Fragment>
                                    )}
                            </Row>
                        </Card>
                    </div>
                )
                }
            </Media>
        );
    }
}