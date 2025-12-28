// Can U Xcape Team Name Generator (standalone)

// ---------- CONFIG ----------
const PREFIX_CHANCE = 0.28; // 28% chance to include a prefix
const PREFIXES = ["Ultimate", "Mega", "Ultra", "Turbo", "Cosmic", "Legendary", "Hyper", "Prime", "Supreme"];

// Adjectives (use yours or expand)
const ADJECTIVES = [
  "Epic","Legendary","Savage","Rad","Wild","Dope","Insane","Lit","Boss","Fire",
  "Wicked","Awesome","Chill","Electric","Groovy","Hyped","Neon","Quirky","Spicy","Unreal",
  "Cosmic","Galactic","Kinetic","Mystic","Radiant","Stellar","Swirling","Vivid","Whacky","Turbo",
  "Cheeky","Dazzling","Energetic","Fiery","Gritty","Jolly","Kooky","Luminous","Mighty","Nimble",
  "Psyched","Wonderful","Riot","Spunky","Ultra","Valiant","Brave","Curious","Extraordinary","Absurd",
];

// Nouns (funny + creatures + trendy). These should be singular phrases generally.
const NOUNS = [
  // Food chaos
  "Taco","Burrito","Nacho","Pizza","Bagel","Donut","Pretzel","Corn Dog","Waffle","Pancake",
  "Cupcake","Brownie","Cookie","Pickle","Nugget","Dumpling","Ramen","Sushi","Hot Sauce","Milkshake",

  // Creatures (more!)
  "Raccoon","Possum","Capybara","Axolotl","Otter","Panda","Penguin","Goose","Llama","Alpaca",
  "Frog","Cobra","Shark","Octopus","Giraffe","Koala","Hamster","Ferret","Sloth","Chameleon",
  "Mantis","Narwhal","Wombat","Badger","Corgi","Pug","T-Rex","Velociraptor","Mothman","Kraken",

  // Meme/trendy
  "Meme Lord","Influencer","Streamer","Gamer","Noob","Tryhard","Bestie","Baddie","Main Character",
  "NPC","Speedrunner","Emote","Clout Goblin","Rizzler","Chaos Gremlin","Goblin Mode","Snack Goblin","Lore Keeper","Vibe Wizard",

  // Random fun objects
  "Rubber Duck","Beanie","Sunglasses","Helmet","Trophy","Lantern","Cannon","Jetpack","Boomerang","Disco Ball",
  "Yo-Yo","Skateboard","Hoverboard","Magic Wand","Portal","Goggles","Cape","Confetti","Glitter Bomb","Moon Rock",
];

// Group nouns (DO NOT pluralize these)
const GROUP_NOUNS = [
  "Squad","Crew","Mob","Horde","Pack","Swarm","Gang","Tribe","Coven","Council",
  "Alliance","Legion","Party","Clique","Guild","Order","Wrecking Crew","Dream Team",
  "Rift Runners","Portal Patrol","Chaos Committee","Snack Council","Vibe Council","Goblin Council",
];

// ---------- DOM ----------
const screenGenerate = document.getElementById("screen-generate");
const screenResult = document.getElementById("screen-result");

const choicesEl = document.getElementById("choices");
const refreshBtn = document.getElementById("refreshBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const hintText = document.getElementById("hintText");
const resultName = document.getElementById("resultName");

let currentChoices = [];
let selectedIndex = -1;

// ---------- HELPERS ----------
function randInt(max) {
  return Math.floor(Math.random() * max);
}

function pick(arr) {
  return arr[randInt(arr.length)];
}

function maybePrefix() {
  return Math.random() < PREFIX_CHANCE ? pick(PREFIXES) : "";
}

// pluralize basic nouns; skip group nouns
function pluralize(noun) {
  // if it's a group noun (or already plural-ish phrase), return as-is
  const isGroup = GROUP_NOUNS.includes(noun);
  if (isGroup) return noun;

  // pluralize last word in a phrase: "Rubber Duck" -> "Rubber Ducks"
  const parts = noun.split(" ");
  const last = parts[parts.length - 1];

  const pluralLast = pluralizeWord(last);
  parts[parts.length - 1] = pluralLast;
  return parts.join(" ");
}

function pluralizeWord(word) {
  const lower = word.toLowerCase();

  // Don't pluralize words that already look plural
  if (lower.endsWith("s")) return word;

  // y -> ies (party -> parties) (but toy -> toys)
  if (lower.endsWith("y") && !"aeiou".includes(lower[lower.length - 2] || "")) {
    return word.slice(0, -1) + "ies";
  }

  // s, x, z, ch, sh -> es
  if (
    lower.endsWith("s") ||
    lower.endsWith("x") ||
    lower.endsWith("z") ||
    lower.endsWith("ch") ||
    lower.endsWith("sh")
  ) {
    return word + "es";
  }

  // f/fe -> ves (knife -> knives) (keep it minimal; not perfect)
  if (lower.endsWith("fe")) return word.slice(0, -2) + "ves";
  if (lower.endsWith("f")) return word.slice(0, -1) + "ves";

  // default
  return word + "s";
}

function buildTeamName() {
  const adj = pick(ADJECTIVES);
  const prefix = maybePrefix();

  // 25% chance to use group noun
  const useGroup = Math.random() < 0.25;
  const baseNoun = useGroup ? pick(GROUP_NOUNS) : pick(NOUNS);

  const noun = pluralize(baseNoun);

  // Format: "Adjective (Prefix) PluralNoun"
  // If prefix empty, omit it cleanly.
  const mid = prefix ? `${prefix} ` : "";
  return `${adj} ${mid}${noun}`.replace(/\s+/g, " ").trim();
}

function generateThreeUnique() {
  const set = new Set();
  while (set.size < 3) set.add(buildTeamName());
  return Array.from(set);
}

// ---------- RENDER ----------
function renderChoices() {
  choicesEl.innerHTML = "";
  currentChoices.forEach((name, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice" + (idx === selectedIndex ? " selected" : "");
    btn.type = "button";

    btn.innerHTML = `
      <div class="name">${name}</div>
      <div class="tag">${idx === selectedIndex ? "Selected" : "Pick"}</div>
    `;

    btn.addEventListener("click", () => {
      selectedIndex = idx;
      submitBtn.disabled = false;
      hintText.textContent = `Selected: ${currentChoices[selectedIndex]}`;
      renderChoices(); // re-render to update selected styling
    });

    choicesEl.appendChild(btn);
  });
}

// ---------- FLOWS ----------
function resetToGenerate() {
  selectedIndex = -1;
  submitBtn.disabled = true;
  hintText.textContent = "Choose one of the three options above.";
  currentChoices = generateThreeUnique();
  renderChoices();

  screenResult.classList.add("hidden");
  screenGenerate.classList.remove("hidden");
}

function goToResult() {
  if (selectedIndex < 0) return;
  const chosen = currentChoices[selectedIndex];
  resultName.textContent = chosen;

  screenGenerate.classList.add("hidden");
  screenResult.classList.remove("hidden");
}

// ---------- EVENTS ----------
refreshBtn.addEventListener("click", () => {
  selectedIndex = -1;
  submitBtn.disabled = true;
  hintText.textContent = "Choose one of the three options above.";
  currentChoices = generateThreeUnique();
  renderChoices();
});

submitBtn.addEventListener("click", () => {
  goToResult();
});

restartBtn.addEventListener("click", () => {
  resetToGenerate();
});

// ---------- INIT ----------
resetToGenerate();
