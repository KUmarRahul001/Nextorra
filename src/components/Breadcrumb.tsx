import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import config from "../config";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate schema items
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${config.siteUrl}/`,
    },
    ...pathnames.map((name, index) => {
      const route = `/${pathnames.slice(0, index + 1).join("/")}`;
      const formattedName = name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        "@type": "ListItem",
        position: index + 2,
        name: formattedName,
        item: `${config.siteUrl}${route}`,
      };
    }),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* ✅ Add Breadcrumb Schema for SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav className="py-4 mb-2" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm font-medium">
          <li>
            <Link
              to="/"
              className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const formattedName = name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <React.Fragment key={name}>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                <li>
                  {isLast ? (
                    <span className="text-blue-600 font-bold">{formattedName}</span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      {formattedName}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
