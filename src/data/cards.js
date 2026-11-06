// 13 rank rules x 4 suit twists = 52 unique Diwali cards. Everything here is editable in the Rulebook.
export const SUITS = [
  { s: "♠", n: "Chakri", t: "Add +1 sip to any penalty." },
  { s: "♥", n: "Pyaar", t: "Pick someone to share the penalty with you." },
  { s: "♦", n: "Sona", t: "Say it in your best Bollywood dialogue or double the penalty." },
  { s: "♣", n: "Anaar", t: "Everyone cheers “Shubh Deepavali!” before you act." },
];

export const RANKS = [
  { r: "A", title: "Patakha Waterfall", text: "You start drinking. Clockwise, everyone follows. Nobody stops until the person before them stops.", couple: "Both partners drink at the same time, and stop together.", pen: "Until the person before you stops" },
  { r: "2", title: "Phuljhari", text: "Point at someone. They light up and drink.", couple: "Point at a person or a couple. A couple drinks one sip each.", pen: "2 sips" },
  { r: "3", title: "Rangoli", text: "You drink. Spill nothing, the rangoli is fresh.", couple: "Split the sips between you two.", pen: "3 sips" },
  { r: "4", title: "Ladoo Gobbler", text: "Everyone touches the floor. Last one down drinks.", couple: "A couple counts as one: the slower partner decides who drinks.", pen: "2 sips" },
  { r: "5", title: "Mithai Mix", text: "Everyone who has eaten mithai today drinks.", couple: "If either partner had mithai, both drink.", pen: "1 sip" },
  { r: "6", title: "Golden Glow", text: "Anyone wearing gold or yellow drinks.", couple: "Matching outfits? Double the sips.", pen: "1 sip" },
  { r: "7", title: "Swarg (Heaven)", text: "Hands in the air. Last one up drinks.", couple: "A couple raises hands together. Last couple member up drinks for both.", pen: "2 sips" },
  { r: "8", title: "Mitra (Mate)", text: "Pick a drinking buddy. They drink whenever you do, until the next 8.", couple: "Choose another couple or a solo player. Four hearts, one bond.", pen: "Bond until next 8" },
  { r: "9", title: "Rhyme Rocket", text: "Say a word. Go around rhyming with it. First to freeze or repeat drinks.", couple: "Partners take turns, alternating words.", pen: "2 sips" },
  { r: "10", title: "Diwali Categories", text: "Name a category (types of mithai, firework brands, rangoli colours). First to stall drinks.", couple: "Partners may help each other once.", pen: "2 sips" },
  { r: "J", title: "Never Have I Ever: Shaadi Edition", text: "Mild and funny: hosting disasters, adulting fails, relationship tropes. Anyone who has done it drinks.", couple: "Couples answer together. Disagree? Both drink.", pen: "1 sip per “I have”" },
  { r: "Q", title: "Rishtedaar Aunty", text: "Ask a question. Anyone who answers it loses the round and drinks. Stay in aunty character.", couple: "A couple that answers in unison drinks double.", pen: "2 sips" },
  { r: "K", title: "The Royal Diya", text: "Pour a little of your drink into the Mega Cup and add a house rule. The 4th King chugs the cup and ends the game.", couple: "Both partners pour in. Together they pick the house rule.", pen: "Add to the Mega Cup" },
];

export const buildDeck = () =>
  SUITS.flatMap((su) =>
    RANKS.map((r) => ({
      id: `${r.r}${su.s}`, rank: r.r, suit: su.s, red: su.s === "♥" || su.s === "♦",
      title: r.title, text: `${r.text} ${su.n} twist: ${su.t}`, couple: r.couple, pen: r.pen,
    }))
  );

export const BASE_DECK = buildDeck();
export const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
