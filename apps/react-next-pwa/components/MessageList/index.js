import React from 'react';
import { Row, Col, Typography } from 'antd';
const { Text } = Typography;

export default function messagesList(props) {
    const { messages, socketId } = props;
    return (
        <Row className="messagesList" id="MSGSLIST">
            <Col span={24}>
                {messages && messages.length > 0 && messages.map((item, index) => {
                    const msgDivClassName = item.user === socketId ? 'myMsg' : 'recievedMsg';
                    return (
                        <Row className="messageContainer" key={`${item.key}-${index}`}>
                            <div>
                                <div className={`msgDiv ${msgDivClassName}`}>
                                    <Text>{item.msg}</Text>
                                </div>
                            </div>
                        </Row>
                    )
                })}
            </Col>
        </Row>
    )
};
