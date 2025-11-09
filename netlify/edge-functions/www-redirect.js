export default async (request, context) => {
  const url = new URL(request.url);

  // 🔁 Redirect "www." to non-www version
  if (url.hostname.startsWith("www.")) {
    const newUrl = url.href.replace("www.", "");
    return Response.redirect(newUrl, 301);
  }

  // Continue to normal site
  return context.next();
};
