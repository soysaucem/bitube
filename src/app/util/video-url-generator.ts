import { CLOUD_FUNTIONS } from './variables';

export async function generateVideoUrl(id: string) {
  const response = await fetch(CLOUD_FUNTIONS.getVideo, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId: id }),
  });

  return await response.json();
}
