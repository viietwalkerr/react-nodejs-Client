import axiosConfig from "./axiosConfig";

const API = process.env.REACT_APP_BACKEND_API;

export async function fetchUser(userId: number) {
    console.log("RECEIVED REQUEST FOR USER INFO");
    const result = await axiosConfig.get(`${API}/auth/userData/${userId}`);
    return result;
}

export async function fetchFriends(currentId: number) {
    console.log("RECEIVED REQUEST FOR FRIENDS");
    const result = await axiosConfig.get(`${API}/auth/friends` + currentId);
    return result;
}