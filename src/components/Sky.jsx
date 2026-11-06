import { motion } from "framer-motion";
const f = (x) => 22 + 54 * Math.sin(((x % 720) / 720) * Math.PI);
const pts = Array.from({ length: 73 }, (_, i) => i * 20);

// Night-sky backdrop: stars, slow bokeh glows, and a swag of string lights.
export default function Sky() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0f0714]">
      <div className="stars absolute inset-0" />
      <motion.div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[#7a1d3a]/40 blur-[130px]" animate={{ x: [0, 70, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute -right-40 top-1/2 h-[520px] w-[520px] rounded-full bg-[#4a1a7a]/40 blur-[130px]" animate={{ x: [0, -70, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} />
      <svg viewBox="0 0 1440 110" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-0 h-24 w-full">
        <path d={"M" + pts.map((x) => `${x} ${f(x)}`).join(" L")} fill="none" stroke="#e8b04a" strokeOpacity=".3" />
        {pts.filter((_, i) => i % 4 === 2).map((x, i) => (
          <motion.circle key={x} cx={x} cy={f(x) + 7} r="5" fill="#ffc15a" style={{ filter: "drop-shadow(0 0 8px #ff9d2e)" }}
            animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.6, repeat: Infinity, delay: (i % 6) * 0.4 }} />
        ))}
      </svg>
    </div>
  );
}