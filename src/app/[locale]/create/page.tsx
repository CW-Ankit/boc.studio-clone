import { ServicePageView } from '@/components/ServicePageView';

export async function generateStaticParams() {
  return [{ locale: 'ca' }, { locale: 'es' }];
}

export default function LocalizedCreatePage() {
  return <ServicePageView serviceKey="create" />;
}
