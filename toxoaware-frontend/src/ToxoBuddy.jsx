/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Sparkles,
  Loader2,
  User,
  Bot,
  RefreshCcw,
} from "lucide-react";

export default function ToxoBuddy() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Saya ToxoBuddy, asisten AI pribadimu. Ada yang ingin ditanyakan seputar Toksoplasmosis, kesehatan kehamilan, atau tips merawat kucing yang aman?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickQuestions = [
    "Apa itu tokso?",
    "Apakah pelihara kucing bahaya?",
    "Ciri daging tidak aman?",
    "Bahaya untuk ibu hamil?",
  ];

  const handleSend = async (textMessage = input) => {
    if (!textMessage.trim()) return;

    const userMessage = { role: "user", content: textMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.ocuscan.my.id/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Koneksi terputus. Pastikan server backend sudah menyala.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[100dvh] md:h-[85vh] flex flex-col pb-[72px] md:pb-0">
      {/* Header Neo-brutalism */}
      <div className="bg-[#FFC900] border-b-4 md:border-4 border-black p-4 md:p-6 text-black flex justify-between items-center md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shrink-0 z-20 relative">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-2 md:border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles
              size={20}
              className="text-black md:w-6 md:h-6"
              strokeWidth={3}
            />
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight leading-none">
              ToxoBuddy AI
            </h2>
            <p className="text-black font-bold text-[10px] md:text-xs uppercase flex items-center gap-1.5 md:gap-2 mt-1">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#23A094] border border-black rounded-full animate-pulse"></span>{" "}
              Online & Siap Membantu
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 md:p-3 bg-white border-2 md:border-4 border-black hover:bg-[#FF90E8] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 md:active:translate-y-1 md:active:translate-x-1 active:shadow-none"
          title="Reset Chat"
        >
          <RefreshCcw
            size={18}
            strokeWidth={3}
            className="text-black md:w-5 md:h-5"
          />
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-[#f4f4f0] md:bg-white md:border-x-4 md:border-black overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6 hide-scrollbar relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none"></div>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 md:gap-4 relative z-10 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${msg.role === "user" ? "bg-[#FF90E8] text-black" : "bg-white text-black"}`}
            >
              {msg.role === "user" ? (
                <User size={16} strokeWidth={3} className="md:w-5 md:h-5" />
              ) : (
                <Bot size={20} strokeWidth={3} className="md:w-6 md:h-6" />
              )}
            </div>

            <div
              className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 text-xs md:text-base leading-relaxed border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {/* Render format markdown sederhana dengan spasi */}
              {msg.content.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 md:gap-4 relative z-10 animate-in fade-in">
            <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-white border-2 md:border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Bot
                size={20}
                strokeWidth={3}
                className="text-black md:w-6 md:h-6"
              />
            </div>
            <div className="bg-white border-2 md:border-4 border-black p-3 md:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 text-black font-bold uppercase text-xs md:text-sm">
              <Loader2
                size={14}
                className="animate-spin text-black md:w-4 md:h-4"
                strokeWidth={3}
              />{" "}
              Mengetik...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#C4A1FF] border-y-4 md:border-4 border-black p-3 md:p-4 shrink-0 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-30">
        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="flex gap-2 overflow-x-auto pb-3 md:pb-4 hide-scrollbar">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="shrink-0 px-3 py-1.5 md:px-4 md:py-2 bg-white hover:bg-[#FFC900] text-black text-[10px] md:text-xs font-black uppercase border-2 md:border-4 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 md:active:translate-x-1 md:active:translate-y-1 active:shadow-none whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 md:gap-3 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="TANYAKAN SESUATU..."
              className="w-full bg-white border-2 md:border-4 border-black px-3 py-2 md:px-4 md:py-4 outline-none transition-all text-black font-black uppercase placeholder-black/50 focus:bg-[#f4f4f0] text-xs md:text-base"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 md:w-14 md:h-14 shrink-0 bg-black hover:bg-[#23A094] text-white border-2 md:border-4 border-black flex items-center justify-center transition-all disabled:opacity-50 disabled:scale-100 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 md:active:translate-x-1 md:active:translate-y-1 p-0 m-0"
          >
            <Send
              size={16}
              strokeWidth={3}
              className="ml-0.5 md:w-5 md:h-5 md:ml-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
