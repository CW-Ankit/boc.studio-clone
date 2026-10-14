import { CaseStudyView } from '@/components/CaseStudyView';
import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const locales = ['ca', 'es'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const project of projectsData) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export default async function LocalizedCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  return <CaseStudyView slug={slug} />;
}
