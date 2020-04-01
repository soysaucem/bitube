export function downloadVideo(url: string, fileName: string): void {
  const element = document.createElement('a');
  console.log(url);
  element.setAttribute('target', '_blank');
  element.setAttribute('href', url);
  element.setAttribute('download', fileName + '.mp4');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
