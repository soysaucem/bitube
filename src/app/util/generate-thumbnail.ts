const IMAGE_WIDTH = 720;
const IMAGE_HEIGHT = 404;

export function generateThumbnail(video: Blob) {
  const videoEl = document.createElement('video');
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');

  return new Promise<string>((resolve, reject) => {
    canvas.addEventListener('error', reject);
    videoEl.addEventListener('error', reject);

    videoEl.addEventListener('canplay', event => {
      canvas.width = IMAGE_WIDTH;
      canvas.height = IMAGE_HEIGHT;
      canvasContext.drawImage(videoEl, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
      resolve(canvas.toDataURL('image/webp'));
    });

    videoEl.setAttribute('type', video.type);
    videoEl.preload = 'auto';
    videoEl.src = window.URL.createObjectURL(video);
    videoEl.load();
  });
}
