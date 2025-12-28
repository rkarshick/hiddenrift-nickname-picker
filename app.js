// app.js — HiddenRift Team Name Picker (standalone)
// 3 random names from ADJECTIVES + NOUNS, nouns pluralized, funny combos, refresh + select.

const ADJECTIVES = [
  "Epic","Legendary","Savage","Rad","Wild","Dope","Crazy","Insane","Lit","Boss",
  "Extra","Fire","Fierce","Fresh","Fly","Funky","Hyped","Sick","Sweet","Imaginary",
  "Wicked","Awesome","Brutal","Chill","Cool","Dynamic","Electric","Fabulous","Glam","Groovy",
  "Hilarious","Hyper","Jazzy","Killer","Lively","Mad","Neon","Outrageous","Pumped","Quirky",
  "Raging","Sassy","Spicy","Thrilling","Unreal","Viral","Xtreme","Youthful","Velvet","Breezy",
  "Cheeky","Dazzling","Energetic","Fiery","Gritty","Illuminated","Jolly","Kooky","Luminous",
  "Mighty","Nimble","Psyched","Wonderful","Riot","Spunky","Turbo","Ultra","Vivid","Whacky",
  "Rubber","Blazing","Cosmic","Galactic","Kinetic","Mystic","Radiant","Stellar","Swirling","Expensive",
  "Soft","Big","Drifting","Echoing","Fluxing","Glowing","Hazey","Igniting","Jeting","Luminary",
  "Profound","Invisable","Rebel","Messy","Ultimate","Valiant","Annoying","Brave",
  "Kind","Quiet","Gaming","Noob","Adventerous","Small","Stoked","Expired","Broken","Burnt","Turnt",
  "Ugly","Simping","Censored","Sour","Wealthy","Shook","Vindicated","Bizarre","Strange","Unusual",
  "Curious","Extraordinary","Eccentric","Absurd","Strongest","Chunky",
];

const NOUNS = [
  "Couch","Pillow","Spoon","Kiwi","Rock","Banana","Pie","Monk","Lamp","Glove",
  "Toaster","Shoe","Carpet","Stapler","Mirror","Book","Emu","Bicycle","Desk","Chair",
  "Bed","Fridge","Puppet","Hat","Bacon","Bagel","Backpack","Nacho","Glasses","Cup",
  "Key","Burrito","Pen","Baddie","Candy","Umbrella","Watch","Camera","Guitar","Drum",
  "Avenger","Clock","Hammer","Nail","Screwdriver","Wrench","Toast","Smudge","Glue","HedgeHog",
  "Hulk","Highlighter","Otter","Cat King","Hero","Envelope","Sloth","Calculator","Toilet",
  "Litter Box","Eraser","Chalk","Warrior","Badger","Fish","Newspaper","Apple","Hamster","Globe",
  "Mailman","Flashlight","Tent","Sleeping Bag","Garter Snake","Sunglasses","Jacket","Boots","Scarf","Beanie",
  "Belt","Bracelet","Necklace","Earrings","Ring","Tie","Headphones","Bulb","Fisherman","Drone",
  "Zombie","Dancer","Sunflower","Earwig","Slapper","Ninja","Dog Catcher","Mouse","Avacodo","Wound","Dad",
  "Mom","Sparrow","Kettle","Coffee","Tea","Sugar","Salt","Pepper","Spice","Oil","Vinegar","Sauce",
  "Butter","Cheese","Milk","Juice","Water","Soda","Gum","Popcorn","Chips",
  "Pretzel","Corn Dog","Bestie","Vortex","Panda","Bull","Penguin","Bee","Stinger","Dip","Bunny","Lunchlady",
  "Overlord","Sensei","Draggon","Knight","Bandit","Clown","Cake","Rascal"
];

// ---- DOM ----
const nicknameGrid = document.getElementById("nicknameGrid");
const refreshBtn = document.getElementById("refreshBtn");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const exportBtn = document.getElementById("exportBtn");
const selectedNameEl = document.getElementById("selectedName");
const pulse = document.getElementById("pulse");

let currentSet = [];
let selected = "";

// ---- Funny modifiers (optional) ----
const PREFIXES = [
  "", "", "", "",               // keep most plain
  "The",
  "Team",
  "Riftborn",
  "Absolutely",
  "Definitely",
  "Totally",
  "Suspiciously",
  "Chronically",
  "Allegedly"
];

const SUFFIXES = [
  "", "", "", "",
  "of Doom",
  "of Snacks",
  "from Accounting",
  "of the Rift",
  "with No Plan",
  "but Worse",
  "on Probation",
  "in Disguise"
];

// ---- Pluralization helpers ----
const IRREGULAR_PLURALS = new Map([
  ["Mouse", "Mice"],
  ["Goose", "Geese"],
  ["Man", "Men"],
  ["Woman", "Women"],
  ["Child", "Children"],
  ["Person", "People"],
  ["Tooth", "Teeth"],
  ["Foot", "Feet"],
  ["Fish", "Fish"], // often same plural; can be "Fishes" but Fish is funnier here
]);

// Words/phrases that should not be pluralized normally (multi-word nouns)
const PHRASE_PLURALS = new Map([
  ["Cat King", "Cat Kings"],
  ["Litter Box", "Litter Boxes"],
  ["Sleeping Bag", "Sleeping Bags"],
  ["Garter Snake", "Garter Snakes"],
  ["Corn Dog", "Corn Dogs"],
  ["Dog Catcher", "Dog Catchers"],
]);

function pluralizeNoun(noun) {
  // phrase override
  if (PHRASE_PLURALS.has(noun)) return PHRASE_PLURALS.get(noun);

  // irregular override (single-word)
  if (IRREGULAR_PLURALS.has(noun)) return IRREGULAR_PLURALS.get(noun);

  // basic rules
  const lower = noun.toLowerCase();

  // if ends with s, x, z, ch, sh => add es
  if (/(s|x|z|ch|sh)$/i.test(noun)) return noun + "es";

  // consonant + y => ies
  if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(noun)) return noun.slice(0, -1) + "ies";

  // f/fe => ves (some words)
  if (/(fe|f)$/i.test(noun) && !/(chef|roof|belief)$/i.test(lower)) {
    // quick conservative: only for a few likely cases; most nouns here won't hit this
    if (/(knife|life|wolf|leaf|shelf|thief|wife)$/i.test(lower)) {
      return noun.replace(/fe$/i, "ves").replace(/f$/i, "ves");
    }
  }

  return noun + "s";
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function playPulse() {
  if (!pulse) return;
  pulse.classList.remove("play");
  void pulse.offsetWidth;
  pulse.classList.add("play");
}

function makeTeamName() {
  const adj = pickRandom(ADJECTIVES);
  const noun = pickRandom(NOUNS);
  const pluralNoun = pluralizeNoun(noun);

  // Occasionally add extra silliness
  const prefix = pickRandom(PREFIXES);
  const suffix = pickRandom(SUFFIXES);

  // Sometimes double-adjective for extra funny
  const doubleAdjChance = Math.random();
  let adjPart = adj;
  if (doubleAdjChance < 0.22) {
    const adj2 = pickRandom(ADJECTIVES);
    // avoid exact duplicate
    adjPart = (adj2 === adj) ? adj : `${adj} ${adj2}`;
  }

  // Format variations
  const styleRoll = Math.random();
  let base;
  if (styleRoll < 0.55) {
    base = `${adjPart} ${pluralNoun}`;
  } else if (styleRoll < 0.80) {
    base = `${pluralNoun} of ${adjPart}`;
  } else {
    base = `${adjPart} ${pluralNoun}`;
  }

  let full = base;
  if (prefix) full = `${prefix} ${full}`;
  if (suffix) full = `${full} ${suffix}`;

  // Clean double spaces
  return full.replace(/\s+/g, " ").trim();
}

function generateThreeUnique() {
  const set = new Set();
  // safety loop
  while (set.size < 3) {
    set.add(makeTeamName());
  }
  return Array.from(set);
}

function render() {
  nicknameGrid.innerHTML = "";

  currentSet.forEach((name) => {
    const div = document.createElement("div");
    div.className = "nick" + (name === selected ? " selected" : "");
    div.textContent = name;
    div.onclick = () => {
      selected = name;
      selectedNameEl.textContent = name;
      copyBtn.disabled = false;
      shareBtn.disabled = false;
      render();
    };
    nicknameGrid.appendChild(div);
  });

  if (!selected) {
    selectedNameEl.textContent = "—";
    copyBtn.disabled = true;
    shareBtn.disabled = true;
  }
}

// ---- Buttons ----
refreshBtn.onclick = () => {
  playPulse();
  selected = "";
  currentSet = generateThreeUnique();
  render();
};

copyBtn.onclick = async () => {
  if (!selected) return;
  await navigator.clipboard.writeText(selected);
  alert(`Copied: ${selected}`);
};

shareBtn.onclick = async () => {
  if (!selected) return;
  const text = `Our HiddenRift team name: ${selected}`;
  if (navigator.share) {
    await navigator.share({ title: "HiddenRift Team Name", text });
  } else {
    await navigator.clipboard.writeText(text);
    alert("Share not supported — copied to clipboard instead.");
  }
};

exportBtn.onclick = (e) => {
  e.preventDefault();
  const blob = new Blob(
    [JSON.stringify({ adjectives: ADJECTIVES, nouns: NOUNS }, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hiddenrift-name-lists.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// Initial load
currentSet = generateThreeUnique();
render();
