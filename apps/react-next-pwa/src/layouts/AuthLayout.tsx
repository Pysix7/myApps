import React, { Fragment } from 'react'
import { Row, Col, Typography, Card } from 'antd';
import Router from 'next/router';
import Link from 'next/link';

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
                        <Title>Chat</Title>
                    </Row>
                    <Row><Title level={3}>{title}</Title></Row>
                </Col>
                <Col xs={24} sm={24} md={12} lg={18} xl={18}>
                    <Fragment>
                        {children}
                    </Fragment>
                    <Link href="/global-chat">Global Chat</Link>
                </Col>
            </Row>
        </Card>
    )
}
export default AuthLayout;