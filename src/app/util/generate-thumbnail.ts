export function generateThumbnail(video: Blob) {
  const videoEl = document.createElement('video');
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');

  return new Promise<string>((resolve, reject) => {
    canvas.addEventListener('error', reject);
    videoEl.addEventListener('error', reject);

    videoEl.addEventListener('canplay', event => {
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      canvasContext.drawImage(
        videoEl,
        0,
        0,
        videoEl.videoWidth,
        videoEl.videoHeight
      );
      resolve(canvas.toDataURL());
    });

    videoEl.setAttribute('type', video.type);
    videoEl.preload = 'auto';
    videoEl.src = window.URL.createObjectURL(video);
    videoEl.load();
  });
}
