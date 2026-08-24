<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Rahnoxa</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1e293b;
            background: #f8fafc;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            padding: 32px;
          }
          h1 {
            color: #0f172a;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 8px;
          }
          p.desc {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          th {
            background-color: #f1f5f9;
            color: #334155;
            text-align: left;
            padding: 12px 16px;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #f1f5f9;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
            background-color: #e0f2fe;
            color: #0369a1;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Rahnoxa XML Sitemap</h1>
          <p class="desc">This XML sitemap is dynamically generated from Supabase PostgreSQL for search engines like Google and Bing.</p>
          <table>
            <thead>
              <tr>
                <th>URL (<xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> total)</th>
                <th>Priority</th>
                <th>Change Frequency</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td>
                    <span class="badge"><xsl:value-of select="sitemap:priority"/></span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
