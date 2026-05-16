import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { chatbotExamples } from '../data/mockData.js';

export default function Chatbot({ onToast }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hi, I am EcoSort AI. Ask me where an item should go and I will guide you.',
    },
  ]);

  const quickPrompts = useMemo(() => chatbotExamples.map((item) => item.q), []);

  const answerQuestion = (question) => {
    const lower = question.toLowerCase();
    const match = chatbotExamples.find((item) => lower.includes(item.q.toLowerCase().slice(0, 10)));

    if (lower.includes('battery') || lower.includes('batteries')) return chatbotExamples[0].a;
    if (lower.includes('pizza')) return chatbotExamples[1].a;
    if (lower.includes('milk')) return chatbotExamples[2].a;
    if (match) return match.a;
    return 'Use the item material as the first clue: dry recyclables go to the blue bin, organics to the green bin, and hazardous or e-waste needs authorized collection. Upload a photo in Scanner for a stronger AI match.';
  };

  const sendMessage = (question = input) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [...current, { from: 'user', text: trimmed }]);
    setInput('');

    window.setTimeout(() => {
      setMessages((current) => [...current, { from: 'bot', text: answerQuestion(trimmed) }]);
      onToast?.('EcoSort Assistant replied', 'Segregation guidance is ready.');
    }, 420);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-eco-500 to-blue-500 text-white shadow-glow transition hover:scale-105"
        whileTap={{ scale: 0.94 }}
        aria-label="Open EcoSort chatbot"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-[2rem] border border-white/30 bg-white/90 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-ink-900/92"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
          >
            <div className="flex items-center justify-between border-b border-eco-900/10 bg-gradient-to-r from-eco-600 to-blue-600 p-4 text-white dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/18">
                  <Bot className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-black">EcoSort Assistant</p>
                  <p className="text-xs text-white/78">Live segregation guidance</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/12" aria-label="Close chatbot">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="hide-scrollbar flex max-h-[24rem] flex-col gap-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.from}-${index}`}
                  className={`max-w-[86%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${
                    message.from === 'bot'
                      ? 'bg-eco-50 text-ink-900 dark:bg-white/10 dark:text-white'
                      : 'ml-auto bg-ink-950 text-white dark:bg-eco-500'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.text}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto px-4 pb-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="shrink-0 rounded-full border border-eco-700/15 bg-eco-50 px-3 py-2 text-xs font-bold text-eco-800 transition hover:bg-eco-100 dark:border-white/10 dark:bg-white/8 dark:text-eco-100"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 border-t border-eco-900/10 p-4 dark:border-white/10"
            >
              <Sparkles className="h-5 w-5 text-eco-600 dark:text-eco-300" />
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about batteries, pizza boxes..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-900/40 dark:placeholder:text-white/35"
              />
              <button type="submit" className="grid h-10 w-10 place-items-center rounded-full bg-eco-600 text-white transition hover:bg-eco-700">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
