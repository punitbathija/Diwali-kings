import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardDeck from "./CardDeck";
import Celebration from "./Celebration";
import { PlayerStrip, label } from "./PlayerManager";

const Cup = ({ fill }) => (
  <svg viewBox="0 0 100 130" className="h-40">
    <defs>
      <clipPath id="cup"><path d="M10 10H90L80 110Q78 122 66 122H34Q22 122 20 110Z" /></clipPath>
      <linearGradient id="liq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd780" /><stop offset="1" stopColor="#e8801f" /></linearGradient>
    </defs>
    <g clipPath="url(#cup)">
      <rect width="100" height="130" fill="#c8302f14" />
      <motion.rect width="100" height="130" fill="url(#liq)" initial={false} animate={{ y: 122 - fill * 112 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
    </g>
    <path d="M10 10H90L80 110Q78 122 66 122H34Q22 122 20 110Z" fill="none" stroke="#b32426" strokeWidth="2.5" />
  </svg>
);

export default function GameBoard({ players, deck, game, setGame, onEdit, onReset }) {
  const [rule, setRule] = useState("");
  const byId = useMemo(() => Object.fromEntries(deck.map((c) => [c.id, c])), [deck]);
  const player = players[game.turn];
  const card = game.current && byId[game.current];

  const draw = () => {
    if (game.current || game.over) return;
    const [id, ...pile] = game.pile;
    const kings = game.kings + (byId[id].rank === "K" ? 1 : 0);
    setGame({ ...game, pile, current: id, kings, over: kings === 4 || pile.length === 0 });
  };
  const next = () => setGame({ ...game, current: null, turn: (game.turn + 1) % players.length });
  const addRule = () => { if (rule.trim()) { setGame({ ...game, houseRules: [...game.houseRules, rule.trim()] }); setRule(""); } };
  const needsRule = card?.rank === "K" && game.kings < 4 && game.houseRules.length < game.kings;

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {game.over && <Celebration />}
      <PlayerStrip players={players} turn={game.turn} />
      <AnimatePresence mode="wait">
        <motion.div key={game.turn + String(game.over)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="text-center">
          <h2 className="font-script text-6xl text-[#c8302f] md:text-7xl">{label(player)}</h2>
          <p className="mt-1 text-xl text-[#4a1a22]/75">{game.over ? "has to chug the Mega Cup" : card ? "Follow the card, then pass the turn" : "Your turn. Draw a card."}</p>
        </motion.div>
      </AnimatePresence>

      <div className="relative flex w-full flex-col items-center gap-12 lg:flex-row lg:justify-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ff9d2e33,transparent_65%)] lg:left-[38%]" />
        <CardDeck card={card} remaining={game.pile.length} onDraw={draw} isCouple={!!player.partner} />
        <aside className="glass flex w-full max-w-xs flex-col items-center p-6">
          <Cup fill={game.kings / 4} />
          <h3 className="font-display mt-3 text-xl text-[#b32426]">The Mega Cup</h3>
          <p className="text-sm text-[#4a1a22]/60">{game.kings} of 4 Kings drawn</p>
          {game.houseRules.length > 0 && <ul className="mt-4 w-full list-disc space-y-1 pl-5 text-sm text-[#4a1a22]">{game.houseRules.map((r, i) => <li key={i}>{r}</li>)}</ul>}
          {needsRule && (
            <div className="mt-4 flex w-full gap-2">
              <input className="field !py-2" value={rule} onChange={(e) => setRule(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addRule()} placeholder="Write a house rule" />
              <button className="btn-primary !px-4 !py-2" onClick={addRule}>Add</button>
            </div>
          )}
        </aside>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {game.over ? <button className="btn-primary" onClick={onReset}>Play again</button> : (
          <>
            <button className="btn-primary" disabled={!!card && needsRule} onClick={card ? next : draw}>{card ? "Pass the turn" : "Draw a card"}</button>
            {card && <button className="btn-ghost" onClick={() => onEdit(card.rank)}>Edit this rule</button>}
          </>
        )}
      </div>
    </div>
  );
}