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
      <div className="min-h-screen bg-white flex items-center justify-center text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading Project Showcase...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAFCFF] flex flex-col items-center justify-center text-slate-700 px-4 py-20">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Project Not Found</h1>
        <p className="text-slate-500 text-sm mb-8 text-center max-w-md">
          The project showcase you are looking for might have been archived or removed.
        </p>
        <Link
          to="/#portfolio"
          className="btn btn-primary"
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

      <div className="min-h-screen bg-[#FAFCFF] text-slate-900 pt-28 pb-24 relative overflow-hidden gradient-mesh-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          {/* Back Navigation */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors text-xs font-semibold shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </button>
          </div>

          {/* Project Header Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                {project.category || 'Engineering Showcase'}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                {project.short_description || project.description}
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Project Metadata &amp; Links
              </h3>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn btn-primary text-sm font-semibold shadow-sm"
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
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn btn-outline text-sm font-semibold"
                  >
                    <Github className="h-4 w-4" />
                    <span>Source Repository</span>
                  </a>
                )}

                <button
                  onClick={() => navigate('/get-started')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn btn-outline text-sm font-semibold"
                >
                  <span>Build Similar System</span>
                  <Zap className="h-4 w-4 text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Showcase Hero Image (Click to Expand) */}
          <div className="mb-14">
            <div
              onClick={() => setSelectedImage(images[0])}
              className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl group cursor-pointer aspect-[16/9] max-h-[550px]"
            >
              <img
                src={images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="px-4 py-2 rounded-full bg-white/95 border border-slate-200 text-slate-900 text-xs font-semibold flex items-center gap-2 shadow-lg">
                  <Maximize2 className="h-4 w-4 text-blue-600" />
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
                    className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 cursor-pointer aspect-[16/10] group shadow-xs"
                  >
                    <img
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technical Specifications & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xs">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                  <Layers className="h-5 w-5 text-blue-600" />
                  Project Overview &amp; Architecture
                </h2>

                <div className="prose max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
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
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Technical Stack
                </h3>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs font-mono bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Full size preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
