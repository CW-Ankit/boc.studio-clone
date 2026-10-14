import { ServicePageView } from '@/components/ServicePageView';

export async function generateStaticParams() {
  return [{ locale: 'ca' }, { locale: 'es' }];
}

export default function LocalizedBoostPage() {
  return <ServicePageView serviceKey="boost" />;
}
