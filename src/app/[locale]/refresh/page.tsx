import { ServicePageView } from '@/components/ServicePageView';

export async function generateStaticParams() {
  return [{ locale: 'ca' }, { locale: 'es' }];
}

export default function LocalizedRefreshPage() {
  return <ServicePageView serviceKey="refresh" />;
}
