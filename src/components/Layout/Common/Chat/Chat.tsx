import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.scss";

interface ChatProps {
    socket: any;
    usernameProp?: string;
    roomProp?: string;
    visible: (variable: any) => void | any;
};

const Chat: React.FC<ChatProps> = ({
// const Chat = ({
    socket,
    usernameProp,
    roomProp,
    visible,
}) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
  
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState<any>([]);

    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room)
      }
    };

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: 
                    new Date(Date.now()).getHours() + 
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list: any) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data])
        });
    }, [socket])

    return (
        <div>
            {!visible ? <>
            <h3>Join a Chat</h3>
            <input type="text" placeholder="User..." onChange={(event) => setUsername(event.target.value)}/>
            <input type="text" placeholder="Room..." onChange={(event) => setRoom(event.target.value)}/>
            <button onClick={joinRoom}>Join</button>

            </> : 
            
            <div className="chat">
                <div className="chat__header">
                    <p>Live Chat</p>
                </div>
                <div className="chat__body">
                    <ScrollToBottom className="message-container">
                    {messageList.map((messageContent: any) => {
                        return (
                        <div
                            className="message"
                            id={username === messageContent.author ? "you" : "other"}
                        >
                            <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                    </ScrollToBottom>
                </div>
                <div className="chat__footer">
                    <input type="text" placeholder="Hey..." onChange={(event) => setCurrentMessage(event.target.value)}/>
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
            }
        </div>
    )
}

export default Chat;