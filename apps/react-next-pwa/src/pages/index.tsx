import React, { PureComponent } from 'react'
import { Card, Row, Col, Typography } from 'antd';
import io from 'socket.io-client';
import Router from 'next/router';
import MessageInput from '~/components/MessageInput';
import MessageList from '~/components/MessageList';
import ContactsList from '~/components/ContactsList';
import { IMessageFormValues, IMessage } from '~/interfaces/props';
import { getCurrentUser } from '~/services/apiMethods';

import '~/styles/index.less';

const { Title, Text } = Typography;

interface IMessageType {
  body: string;
  senderId: string;
}

interface IState {
  messages: IMessage[];
  currentUser: any;
}

export default class index extends PureComponent<{}, IState> {
  state = {
    messages: [],
    currentUser: {
      username: ''
    }
  }

  socket: any = React.createRef();

  async componentDidMount() {
    const userResponse = await getCurrentUser();
    if (userResponse && userResponse.status === 'ok') {
      this.setState({
        currentUser: {
          ...userResponse.data
        }
      });

      console.log('userResponse :>> ', userResponse);

      this.socket = io(process.env.NEXT_PUBLIC_CHAT_SERVER_API || '');

      if (this.socket !== null) {
        this.socket.on('connect', () => {
          console.log('connected to chat server');
        });

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
    } else {
      Router.replace('/auth/login');
    }
  }

  scrollToLatestMsg = () => {
    const msgListDiv = document.getElementById("MSGSLIST");
    if (msgListDiv) msgListDiv.scrollTop = msgListDiv.scrollHeight;
  }

  handleSendMessage = (values: IMessageFormValues, formRef: any) => {
    if (this.socket !== null) {
      this.socket.emit('chat-message', {
        body: values.message,
        senderId: this.socket.id,
      });
      formRef.resetFields();
    }
  }

  render() {
    const { messages, currentUser } = this.state;
    const loggedInUser: any = `${currentUser.username}`;

    return (
      <div className="pageContainer">
        <Card>
          <Row className="chatContainer">
            <Col xs={12} sm={12} md={10} lg={8} xl={8}>
              <Row>
                <Title>React Chat App</Title>
              </Row>
              <Row><Title level={3}>{loggedInUser}</Title></Row>
              <ContactsList />
            </Col>
            <Col xs={12} sm={12} md={14} lg={16} xl={16} className="chatBox">
              <Row className="contactInfo">
                <Col>
                  <Text>Contact Name</Text>
                </Col>
              </Row>
              <MessageList messages={messages} socketId={this.socket.id} />
              <MessageInput handleSendMessage={this.handleSendMessage} />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

