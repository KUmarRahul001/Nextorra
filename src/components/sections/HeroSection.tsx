import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

const HeroSection: React.FC = () => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: [
          'Transform Your Digital Presence',
          'Elevate Your Brand',
          'Drive Business Growth'
        ],
        typeSpeed: 40,
        backSpeed: 50,
        loop: true
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <>
    <SEO
        title="Nextorra - Digital Marketing & Business Growth"
        description="Empowering businesses with innovative digital solutions that drive real results and sustainable growth."
        keywords="digital marketing, business growth, web design, app development, branding, Nextorra"
        url="https://nextorra.netlify.app/"
        type="website"
      />
      
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-primary to-accent overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDEtMy42NjcgMy01IDEuMzMzLTIuMzMzIDEtNC42NjctMS02LTItMS4zMzMtMy42NjctMS0yIDEgMS42NjcgMiAyLjMzMyA0LjMzMyAyIDcgMCAyLjY2Ny0uNjY3IDQtMiA0LTEuMzMzIDAtMi0xLTItMyAwLTIgMS00IDMtNiAyLTIgMS00LjY2Ny0zLTgtNC0zLjMzMy02LjY2Ny01LTgtNS0xLjMzMyAwLTIuMzMzLjY2Ny0zIDIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Driven by Passion & Innovation</span>
              </div>

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span ref={el} className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"></span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-white/90 mb-8 max-w-xl"
            >
              Empowering businesses with innovative digital solutions that drive real results and sustainable growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button onClick={() => navigate('/get-started')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 group shadow-xl shadow-white/10"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Explore Services
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
            >
              {[
                { label: 'Clients', value: '2🫂' },
                { label: 'Experts', value: '50💪' },
                { label: 'Projects', value: '3⚡' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}

            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent animate-pulse"></div>
            <Player
              autoplay
              loop
              src="https://lottie.host/fe2c5c13-a5a4-4fb5-9c7f-b8684a5211f4/uJFfyADJYt.json"
              className="w-full h-full"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
            >
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-white font-medium">Growing Network</p>
                  <p className="text-white/60 text-sm">Connecting with clients everywhere</p>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;