import { SiNextdotjs, SiTypescript, SiReact, SiSupabase, SiPrisma, SiTailwindcss, SiApollographql, SiJsonwebtokens, SiLetsencrypt, SiMui, SiPostgresql } from "react-icons/si";
import { FaNode, FaGithub, FaLinkedin, FaCookie } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";

export const websiteTechStack = {
  devicons: [
    {
      icon: SiNextdotjs,
      tooltipMessage: "Next.js"
    },
    {
      icon: SiTypescript,
      tooltipMessage: "TypeScript"
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
      icon: SiPostgresql,
      tooltipMessage: "Postgres"
    },
    {
      icon: SiTailwindcss,
      tooltipMessage: "Tailwind CSS"
    },
    {
      icon: SiMui,
      tooltipMessage: "Mui"
    },
    {
      icon: SiApollographql,
      tooltipMessage: "Apollo"
    },
    {
      icon: SiJsonwebtokens,
      tooltipMessage: "JSON Web Tokens"
    },
    {
      icon: FaCookie,
      tooltipMessage: "cookies-next"
    },
    {
      icon: SiLetsencrypt,
      tooltipMessage: "bcrypt"
    },
    {
      icon: GrValidate,
      tooltipMessage: "validator"
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
