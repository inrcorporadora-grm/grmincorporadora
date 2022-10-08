import { fetcher } from '@services/fetchers';

export async function submit(toSubmit: any) {
  return fetcher.put(`/api/pages/home`, {
    others: { deliveredProjects: toSubmit },
  });
}
