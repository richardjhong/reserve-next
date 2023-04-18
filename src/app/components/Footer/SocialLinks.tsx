"use client";

import { socialLinks } from './FooterData';

const SocialLinks = () => {
  return (
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
  )
}

export default SocialLinks