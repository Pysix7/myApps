import React, { PureComponent } from 'react'
import { Card, Row, Col, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Router from 'next/router';
import ChatBox from '~/components/ChatBox';
import ContactsList from '~/components/ContactsList';
import { IMessage } from '~/interfaces/props';
import { getCurrentUser, logout } from '~/services/apiMethods';
import { IUser } from '~/interfaces/props';

import '~/styles/index.less';

const { Title } = Typography;

interface IState {
  messages: IMessage[];
  currentUser: IUser;
  chatUser: string | null;
  isLoggedIn: boolean;
}

export default class index extends PureComponent<{}, IState> {
  state = {
    messages: [],
    currentUser: {
      username: '',
      email: '',
      id: ''
    },
    chatUser: null,
    isLoggedIn: false
  }

  socket: any = React.createRef();

  async componentDidMount() {
    const userResponse = await getCurrentUser();
    if (userResponse && userResponse.status === 'ok') {
      this.setState({
        currentUser: {
          ...userResponse.data
        },
        isLoggedIn: true
      });
    } else {
      Router.replace('/auth/login');
    }
  }

  onListUserClickHandler = (userId: string) => {
    this.setState({
      chatUser: userId
    });
  }

  render() {
    const { chatUser, currentUser, isLoggedIn } = this.state;
    const loggedInUser: any = `${currentUser.username}`;

    return (
      <div className="pageContainer">
        <Card>
          <Row className="chatContainer">
            <Col xs={12} sm={12} md={10} lg={8} xl={8}>
              <Row className="appName">
                <Title>React Chat App</Title>
              </Row>
              <Row className="loggedInUser">
                <Col span={24} >
                  <Title level={2}>Logged in User:
                    <span className="lnUsername">{loggedInUser}</span>
                    <LogoutOutlined
                      onClick={() => logout()}
                      className="logoutIcon"
                      title="logout"
                    />
                  </Title>
                </Col>
              </Row>
              <ContactsList
                onListUserClickHandler={this.onListUserClickHandler}
                currentUser={currentUser}
              />
            </Col>
            <ChatBox chatUser={chatUser} currentUser={currentUser} isLoggedIn={isLoggedIn} />
          </Row>
        </Card>
      </div>
    )
  }
}

