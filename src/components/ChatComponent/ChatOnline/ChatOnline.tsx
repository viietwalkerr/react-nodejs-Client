import React, { Dispatch, SetStateAction, useState } from "react";
import { createConversation, fetchIndividualConversation } from "../../../api/chat";
// import { fetchFriends } from "../../../api/users";
import { ConversationsType, OnlineUsers } from "../../../types/chatType";
import "./ChatOnline.scss";

interface ChatOnlineProps {
    onlineUsers?: OnlineUsers[];
    currentId: number;
    currentUsername: string;
    setCurrentChat: Dispatch<SetStateAction<ConversationsType>>;
};

const ChatOnline: React.FC<ChatOnlineProps> = ({
    onlineUsers,
    currentId,
    currentUsername,
    setCurrentChat,
}) => {

    // const [friends, setFriends] = useState([]);
    // const [onlineFriends, setOnlineFriends] = useState([]);

    const handleClick = async (friend: OnlineUsers) => {
        try {
            const res = await fetchIndividualConversation(currentId, friend.userId)
            console.log("me", res)
            if (!res) {
                const res2 = await createConversation(
                    currentId,
                    currentUsername,
                    friend.userId,
                    friend.username,
                );
                console.log("new convo" ,res2.data);
                setCurrentChat(res2.data);
            } else {
                setCurrentChat(res.data);
            }

        } catch(err) {
            console.log(err);
        }
    }
    // useEffect(() => {
    //     const getFriends = async () => {
    //         // const res = await fetchFriends(currentId);
    //         // console.log("someres" ,res);
    //         // setFriends(res.data);
    //     }
    //     getFriends();

    // }, []);

    return (
        <div className="chat-online">
            {onlineUsers?.map((online: OnlineUsers) => (
                online.userId !== currentId &&

                <div className="chat-online__friend" onClick={() => handleClick(online)}>
                    <div className="chat-online__image-container">
                        <img 
                            className="chat-online__img"
                            src="https://ih1.redbubble.net/image.1085773187.4781/st,small,507x507-pad,600x600,f8f8f8.jpg"
                            alt=""
                        />
                        <div className="chat-online__badge">

                        </div>

                    </div>
                    <span className="chat-online__name">{online.username}</span>
                </div>
            ))}
        </div>
    )
};

export default ChatOnline;