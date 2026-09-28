"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { faqData } from "@/data/faqData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialOptions = ["Thinking of hiring Christian?", "Get Advice from Christian", "Contact Christian"];
const initialMessage = { text: "Choose a topic below, or search the FAQ topics.", options: initialOptions };

export function FAQChat() {
  const router = useRouter();
  const [answer, setAnswer] = useState(initialMessage);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length) answerRef.current?.focus();
  }, [history]);

  const chooseTopic = (topic: string) => {
    const routes: Record<string, string> = { "Contact Christian": "/contact", "View projects": "/projects", "About Christian": "/about" };
    if (routes[topic]) { router.push(routes[topic]); return; }
    const external: Record<string, string> = {
      "Imagine Software": "https://www.imagine-software.org/",
      "Companies Expert YouTube (soft skills)": "https://www.youtube.com/@TheCompaniesExpert/videos",
    };
    if (external[topic]) { window.open(external[topic], "_blank", "noopener,noreferrer"); return; }
    setHistory((previous) => [...previous, topic]);
    setAnswer(faqData[topic] ?? { text: "That topic is not in this FAQ. Choose another topic or contact me directly.", options: initialOptions });
  };

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim().toLowerCase();
    if (!term) return;
    const matches = Object.keys(faqData).filter((topic) => topic.toLowerCase().includes(term));
    if (matches.length === 1) chooseTopic(matches[0]);
    else {
      setHistory((previous) => [...previous, query.trim()]);
      setAnswer({ text: matches.length ? "Choose a matching topic." : "No matching FAQ topics. Try projects, experience, resume, or contact me directly.", options: matches.length ? matches : initialOptions });
    }
    setQuery("");
  };

  return (
    <div className="w-full max-w-2xl space-y-6 rounded-lg border bg-card p-5 sm:p-6">
      <p className="text-sm text-muted-foreground">A guide to my work and advice, with answers I have written.</p>
      <div ref={answerRef} tabIndex={-1} role="region" aria-label="FAQ answer" className="space-y-4">
        {history.length > 0 && <h2 className="text-lg font-semibold">{history[history.length - 1]}</h2>}
        <p className="leading-relaxed">{answer.text}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {answer.options.map((option) => <Button key={option} variant="outline" onClick={() => chooseTopic(option)} className="min-h-11 h-auto whitespace-normal text-left">{option}</Button>)}
      </div>
      <form onSubmit={search} className="space-y-2 border-t pt-5">
        <label htmlFor="faq-search" className="block text-sm font-medium">Search FAQ topics</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Projects, experience, resume…" className="min-h-11 flex-1" />
          <Button type="submit" disabled={!query.trim()} className="min-h-11">Search topics</Button>
        </div>
      </form>
      {history.length > 0 && <Button variant="ghost" className="min-h-11" onClick={() => { setAnswer(initialMessage); setHistory([]); setQuery(""); document.getElementById("faq-search")?.focus(); }}>Start over</Button>}
    </div>
  );
}
