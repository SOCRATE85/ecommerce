import React from "react";

const ProfileImage = ({ avatar, name, className }) => {
    return <div className={className}>{avatar && <img src={avatar} alt={name} />}</div>
}

export default ProfileImage
