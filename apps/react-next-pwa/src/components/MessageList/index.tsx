import React from 'react';
import { Row, Col, Typography } from 'antd';
import { IMessage } from '~/interfaces/props';

const { Text } = Typography;

interface IProps {
    messages: IMessage[];
    socketId: string;
}

export default function messagesList(props: IProps) {
    const { messages, socketId } = props;
    return (
        <Row className="messagesList" id="MSGSLIST">
            <Col span={24}>
                {messages && messages.length > 0 && messages.map((item: IMessage, index: number) => {
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
