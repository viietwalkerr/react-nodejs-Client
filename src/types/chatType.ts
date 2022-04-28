export interface OnlineUsers {
    socketId: string;
    userId: number;
    username: string;
};

// export interface CurrentChat {
//     id: number | string;
//     receiverId: string;
//     senderId: string;
//     createdAt: string;
//     updatedAt: string;
// }

export interface ConversationsType {
    id: number;
    receiverId: number;
    receiverUsername: string;
    senderId: number;
    senderUsername: string;
    createdAt: string;
    updatedAt: string;
}

export interface MessagesType {
    ConversationId?: number;
    id?: number;
    sender: number;
    senderUsername: string;
    text: string;
    createdAt: string | number | Date;
    updatedAt?: string;
}

export interface ArrivalMessage {
    senderId: number;
    senderUsername: string;
    text: string;
}

export interface ArrivalMessageState {
    sender: number;
    senderUsername: string;
    text: string;
    createdAt: number | Date;
}