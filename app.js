// Can U Xcape Team Name Generator (2-screen, pulsar transition)

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
  // Fun objects / food / chaos (non-office)
  "Couch","Pillow","Spoon","Kiwi","Rock","Banana","Pie","Monk","Lamp","Glove",
  "Toaster","Shoe","Carpet","Mirror","Book","Emu","Bicycle","Chair",
  "Bed","Fridge","Puppet","Hat","Bacon","Bagel","Backpack","Nacho","Cup",
  "Key","Burrito","Candy","Umbrella","Watch","Camera","Guitar","Drum",
  "Avenger","Clock","Hammer","Nail","Screwdriver","Wrench","Toast","Smudge","Glue","Hedgehog",
  "Hulk","Highlighter","Otter","Cat King","Hero","Envelope","Sloth","Calculator","Toilet",
  "Litter Box","Eraser","Chalk","Warrior","Badger","Fish","Newspaper","Apple","Hamster","Globe",
  "Mailman","Flashlight","Tent","Sleeping Bag","Garter Snake","Sunglasses","Jacket","Boots","Scarf","Beanie",
  "Belt","Bracelet","Necklace","Earrings","Ring","Tie","Headphones","Bulb","Fisherman","Drone",
  "Zombie","Dancer","Sunflower","Earwig","Slapper","Ninja","Dog Catcher","Mouse","Avocado","Wound","Dad",
  "Mom","Sparrow","Kettle","Coffee","Tea","Sugar","Salt","Pepper","Spice","Oil","Vinegar","Sauce",
  "Butter","Cheese","Milk","Juice","Water","Soda","Gum","Popcorn","Chips",
  "Pretzel","Corn Dog","Bestie","Vortex","Panda","Bull","Penguin","Bee","Stinger","Dip","Bunny","Lunchlady",
  "Sensei","Dragon","Knight","Bandit","Clown","Cake","Rascal",

  // Trendy / Gen Z-ish nouns
  "Rizzler","Main Character","Side Quest","Glow Up","Vibe","Vibe Check","NPC","Meme",
  "Sigma","GigaChad","Skibidi","Wojak","Chad","Goblin Mode","Gremlin","Chaos Gremlin",
  "Braincell","Goober","Sussy Baka","Lore","Plot Twist","Skill Issue","Touch Grass",
  "Snack","Slay","W","L","Yap","Yapper","Yappathon","Mood","Delulu","Ick",
  "Yeet","Drip","Aura","Tea Spiller","Receipts","Hot Take","Cringe","Based",

  // Group/team nouns (these should NOT get pluralized again)
  "Cult","Overlords","Squad","Crew","Council","Coven","Clan","Guild","Horde","Mob",
  "Legion","Pack","Swarm","Gang","Alliance","Cartel","Syndicate","Cabal","Order",
  "Party","Tribe","Collective","Clique","Posse","Unit","Regime","Brotherhood","Sisterhood"
];


// DOM
const screenPick = document.getElementById("screenPick");
const screenConfirm = document.getElementById("screenConfirm");
const choicesEl = document.getElementById("choices");
const refreshBtn = document.getElementById("refreshBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const pickedNameEl = document.getElementById("pickedName");
const finalNameEl = document.getElementById("finalName");
const pulsarEl = document.getElementById("pulsar");

let selectedName = "";

// phrase + irregular plural map
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
  if (DO_NOT_PLURALIZE.has(noun)) return noun;
  if (PHRASE_PLURALS.has(noun)) return PHRASE_PLURALS.get(noun);
  if (IRREGULAR_PLURALS.has(noun)) return IRREGULAR_PLURALS.get(noun);
  if (/(s|x|z|ch|sh)$/i.test(noun)) return noun + "es";
  if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(noun)) return noun.slice(0, -1) + "ies";
  return noun + "s";
}

const DO_NOT_PLURALIZE = new Set([
  "Cult","Overlords","Squad","Crew","Council","Coven","Clan","Guild","Horde","Mob",
  "Legion","Pack","Swarm","Gang","Alliance","Cartel","Syndicate","Cabal","Order",
  "Party","Tribe","Collective","Clique","Posse","Unit","Regime","Brotherhood","Sisterhood"
]);

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// “funny combos”: add a tiny chance to double-adjective (still from your list)
function makeName() {
  const adj1 = pick(ADJECTIVES);
  const noun = pluralize(pick(NOUNS));

  const roll = Math.random();
  if (roll < 0.18) {
    const adj2 = pick(ADJECTIVES);
    if (adj2 !== adj1) return `${adj1} ${adj2} ${noun}`;
  }
  return `${adj1} ${noun}`;
}

function generateThreeUnique() {
  const set = new Set();
  while (set.size < 3) set.add(makeName());
  return Array.from(set);
}

function setSelected(name) {
  selectedName = name;
  pickedNameEl.textContent = name || "—";
  submitBtn.disabled = !name;
}

function renderChoices() {
  const names = generateThreeUnique();
  choicesEl.innerHTML = "";
  setSelected("");

  names.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = name;

    btn.addEventListener("click", () => {
      // clear selected state
      Array.from(choicesEl.querySelectorAll(".choice-btn")).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      setSelected(name);
    });

    choicesEl.appendChild(btn);
  });
}

function playPulsarThen(fn) {
  // restart animation by toggling node
  pulsarEl.classList.remove("hidden");
  pulsarEl.style.animation = "none";
  // force reflow
  // eslint-disable-next-line no-unused-expressions
  pulsarEl.offsetHeight;
  pulsarEl.style.animation = "";

  // run after animation finishes
  setTimeout(() => {
    pulsarEl.classList.add("hidden");
    fn();
  }, 650);
}

// Events
refreshBtn.addEventListener("click", () => {
  playPulsarThen(() => renderChoices());
});

submitBtn.addEventListener("click", () => {
  if (!selectedName) return;
  playPulsarThen(() => {
    finalNameEl.textContent = selectedName;
    screenPick.classList.add("hidden");
    screenConfirm.classList.remove("hidden");
  });
});

restartBtn.addEventListener("click", () => {
  playPulsarThen(() => {
    screenConfirm.classList.add("hidden");
    screenPick.classList.remove("hidden");
    renderChoices();
  });
});

// init
renderChoices();
