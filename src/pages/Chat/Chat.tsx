import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchConversation, fetchMessages, sendMessage } from "../../api/chat";
import ChatOnline from "../../components/ChatComponent/ChatOnline/ChatOnline";
import Conversations from "../../components/ChatComponent/Conversations/Conversations";
import Message from "../../components/ChatComponent/Message/Message";
import Page from "../../components/Layout/Common/Page/Page";
import { ApplicationState } from "../../store";
import "./Chat.scss";
import { io, Socket } from "socket.io-client";
import { ArrivalMessage, ConversationsType, MessagesType, OnlineUsers } from "../../types/chatType";

interface ChatProps {

};

const Chat: React.FC<ChatProps> =({

}) => {

    const SOCKET = process.env.REACT_APP_SOCKET_API;
    // const socketURL = io("http//localhost:3001");
    const socket = useRef<Socket>()

    const userId = useSelector(
        (state: ApplicationState) => state.auth?.id
    );
    const username = useSelector(
        (state: ApplicationState) => state.user?.userName
    )
    const [conversations, setConversations] = useState<ConversationsType[]>([])
    const [currentChat, setCurrentChat] = useState<ConversationsType>({
        id: 0,
        receiverId: 0,
        receiverUsername: "",
        senderId: 0,
        senderUsername: "",
        createdAt: "",
        updatedAt: "",
    });
    const [messages, setMessages] = useState<MessagesType[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [arrivalMessage, setArrivalMessage] = useState<MessagesType>();
    const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null)

    /**
     * Fetches message send from other user
     */
    useEffect(() => {
        socket.current = io(`${SOCKET}`);
        socket.current.on("getMessage", (data: ArrivalMessage) => {
            setArrivalMessage({
                sender: data.senderId,
                senderUsername: data.senderUsername,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, []);

    /**
     * Sets the fetched message from other user
     */
    useEffect(() => {
        if (arrivalMessage && (currentChat?.receiverId === userId || currentChat?.senderId === userId)) {
            setMessages((previous: MessagesType[]) => [...previous, arrivalMessage])
        }
    }, [arrivalMessage, currentChat]);
        
    /**
     * Connects current user to chat socket
     */
    useEffect(() => {
        socket.current?.emit("addUser", userId, username);
        socket.current?.on("getUsers", (users: OnlineUsers[]) => {
            setOnlineUsers(users);
        })
    }, [userId])

    /**
     * Fetches conversations of current user
     */
    useEffect(() => {
        const getConversations = async () => {
            try {
                if (userId) {
                const res = await fetchConversation(userId)
                setConversations(res.data);
                }
            } catch(err) {
                console.log(err);
            }
        }
        getConversations();
    }, [userId])

    /**
     * Fetches messages from current chat
     */
    useEffect(() => {
        const getMessages = async () => {
            if (currentChat) {
                const res = await fetchMessages(currentChat?.id)
                setMessages(res.data);
            }
        };
        getMessages();
    }, [currentChat])

    /**
     * 
     */
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const message = {
            sender: userId,
            senderUsername: username,
            text: newMessage,
            ConversationId: currentChat?.id
        };

        const receiverId = currentChat?.receiverId !== userId ? currentChat?.receiverId : currentChat?.senderId;
        if (receiverId) {
            socket.current?.emit("sendMessage", {
                senderId: userId,
                receiverId: receiverId,
                text: newMessage,
            });
        }

        try {
            const res = await sendMessage(message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch(err) {
            toast.error("There was an error sending that message");
            console.log(err)
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    return (
        <Page>
            <div className="chat">
                <div className="chat-menu">
                    <div className="chat-menu__wrapper">
                        <input placeholder="Search for Friends" className="chat-menu__input" />
                        {conversations?.map((convo: ConversationsType) => (
                            userId && 
                            <div onClick={() => setCurrentChat(convo)}>
                                <Conversations 
                                    conversation={convo}
                                    currentUser={userId}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-box">
                    <div className="chat-box__wrapper">
                        {currentChat ? 
                            <>
                            <div className="chat-box__top" ref={scrollRef}>
                                {messages?.map((message: MessagesType, key) => (
                                    userId &&
                                    <div key={key}>
                                        <Message 
                                            own={message.sender === userId}
                                            message={message}
                                        />
                                    </div>
                                ))}
                                
                                
                            </div>
                            <div className="chat-box__bottom">
                                <textarea
                                    className="chat-message__input"
                                    placeholder="Write Something..."
                                    onChange={(event) => setNewMessage(event.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chat-submit__button" onClick={handleSubmit}>Send</button>
                            </div>
                            </>
                            : <span className="no-conversation">Open a conversation to start a chat</span>
                        }
                    </div>
                </div>
                <div className="chat-online">
                    <div className="chat-online__wrapper">
                        {userId && 
                            <ChatOnline 
                                onlineUsers={onlineUsers}
                                currentId={userId}
                                currentUsername={username!}
                                setCurrentChat={setCurrentChat}
                            />
                        }
                    </div>
                </div>
            </div>
        </Page>
    )
};

export default Chat;