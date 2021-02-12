import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, List } from 'antd';
import { IUser } from '~/interfaces/props';
import { getAllUsers } from '~/services/apiMethods';

import './index.less';

const { Text } = Typography;

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

    const renderListItem = (user: IUser) => {
        if (currentUser?.id !== user.id) {
            return (
                <List.Item
                    className="contact"
                    key={user.id}
                    onClick={() => onListUserClickHandler(user.id)}
                >
                    <Row>
                        <Col span={24}>
                            <Text strong className="userNameText">{user.username}</Text>
                            <Text>{`(${user.email})`}</Text>
                        </Col>
                    </Row>
                </List.Item>
            )
        } else {
            return null;
        }
    };

    return (
        <Row className="contactListContainer">
            {users?.length > 0 && (
                <List
                    className="contactList"
                    size="small"
                    bordered
                    dataSource={users}
                    renderItem={renderListItem}
                />
            )}
        </Row>
    )
}
