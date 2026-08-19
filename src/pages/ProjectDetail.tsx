import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Maximize2,
  X,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { api } from '../lib/api';
import { projects as fallbackProjects } from '../data/projects';
import config from '../config';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        if (slug) {
          const res = await api.getProject(slug);
          if (res && res.project) {
            setProject(res.project);
          } else {
            // Find in fallback local projects
            const found = fallbackProjects.find((p) => p.id === slug || p.id.includes(slug));
            setProject(found || null);
          }
        }
      } catch (err) {
        console.warn('Could not fetch project from API, checking local data:', err);
        const found = fallbackProjects.find((p) => p.id === slug || p.id.includes(slug || ''));
        setProject(found || null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading Project Showcase...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 px-4 py-20">
        <h1 className="text-3xl font-extrabold text-white mb-4">Project Not Found</h1>
        <p className="text-slate-400 text-sm mb-8 text-center max-w-md">
          The project showcase you are looking for might have been archived or removed.
        </p>
        <Link
          to="/#portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-blue-600/30"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Projects
        </Link>
      </div>
    );
  }

  const images = Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : [project.thumbnail || '/assets/image.png'];

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : typeof project.technologies === 'string'
    ? project.technologies.split(',').map((t: string) => t.trim())
    : project.tags || ['Engineering'];

  return (
    <>
      <Helmet>
        <title>{`${project.title} – Portfolio Showcase | ${config.siteName}`}</title>
        <meta
          name="description"
          content={project.short_description || project.description || `Technical case study and architecture overview for ${project.title}.`}
        />
        <link rel="canonical" href={`${config.siteUrl}/projects/${project.slug || project.id}`} />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-24 relative overflow-hidden">
        {/* Ambient top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          {/* Back Navigation */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </button>
          </div>

          {/* Project Header Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                {project.category || 'Engineering Showcase'}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {project.short_description || project.description}
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Project Metadata &amp; Links
              </h3>

              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/30"
                  >
                    <span>View Live Deployment</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>Source Repository</span>
                  </a>
                )}

                <button
                  onClick={() => navigate('/get-started')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-600/20"
                >
                  <span>Build Similar System</span>
                  <Zap className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Showcase Hero Image (Click to Expand) */}
          <div className="mb-14">
            <div
              onClick={() => setSelectedImage(images[0])}
              className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group cursor-pointer aspect-[16/9] max-h-[550px]"
            >
              <img
                src={images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl">
                  <Maximize2 className="h-4 w-4 text-cyan-400" />
                  <span>Click to view full screen</span>
                </div>
              </div>
            </div>

            {/* Multiple Gallery Images if available */}
            {images.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer aspect-[16/10] group"
                  >
                    <img
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technical Specifications & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-xl">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <Layers className="h-5 w-5 text-blue-400" />
                  Project Overview &amp; Architecture
                </h2>

                <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  {project.full_description ? (
                    project.full_description.split('\n').map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{project.short_description || project.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Specifications */}
            <div className="space-y-6">
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Technical Stack
                </h3>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-800/80 space-y-3 text-xs text-slate-400">
                  <div className="flex justify-between items-center">
                    <span>Category</span>
                    <span className="font-semibold text-white">{project.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Deployment Status</span>
                    <span className="font-semibold text-emerald-400">Live &amp; Verified</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Engineering SLA</span>
                    <span className="font-semibold text-white">Full-Stack Production</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Image Lightbox Modal ── */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={selectedImage}
                alt="Full screen project preview"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-slate-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProjectDetail;
