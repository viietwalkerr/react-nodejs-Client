import React, { ReactElement } from 'react';
import "./ProfileCard.scss";
import profiledefault from '../../../uploads/profiledefault.jpg';
import * as AiIcons from 'react-icons/ai';

interface ProfileCardProps {
    user?: any;
    userPostsNumber: number | undefined;
    children: ReactElement;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
    user,
    userPostsNumber,
    children
}) => {
    return (
        <>
            <div className="profile-card">
                <div className="card-header">
                    <div className="pic">
                        {/* <img src='UPLOADS/".$username."/".$username.".jpg'> */}
                        <img src={profiledefault} alt="Missing"/>
                            {/* <img src="ASSETS/images/smoking panda.jpg" alt="John"> */}
                    </div>
                    <div className="name">
                        {user.username}
                    </div>
                    <div className="desc">Developer & Desiger</div>
                    <div className="sm">
                        <AiIcons.AiFillFacebook />
                        <AiIcons.AiOutlineTwitter />
                        <AiIcons.AiFillGithub />
                    </div>
                </div>
                <div className="card-footer">
                    <div className="numbers">
                        <div className="item">
                            <span>{userPostsNumber}</span>
                            Posts
                        </div>
                        <div className="item">
                            <span>0</span>
                            Followers
                        </div>
                        <div className="item">
                            <span>0</span>
                            Following
                        </div>
                    </div>
                </div>
                {children}
            </div>
            
        </>
    )
}

export default ProfileCard;