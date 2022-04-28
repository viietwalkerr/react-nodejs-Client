import React, { useState } from 'react'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { changePassword } from '../../api/auth';
import Page from '../../components/Layout/Common/Page/Page';
import FormComponent from '../../components/Layout/FormComponent';
import { ChangePasswordData } from '../../types/userType';

const ChangePassword: React.FC = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (data: ChangePasswordData) => {
        console.log(data);
        const { oldPassword, newPassword } = data;
        changePassword(oldPassword, newPassword);
    };

    return (
        <Page>
            <FormComponent
                onSubmit={
                    (data: ChangePasswordData) => handleSubmit(data)
                }
                type={"Change Password"}
            />
        </Page>
    )
}

export default ChangePassword
