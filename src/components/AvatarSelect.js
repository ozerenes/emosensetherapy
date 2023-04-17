import React, { useState } from "react";
import man from "../assets/man";
import yoga from "../assets/yoga"
import Avatar from "./Avatar";

const AvatarSelector = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(man);
    const [popupOpen, setPopupOpen] = useState(false)

    const avatars = [man,yoga];

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
    };

    return (
        <div>
            <div onClick={() => setPopupOpen(!popupOpen)}><Avatar animation={selectedAvatar} /></div>
            {
                popupOpen && <div className="avatar-selector">
                {avatars.map((item, index) => (
                    <div key={index} onClick={() => handleAvatarClick(item)}>
                        <Avatar animation={item} />
                    </div>
                ))}
            </div>
            }
        </div>
    );
};

export default AvatarSelector;
