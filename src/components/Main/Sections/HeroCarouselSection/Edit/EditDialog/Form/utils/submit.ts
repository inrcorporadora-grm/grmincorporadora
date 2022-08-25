import { fetcher } from '@services/fetchers';

export async function submit(toSubmit: any, page: string) {
  return fetcher.put(`/api/pages/${page}`, { slides: toSubmit });
}
