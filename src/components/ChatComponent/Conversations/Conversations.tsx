import React, { useEffect, useState } from "react";
import { fetchUser } from "../../../api/users";
import { ConversationsType } from "../../../types/chatType";
import "./Conversations.scss";

interface ConversationsProps {
    conversation: ConversationsType;
    currentUser: number;
};

const Conversations: React.FC<ConversationsProps> = ({
    conversation,
    currentUser,
}) => {

    const [user, setUser] = useState<any>({});

    useEffect(() => {
        const friendId = conversation.senderId !== currentUser ? conversation.senderId : conversation.receiverId;

        const getUser = async () => {
            try {
                const res = await fetchUser(friendId);
                setUser(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img 
                className="conversation__img"
                src="https://ih1.redbubble.net/image.1085773187.4781/st,small,507x507-pad,600x600,f8f8f8.jpg"
                alt=""
            />
            <span className="conversation__name">{user && user.username}</span>
        </div>
    )
};

export default Conversations;