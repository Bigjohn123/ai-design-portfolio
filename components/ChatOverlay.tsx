
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "你是一个资深的 AI 与设计专家，正在为你的个人作品集访客提供咨询。你说话风格专业、优雅、富有前瞻性。你会基于这个访客的兴趣提供关于生成式设计、AI 技术栈（React, AI SDK）以及未来趋势的见解。"
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "抱歉，我现在无法回应。" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "哎呀，连接 AI 时出了一点小问题。请稍后再试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`chat-overlay ${isOpen ? 'open' : ''}`}>
      <div className="chat-backdrop" onClick={onClose} />

      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-end p-0 sm:p-6 pointer-events-none">
        <div className="chat-panel pointer-events-auto rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] w-full max-w-[400px]">
          {/* Header */}
          {/* Header */}
          <div className="p-4 border-b border-light flex items-center justify-between bg-surface">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white" style={{ width: 40, height: 40 }}>
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold text-base">AI 创意顾问</h3>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  在线实时对话
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-light transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-primary text-3xl">waving_hand</span>
                </div>
                <p className="text-muted font-medium">你好！我是 Alex 的 AI 助手。想聊聊设计还是技术？</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-card text-main rounded-bl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card p-4 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-light bg-surface">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="输入你的消息..."
                className="w-full bg-body border border-light rounded-2xl py-3 pl-4 pr-14 focus:outline-none focus:border-primary transition-all shadow-inner text-sm text-main"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-50 disabled:grayscale"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
            <p className="text-[10px] text-center text-muted mt-3 uppercase tracking-widest font-bold opacity-50">
              Powered by Google Gemini AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverlay;
