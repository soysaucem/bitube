export function generateImageUrlFromFile(img: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function generateImageUrlFromPath(filePath: string) {
  const img = document.createElement('img');
  const canvas = document.createElement('canvas');
  img.src = filePath;

  img.style.display = 'none';
  canvas.style.display = 'none';
  document.body.appendChild(img);
  document.body.appendChild(canvas);

  return new Promise((resolve, reject) => {
    img.addEventListener('error', reject);
    canvas.addEventListener('error', reject);

    img.onload = () => {
      const ctx = canvas.getContext('2d');
      // Set width and height
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      const imgURL = canvas.toDataURL('image/webp');

      document.body.removeChild(img);
      document.body.removeChild(canvas);

      resolve(imgURL);
    };
  });
}
