import { InfoPanel } from '@/components/InfoPanel';

export async function generateStaticParams() {
  return [{ locale: 'ca' }, { locale: 'es' }];
}

export default function LocalizedInfoPage() {
  return <InfoPanel variant="page" />;
}
