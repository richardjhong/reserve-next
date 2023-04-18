"use client";

import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { websiteTechStack, socialLinks } from './FooterData';
import Image from 'mui-image';

const Footer: React.FC = () => {
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
    <>
      <footer className="relative bottom-0 w-full grid grid-cols-[20%,auto,20%] bg-gray-300 text-black">
        <div className="flex flex-col items-center justify-center w-full">
          <p>Made with:</p>
          <div className="flex flex-wrap items-center justify-center w-full">
            {websiteTechStack.devicons.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={i}>
                  <Icon
                    size={28}
                    className="m-2"
                    data-tooltip-content={skill.tooltipMessage}
                    data-tooltip-id={`skillTooltip-${i}`}
                    data-place='bottom'
                  />
                  <Tooltip id={`skillTooltip-${i}`} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-2">
          <Image
            width="100px" 
            height='100px' 
            src={profileImage!} 
            alt={`${socialLinks.username} profile`} 
            className="w-32 h-32 rounded-full"
          />
          <div className="flex justify-center w-full">
            <div className="flex justify-center links-container">
              {socialLinks.icons.map((link, i) => {
                const Icon = link.icon;
                return (
                  <div key={i} onClick={() => window.open(`${link.link}`, "_blank")}>
                    <Icon
                      size={28}
                      className="m-2 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="copyrightText">
            Copyright 2023
          </div>
          
        </div>
      </footer>
    </>
  );
};

export default Footer;
