import { ReactNode } from "react";

export type TSkill = {
  _id: string; // Unique identifier
  name: string; // Skill name
  tagline: string; // Brief description
  image: string; // URL of the image
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number; // Version number
};

export interface TLinks {
  client: string;
  server: string;
  live: string;
}

export interface TProject {
  links: TLinks;
  _id: string;
  title: string;
  description: string;
  overview: string | null;
  image: string;
  skills: TSkill[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TConfig = {
  label?: string;
  path: string;
  element: ReactNode;
};


export type TExperience = {
  _id: string;
  company: string;
  designation: string;
  startDate: string;
  endDate: string | null;
  description: string;
  location: string;
  technologies: TSkill[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface TBlog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  skills: TSkill[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
