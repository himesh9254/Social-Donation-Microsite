import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type HeroContent = {
	title: string;
	subtitle?: string;
	cta_label?: string;
	cta_link?: string;
};

export type AboutContent = {
	heading: string;
	body: string; // markdown body
	highlights?: string[];
};

export type ImpactStat = { label: string; value: string; description?: string };
export type ImpactContent = { heading: string; stats: ImpactStat[] };

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMarkdown<T>(relativePath: string): T {
	const full = path.join(CONTENT_DIR, relativePath);
	const raw = fs.readFileSync(full, "utf8");
	const { data, content } = matter(raw);
	return { ...(data as object), body: content.trim() } as T;
}

export function getHero(): HeroContent {
	return readMarkdown<HeroContent>("hero.md");
}

export function getAbout(): AboutContent {
	return readMarkdown<AboutContent>("about.md");
}

export function getImpact(): ImpactContent {
	return readMarkdown<ImpactContent>("impact.md");
}




