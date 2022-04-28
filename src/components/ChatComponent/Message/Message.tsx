import React from "react";
import { BooleanSchema } from "yup";
import "./Message.scss";
import { format } from "timeago.js";
import { MessagesType } from "../../../types/chatType";

interface MessageProps {
    own: boolean;
    message: MessagesType;
};

const Message: React.FC<MessageProps> = ({
    own,
    message
}) => {

    const renderMessage = (own: boolean, message: MessagesType) => {
        return (
            <>  
                {!own && 
                    <img 
                        className="message-image"
                        src="https://ih1.redbubble.net/image.1085773187.4781/st,small,507x507-pad,600x600,f8f8f8.jpg"
                        alt=""
                    />
                }
                <p className="message-text">
                    {message.text}
                    
                </p>
                {own && 
                    <img 
                        className="message-image"
                        src="https://image.shutterstock.com/shutterstock/photos/1824382343/display_1500/stock-vector-smoking-panda-illustration-canabis-logo-weed-vector-for-shirt-design-eps-1824382343.jpg"
                        alt=""
                    />
                }
                
            </>
        )
    };

    return (
        <div className={own ? "message own" : "message"}>
            <div className="message-top">
                {/* <img 
                    className="message-image"
                    src="https://image.shutterstock.com/shutterstock/photos/1824382343/display_1500/stock-vector-smoking-panda-illustration-canabis-logo-weed-vector-for-shirt-design-eps-1824382343.jpg"
                    alt=""
                />
                <p className="message-text">This is a test for a paragraph with a large amount of content that might look weird. 
                    This might also do something or nothing idk this is overall still a test
                    
                </p>
                <img 
                    className="message-image"
                    src="https://image.shutterstock.com/shutterstock/photos/1824382343/display_1500/stock-vector-smoking-panda-illustration-canabis-logo-weed-vector-for-shirt-design-eps-1824382343.jpg"
                    alt=""
                /> */}
                {renderMessage(own, message)}
            </div>
            
            <div className="message-bottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
};

export default Message;