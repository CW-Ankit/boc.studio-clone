/**
 * Asset URL helper: maps Sanity CDN URLs to local downloaded assets
 */
export function getAssetUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('/')) return url;
  
  if (url.includes('cdn.sanity.io/images/r85jvkap/production/')) {
    const filename = url.split('cdn.sanity.io/images/r85jvkap/production/')[1].split('?')[0];
    return `/images/sanity/${filename}`;
  }
  
  return url;
}
