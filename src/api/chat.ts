import axiosConfig from "./axiosConfig";

const API = process.env.REACT_APP_BACKEND_API;

export async function createConversation(
    currentId: number,
    currentUsername: string,
    receiverId: number,
    receiverUsername: string,
) {
    const result = await axiosConfig.post(`${API}/conversations`, {
        senderId: currentId,
        senderUsername: currentUsername,
        receiverId: receiverId,
        receiverUsername: receiverUsername,
    });
    return result;
}

export async function fetchConversation(userId: number) {
    const result = await axiosConfig.get(`${API}/conversations/${userId}`);
    return result;
}

export async function fetchMessages(convoId: number | string) {
    const result = await axiosConfig.get(`${API}/messages/${convoId}`);
    return result;
}

export async function sendMessage(messageObject: object) {
    console.log(messageObject);
    const result = await axiosConfig.post(`${API}/messages`, messageObject);
    return result;
}

export async function fetchIndividualConversation(firstId: number, secondId: number) {
    const result = await axiosConfig(`${API}/conversations/find/${firstId}/${secondId}`);
    return result;
}