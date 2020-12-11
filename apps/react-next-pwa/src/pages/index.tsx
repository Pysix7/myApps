import React, { PureComponent } from 'react'
import { Card, Row, Col, Typography } from 'antd';
import io from 'socket.io-client';
import MessageInput from '~/components/MessageInput';
import MessageList from '~/components/MessageList';
import ContactsList from '~/components/ContactsList';
import { IMessageFormValues, IMessage } from '~/interfaces/props';

import '~/styles/index.less';

const { Title, Text } = Typography;

interface IMessageType {
  body: string;
  senderId: string;
}

interface IState {
  messages: IMessage[]
}

export default class index extends PureComponent<{}, IState> {
  state = {
    messages: []
  }

  socket: any = React.createRef();

  componentDidMount() {
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
    const { messages } = this.state;
    return (
      <div className="pageContainer">
        <Card>
          <Row className="chatContainer">
            <Col xs={12} sm={12} md={10} lg={8} xl={8}>
              <Row>
                <Title>React Chat App</Title>
              </Row>
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

