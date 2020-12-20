import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { IUser } from '~/interfaces/props';
import { getAllUsers } from '~/services/apiMethods';

import './index.less';

const { Title } = Typography;

interface IProps {
    onListUserClickHandler: (id: string) => void;
    currentUser: IUser
}

export default function contactsList({ onListUserClickHandler, currentUser }: IProps) {
    const [users, setUsers]: any = useState([]);
    useEffect(() => {
        (async () => {
            const userRecords = await getAllUsers();
            if (userRecords && userRecords.status === 'ok' && userRecords.data.length > 0) {
                setUsers(userRecords.data)
            }
        })()
    }, [])

    return (
        <Row className="contactList">
            {users && users.length > 0 && users.map((user: IUser) => {
                if (currentUser.id && currentUser.id !== user.id) {
                    return (
                        <Col
                            className="contact"
                            key={user.id}
                            span={24}
                            onClick={() => onListUserClickHandler(user.id)}
                        >
                            <Row gutter={8}>
                                <Col>
                                    <Title level={2}>{user.username}</Title>
                                    <span>{`(${user.email})`}</span>
                                </Col>
                            </Row>
                        </Col>
                    )
                }
                return null;
            })}
        </Row>
    )
}
