import React from "react";
import { Helmet } from "react-helmet-async";

const internships = [
  { title: "Web Development", gif: "/gifs/web-development.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Android Development", gif: "/gifs/android-development.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Data Science", gif: "/gifs/data-science.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Java Programming", gif: "/gifs/java.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "C++ Programming", gif: "/gifs/cpp.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Python Programming", gif: "/gifs/python.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "UI/UX Design", gif: "/gifs/ui-ux.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Artificial Intelligence", gif: "/gifs/ai.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Machine Learning", gif: "/gifs/ml.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Flutter Developer", gif: "/gifs/flutter.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "ReactJS Developer", gif: "/gifs/react.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "JavaScript Developer", gif: "/gifs/js.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" },
  { title: "Business Analysis", gif: "/gifs/data-science.gif", applyLink: "https://forms.gle/b5EV7pyzcN6T53rm6" }
];

const Internship: React.FC = () => {
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Internship Program – Nextorra</title>
        <meta
          name="description"
          content="Join Nextorra’s internship program to gain real-world experience in web development, data science, AI, machine learning, Android, and more. Build your tech career with hands-on projects."
        />
        <meta
          name="keywords"
          content="Nextorra internship, web development internship, AI internship, machine learning internship, Android development, Flutter internship, data science, programming internship"
        />
        <link rel="canonical" href="https://nextorra.netlify.app/internship" />

        {/* ✅ Open Graph (Social Media Preview) */}
        <meta property="og:title" content="Internship Program – Nextorra" />
        <meta
          property="og:description"
          content="Nextorra offers internship opportunities in web development, AI, and more — perfect for students and tech enthusiasts to gain real experience."
        />
        <meta
          property="og:url"
          content="https://nextorra.netlify.app/internship"
        />
        <meta
          property="og:image"
          content="https://nextorra.netlify.app/assets/og-image.jpg"
        />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Internship Program – Nextorra"
        />
        <meta
          name="twitter:description"
          content="Gain hands-on experience in Web, AI, ML, and App Development with Nextorra’s internship program."
        />
        <meta
          name="twitter:image"
          content="https://nextorra.netlify.app/assets/og-image.jpg"
        />
      </Helmet>

      {/* ✅ Page Content */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            INTERNSHIPS WE OFFER!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg leading-relaxed">
            We are passionate about technology and believe in the power of
            software to transform the world. Our internship program is one way
            we invest in the industry's future.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {internships.map((internship, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center hover:scale-[1.03]"
              >
                <div className="w-full h-44 overflow-hidden rounded-xl mb-5">
                  <img
                    src={internship.gif}
                    alt={`${internship.title} Internship`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {internship.title}
                </h3>
                <button
                  onClick={() => window.open(internship.applyLink, "_blank")}
                  className="mt-auto w-full bg-blue-600 text-white py-2.5 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-300 text-base font-semibold shadow-sm hover:shadow-md"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Internship;
