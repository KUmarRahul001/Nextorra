export default async (request, context) => {
  const url = new URL(request.url);

  // 🔁 Redirect http:// → https:// and www. → non-www
  if (url.protocol === "http:" || url.hostname.startsWith("www.")) {
    const cleanHost = url.hostname.replace("www.", "");
    const newUrl = `https://${cleanHost}${url.pathname}${url.search}`;
    return Response.redirect(newUrl, 301);
  }

  // ✅ Continue to normal site
  return context.next();
};
