import { WorkList } from '@/components/WorkList';

export async function generateStaticParams() {
  return [{ locale: 'ca' }, { locale: 'es' }];
}

export default function LocalizedWorkPage() {
  return <WorkList />;
}
