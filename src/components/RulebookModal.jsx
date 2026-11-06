import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RANKS } from "@/data/cards";

export default function RulebookModal({ open, onOpenChange, deck, rules, setRules, focusRank }) {
  const [rank, setRank] = useState("A");
  useEffect(() => { if (focusRank) setRank(focusRank); }, [focusRank, open]);
  const edit = (id, field, value) => setRules({ ...rules, [id]: { ...rules[id], [field]: value } });
  const reset = (id) => { const { [id]: _, ...rest } = rules; setRules(rest); };
  const field = "border-[#c8302f]/25 bg-white text-[#4a1a22]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto border-[#c8302f]/25 bg-[#fffaf0] text-[#4a1a22] no-scrollbar">
        <DialogHeader><DialogTitle className="font-display text-2xl text-[#c8302f]">Rulebook</DialogTitle></DialogHeader>
        <p className="text-sm text-[#4a1a22]/60">Edits apply instantly to cards not yet drawn and last for this session.</p>
        <div className="flex flex-wrap gap-2">
          {RANKS.map((r) => (
            <button key={r.r} onClick={() => setRank(r.r)} className={`h-9 min-w-9 rounded-full border px-3 text-sm transition ${rank === r.r ? "border-[#c8302f] bg-[#c8302f] text-white" : "border-[#c8302f]/25 text-[#4a1a22]/70 hover:border-[#c8302f]"}`}>{r.r}</button>
          ))}
        </div>
        <div className="space-y-4">
          {deck.filter((c) => c.rank === rank).map((c) => (
            <div key={c.id} className="space-y-2 rounded-2xl border border-[#c8302f]/15 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className={`font-display text-xl ${c.red ? "text-[#c8302f]" : "text-[#9a6a10]"}`}>{c.rank}{c.suit}</span>
                {rules[c.id] && <Button variant="ghost" size="sm" onClick={() => reset(c.id)} className="text-[#4a1a22]/60">Reset to default</Button>}
              </div>
              <Input value={c.title} onChange={(e) => edit(c.id, "title", e.target.value)} className={field} aria-label="Title" />
              <Textarea value={c.text} onChange={(e) => edit(c.id, "text", e.target.value)} className={field} aria-label="Rule" />
              <Textarea value={c.couple} onChange={(e) => edit(c.id, "couple", e.target.value)} className={field} aria-label="Couple rule" />
              <Input value={c.pen} onChange={(e) => edit(c.id, "pen", e.target.value)} className={field} aria-label="Penalty" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}