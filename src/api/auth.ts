import axiosConfig from "./axiosConfig";

const API = process.env.REACT_APP_BACKEND_API;

export async function changePassword(oldPassword: string, newPassword: string) {
    console.log("RECEIVED REQUEST TO CHANGE PASSWORD");
    const result = await axiosConfig.put(`${API}/auth/changepassword`, {
        oldPassword: oldPassword, newPassword: newPassword 
    });
    return result;
}