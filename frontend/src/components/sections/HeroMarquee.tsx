import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import {
  SiPhp,
  SiDotnet,
  SiLaravel,
  SiWordpress,
  SiMysql,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiFlutter,
  SiPython,
  SiAngular,
  SiVuedotjs,
  SiNextdotjs,
  SiOpenjdk,
  SiSpring,
  SiGo,
  SiRust,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiCloudflare,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiShopify,
  SiMagento,
  SiAndroid,
  SiApple,
  SiIonic,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiGraphql,
  SiOpenai,
  SiStripe,
} from 'react-icons/si';

interface MarqueeLogo {
  name: string;
  icon: React.ReactNode;
  textColor?: string;
}

const LOGOS: MarqueeLogo[] = [
  {
    name: 'PHP',
    icon: <SiPhp className="h-14 w-14 sm:h-16 sm:w-16 text-[#777BB4] flex-shrink-0" />,
    textColor: 'text-[#6b6fa3]',
  },
  {
    name: '.NET / ASP.NET',
    icon: <SiDotnet className="h-14 w-14 sm:h-16 sm:w-16 text-[#512BD4] flex-shrink-0" />,
    textColor: 'text-[#512BD4]',
  },
  {
    name: 'Laravel',
    icon: <SiLaravel className="h-14 w-14 sm:h-16 sm:w-16 text-[#FF2D20] flex-shrink-0" />,
    textColor: 'text-[#e0281b]',
  },
  {
    name: 'WordPress',
    icon: <SiWordpress className="h-14 w-14 sm:h-16 sm:w-16 text-[#21759B] flex-shrink-0" />,
    textColor: 'text-[#1e6b8c]',
  },
  {
    name: 'MySQL',
    icon: <SiMysql className="h-14 w-14 sm:h-16 sm:w-16 text-[#4479A1] flex-shrink-0" />,
    textColor: 'text-[#38698c]',
  },
  {
    name: 'React',
    icon: <SiReact className="h-14 w-14 sm:h-16 sm:w-16 text-[#06B6D4] flex-shrink-0" />,
    textColor: 'text-[#0891b2]',
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript className="h-14 w-14 sm:h-16 sm:w-16 text-[#2563EB] flex-shrink-0" />,
    textColor: 'text-[#1d4ed8]',
  },
  {
    name: 'Node.js',
    icon: <SiNodedotjs className="h-14 w-14 sm:h-16 sm:w-16 text-[#16A34A] flex-shrink-0" />,
    textColor: 'text-[#15803d]',
  },
  {
    name: 'Python',
    icon: <SiPython className="h-14 w-14 sm:h-16 sm:w-16 text-[#F59E0B] flex-shrink-0" />,
    textColor: 'text-[#d97706]',
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql className="h-14 w-14 sm:h-16 sm:w-16 text-[#336791] flex-shrink-0" />,
    textColor: 'text-[#336791]',
  },
  {
    name: 'Supabase',
    icon: <SiSupabase className="h-14 w-14 sm:h-16 sm:w-16 text-[#10B981] flex-shrink-0" />,
    textColor: 'text-[#047857]',
  },
  {
    name: 'Flutter',
    icon: <SiFlutter className="h-14 w-14 sm:h-16 sm:w-16 text-[#0284C7] flex-shrink-0" />,
    textColor: 'text-[#0369a1]',
  },
  {
    name: 'Angular',
    icon: <SiAngular className="h-14 w-14 sm:h-16 sm:w-16 text-[#DD0031] flex-shrink-0" />,
    textColor: 'text-[#c2002b]',
  },
  {
    name: 'Vue.js',
    icon: <SiVuedotjs className="h-14 w-14 sm:h-16 sm:w-16 text-[#4FC08D] flex-shrink-0" />,
    textColor: 'text-[#3fa778]',
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs className="h-14 w-14 sm:h-16 sm:w-16 text-slate-900 flex-shrink-0" />,
    textColor: 'text-slate-900',
  },
  {
    name: 'Java',
    icon: <SiOpenjdk className="h-14 w-14 sm:h-16 sm:w-16 text-[#ED8B00] flex-shrink-0" />,
    textColor: 'text-[#cf7a00]',
  },
  {
    name: 'Spring Boot',
    icon: <SiSpring className="h-14 w-14 sm:h-16 sm:w-16 text-[#6DB33F] flex-shrink-0" />,
    textColor: 'text-[#5d9c36]',
  },
  {
    name: 'Go',
    icon: <SiGo className="h-14 w-14 sm:h-16 sm:w-16 text-[#00ADD8] flex-shrink-0" />,
    textColor: 'text-[#0096ba]',
  },
  {
    name: 'Rust',
    icon: <SiRust className="h-14 w-14 sm:h-16 sm:w-16 text-slate-900 flex-shrink-0" />,
    textColor: 'text-slate-900',
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb className="h-14 w-14 sm:h-16 sm:w-16 text-[#47A248] flex-shrink-0" />,
    textColor: 'text-[#3e8c3f]',
  },
  {
    name: 'Redis',
    icon: <SiRedis className="h-14 w-14 sm:h-16 sm:w-16 text-[#DC2626] flex-shrink-0" />,
    textColor: 'text-[#b91c1c]',
  },
  {
    name: 'Docker',
    icon: <SiDocker className="h-14 w-14 sm:h-16 sm:w-16 text-[#2496ED] flex-shrink-0" />,
    textColor: 'text-[#1e7ecc]',
  },
  {
    name: 'Kubernetes',
    icon: <SiKubernetes className="h-14 w-14 sm:h-16 sm:w-16 text-[#326CE5] flex-shrink-0" />,
    textColor: 'text-[#2b5cc4]',
  },
  {
    name: 'AWS',
    icon: <SiAmazonwebservices className="h-14 w-14 sm:h-16 sm:w-16 text-[#FF9900] flex-shrink-0" />,
    textColor: 'text-[#e68a00]',
  },
  {
    name: 'Cloudflare',
    icon: <SiCloudflare className="h-14 w-14 sm:h-16 sm:w-16 text-[#F38020] flex-shrink-0" />,
    textColor: 'text-[#da6f17]',
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className="h-14 w-14 sm:h-16 sm:w-16 text-[#0EA5E9] flex-shrink-0" />,
    textColor: 'text-[#0284c7]',
  },
  {
    name: 'Bootstrap',
    icon: <SiBootstrap className="h-14 w-14 sm:h-16 sm:w-16 text-[#7952B3] flex-shrink-0" />,
    textColor: 'text-[#6c48a1]',
  },
  {
    name: 'HTML5',
    icon: <SiHtml5 className="h-14 w-14 sm:h-16 sm:w-16 text-[#E34F26] flex-shrink-0" />,
    textColor: 'text-[#ca441f]',
  },
  {
    name: 'CSS3',
    icon: <SiCss3 className="h-14 w-14 sm:h-16 sm:w-16 text-[#1572B6] flex-shrink-0" />,
    textColor: 'text-[#12629d]',
  },
  {
    name: 'Shopify',
    icon: <SiShopify className="h-14 w-14 sm:h-16 sm:w-16 text-[#7AB55C] flex-shrink-0" />,
    textColor: 'text-[#679a4d]',
  },
  {
    name: 'Magento',
    icon: <SiMagento className="h-14 w-14 sm:h-16 sm:w-16 text-[#EE672F] flex-shrink-0" />,
    textColor: 'text-[#d65723]',
  },
  {
    name: 'Android',
    icon: <SiAndroid className="h-14 w-14 sm:h-16 sm:w-16 text-[#10B981] flex-shrink-0" />,
    textColor: 'text-slate-900',
  },
  {
    name: 'iOS',
    icon: <SiApple className="h-14 w-14 sm:h-16 sm:w-16 text-slate-900 flex-shrink-0" />,
    textColor: 'text-slate-900',
  },
  {
    name: 'Ionic',
    icon: <SiIonic className="h-14 w-14 sm:h-16 sm:w-16 text-[#3880FF] flex-shrink-0" />,
    textColor: 'text-[#2e6fd6]',
  },
  {
    name: 'Figma',
    icon: <SiFigma className="h-14 w-14 sm:h-16 sm:w-16 text-[#8B5CF6] flex-shrink-0" />,
    textColor: 'text-[#7c3aed]',
  },
  {
    name: 'Photoshop',
    icon: <SiAdobephotoshop className="h-14 w-14 sm:h-16 sm:w-16 text-[#31A8FF] flex-shrink-0" />,
    textColor: 'text-[#248ddb]',
  },
  {
    name: 'Illustrator',
    icon: <SiAdobeillustrator className="h-14 w-14 sm:h-16 sm:w-16 text-[#FF9A00] flex-shrink-0" />,
    textColor: 'text-[#df8600]',
  },
  {
    name: 'GraphQL',
    icon: <SiGraphql className="h-14 w-14 sm:h-16 sm:w-16 text-[#E10098] flex-shrink-0" />,
    textColor: 'text-[#c70086]',
  },
  {
    name: 'OpenAI',
    icon: <SiOpenai className="h-14 w-14 sm:h-16 sm:w-16 text-[#412991] flex-shrink-0" />,
    textColor: 'text-[#37217c]',
  },
  {
    name: 'Stripe',
    icon: <SiStripe className="h-14 w-14 sm:h-16 sm:w-16 text-[#008CDD] flex-shrink-0" />,
    textColor: 'text-[#0074b7]',
  },
];

export const HeroMarquee: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-14 sm:py-20 border-b border-slate-200 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          We Work On Technologies
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
          We are committed to delivering exceptional engineering across 100+ modern stacks, languages, and enterprise platforms.
        </p>
      </div>

      {/* Infinite Horizontal Running Logo Stream */}
      <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee space-x-16 sm:space-x-24 items-center">
          {[...LOGOS, ...LOGOS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3.5 select-none hover:opacity-80 transition-opacity flex-shrink-0"
            >
              {item.icon}
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${item.textColor || 'text-slate-800'}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Consult Now Action Button */}
      <div className="text-center mt-8 sm:mt-10">
        <button
          type="button"
          onClick={() => {
            navigate('/get-started');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF2F87] to-[#FE3061] shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Consult Now</span>
          <FiArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};

export default HeroMarquee;
