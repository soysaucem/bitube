export function generateKeywords(title: string) {
  const keywords = [];
  let subtitle = title;

  while (subtitle.length > 0) {
    keywords.push(subtitle.toLowerCase());
    subtitle = subtitle.slice(1, subtitle.length);
  }

  return keywords;
}
