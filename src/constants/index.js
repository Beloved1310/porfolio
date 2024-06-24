import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = ` I am an innovator in problem-solving, passionate about crafting seamless and efficient software solutions.
Creative problem solver with a good grasp of object-oriented programming concepts, asynchronous programming, web development, REST APIs, microservices, data structures and algorithms, with outstanding communication, collaborative and team-building skills`;

export const ABOUT_TEXT = `I am a DevRel and a Software Engineer (Javascript/Typescript) with 3 years of experience, known for a strong ownership mindset and proficiency in both frontend and backend technologies.`;
export const MORE_ABOUT = `As, an advocate for technical problem-solving, with a relentless drive to tackle challenges my passion for learning and adapting to new technologies keeps me at the forefront of the industry.`;

export const EXPERIENCES = [
  // {
  //   year: "2024 - Present",
  //   month: "June",
  //   role: "WebJS Ambassador",
  //   company: "ChainSafe",
  //   description: `Advocate Support the growth of the Ethereum ecosystem.`,
  //   technologies: ["Javascript", "Typescript"],
  // },
  {
    year: "2024 - Present",
    month: "March",
    role: "Full-Stack Engineer",
    company: "Digital Transformation & Integration Services",
    description: `Developed and implemented interfaces, enhancing user experience and data visualization.Integrated Firebase notifications to ensure timely and effective communication with users.Established tRPC connections using Prisma for backend functionality, streamlining and enhancing website performance`,
    technologies: ["Javascript", "Typescript", "Prisma", "Next.js", "Postgres", "Tailwind"],
  },
  {
    year: "2023",
    month: "February - October",
    role: "Backend Engineer",
    company: "Bujeti",
    description: `Led the Integration QuickBooks into social and financial platforms, resolved 60% of critical bugs, and optimized data processing using Node.js, Squelieze, MySQL, and SQS queuing service, fostering trust and efficiency through accurate financial data`,
    technologies: ["Javascript", "NodeJs", "Squelieze", "mySQL", "AWS-SQS", "Mocha"],
  },
  {
    year: "2022",
    month: "January - October",
    role: "Backend Engineer",
    company: "Lextego",
    description: `Created and managed over 50 transactions monitoring rule processor microservices for the Actio Transaction Monitoring Open-Source and Octia Enterprise projects`,
    technologies: ["Javascript", "Typescript", "NodeJs", "Docker", "ArangoDB", "Jenkins,", "Kubernates", "AWS", "Jest"],
  },
  {
    year: "2021",
    role: "Backend Engineer",
    company: "Food Crowdy",
    description: `Managed APIs for vendor registration (50+ vendors), payment verification for news and e-commerce, and news posting with comments which streamlined processes, boosting productivity and enhancing local vendor engagement.`,
    technologies: ["Javascript", "Nodejs", "MongoDB", "Postman"],
  },
];

export const PROJECTS = [
  {
    title: "Worknoon Website",
    image: project1,
    description:
      "A functional commerce website that has allows workspace to be available to user in the geographical location with features like workspace registration, reviews, tours, bookings and user authentication and authorization.",
    technologies: ["Javascript", "Node.js", "MongoDB"],
  },
  {
    title: "Botify Application",
    image: project2,
    description:
      "Botify is an analytic and administrative dashboard web application. It serves as a comprehensive platform that   delivers valuable insights and data-driven information to end-users. Additionally, it facilitates the efficient management and control of systems, processes, and resources within the organization. ",
    technologies: ["React", "Tailwind Css"],
  },

  // {
  //   title: "Portfolio Website",
  //   image: project3,
  //   description:
  //     "A personal portfolio website showcasing projects, skills, and contact information.",
  //   technologies: ["HTML", "CSS", "React", "Bootstrap"],
  // },
  // {
  //   title: "Blogging Platform",
  //   image: project4,
  //   description:
  //     "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
  //   technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
  // },
];

export const CONTACT = {
  address: "Lagos, Nigeria",
  phoneNo: "+234 816 075 0829 ",
  email: "adeoluwafisayomi@gmail.com",
};
