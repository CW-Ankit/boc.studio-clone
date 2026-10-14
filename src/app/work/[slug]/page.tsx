import { CaseStudyView } from '@/components/CaseStudyView';
import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found — Boc.Studio' };

  return {
    title: `${project.title} — Boc.Studio`,
    description: project.description || `${project.title} case study by Boc.Studio.`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  return <CaseStudyView slug={slug} />;
}
