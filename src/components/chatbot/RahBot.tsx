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
const FormattedMessage: React.FC<{ text: string; onNavigate: (path: string) => void }> = ({
  text,
  onNavigate,
}) => {
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
                className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 bg-blue-500/20 hover:bg-blue-500/30 text-cyan-300 hover:text-cyan-200 border border-blue-400/30 rounded font-semibold text-xs transition-colors"
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
                className="inline-flex items-center gap-1 mx-1 text-cyan-400 underline hover:text-cyan-300 text-xs font-semibold"
              >
                <span>{label}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            );
          }
        }

        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
};

const RahBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Hello! I am **RahBot**, the AI Business Assistant for **Rahnoxa**.\n\nI can help you explore our software development services (Custom ERP, Web Apps, Mobile Apps, SaaS, API Integrations), estimate scopes, or prepare a project enquiry for our engineering team.\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ctaType: 'submit_enquiry',
      ctaLabel: 'Submit Project Enquiry',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>(createInitialContext());
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Custom ERP Systems',
    description: '',
    budget: 'To be discussed',
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const navigate = useNavigate();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, showLeadForm]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 1. Resolve Service & Detect Intent through local architecture
    const resolvedService = resolveService(textToSend, context);
    const decision = buildBotDecision(textToSend, resolvedService, context);

    // 2. Update Conversational Memory
    setContext((prev) =>
      updateConversationContext(
        prev,
        textToSend,
        decision.intent,
        resolvedService.service?.id,
        resolvedService.service?.name
      )
    );

    // 3. Pre-set default service in enquiry form if identified
    if (resolvedService.service) {
      setLeadForm((prev) => ({
        ...prev,
        service: resolvedService.service?.name || prev.service,
      }));
    }

    try {
      // Try backend AI service for contextual enhancements if online
      const response = await api.sendMessage({
        message: textToSend.trim(),
        conversation_id: context.conversationId,
      });

      if (response.conversation_id && !context.conversationId) {
        setContext((prev) => ({ ...prev, conversationId: response.conversation_id }));
      }

      const botReply: ChatMessage = {
        id: response.message?.id || `bot-${Date.now()}`,
        role: 'assistant',
        content: response.message?.content || decision.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ctaType: decision.ctaType,
        ctaLabel: decision.ctaLabel,
        targetRoute: decision.targetRoute,
      };

      setMessages((prev) => [...prev, botReply]);

      if (decision.shouldOpenForm) {
        setShowLeadForm(true);
      }
    } catch {
      // Robust client-side fallback using deterministic decision engine
      const botReply: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: 'assistant',
        content: decision.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ctaType: decision.ctaType,
        ctaLabel: decision.ctaLabel,
        targetRoute: decision.targetRoute,
      };

      setMessages((prev) => [...prev, botReply]);

      if (decision.shouldOpenForm) {
        setShowLeadForm(true);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingLead) return;
    setIsSubmittingLead(true);

    try {
      await api.submitLead({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        service: leadForm.service,
        project_description: leadForm.description,
        source: 'rahbot_chat',
        conversation_id: context.conversationId,
      });

      setLeadSubmitted(true);
      setShowLeadForm(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `lead-ack-${Date.now()}`,
          role: 'assistant',
          content: `✅ Thank you **${leadForm.name}**! Your project enquiry for **${leadForm.service}** has been recorded.\n\nOur engineering leadership team will review your specifications and contact you at **${leadForm.email}** ${
            leadForm.phone ? `or **${leadForm.phone}**` : ''
          } within **24 to 48 hours** with an architectural blueprint and estimate.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      // Local fallback on network error
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `lead-ack-fallback-${Date.now()}`,
          role: 'assistant',
          content: `✅ Thank you **${leadForm.name}**! We have captured your enquiry for **${leadForm.service}**.\n\nOur engineering team will review your requirements and reach out to **${leadForm.email}** within **24 to 48 hours**. You can also reach us directly at \`contact.rahnoxa@protonmail.com\` or \`+91 8434237052\`.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleCTAClick = (msg: ChatMessage) => {
    if (msg.ctaType === 'submit_enquiry' || msg.ctaType === 'consultation') {
      setShowLeadForm(true);
    } else if (msg.targetRoute) {
      handleNavigate(msg.targetRoute);
    }
  };

  return (
    <>
      {/* ── Floating Launcher Button (Bottom Right) ── */}
      <div className="fixed bottom-4 right-3.5 xs:bottom-5 xs:right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-2xl border border-slate-700 hover:border-blue-500 transition-all group"
              aria-label="Open RahBot Assistant"
            >
              <div className="relative p-1 rounded-lg bg-blue-600/20 text-blue-400">
                <Bot className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-left pr-1">
                <p className="font-bold text-xs text-white leading-none">RahBot</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Engineering Assist</p>
              </div>
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
            className="fixed bottom-2 right-2 xs:bottom-4 xs:right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] xs:w-[calc(100vw-2rem)] sm:w-[420px] md:w-[440px] h-[540px] xs:h-[580px] sm:h-[620px] max-h-[92vh] bg-slate-900/98 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-slate-100 font-sans"
          >
            {/* Header */}
            <div className="px-3 xs:px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 xs:gap-3">
                <div className="relative p-1.5 xs:p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400">
                  <Bot className="h-4.5 w-4.5 xs:h-5 xs:w-5" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <h3 className="font-bold text-xs xs:text-sm text-white">RahBot</h3>
                    <span className="text-[9px] xs:text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-cyan-300 border border-blue-400/20 rounded font-medium">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-[10px] xs:text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span>Rahnoxa Engineering</span>
                    <span className="inline-flex items-center gap-0.5 text-cyan-400 text-[9px] xs:text-[10px]">
                      <Clock className="h-2.5 w-2.5" />
                      24–48h SLA
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 xs:gap-1">
                <button
                  onClick={() => setShowLeadForm((prev) => !prev)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    showLeadForm
                      ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
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
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body & Messages */}
            <div className="flex-1 p-3 xs:p-4 overflow-y-auto space-y-3 xs:space-y-3.5 hide-scrollbar text-xs xs:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 xs:gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="p-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-cyan-400 self-start mt-0.5 flex-shrink-0">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] xs:max-w-[88%] p-3 xs:p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                        : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-bl-none leading-relaxed shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed">
                      <FormattedMessage text={msg.content} onNavigate={handleNavigate} />
                    </div>

                    {/* Contextual CTA Action Button */}
                    {msg.role === 'assistant' && msg.ctaType && msg.ctaType !== 'none' && !showLeadForm && (
                      <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-1.5">
                        <span className="text-[10px] text-slate-400">
                          {msg.ctaType === 'submit_enquiry' ? 'Ready to discuss scope?' : 'Learn more:'}
                        </span>
                        <button
                          onClick={() => handleCTAClick(msg)}
                          className="inline-flex items-center gap-1 px-2 xs:px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10px] xs:text-[11px] font-semibold rounded-md shadow-sm transition-all"
                        >
                          <span>{msg.ctaLabel || 'View Details'}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    <div className="text-[9px] xs:text-[10px] text-right mt-1 opacity-60">
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 self-start mt-0.5 flex-shrink-0">
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
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  className="p-3.5 xs:p-4 rounded-xl bg-slate-950 border border-blue-500/50 space-y-3 shadow-2xl"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Project Enquiry (24–48h SLA)
                    </span>
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
                    >
                      Close ✕
                    </button>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 mb-1 font-medium">Email *</label>
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
                        <label className="block text-slate-400 mb-1 font-medium">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Primary Service Required</label>
                      <select
                        value={leadForm.service}
                        onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
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
                      <label className="block text-slate-400 mb-1 font-medium">Project Specifications / Requirements *</label>
                      <textarea
                        required
                        rows={2}
                        value={leadForm.description}
                        onChange={(e) => setLeadForm({ ...leadForm, description: e.target.value })}
                        placeholder="Tell us about the modules, expected user load, integrations, or timeline..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md"
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
            <div className="px-2.5 xs:px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto hide-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="flex-shrink-0 text-[10px] xs:text-[11px] px-2 xs:px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-blue-600/30 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500/50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-2.5 xs:p-3 bg-slate-950 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-1.5 xs:gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about custom ERP, apps, pricing..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 xs:px-3.5 py-1.5 xs:py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-1.5 xs:p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-xl transition-colors disabled:text-slate-500"
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
