import React from "react";
import AvatarIcon1 from "../assets/vectors/review-avatars/avatar-1.svg";
import AvatarIcon2 from "../assets/vectors/review-avatars/avatar-2.svg";
import AvatarIcon3 from "../assets/vectors/review-avatars/avatar-3.svg";
import AvatarIcon4 from "../assets/vectors/review-avatars/avatar-4.svg";
import AvatarIcon5 from "../assets/vectors/review-avatars/avatar-5.svg";
import AvatarIcon6 from "../assets/vectors/review-avatars/avatar-6.svg";

const Avatar = () => {
  const avatars = [
    <AvatarIcon1 key={1} />,
    <AvatarIcon2 key={2} />,
    <AvatarIcon3 key={3} />,
    <AvatarIcon4 key={4} />,
    <AvatarIcon5 key={5} />,
    <AvatarIcon6 key={6} />,
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export default Avatar;
