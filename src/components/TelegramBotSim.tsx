import React, { useState } from 'react';
import { Send, Bot, CheckCheck, Sparkles, Download, Video, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export const TelegramBotSim: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; videoUrl?: string }>>([
    {
      sender: 'bot',
      text: '🤖 Welcome to RealtyMotion Telegram Bot!\n\nSend property photos or paste an MLS link to automatically generate a video.\n\nType /generate to trigger video creation.',
      time: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: textToSend, time: userTime }]);
    if (!customText) setInputText('');
    setIsBotThinking(true);

    try {
      const res = await fetch('/api/telegram-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: textToSend, photosCount: 6, style: 'Cinematic Property Tour' }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsBotThinking(false);
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: data.botReply || 'Video generation initiated!',
            time: botTime,
            videoUrl: textToSend.includes('/generate') ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' : undefined,
          },
        ]);
      }, 1000);
    } catch (e) {
      setIsBotThinking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="border-b border-neutral-800 pb-4">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">
          Mobile Automation
        </h3>
        <h2 className="text-xl font-bold text-white font-serif italic">
          Telegram Bot Assistant (/generate)
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Realtors can create video tours directly on WhatsApp / Telegram while on-site by sending listing photos to the bot.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Telegram Phone Simulator */}
        <div className="md:col-span-7 bg-black p-5 rounded-3xl border border-neutral-800 shadow-2xl space-y-4 max-w-md mx-auto w-full">
          
          {/* Bot Chat Header */}
          <div className="bg-neutral-900/90 p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-black border border-neutral-700 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>RealtyMotion Bot</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-neutral-400">@RealtyMotion_AI_Bot • Online</p>
              </div>
            </div>

            <span className="text-[9px] text-neutral-400 bg-black font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-neutral-800">
              Bot API v3.0
            </span>
          </div>

          {/* Chat Stream Window */}
          <div className="h-96 overflow-y-auto space-y-3 p-3 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-white text-black font-medium rounded-br-none shadow-md'
                      : 'bg-neutral-900 text-neutral-200 rounded-bl-none border border-neutral-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  {/* Video Attachment if Bot Output */}
                  {msg.videoUrl && (
                    <div className="bg-black p-2 rounded-xl border border-neutral-800 space-y-2 mt-2">
                      <div className="relative h-28 w-full rounded-lg overflow-hidden">
                        <img src={msg.videoUrl} alt="Generated Video Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <a
                        href={msg.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 bg-white text-black font-bold uppercase tracking-wider text-[10px] rounded-lg flex items-center justify-center gap-1 block text-center"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download MP4 Video</span>
                      </a>
                    </div>
                  )}

                  <span className={`text-[9px] block text-right font-mono ${msg.sender === 'user' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isBotThinking && (
              <div className="flex justify-start">
                <div className="bg-neutral-900 p-3 rounded-2xl text-xs text-amber-400 flex items-center gap-2 border border-neutral-800">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Bot is generating video from listing photos...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Command Buttons */}
          <div className="flex gap-1.5 overflow-x-auto text-[10px] font-bold uppercase tracking-wider">
            <button
              onClick={() => handleSendMessage('/newlisting')}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-lg border border-neutral-800 whitespace-nowrap"
            >
              /newlisting
            </button>
            <button
              onClick={() => handleSendMessage('/generate')}
              className="px-3 py-1.5 bg-white text-black rounded-lg font-bold whitespace-nowrap shadow-md"
            >
              /generate
            </button>
            <button
              onClick={() => handleSendMessage('/help')}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 rounded-lg border border-neutral-800 whitespace-nowrap"
            >
              /help
            </button>
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type /generate or paste photos..."
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="p-2.5 bg-white text-black font-bold rounded-xl hover:bg-neutral-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Feature Highlights Column */}
        <div className="md:col-span-5 bg-neutral-900/90 p-6 rounded-2xl border border-neutral-800 space-y-5 shadow-xl">
          <h3 className="font-bold text-xs uppercase tracking-wider text-white">Why Realtors Love Telegram Bot Workflow</h3>

          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-start gap-3 bg-black p-4 rounded-xl border border-neutral-800">
              <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-serif italic text-sm mb-0.5">Zero App Downloads Needed</strong>
                <span className="text-neutral-400">Agents send photos from their phone camera roll directly into the chat while walking the property.</span>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-black p-4 rounded-xl border border-neutral-800">
              <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-serif italic text-sm mb-0.5">Instant Social Reel Output</strong>
                <span className="text-neutral-400">Receives 9:16 Instagram Reel MP4 ready for immediate posting in 2 minutes.</span>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-black p-4 rounded-xl border border-neutral-800">
              <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-serif italic text-sm mb-0.5">Synced Brand Overlay</strong>
                <span className="text-neutral-400">Agent logo, headshot, and phone number are automatically applied.</span>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
