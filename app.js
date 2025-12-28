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
