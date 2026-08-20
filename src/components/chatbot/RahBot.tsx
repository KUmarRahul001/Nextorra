import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  CheckCircle2,
  Clock,
  RefreshCw,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { api } from '../../lib/api';
import { ChatMessage, ConversationContext, LeadFormData } from './types';
import { resolveService } from './serviceResolver';
import { buildBotDecision } from './responseBuilder';
import { createInitialContext, updateConversationContext } from './conversationState';

const QUICK_PROMPTS = [
  'Can you build a custom ERP system?',
  'Tell me about Full-Stack Web Apps',
  'How much does a project cost?',
  'What mobile technologies do you use?',
  'I want to submit a project enquiry',
  'Tell me about engineering internships',
];

// Helper to render Markdown bold and links safely
const FormattedMessage: React.FC<{ text?: string; onNavigate: (path: string) => void }> = ({
  text = '',
  onNavigate,
}) => {
  if (!text || typeof text !== 'string') {
    return null;
  }
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

  return (
    <span className="leading-relaxed">
      {parts.map((part, idx) => {
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            const [, label, url] = match;
            const isInternal = url.startsWith('/');
            return isInternal ? (
              <button
                key={idx}
                onClick={() => onNavigate(url)}
                className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded font-semibold text-xs transition-colors"
              >
                <span>{label}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            ) : (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded font-semibold text-xs transition-colors"
              >
                <span>{label}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            );
          }
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-bold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
};

export const RahBot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>(createInitialContext());
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const [leadForm, setLeadForm] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    service: 'ERP & Enterprise Applications',
    budget: '₹39,999 – ₹75,000',
    timeline: 'Within 1 Month',
    description: '',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I am **RahBot**, the AI Engineering Assistant for **Rahnoxa**.\n\nI can help you explore our software development services (Custom ERP, Web Apps, Mobile Apps, SaaS, API Integrations), estimate scopes, or prepare a project enquiry for our engineering team.\n\nHow can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ctaType: 'submit_enquiry',
        ctaLabel: 'Submit Project Enquiry',
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showLeadForm]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInput('');
    setIsTyping(true);

    const detectedService = resolveService(textToSend, context);
    const { intent } = detectIntent(textToSend, detectedService, context);
    const updatedContext = updateConversationContext(
      context,
      textToSend,
      intent,
      detectedService.service?.id,
      detectedService.service?.name
    );
    setContext(updatedContext);

    // Call backend assistant API with local deterministic intelligence fallback
    try {
      const response: any = await api.sendChatMessage(textToSend, context.conversationId);

      const replyContent = response?.data?.reply || response?.reply || response?.data?.message;
      if (!replyContent) {
        throw new Error('Empty or invalid remote AI response');
      }

      const ctaType = response?.data?.ctaType || response?.ctaType || 'none';
      const ctaLabel = response?.data?.ctaLabel || response?.ctaLabel;
      const targetRoute = response?.data?.targetRoute || response?.targetRoute;

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: replyContent,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            ctaType,
            ctaLabel,
            targetRoute,
          },
        ]);
        setIsTyping(false);
      }, 400);
    } catch (err) {
      console.warn('Using local RahBot fallback rule engine:', err);
      const botReply = buildBotDecision(textToSend, detectedService, updatedContext);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: botReply.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            ctaType: botReply.ctaType,
            ctaLabel: botReply.ctaLabel,
            targetRoute: botReply.targetRoute,
          },
        ]);
        if (botReply.shouldOpenForm) {
          setShowLeadForm(true);
        }
        setIsTyping(false);
      }, 400);
    }
  };

  const handleCTAClick = (msg: ChatMessage) => {
    if (msg.ctaType === 'submit_enquiry' || msg.ctaType === 'consultation') {
      setShowLeadForm(true);
    } else if (msg.targetRoute) {
      navigate(msg.targetRoute);
      setIsOpen(false);
    } else {
      setShowLeadForm(true);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      const leadPayload = {
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        company: leadForm.company || '',
        service_requested: leadForm.service,
        estimated_budget: leadForm.budget,
        timeline: leadForm.timeline,
        notes: `[Submitted via RahBot Assistant]\n${leadForm.description}`,
      };

      await api.createLead(leadPayload);
      setLeadSubmitted(true);
      setShowLeadForm(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `lead-success-${Date.now()}`,
          role: 'assistant',
          content: `✅ **Thank you, ${leadForm.name}!**\n\nYour project enquiry for **${leadForm.service}** has been received. I personally review all technical requirements and reply via email / WhatsApp within **24–48 hours** with a scoped architecture breakdown.\n\nYou can also contact me directly at **contact.rahnoxa@protonmail.com** or **+91 8434237052**.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Lead submission failed:', err);
      alert('Unable to send enquiry. Please check your internet connection or email us directly.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <>
      {/* ── Trigger Launcher Floating Button ── */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-4 py-3 bg-white text-slate-800 hover:text-blue-600 rounded-2xl shadow-xl border border-slate-200 hover:border-blue-300 transition-all group"
              aria-label="Open RahBot Assistant"
            >
              <div className="relative p-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Bot className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="text-left pr-1">
                <p className="font-bold text-xs text-slate-900 leading-none">RahBot</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Engineering Assist</p>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Expandable Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-2 right-2 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] xs:w-[calc(100vw-2rem)] sm:w-[420px] md:w-[440px] h-[540px] xs:h-[580px] sm:h-[620px] max-h-[92vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800 font-sans"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Bot className="h-4 w-4" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">RahBot</h3>
                    <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-semibold">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span>Rahnoxa Engineering</span>
                    <span className="inline-flex items-center gap-0.5 text-blue-600 text-[10px] font-medium">
                      <Clock className="h-2.5 w-2.5" />
                      24–48h SLA
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowLeadForm((prev) => !prev)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    showLeadForm
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                  title={showLeadForm ? 'Close Enquiry Form' : 'Open Project Enquiry Form'}
                >
                  <FileText className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: `reset-${Date.now()}`,
                        role: 'assistant',
                        content: 'Chat session restarted. How can I help you today?',
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        }),
                        ctaType: 'submit_enquiry',
                        ctaLabel: 'Submit Project Enquiry',
                      },
                    ]);
                    setContext(createInitialContext());
                    setShowLeadForm(false);
                    setLeadSubmitted(false);
                  }}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body & Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 hide-scrollbar text-xs sm:text-sm bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 self-start mt-0.5 flex-shrink-0">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none leading-relaxed shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed">
                      <FormattedMessage text={msg.content} onNavigate={handleNavigate} />
                    </div>

                    {/* Contextual CTA Action Button */}
                    {msg.role === 'assistant' && msg.ctaType && msg.ctaType !== 'none' && !showLeadForm && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5">
                        <span className="text-[10px] text-slate-500">
                          {msg.ctaType === 'submit_enquiry' ? 'Ready to discuss scope?' : 'Learn more:'}
                        </span>
                        <button
                          onClick={() => handleCTAClick(msg)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-lg shadow-sm transition-all"
                        >
                          <span>{msg.ctaLabel || 'View Details'}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    <div className="text-[9px] text-right mt-1 opacity-60">
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 self-start mt-0.5 flex-shrink-0">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-slate-500 text-xs pl-2">
                  <Bot className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span className="inline-flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              )}

              {/* In-Chat Requirement / Lead Submission Form */}
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  className="p-4 rounded-xl bg-white border border-blue-200 space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Project Enquiry (24–48h SLA)
                    </span>
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="text-slate-400 hover:text-slate-700 text-xs px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
                    >
                      Close ✕
                    </button>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 mb-1 font-medium">Email *</label>
                        <input
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 mb-1 font-medium">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">Primary Service Required</label>
                      <select
                        value={leadForm.service}
                        onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="ERP & Enterprise Applications">Custom ERP & Enterprise Applications</option>
                        <option value="Full Stack Web Apps">Full Stack Web Apps</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="SaaS Products">SaaS Products</option>
                        <option value="Custom Software & API Integration">Custom Software & API Integration</option>
                        <option value="Desktop Applications">Desktop Applications</option>
                        <option value="Modern Website Design & Engineering">Modern Website Design & Engineering</option>
                        <option value="B2B Lead Generation">B2B Lead Generation</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="Email Marketing & Lifecycle Automation">Email Marketing & Lifecycle Automation</option>
                        <option value="SMS Marketing & Transactional Alerts">SMS Marketing & Transactional Alerts</option>
                        <option value="Voice Call & IVR Solutions">Voice Call & IVR Solutions</option>
                        <option value="Missed Call Alert Service">Missed Call Alert Service</option>
                        <option value="Brand & Graphic Design">Brand & Graphic Design</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">Project Specifications / Requirements *</label>
                      <textarea
                        required
                        rows={2}
                        value={leadForm.description}
                        onChange={(e) => setLeadForm({ ...leadForm, description: e.target.value })}
                        placeholder="Tell us about the modules, expected user load, integrations, or timeline..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>{isSubmittingLead ? 'Submitting Enquiry...' : 'Submit Project Enquiry'}</span>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                    <p className="text-[10px] text-slate-500 text-center">
                      Guaranteed review &amp; reply within 24 to 48 hours.
                    </p>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex gap-1.5 overflow-x-auto hide-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-colors shadow-2xs font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about custom ERP, apps, pricing..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white rounded-xl transition-colors disabled:text-slate-400"
                  aria-label="Send Message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RahBot;
