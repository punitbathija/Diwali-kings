import "./festive.css";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import useSession from "@/hooks/useSession";
import { BASE_DECK, shuffle } from "@/data/cards";
import { PlayerManager } from "@/components/PlayerManager";
import GameBoard from "@/components/GameBoard";
import RulebookModal from "@/components/RulebookModal";
import Scene from "@/components/Scene";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function App() {
  const [players, setPlayers] = useSession("dk-players", []);
  const [rules, setRules] = useSession("dk-rules", {});
  const [game, setGame] = useSession("dk-game", null);
  const [rulesOpen, setRulesOpen] = useState(false), [playersOpen, setPlayersOpen] = useState(false);
  const [focusRank, setFocusRank] = useState("A");
  const deck = useMemo(() => BASE_DECK.map((c) => ({ ...c, ...rules[c.id] })), [rules]);

  const start = () => setGame({ pile: shuffle(BASE_DECK.map((c) => c.id)), turn: 0, current: null, kings: 0, houseRules: [], over: false });
  const newGame = () => window.confirm("Reshuffle the deck and start over with the same players?") && start();
  // Add or remove players mid-game without losing whose turn it is.
  const changePlayers = (list) => {
    if (game) {
      const idx = list.findIndex((p) => p.id === players[game.turn]?.id);
      setGame({ ...game, turn: idx >= 0 ? idx : Math.min(game.turn, list.length - 1) });
    }
    setPlayers(list);
  };

  return (
    <div className="relative min-h-screen px-4 pb-[38vh] pt-24 text-[#4a1a22]">
      <Scene />
      <nav className="fixed inset-x-0 top-3 z-30 flex justify-center gap-2">
        {game && <button className="btn-ghost" onClick={() => setPlayersOpen(true)}>Players</button>}
        <button className="btn-ghost" onClick={() => { setFocusRank("A"); setRulesOpen(true); }}>Rulebook</button>
        {game && <button className="btn-ghost" onClick={newGame}>New game</button>}
      </nav>
      <main className="mx-auto flex max-w-5xl flex-col items-center">
        {game ? (
          <GameBoard players={players} deck={deck} game={game} setGame={setGame} onEdit={(r) => { setFocusRank(r); setRulesOpen(true); }} onReset={start} />
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 text-center text-[#c8302f]">
              <p className="text-2xl tracking-[0.35em]">HAPPY</p>
              <h1 className="font-script -mt-2 text-[6.5rem] leading-[1.1] md:text-[9rem]">Diwali</h1>
              <p className="mx-auto max-w-md text-xl">The Kings Cup night. Draw a card, light a diya, and may the best liver win.</p>
            </motion.div>
            <PlayerManager players={players} setPlayers={setPlayers} onStart={start} />
          </>
        )}
      </main>
      <Dialog open={playersOpen} onOpenChange={setPlayersOpen}>
        <DialogContent className="max-w-lg border-[#c8302f]/20 bg-[#fffaf0] p-3">
          <DialogTitle className="sr-only">Players</DialogTitle>
          <PlayerManager inGame players={players} setPlayers={changePlayers} onStart={() => setPlayersOpen(false)} />
        </DialogContent>
      </Dialog>
      <RulebookModal open={rulesOpen} onOpenChange={setRulesOpen} deck={deck} rules={rules} setRules={setRules} focusRank={focusRank} />
    </div>
  );
}