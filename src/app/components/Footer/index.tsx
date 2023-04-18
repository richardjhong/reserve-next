import ProfileImage from './ProfileImage';
import TechIcons from './TechIcons';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <>
      <footer className="relative bottom-0 w-full grid grid-cols-[20%,auto,20%] bg-gray-300 text-black">
        <div className="flex flex-col items-center justify-center w-full">
          <p>Made with:</p>
          <TechIcons />
        </div>
        <div className="flex flex-wrap items-center justify-center mt-2">
          <ProfileImage />
          <SocialLinks />
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
