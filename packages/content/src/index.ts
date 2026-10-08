import profileJson from "../data/profile.json" with { type: "json" };
import projectsJson from "../data/projects.json" with { type: "json" };

export interface Profile {
	name: string;
	role: string;
	yearsOfExperience: number;
	interests: string[];
	hobbies: string[];
	email: string;
	linkedin: { url: string; label: string };
	github: string;
	cv: string;
}

export interface Project {
	title: string;
	slug: string;
	num_contributors: number;
	description: string;
	github_link: string;
	active_link: boolean;
	categories: string[];
	listed?: boolean;
}

const profile: Profile = profileJson;
const projects: Project[] = projectsJson;

export function getProfile(): Profile {
	return profile;
}

export function getProjects(): Project[] {
	return projects;
}

export function getListedProjects(): Project[] {
	return projects.filter((project) => project.listed !== false);
}

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
