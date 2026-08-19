import React from "react";
import { Sparkles, ExternalLink, GraduationCap } from "lucide-react";
import SEO from "../components/SEO";
import config from "../config";

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
      <SEO
        title={`Internship Program – ${config.siteName}`}
        description={`Join ${config.siteName}’s internship program to gain real-world experience in web development, data science, AI, machine learning, Android, and more. Build your tech career with hands-on projects.`}
        keywords={`${config.siteName} internship, web development internship, AI internship, machine learning internship, Android development, Flutter internship, data science, programming internship`}
        url={`${config.siteUrl}/internship`}
        canonical={`${config.siteUrl}/internship`}
        image={`${config.siteUrl}/assets/og-image.jpg`}
        type="website"
      />

      <div className="min-h-screen bg-[#FAFCFF] text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white gradient-mesh-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-200 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-6 shadow-2xs">
              <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
              Career Acceleration
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Engineering Internship Tracks
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Work on production-grade codebases, participate in agile standups, and gain verifiable project experience under the mentorship of senior Rahnoxa engineers.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {internships.map((internship, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-full h-40 overflow-hidden rounded-xl mb-5 bg-slate-50 border border-slate-100">
                    <img
                      src={internship.gif}
                      alt={internship.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {internship.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                    Live technical assignments, real code reviews, and industry certificates.
                  </p>
                </div>

                <a
                  href={internship.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <span>Apply for Track</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Internship;
