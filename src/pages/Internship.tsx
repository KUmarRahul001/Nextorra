import React from "react";

const internships = [
  { title: "Web Development", gif: "/gifs/web-development.gif", applyLink: "https://example.com/apply/web-development" },
  { title: "Android Development", gif: "/gifs/android-development.gif", applyLink: "https://example.com/apply/android-development" },
  { title: "Data Science", gif: "/gifs/data-science.gif", applyLink: "https://example.com/apply/data-science" },
  { title: "Java Programming", gif: "/gifs/java.gif", applyLink: "https://example.com/apply/java-programming" },
  { title: "C++ Programming", gif: "/gifs/cpp.gif", applyLink: "https://example.com/apply/cpp-programming" },
  { title: "Python Programming", gif: "/gifs/python.gif", applyLink: "https://example.com/apply/python-programming" },
  { title: "UI/UX Design", gif: "/gifs/ui-ux.gif", applyLink: "https://example.com/apply/ui-ux-design" },
  { title: "Artificial Intelligence", gif: "/gifs/ai.gif", applyLink: "https://example.com/apply/artificial-intelligence" },
  { title: "Machine Learning", gif: "/gifs/ml.gif", applyLink: "https://example.com/apply/machine-learning" },
  { title: "Flutter Developer", gif: "/gifs/flutter.gif", applyLink: "https://example.com/apply/flutter-developer" },
  { title: "ReactJS Developer", gif: "/gifs/react.gif", applyLink: "https://example.com/apply/reactjs-developer" },
  { title: "JavaScript Developer", gif: "/gifs/js.gif", applyLink: "https://example.com/apply/javascript-developer" },
];

const Internship: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          INTERNSHIPS WE OFFER!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg leading-relaxed">
          We are passionate about technology and believe in the power of
          software to transform the world. Our internship program is one way we
          invest in the industry's future.
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
                  alt={`${internship.title} preview`}
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
  );
};

export default Internship;
