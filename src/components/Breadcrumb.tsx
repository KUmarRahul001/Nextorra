import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate schema items
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://nextorra.netlify.app/",
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
        item: `https://nextorra.netlify.app${route}`,
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

      <nav className="py-4">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              to="/"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Home
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
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <li>
                  {isLast ? (
                    <span className="text-gray-600">{formattedName}</span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="text-primary hover:text-primary-dark transition-colors"
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
