import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Kumar',
    position: 'Founder, Rahnoxa',
    quote: 'We are a focused engineering team delivering robust and scalable software architectures. Every project pushes our technical standards forward.',
    stars: 5
  },
  {
    id: 2,
    name: 'Anita Sharma',
    position: 'Freelance Consultant',
    quote: 'Rahnoxa’s transparent approach gave me confidence as a small business owner starting online.',
    stars: 5
  },
  {
    id: 3,
    name: 'Sanjay Mehta',
    position: 'Startup Enthusiast',
    quote: 'They may be new, but their commitment and drive show great potential.',
    stars: 4
  },
  {
    id: 4,
    name: 'Priya Singh',
    position: 'Local Boutique Owner',
    quote: 'Honest advice and genuine effort helped me take the first steps in marketing my boutique.',
    stars: 5
  }
];

const ClientsSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="section bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" id="clients">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-5"></div>
      
      <div className="container relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Clients</span> Across Industries
          </h2>
          <p className="text-gray-600">See what our clients have to say about working with us</p>
        </motion.div>
        
        {/* Removed fake client logos */}

        {/* Testimonials */}
        <div className="relative">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass-effect h-12 w-12 rounded-full shadow-glass flex items-center justify-center text-primary hover:text-accent transition-colors hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x scroll-smooth hide-scrollbar"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="glass-effect p-8 rounded-xl border border-white/20 relative group">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20 group-hover:text-accent/20 transition-colors duration-300" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic relative z-10">"{testimonial.quote}"</p>
                  
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass-effect h-12 w-12 rounded-full shadow-glass flex items-center justify-center text-primary hover:text-accent transition-colors hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
