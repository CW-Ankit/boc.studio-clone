import { HomeOverlay } from '@/components/HomeOverlay';
import { WorkList } from '@/components/WorkList';

export async function generateStaticParams() {
  return [{ locale: 'ca' }, { locale: 'es' }];
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <HomeOverlay />
      <WorkList />
    </>
  );
}
