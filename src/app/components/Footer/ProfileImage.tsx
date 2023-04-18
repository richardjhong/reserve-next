"use client";

import React, { useEffect, useState } from 'react';
import { socialLinks } from './FooterData';
import Image from 'mui-image';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async (): Promise<void> => {
      const response = await fetch(socialLinks.githubProfile());
      const data = await response.json();
      setProfileImage(data.avatar_url);
    };
    fetchProfileImage();
  }, []);

  return (
    <Image
      width="100px" 
      height='100px' 
      src={profileImage!} 
      alt={`${socialLinks.username} profile`} 
      className="w-32 h-32 rounded-full"
    />
  )
}

export default ProfileImage