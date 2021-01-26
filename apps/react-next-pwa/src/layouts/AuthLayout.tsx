import React from 'react'
import { Row, Col, Typography, Card } from 'antd';
import Router from 'next/router';
import { GlobalOutlined } from '@ant-design/icons';

import './AuthLayout.less';

const { Title } = Typography;

const AuthLayout = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <Card className="layout" >
            <Row>
                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <Row
                        onClick={() => Router.push('/')}
                        style={{ cursor: 'pointer' }}
                    >
                        <Title>React Chat App</Title>
                    </Row>
                    <Row><Title level={3}>{title}</Title></Row>
                    <Row
                        onClick={() => Router.push('/global-chat')}
                        style={{ cursor: 'pointer' }}
                    >
                        <GlobalOutlined className="globalChatIcon" />
                        <Title level={3} className="globalChatTxt"> Global Chat</Title>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={12} lg={18} xl={18}>{children}</Col>
            </Row>
        </Card>
    )
}
export default AuthLayout;