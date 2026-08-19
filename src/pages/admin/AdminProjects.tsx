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
} from 'lucide-react';
import { api } from '../../lib/api';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Web App',
    short_description: '',
    full_description: '',
    technologies: 'React, TypeScript, Tailwind, Node.js',
    thumbnail: '/assets/image.png',
    demo_url: 'https://rahnoxa.pages.dev',
    github_url: 'https://github.com/KUmarRahul001/Nextorra',
    featured: true,
    status: 'PUBLISHED',
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
    setFormData({
      title: '',
      slug: '',
      category: 'Web App',
      short_description: '',
      full_description: '',
      technologies: 'React, TypeScript, Tailwind, Node.js',
      thumbnail: '/assets/image.png',
      demo_url: 'https://rahnoxa.pages.dev',
      github_url: 'https://github.com/KUmarRahul001/Nextorra',
      featured: true,
      status: 'PUBLISHED',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      short_description: project.short_description,
      full_description: project.full_description || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : project.technologies || '',
      thumbnail: project.thumbnail || '/assets/image.png',
      demo_url: project.demo_url || '',
      github_url: project.github_url || '',
      featured: Boolean(project.featured),
      status: project.status || 'PUBLISHED',
    });
    setIsModalOpen(true);
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
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      images: [formData.thumbnail],
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-blue-400" />
            Project &amp; Showcase Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add and update engineering showcases dynamically on the public Rahnoxa website without modifying code.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-600/30 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Technologies</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No projects found. Click "Add New Project" to create your first showcase.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                          <img
                            src={proj.thumbnail || proj.images?.[0] || '/assets/image.png'}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{proj.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                            {proj.short_description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20 font-medium">
                        {proj.category}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(Array.isArray(proj.technologies) ? proj.technologies : [proj.technologies])
                          .slice(0, 3)
                          .map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {proj.featured ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-500">No</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(proj)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                          proj.status === 'PUBLISHED'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                        }`}
                        title="Click to toggle status"
                      >
                        {proj.status}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-500/20 transition-colors"
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

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 text-slate-100 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {editingProject ? 'Edit Project Showcase' : 'Add New Project Showcase'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Enterprise ERP Inventory Portal"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="ERP">ERP</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Design">Design</option>
                    <option value="Website">Website</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind, Node.js"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Short Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief summary of architectural scope..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Case Study &amp; Architecture Details</label>
                <textarea
                  rows={4}
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="Detailed architectural breakdown, business challenges solved, database design, and key milestones..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Live Demo / Preview URL</label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    placeholder="https://client-preview.rahnoxa.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">GitHub / Code URL</label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/organization/repo"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Thumbnail / Gallery Image Asset URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="/src/components/assets/image.png"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                <label htmlFor="featured" className="text-slate-300 cursor-pointer">
                  Feature in homepage showcase
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
