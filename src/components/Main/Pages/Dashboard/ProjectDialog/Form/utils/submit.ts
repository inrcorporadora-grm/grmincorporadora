import { fetcher } from '@services/fetchers';

export async function submit(projectSubmit: any, type: string) {
  if (type === 'edit') {
    return fetcher.put(`/api/projects/${projectSubmit.id}`, projectSubmit);
  }

  return fetcher.post('/api/projects', projectSubmit);
}
