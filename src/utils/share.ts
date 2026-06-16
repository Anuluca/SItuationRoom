export const absoluteUrl = (path = window.location.href) =>
  new URL(path, window.location.origin).toString();

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export async function sharePage(title: string, text: string, url: string) {
  const shareUrl = absoluteUrl(url);

  if (navigator.share) {
    await navigator.share({ title, text, url: shareUrl });
    return "shared" as const;
  }

  await copyText(shareUrl);
  return "copied" as const;
}

export { copyText };
