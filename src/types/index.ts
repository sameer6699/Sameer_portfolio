export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'freelancing' | 'academic' | 'openSource';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

export interface AppointmentSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface AppointmentForm {
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  type: 'consultation' | 'quick-chat' | 'project-discussion';
}