import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Row, Col, Typography } from 'antd';
import io from 'socket.io-client';
import MessageInput from '~/components/MessageInput';
import MessageList from '~/components/MessageList';
import { IMessageFormValues, IMessage, IUser } from '~/interfaces/props';
import { getUser } from '~/services/apiMethods';

// the styles from this file are moved to global.less 
// import './index.less';

const { Text } = Typography;

interface IMessageType {
    body: string;
    senderId: string;
}

interface IProps {
    chatUser: string | null;
    currentUser: IUser;
    isLoggedIn: boolean;
}

const scrollToLatestMsg = () => {
    const msgListDiv = document.getElementById("MSGSLIST");
    if (msgListDiv) msgListDiv.scrollTop = msgListDiv.scrollHeight;
};

export default function chatBox(props: IProps) {
    const { chatUser, isLoggedIn, currentUser } = props;
    let socket: any = useRef(null);
    let allMessages: any = useRef([]); // for persisting the messages inside useEffect
    const [chatMessages, setMessages]: any = useState([]);
    const [chatUserData, setUserData]: any = useState(null);
    allMessages.current = chatMessages;

    // connect logged in user to chat server
    useEffect(() => {
        if (isLoggedIn && chatUser) {
            // clear messages in messages list when different user is selected
            setMessages([]);

            (async () => {
                // fetcth the reciver (chat user) details
                const userRecord = await getUser({ userId: chatUser });
                if (userRecord?.status === 'ok') {
                    setUserData(userRecord.data)

                    // connect to chat
                    if (userRecord.data?.username && currentUser?.username) {
                        const participants = [currentUser.username, userRecord.data.username];

                        // connect to a chat room with these users ( participants )
                        socket.current = io(process.env.NEXT_PUBLIC_CHAT_SERVER_API || '', {
                            query: {
                                participants: JSON.stringify(participants)
                            }
                        });
                        if (socket.current !== null) {
                            socket.current.on('connect', () => {
                                console.log('connected to chat server');
                            });

                            scrollToLatestMsg();

                            socket.current.on('chat-message', (message: IMessageType) => {
                                const { body, senderId } = message;
                                const msgs: IMessage[] = [
                                    ...allMessages.current,
                                    {
                                        key: `${senderId}`,
                                        msg: body,
                                        user: senderId
                                    }
                                ];
                                setMessages(msgs);
                                scrollToLatestMsg()
                            });
                        }
                    }
                }

            })()
        }
        return function cleanup() {
            socket.current = null;
            allMessages.current = [];
            setMessages([]);
            setUserData(null);
        }
    }, [isLoggedIn, chatUser]);

    const handleSendMessage = (values: IMessageFormValues, formRef: any) => {
        if (socket.current !== null) {
            socket.current.emit('chat-message', {
                body: values.message,
                senderId: socket.current.id,
            });
            formRef.resetFields();
        }
    }

    const socketId = socket.current?.id || '';
    return (
        <div className="chatBox">
            {chatUser !== null ? (
                <Fragment>
                    <Row className="contactInfo">
                        <Col>
                            <Text>{chatUserData?.username}</Text>
                        </Col>
                    </Row>
                    <MessageList messages={chatMessages} socketId={socketId} chatType="user" />
                    <MessageInput handleSendMessage={handleSendMessage} />
                </Fragment>
            ) : null}
        </div>
    )
}
