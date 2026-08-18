import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, User, Clock, ShieldCheck, Search } from 'lucide-react';
import { api } from '../../lib/api';

const AdminChat: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In our DB model, conversations are maintained at the edge
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-cyan-400" />
          RahBot Conversation Transcripts
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review visitor interactions, conversation flows, and qualification states recorded by the RahBot AI assistant.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-400 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center mx-auto">
          <Bot className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-white">Live Edge Visitor Telemetry</h3>
        <p className="max-w-md mx-auto text-slate-400 leading-relaxed">
          RahBot automatically converts engaged conversations into structured records in the <b>Leads &amp; Enquiries</b> pipeline with the source tag <code>rahbot_chat</code>.
        </p>
      </div>
    </div>
  );
};

export default AdminChat;
