import React, { useState, useEffect } from 'react';
import { Database, Plus, Edit2, Trash2, X, Sparkles, BookOpen } from 'lucide-react';
import { api } from '../../lib/api';

const CATEGORIES = ['company', 'services', 'pricing', 'tech_stack', 'faq', 'contact', 'policy'];

const AdminKnowledge: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'services',
    content: '',
    tags: '',
  });

  const loadKnowledge = async () => {
    setIsLoading(true);
    try {
      const res = await api.getKnowledge();
      setItems(res.items || []);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'services',
      content: '',
      tags: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      content: item.content,
      tags: item.tags || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this knowledge entry?')) return;
    try {
      await api.deleteKnowledge(id);
      loadKnowledge();
    } catch (err: any) {
      alert(err.message || 'Failed to delete entry');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateKnowledge({ id: editingItem.id, ...formData });
      } else {
        await api.createKnowledge(formData);
      }
      setIsModalOpen(false);
      loadKnowledge();
    } catch (err: any) {
      alert(err.message || 'Failed to save knowledge item');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Database className="h-6 w-6 text-cyan-400" />
            RahBot Knowledge Base
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage company context, service parameters, FAQs, and engineering capabilities used by RahBot to answer client enquiries accurately.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-semibold rounded-lg shadow-md shadow-blue-600/30 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Knowledge Item
        </button>
      </div>

      {/* Grid of Knowledge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-2 py-12 text-center text-slate-500">Loading knowledge base...</div>
        ) : items.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-slate-500">
            No knowledge entries found. Click "Add Knowledge Item" to feed information to RahBot.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[10px] font-semibold uppercase tracking-wider border border-blue-500/30">
                    {item.category}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 rounded bg-slate-50 hover:bg-blue-600 text-slate-500 hover:text-slate-900"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 rounded bg-slate-50 hover:bg-rose-600 text-slate-500 hover:text-slate-900"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>

              {item.tags && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 truncate">
                  Tags: {item.tags}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingItem ? 'Edit Knowledge Item' : 'Add Knowledge Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. ERP Inventory Module Capabilities"
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 capitalize"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Content / Context *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed factual information for RahBot to cite..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Search Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="erp, inventory, warehouse, rbac"
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-50 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-slate-900 font-semibold shadow-md"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKnowledge;
