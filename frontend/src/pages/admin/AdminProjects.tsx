import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Eye,
  X,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Loader2,
  Search,
  Globe,
  Filter,
  Layers,
  Code2,
  FileText,
  Check,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';
import { api } from '../../lib/api';

const CATEGORIES = [
  'Web App',
  'Mobile App',
  'ERP',
  'SaaS',
  'Design',
  'Website',
  'Full-Stack',
  'AI / ML',
  'Cloud Architecture',
];

const PRESET_SERVICES = [
  'Full-Stack Web Engineering',
  'Mobile App Development',
  'UI/UX & Product Design',
  'Cloud Architecture & DevOps',
  'ERP & CRM Systems',
  'AI Integration & Automation',
  'API Engineering & Microservices',
  'SEO & Performance Tuning',
];

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // Table filters & search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Web search / Autofill state
  const [webUrlInput, setWebUrlInput] = useState('');
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [autofillMessage, setAutofillMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Gallery URL input state
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Web App',
    short_description: '',
    full_description: '',
    technologies: 'React, TypeScript, Tailwind, Node.js',
    services: [] as string[],
    thumbnail: '/assets/image.png',
    images: ['/assets/image.png'] as string[],
    demo_url: '',
    github_url: '',
    featured: true,
    status: 'PUBLISHED',
    seo_title: '',
    seo_description: '',
  });

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const res = await api.getProjects();
      setProjects(res.projects || []);
    } catch {
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setWebUrlInput('');
    setAutofillMessage(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Web App',
      short_description: '',
      full_description: '',
      technologies: 'React, TypeScript, Tailwind, Node.js',
      services: ['Full-Stack Web Engineering'],
      thumbnail: '/assets/image.png',
      images: ['/assets/image.png'],
      demo_url: '',
      github_url: '',
      featured: true,
      status: 'PUBLISHED',
      seo_title: '',
      seo_description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setEditingProject(project);
    setWebUrlInput('');
    setAutofillMessage(null);
    const parsedImages = Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [project.thumbnail || '/assets/image.png'];

    const parsedServices = Array.isArray(project.services)
      ? project.services
      : typeof project.services === 'string'
      ? project.services.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      category: project.category || 'Web App',
      short_description: project.short_description || '',
      full_description: project.full_description || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : project.technologies || '',
      services: parsedServices,
      thumbnail: project.thumbnail || '/assets/image.png',
      images: parsedImages,
      demo_url: project.demo_url || '',
      github_url: project.github_url || '',
      featured: Boolean(project.featured),
      status: project.status || 'PUBLISHED',
      seo_title: project.seo_title || '',
      seo_description: project.seo_description || '',
    });
    setIsModalOpen(true);
  };

  // Web Search / URL Autofill Handler
  const handleAutofillFromUrl = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!webUrlInput.trim()) {
      setAutofillMessage({ type: 'error', text: 'Please enter a valid website or GitHub URL' });
      return;
    }

    setIsAutofilling(true);
    setAutofillMessage(null);

    try {
      const res = await api.autofillProjectFromUrl(webUrlInput.trim());
      if (res && res.data) {
        const enriched = res.data;
        const techString = Array.isArray(enriched.technologies)
          ? enriched.technologies.join(', ')
          : enriched.technologies || formData.technologies;

        const galleryImages = Array.isArray(enriched.images) && enriched.images.length > 0
          ? enriched.images
          : enriched.thumbnail ? [enriched.thumbnail] : formData.images;

        setFormData((prev) => ({
          ...prev,
          title: enriched.title || prev.title,
          slug: enriched.slug || prev.slug,
          category: enriched.category || prev.category,
          short_description: enriched.short_description || prev.short_description,
          full_description: enriched.full_description || prev.full_description,
          technologies: techString,
          thumbnail: enriched.thumbnail || prev.thumbnail,
          images: galleryImages,
          demo_url: enriched.demo_url || (webUrlInput.includes('github.com') ? prev.demo_url : webUrlInput),
          github_url: enriched.github_url || (webUrlInput.includes('github.com') ? webUrlInput : prev.github_url),
          seo_title: enriched.seo_title || prev.seo_title,
          seo_description: enriched.seo_description || prev.seo_description,
        }));

        setAutofillMessage({
          type: 'success',
          text: `Auto-filled details for "${enriched.title || 'project'}" from web metadata!`,
        });
      }
    } catch (err: any) {
      setAutofillMessage({
        type: 'error',
        text: err.message || 'Could not extract metadata from the specified URL',
      });
    } finally {
      setIsAutofilling(false);
    }
  };

  const handleToggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleAddGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newGalleryUrl.trim()],
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      loadProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const handleToggleStatus = async (project: any) => {
    const newStatus = project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await api.updateProject(project.id, { status: newStatus });
      loadProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to update project status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalImages = formData.images.length > 0 ? formData.images : [formData.thumbnail];

    const payload = {
      ...formData,
      slug: generatedSlug,
      technologies: techArray,
      images: finalImages,
      featured: formData.featured ? 1 : 0,
    };

    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, payload);
      } else {
        await api.createProject(payload);
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to save project');
    }
  };

  // Filtered projects for the table
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      !searchTerm.trim() ||
      proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(proj.technologies) && proj.technologies.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      proj.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'All' || proj.category === selectedCategoryFilter;

    const matchesStatus =
      selectedStatusFilter === 'All' || proj.status === selectedStatusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProjects = projects.length;
  const publishedCount = projects.filter((p) => p.status === 'PUBLISHED').length;
  const draftCount = projects.filter((p) => p.status === 'DRAFT').length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-blue-600" />
            Project &amp; Showcase Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic client case studies, live previews, and automated web search / metadata enrichment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadProjects}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            title="Refresh list"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-600/30 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Project
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Total Showcases</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{totalProjects}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <FolderOpen className="h-4 w-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Published</p>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">{publishedCount}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Draft / Review</p>
            <p className="text-xl font-bold text-amber-600 mt-0.5">{draftCount}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
            <Edit2 className="h-4 w-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Featured on Home</p>
            <p className="text-xl font-bold text-indigo-600 mt-0.5">{featuredCount}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, technology, slug, or category..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Category:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#F8FAFC]/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Technologies &amp; Services</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span>Loading projects...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    {projects.length === 0
                      ? 'No projects found. Click "Add New Project" to create your first showcase.'
                      : 'No projects match your search or filter criteria.'}
                  </td>
                </tr>
              ) : (
                filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0">
                          <img
                            src={proj.thumbnail || proj.images?.[0] || '/assets/image.png'}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{proj.title}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                            {proj.short_description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400 font-mono">/{proj.slug || proj.id}</span>
                            {proj.demo_url && (
                              <a
                                href={proj.demo_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5"
                              >
                                <Globe className="h-2.5 w-2.5" /> Demo
                              </a>
                            )}
                            {proj.github_url && (
                              <a
                                href={proj.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-slate-600 hover:underline flex items-center gap-0.5"
                              >
                                <Code2 className="h-2.5 w-2.5" /> Repo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium text-[11px]">
                        {proj.category}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(proj.technologies) ? proj.technologies : [proj.technologies])
                            .slice(0, 3)
                            .map((tech: string, i: number) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]"
                              >
                                {tech}
                              </span>
                            ))}
                          {Array.isArray(proj.technologies) && proj.technologies.length > 3 && (
                            <span className="px-1 py-0.5 text-[9px] text-slate-400 font-medium">
                              +{proj.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        {Array.isArray(proj.services) && proj.services.length > 0 && (
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            <span className="text-slate-400">Services:</span> {proj.services.join(', ')}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {proj.featured ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(proj)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                          proj.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle status"
                      >
                        {proj.status}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right space-x-1.5">
                      <a
                        href={`/projects/${proj.slug || proj.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                        title="View Public Showcase Page"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:text-rose-800 hover:bg-rose-100 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal with Full Options & Web Search */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 text-slate-900 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {editingProject ? 'Edit Engineering Showcase' : 'Add New Project Showcase'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Configure public portfolio metadata, multi-image assets, tech stack, and SEO.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">
              {/* Web Search / Auto-fill Tool Section */}
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/80 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>Search Web / Auto-Fill from URL</span>
                  </div>
                  <span className="text-[10px] text-blue-700 font-medium">Supports live websites &amp; GitHub repos</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Paste a client website, portfolio link, or GitHub repository URL. The system will extract title, description, detected technologies, open-graph imagery, and SEO metadata.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      value={webUrlInput}
                      onChange={(e) => setWebUrlInput(e.target.value)}
                      placeholder="https://github.com/user/project or https://myproject.com"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isAutofilling}
                    onClick={handleAutofillFromUrl}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
                  >
                    {isAutofilling ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Searching Web...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Fetch &amp; Auto-Fill</span>
                      </>
                    )}
                  </button>
                </div>

                {autofillMessage && (
                  <div
                    className={`p-2 rounded-lg text-[11px] flex items-center gap-1.5 ${
                      autofillMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {autofillMessage.type === 'success' ? (
                      <Check className="h-3.5 w-3.5 flex-shrink-0" />
                    ) : (
                      <X className="h-3.5 w-3.5 flex-shrink-0" />
                    )}
                    <span>{autofillMessage.text}</span>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <form id="project-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Details: Title, Slug, Category, Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          title: newTitle,
                          // Auto-generate slug if user hasn't typed custom one
                          slug: editingProject ? prev.slug : newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                        }));
                      }}
                      placeholder="e.g. Enterprise ERP Inventory Portal"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      URL Slug (Permanent Link)
                    </label>
                    <div className="flex items-center">
                      <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg px-2.5 py-2 text-slate-500 text-[11px] font-mono">
                        /projects/
                      </span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="enterprise-erp-inventory"
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-r-lg px-3 py-2 text-slate-900 font-mono text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      <option value="PUBLISHED">Published (Live)</option>
                      <option value="DRAFT">Draft (Internal)</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-0 h-4 w-4"
                      />
                      <span className="text-slate-700 font-medium">Feature on Homepage</span>
                    </label>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Technologies (comma-separated tags) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, TypeScript, Tailwind CSS, Node.js, PostgreSQL"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Python', 'AWS', 'Docker'].map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => {
                          const existing = formData.technologies
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean);
                          if (!existing.includes(tech)) {
                            setFormData({
                              ...formData,
                              technologies: [...existing, tech].join(', '),
                            });
                          }
                        }}
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] transition-colors"
                      >
                        + {tech}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services Delivered */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Services Delivered / Architecture Scope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_SERVICES.map((srv) => {
                      const isSelected = formData.services.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => handleToggleService(srv)}
                          className={`p-2 rounded-lg border text-left text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                              : 'bg-[#F8FAFC] border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300'
                            }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5" />}
                          </div>
                          <span className="truncate">{srv}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Short Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    placeholder="Brief 1-2 sentence overview of the project scope and outcome..."
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Full Case Study &amp; Technical Architecture Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.full_description}
                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                    placeholder="In-depth breakdown: client requirements, architectural hurdles, database scheme, benchmarks, and deployment setup..."
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* External Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Live Demo / Preview URL</label>
                    <input
                      type="url"
                      value={formData.demo_url}
                      onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                      placeholder="https://client-preview.rahnoxa.com"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">GitHub / Code Repository</label>
                    <input
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                      placeholder="https://github.com/organization/repo"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Primary Thumbnail Asset */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Primary Thumbnail Asset (Cloudinary CDN or External URL) *
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F8FAFC] border border-dashed border-slate-300 hover:border-blue-500 rounded-xl text-slate-700 text-xs font-semibold transition-colors">
                        {isUploading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            <span>Uploading to CDN...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 text-blue-600" />
                            <span>Upload Thumbnail from Device</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsUploading(true);
                            try {
                              const res = await api.uploadImage(file, 'rahnoxa/projects');
                              if (res.url) {
                                setFormData((prev) => ({
                                  ...prev,
                                  thumbnail: res.url,
                                  images: prev.images.includes(res.url) ? prev.images : [res.url, ...prev.images],
                                }));
                              }
                            } catch (err: any) {
                              alert(err.message || 'Image upload failed');
                            } finally {
                              setIsUploading(false);
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      {formData.thumbnail && (
                        <div className="w-14 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                          <img
                            src={formData.thumbnail}
                            alt="Thumbnail preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      placeholder="https://res.cloudinary.com/... or https://..."
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>

                {/* Multi-Image Gallery */}
                <div className="space-y-2">
                  <label className="block text-slate-700 font-semibold">
                    Gallery Showcase Images ({formData.images.length})
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Additional architectural screenshots, mobile mockups, and dashboard views shown in the public showcase lightbox.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="Paste image URL to add to gallery..."
                      className="flex-1 bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryImage}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add URL
                    </button>
                    <label className="cursor-pointer px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1">
                      {isGalleryUploading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      <span>Upload to Gallery</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isGalleryUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsGalleryUploading(true);
                          try {
                            const res = await api.uploadImage(file, 'rahnoxa/projects/gallery');
                            if (res.url) {
                              setFormData((prev) => ({
                                ...prev,
                                images: [...prev.images, res.url],
                              }));
                            }
                          } catch (err: any) {
                            alert(err.message || 'Gallery upload failed');
                          } finally {
                            setIsGalleryUploading(false);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {formData.images.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-50"
                        >
                          <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-rose-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-slate-900/80 text-white rounded text-[9px] font-medium">
                              Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SEO Optimization Fields */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-xs">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span>SEO &amp; Meta Tags Configuration</span>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">SEO Title Tag</label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="e.g. Enterprise ERP Platform Case Study | Rahnoxa Portfolio"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Meta Description</label>
                    <textarea
                      rows={2}
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      placeholder="Concise 150-character summary for Google search snippets and social sharing cards..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="project-form"
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-colors"
              >
                {editingProject ? 'Save Project Changes' : 'Create &amp; Publish Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
