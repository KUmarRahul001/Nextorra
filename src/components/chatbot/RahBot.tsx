import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Layers,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Can you build a custom ERP system?',
  'How much does a web/mobile app cost?',
  'What technologies do you use?',
  'I want to submit a project enquiry',
  'Tell me about engineering internships',
];

const RahBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Hello! I am **RahBot**, the AI Business Assistant for **Rahnoxa**.\n\nI can help you explore our software development services, discuss your project requirements, estimate scopes, or prepare a project enquiry for our engineering team.\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Full Stack Web Apps',
    description: '',
    budget: 'To be discussed',
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isTyping) return;

    if (!textToSend) setInput('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // If user asks to submit a project or enquiry, reveal lead form
    if (
      messageContent.toLowerCase().includes('submit') ||
      messageContent.toLowerCase().includes('enquiry') ||
      messageContent.toLowerCase().includes('hire') ||
      messageContent.toLowerCase().includes('start a project')
    ) {
      setShowLeadForm(true);
    }

    try {
      const response = await api.sendChatMessage(messageContent, conversationId);
      if (response.conversation_id) {
        setConversationId(response.conversation_id);
      }

      const botMessage: Message = {
        id: response.message.id || `bot-${Date.now()}`,
        role: 'assistant',
        content: response.message.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content:
            'I can answer questions regarding Rahnoxa services (Web, Mobile, ERP, SaaS, API Integrations) and take your project requirements directly. Would you like to [Start a Project](/get-started) or leave an enquiry?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.description) return;

    setIsSubmittingLead(true);
    try {
      await api.submitLead({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        service: leadForm.service,
        project_description: leadForm.description,
        budget: leadForm.budget,
        source: 'rahbot_chat',
        conversation_id: conversationId,
      });

      setLeadSubmitted(true);
      setShowLeadForm(false);

      const confirmMsg: Message = {
        id: `confirm-${Date.now()}`,
        role: 'assistant',
        content: `🎉 Thank you **${leadForm.name}**! Your project enquiry has been submitted to the Rahnoxa engineering team.\n\nWe have logged your request for **${leadForm.service}** and will review your technical specifications. A technical lead will follow up with you at **${leadForm.email}** within 24 hours.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, confirmMsg]);
    } catch {
      alert('Failed to submit enquiry. Please check your internet connection or email us directly.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 border border-blue-400/30 transition-all group"
              aria-label="Open RahBot Assistant"
            >
              <div className="relative">
                <Bot className="h-5 w-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
              </div>
              <span className="font-semibold text-sm tracking-wide pr-1">Ask RahBot</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Expandable Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[88vh] bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-slate-100 font-sans"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400">
                  <Bot className="h-5 w-5" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">RahBot</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30 font-mono">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Rahnoxa Business &amp; Engineering</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setMessages([messages[0]]);
                    setShowLeadForm(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Body & Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 hide-scrollbar text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="p-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-cyan-400 self-start mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-bl-none leading-relaxed'
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed">
                      {msg.content}
                    </div>
                    <div className="text-[10px] text-right mt-1 opacity-60">
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 self-start mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-slate-400 text-xs pl-2">
                  <Bot className="h-4 w-4 text-cyan-400 animate-pulse" />
                  <span className="inline-flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              )}

              {/* In-Chat Requirement / Lead Submission Form */}
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-slate-950 border border-blue-500/40 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Quick Project Enquiry
                    </span>
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+91..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Primary Service</label>
                      <select
                        value={leadForm.service}
                        onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Custom ERP Systems">Custom ERP Systems</option>
                        <option value="Full Stack Web Apps">Full Stack Web Apps</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="SaaS Products">SaaS Products</option>
                        <option value="API Integration">API Integration</option>
                        <option value="Custom Software">Custom Software</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Project Summary *</label>
                      <textarea
                        required
                        rows={2}
                        value={leadForm.description}
                        onChange={(e) => setLeadForm({ ...leadForm, description: e.target.value })}
                        placeholder="Brief overview of features, expected users, or timeline..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
                    >
                      {isSubmittingLead ? 'Submitting...' : 'Submit Enquiry to Rahnoxa'}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto hide-scrollbar">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-white border border-slate-700/60 hover:border-blue-500/40 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about our services, ERP, or projects..."
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                className={`p-2.5 rounded-xl transition-all ${
                  input.trim() && !isTyping
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 hover:bg-blue-500'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RahBot;
