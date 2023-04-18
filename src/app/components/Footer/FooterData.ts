import { SiNextdotjs, SiTypescript, SiReact, SiSupabase, SiPrisma, SiTailwindcss } from "react-icons/si";
import { FaNode, FaGithub, FaLinkedin } from "react-icons/fa";

export const websiteTechStack = {
  devicons: [
    {
      icon: SiTypescript,
      tooltipMessage: "TypeScript"
    },
    {
      icon: SiNextdotjs,
      tooltipMessage: "Next.js"
    },
    {
      icon: SiReact,
      tooltipMessage: "React"
    },
    {
      icon: FaNode,
      tooltipMessage: "Node"
    },
    {
      icon: SiPrisma,
      tooltipMessage: "Prisma"
    },
    {
      icon: SiSupabase,
      tooltipMessage: "Supabase"
    },
    {
      icon: SiTailwindcss,
      tooltipMessage: "Tailwind CSS"
    }
  ]
}

export const socialLinks = {
  username: 'richardjhong',
  githubProfile: function() {
    if (this.username === undefined) {
      throw new Error('username is not defined');
    };
    return `https://api.github.com/users/${this.username}`;
  },
  icons: [
    {
      icon: FaGithub,
      tooltipMessage: 'Github',
      link: 'https://github.com/richardjhong'
    },
    {
      icon: FaLinkedin,
      tooltipMessage: 'LinkedIn',
      link: 'https://www.linkedin.com/in/hongjrichard/'
    }
  ]
};
