import React, { Fragment, PureComponent } from 'react'
import { Card, Row, Col, Typography, Drawer } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Router from 'next/router';
import Media from 'react-media';
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

  onListUserClickHandler = (userId: string | null) => {
    this.setState({
      chatUser: userId
    });
  }

  render() {
    const { chatUser, currentUser, isLoggedIn } = this.state;
    const loggedInUser: any = `${currentUser.username}`;

    return (
      <Media query="(max-width: 599px)">
        {(isMobile: boolean) => (
          <div className="pageContainer">
            <Card>
              <Row gutter={40} className="chatContainer">
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Row className="appName">
                    <Title>Anony Chat</Title>
                  </Row>
                  <Row className="loggedInUser">
                    <Col span={24} >
                      <Title level={3}>Logged in User:
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
                {isMobile ? (
                  <Drawer
                    placement="bottom"
                    maskClosable
                    className="mobileChatDrawer"
                    visible={chatUser !== null}
                    onClose={() => this.onListUserClickHandler(null)}
                  >
                    <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                      <div className="chatBoxContainer">
                        <ChatBox chatUser={chatUser} currentUser={currentUser} isLoggedIn={isLoggedIn} />
                      </div>
                    </Col>
                  </Drawer>
                ) : (
                    <Fragment>
                      <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                        <div className="chatBoxContainer">
                          <ChatBox chatUser={chatUser} currentUser={currentUser} isLoggedIn={isLoggedIn} />
                        </div>
                      </Col>
                    </Fragment>
                  )}
              </Row>
            </Card>
          </div>
        )
        }
      </Media>
    )
  }
}

