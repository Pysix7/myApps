import React from 'react'
import { Row, Col, Typography, Card } from 'antd';

const { Title } = Typography;

const AuthLayout = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <Card bodyStyle={{ padding: '50px 24px 24px 24px' }}>
            <Row>
                <Col span={6}>
                    <Row><Title>React Chat App</Title></Row>
                    <Row><Title level={3}>{title}</Title></Row>
                </Col>
                <Col span={18}>{children}</Col>
            </Row>
        </Card>
    )
}
export default AuthLayout;