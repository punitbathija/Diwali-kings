import { motion } from "framer-motion";

const Mandala = () => (
  <svg viewBox="-100 -100 200 200" fill="none" stroke="#e8b04a" strokeWidth="1" className="h-52 w-52">
    {Array.from({ length: 16 }, (_, i) => <ellipse key={i} rx="9" ry="42" cy="-52" transform={`rotate(${i * 22.5})`} strokeOpacity=".7" />)}
    {Array.from({ length: 8 }, (_, i) => <path key={i} d="M0 -30 Q10 -18 0 -6 Q-10 -18 0 -30" transform={`rotate(${i * 45})`} />)}
    <circle r="94" strokeOpacity=".35" /><circle r="30" strokeOpacity=".6" />
    <path className="flame" d="M0 -16 Q10 -2 0 9 Q-10 -2 0 -16Z" fill="#ffb347" stroke="none" />
  </svg>
);

// Draw pile + flip card. Back: maroon with a diya mandala. Front: ivory playing card.
export default function CardDeck({ card, remaining, onDraw, isCouple }) {
  const face = card?.red ? "text-[#a3122f]" : "text-[#3a1420]";
  return (
    <div className="relative h-[440px] w-[min(310px,80vw)] [perspective:1600px]">
      {remaining > 2 && ["-rotate-[4deg]", "rotate-[3deg]"].map((r) => <div key={r} className={`absolute inset-0 ${r} rounded-[22px] border border-[#e8b04a]/30 bg-[#3a0d22]`} />)}
      <motion.div className="absolute inset-0" whileHover={card ? {} : { y: -6 }} whileTap={card ? {} : { scale: 0.985 }}>
        <motion.div onClick={!card ? onDraw : undefined} animate={{ rotateY: card ? 180 : 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }} className={`h-full w-full ${card ? "" : "cursor-pointer"}`}>
          <div className="absolute inset-0 grid place-items-center rounded-[22px] bg-[radial-gradient(circle_at_50%_40%,#7a1d3a,#3a0d22_70%)] p-2 shadow-[0_30px_80px_rgba(90,20,30,.35)] [backface-visibility:hidden]">
            <div className="grid h-full w-full place-items-center rounded-[16px] border border-[#e8b04a]/60">
              <div className="flex flex-col items-center gap-3"><Mandala /><p className="font-display text-lg text-[#ffd98a]">Tap to draw</p></div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-[22px] bg-[#fffdf8] p-2 shadow-[0_30px_90px_rgba(255,157,46,.3)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {card && (
              <div className="relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[#b98a2f]/60 px-5 py-4 text-[#3a1420]">
                <span className={`pointer-events-none absolute inset-0 grid place-items-center text-[260px] leading-none opacity-[0.05] ${face}`}>{card.suit}</span>
                <div className={`font-display flex items-start justify-between text-3xl leading-none ${face}`}>
                  <span className="flex flex-col items-center"><span>{card.rank}</span><span className="text-2xl">{card.suit}</span></span>
                  <span className="text-2xl">{card.suit}</span>
                </div>
                <h3 className="font-display mt-2 text-center text-[26px] font-semibold leading-tight">{card.title}</h3>
                <p className="mt-3 flex-1 overflow-y-auto text-center text-[13.5px] leading-relaxed text-[#3a1420]/80">{card.text}
                  {isCouple && <span className="mt-3 block rounded-xl bg-[#7a1d3a]/10 p-2 text-[#7a1d3a]">Couple rule: {card.couple}</span>}
                </p>
                <p className="mx-auto mt-3 rounded-full border border-[#b98a2f] px-4 py-1.5 text-center text-sm font-semibold text-[#7a1d3a]">{card.pen}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}