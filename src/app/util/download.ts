export function downloadVideo(url: string, fileName: string) {
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', fileName);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
