// Can U Xcape Team Name Generator
// Shows 3 choices (Adjective + plural noun) as buttons.
// Click one => confirm screen. Restart => back to pick screen.
// Refresh => regenerate 3 new names.

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
  // Food / snack chaos
  "Taco","Burrito","Nacho","Pizza","Bagel","Donut","Pretzel","Corn Dog","Waffle","Pancake",
  "Cupcake","Brownie","Cookie","Pickle","Nugget","Dumpling","Ramen","Sushi","Hot Sauce","Milkshake",

  // Animals / creatures
  "Raccoon","Possum","Capybara","Axolotl","Otter","Panda","Penguin","Goose","Llama","Alpaca",
  "Frog","Cobra","Shark","Octopus","Giraffe","Koala","Hamster","Ferret","Sloth","Chameleon",

  // Fantasy / vibe nouns
  "Goblin","Wizard","Knight","Dragon","Vampire","Zombie","Ninja","Pirate","Bard","Witch",
  "Overlord","Bandit","Hero","Warrior","Vortex","Phantom","Cosmonaut","Time Traveler","Gladiator","Rascal",

  // Internet / meme / trendy
  "Meme Lord","Influencer","Streamer","Gamer","Noob","Sweat","Tryhard","Bestie","Baddie","Main Character",
  "NPC","Hacker","Speedrunner","Emote","Clout Goblin","Keyboard Warrior","Chad","Gremlin","Rizzler","Chaos Gremlin",

  // Random funny objects (not office-y)
  "Rubber Duck","Beanie","Sunglasses","Boot","Helmet","Trophy","Lantern","Cannon","Jetpack","Gadget",
  "Boomerang","Disco Ball","Yo-Yo","Skateboard","Hoverboard","Magic Wand","Portal","Goggles","Cape","Confetti",

  // Weird group nouns
  "Cult","Squad","Crew","Mob","Horde","Pack","Swarm","Gang","Tribe","Coven",
  "Council","Alliance","Legion","Army","Party","Clique","Guild","Order","Wrecking Crew","Dream Team",
];

// ---- DOM ----
const screenPick = document.getElementById("screenPick");
const screenConfirm = document.getElementById("screenConfirm");
const choicesEl = document.getElementById("choices");
const refreshBtn = document.getElementById("refreshBtn");
const restartBtn = document.getElementById("restartBtn");
const finalNameEl = document.getElementById("finalName");

// ---- pluralization ----
const PHRASE_PLURALS = new Map([
  ["Cat King", "Cat Kings"],
  ["Litter Box", "Litter Boxes"],
  ["Sleeping Bag", "Sleeping Bags"],
  ["Garter Snake", "Garter Snakes"],
  ["Corn Dog", "Corn Dogs"],
  ["Dog Catcher", "Dog Catchers"],
]);

const IRREGULAR_PLURALS = new Map([
  ["Mouse", "Mice"],
  ["Fish", "Fish"],
]);

function pluralize(noun) {
  if (PHRASE_PLURALS.has(noun)) return PHRASE_PLURALS.get(noun);
  if (IRREGULAR_PLURALS.has(noun)) return IRREGULAR_PLURALS.get(noun);

  // s/x/z/ch/sh => es
  if (/(s|x|z|ch|sh)$/i.test(noun)) return noun + "es";

  // consonant + y => ies
  if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(noun)) return noun.slice(0, -1) + "ies";

  return noun + "s";
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeName() {
  const adj = pick(ADJECTIVES);
  const noun = pluralize(pick(NOUNS));
  return `${adj} ${noun}`;
}

function generateThreeUnique() {
  const set = new Set();
  while (set.size < 3) set.add(makeName());
  return Array.from(set);
}

function renderChoices() {
  const names = generateThreeUnique();
  choicesEl.innerHTML = "";

  names.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = name;

    btn.addEventListener("click", () => {
      finalNameEl.textContent = name;
      screenPick.classList.add("hidden");
      screenConfirm.classList.remove("hidden");
    });

    choicesEl.appendChild(btn);
  });
}

// ---- events ----
refreshBtn.addEventListener("click", renderChoices);

restartBtn.addEventListener("click", () => {
  screenConfirm.classList.add("hidden");
  screenPick.classList.remove("hidden");
  renderChoices();
});

// init
renderChoices();
