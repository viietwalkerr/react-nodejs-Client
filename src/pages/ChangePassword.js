import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = () => {
        axios.put(
            "http://localhost:3001/auth/changepassword"||
            "https://react-nodejs-illumin8.herokuapp.com/auth/changepassword", 
            {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }
        ).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
        });
    };

    return (
        // <div>
            
        // </div>
        <div className="background">
            <main>
                <div className="formBox">
                    <h2>Change Password</h2>
                    <form>
                        <div className="textbox">
                            <span className="icon">
                                <FaIcons.FaLock />
                            </span>
                            <input
                                type="text"
                                placeholder="Old Password"
                                onChange={(event) => {
                                    setOldPassword(event.target.value);
                                }}
                            />
                        </div>
                        <div className="textbox">
                            <span className="icon">
                                <FaIcons.FaLock />
                            </span>
                            <input
                                type="text"
                                placeholder="New Password"
                                onChange={(event) => {
                                    setNewPassword(event.target.value);
                                }}
                            />
                        </div>
                        <button type="submit" 
                            className="rainbowButton"
                            onClick={changePassword}
                        >
                            <span>Save</span>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default ChangePassword
