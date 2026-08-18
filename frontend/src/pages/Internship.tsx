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

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-6">
              <GraduationCap className="h-3.5 w-3.5" />
              Career Acceleration
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Engineering Internship Tracks
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Work on production-grade codebases, participate in agile standups, and gain verifiable project experience under the mentorship of senior Rahnoxa engineers.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {internships.map((internship, index) => (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-full h-40 overflow-hidden rounded-xl mb-5 bg-slate-950 border border-slate-800">
                    <img
                      src={internship.gif}
                      alt={`${internship.title} Internship`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {internship.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Hands-on mentorship, code reviews, and live milestone delivery.
                  </p>
                </div>

                <button
                  onClick={() => window.open(internship.applyLink, "_blank")}
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="h-3.5 w-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Internship;
