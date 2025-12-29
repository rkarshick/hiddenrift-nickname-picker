// app.js
// Can U Xcape Team Name Generator (2-screen, pulsar transition + iOS-friendly COPY + on-screen instructions)
// ✅ No auto-refresh / auto-reset

/* -------------------------
   WORD LISTS
------------------------- */

const ADJECTIVES = [
  "Epic","Legendary","Savage","Rad","Wild","Dope","Crazy","Insane","Lit","Boss","Shifty",
  "Extra","Fire","Fierce","Fresh","Fly","Funky","Hyped","Sick","Sweet","Imaginary","Lying",
  "Wicked","Awesome","Brutal","Chill","Cool","Dynamic","Electric","Fabulous","Glam","Groovy",
  "Hilarious","Hyper","Jazzy","Killer","Lively","Mad","Neon","Outrageous","Pumped","Quirky",
  "Raging","Sassy","Spicy","Thrilling","Unreal","Viral","Xtreme","Youthful","Velvet","Breezy",
  "Cheeky","Dazzling","Energetic","Fiery","Gritty","Illuminated","Jolly","Crazed","Abusive",
  "Mighty","Nimble","Psyched","Wonderful","Riot","Spunky","Turbo","Ultra","Vivid","Whacky",
  "Darth","Blazing","Cosmic","Galactic","Kinetic","Mystic","Radiant","Stellar","Swirling","Expensive",
  "Soft","Big","Drifting","Echoing","Fluxing","Glowing","Sleepy","Igniting","Jeting","Broken",
  "Profound","Invisable","Rebel","Messy","Ultimate","Valiant","Annoying","Brave","Swift","Cheating",
  "Kind","Quiet","Gaming","Noob","Adventerous","Small","Stoked","Expired","Broken","Burnt","Turnt",
  "Ugly","Simping","Censored","Sour","Wealthy","Shook","Vindicated","Bizarre","Strange","Unusual",
  "Curious","Extraordinary","Eccentric","Absurd","Strongest","Chunky","Smelly","Ultimate","Limping"
];

const DO_NOT_PLURALIZE = new Set([
  "Cult","Overlords","Squad","Crew","Council","Pack","Clan","Guild","Horde","Mob",
  "Legion","Swarm","Gang","Alliance","Cartel","Syndicate","Cabal","Order",
  "Party","Tribe","Collective","Clique","Posse","Unit","Regime","Brotherhood","Sisterhood"
]);

const PHRASE_PLURALS = new Map([
  ["Party Animal", "Party Animals"],
  ["Bookworm", "Bookworms"],
  ["Flat Earther", "Flat Earthers"],
  ["Milk Carton", "Milk Cartons"],
  ["Smooth criminal", "Smooth criminals"],
  ["Soul sister", "Soul sisters"],
  ["Cat King", "Cat Kings"],
  ["Litter Box", "Litter Boxes"],
  ["Sleeping Bag", "Sleeping Bags"],
  ["Garter Snake", "Garter Snakes"],
  ["Corn Dog", "Corn Dogs"],
  ["Dog Catcher", "Dog Catchers"],
  ["Main Character", "Main Characters"],
  ["Side Quest", "Side Quests"],
  ["Glow Up", "Glow Ups"],
  ["Vibe Check", "Vibe Checks"],
  ["Big Boss", "Big Bosses"],
  ["Final Boss", "Final Bosses"],
  ["Mini Boss", "Mini Bosses"],
  ["Chosen One", "Chosen Ones"],
  ["Time Traveler", "Time Travelers"],
  ["Rift Walker", "Rift Walkers"],
  ["Void Caller", "Void Callers"],
  ["Drama Kid", "Drama Kids"],
  ["Band Kid", "Band Kids"],
  ["Gym Bro", "Gym Bros"],
  ["Cat Mom", "Cat Moms"],
  ["Dog Dad", "Dog Dads"],
  ["Snack Dealer", "Snack Dealers"],
  ["Chaos Child", "Chaos Children"],
  ["Supreme Leader", "Supreme Leaders"],
]);

const IRREGULAR_PLURALS = new Map([
  ["Mouse", "Mice"],
  ["Fish", "Fish"],
  ["Man", "Men"],
  ["Woman", "Women"],
  ["Person", "People"],
  ["Child", "Children"],
]);

const NOUNS = [
  "Couch","Pillow","Party Animal","Kiwi","Rock","Banana","Pie","Lamp","Glove",
  "Toaster","Clown","Carpet","Bookworm","Book","Emu","Bicycle","Spider",
  "Bed","Nugget","Puppet","Hat","Bacon","Bagel","Backpack","Nacho","Cup",
  "Key","Burrito","Candy","Umbrella","Watch","Camera","Guitar","Troublemaker",
  "McChicken","Hammer","Nail","Screwdriver","Wrench","Cube","Smudge","Ringer","Hedgehog",
  "Otter","Cat King","Hero","Sloth","Toilet",
  "Litter Box","Warrior","Badger","Fish","Apple","Hamster","Bean",
  "Mailman","Flashlight","Tent","Sleeping Bag","Garter Snake","Jacket","Boots","Scarf","Beanie",
  "Belt","Bracelet","Necklace","Earring","Flat Earther","Tie","Head","Turnip","Fisherman","Drone",
  "Zombie","Dancer","Sunflower","Earwig","Slapper","Ninja","Dog Catcher","Mouse","Avocado",
  "Sparrow","Hoodie","Coffee","Joker","Smooth criminal","Salt","Pepper","Spice","Dude","Vinegar","Sauce",
  "Butter","Cheese","Milk Carton","Juice","Coward","Water Boy","Cowboy","Popcorn","Chips",
  "Pretzel","Corn Dog","Vortex","Panda","Bull","Penguin","Bee","Stranger","Gamer","Bunny","Lunchlady",
  "Dragon","Knight","Bandit","Clown","Hunk","Rascal",

  "Rizzler","Main Character","Side Quest","Glow Up","Vibe","Vibe Check","NPC","Meme",
  "Sigma","GigaChad","Skibidi","Chad","Goblin Mode","Gremlin","Chaos Gremlin",
  "Braincell","Goober","Lore","Plot Twist","Skill Issue","Touch Grass",
  "Snack","Slay","W","L","Yap","Yapper","Mood","Delulu","Ick",
  "Yeet","Drip","Receipts","Hot Take","Cringe",

  "Cult","Overlords","Squad","Crew","Council","Pack","Clan","Guild","Horde","Mob",
  "Legion","Swarm","Gang","Alliance","Cartel","Syndicate","Cabal","Order",
  "Party","Tribe","Collective","Clique","Posse","Unit","Regime","Brotherhood","Sisterhood",

  "Mom","Dad","Cousin","Uncle","Aunt","Grandma","Grandpa","Nana","Papa",
  "Sibling","Brother","Sister","Twin","Sherlock","Soul sister",
  "Nephew","Niece","Godmother","Godfather","Umpa-Lumpa",
  "Roommate","Neighbor","Bestie","BFF","Frenemy",
  "Babysitter","Chaperone","Drama Kid","Band Kid","Gym Bro","Cat Mom","Dog Dad",
  "Snack Dealer","Chaos Child","Legend","Sleepyhead",

  "King","Queen","Prince","Princess","Duke","Duchess","Baron","Baroness",
  "Emperor","Empress","Warlord","Overlord","Supreme Leader",
  "Captain","Commander","General","Marshal","Admiral",
  "Paladin","Samurai","Viking","Gladiator","Mercenary",
  "Nomad","Raider","Ranger","Assassin","Outlaw","Pirate",
  "Wizard","Sorcerer","Witch","Warlock","Alchemist","Oracle","Cashier",
  "Sensei","Sage","Prophet","Monk","Manager","Herald",
  "Boss","Big Boss","Final Boss","Mini Boss",
  "Chosen One","Gatekeeper","Time Traveler","Rift Walker","Void Caller"
];

/* -------------------------
   DOM
------------------------- */

const screenPick    = document.getElementById("screenPick");
const screenConfirm = document.getElementById("screenConfirm");
const choicesEl     = document.getElementById("choices");
const refreshBtn    = document.getElementById("refreshBtn");
const submitBtn     = document.getElementById("submitBtn");
const restartBtn    = document.getElementById("restartBtn");
const pickedNameEl  = document.getElementById("pickedName");
const finalNameEl   = document.getElementById("finalName");
const pulsarEl      = document.getElementById("pulsar");

const copyBtn       = document.getElementById("copyBtn");
const copyStatusEl  = document.getElementById("copyStatus"); // add this element in HTML if not present

let selectedName = "";

/* -------------------------
   HELPERS
------------------------- */

function pluralize(noun) {
  if (DO_NOT_PLURALIZE.has(noun)) return noun;
  if (PHRASE_PLURALS.has(noun)) return PHRASE_PLURALS.get(noun);
  if (IRREGULAR_PLURALS.has(noun)) return IRREGULAR_PLURALS.get(noun);

  if (/(s|x|z|ch|sh)$/i.test(noun)) return noun + "es";
  if (/[bcdfghjklmnpqrstvwxyz]y$/i.test(noun)) return noun.slice(0, -1) + "ies";
  return noun + "s";
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeName() {
  const adj1 = pick(ADJECTIVES);
  const rawNoun = pick(NOUNS);
  const noun = pluralize(rawNoun);

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
  if (pickedNameEl) pickedNameEl.textContent = name || "—";
  if (submitBtn) submitBtn.disabled = !name;
}

function renderChoices() {
  if (!choicesEl) return;

  const names = generateThreeUnique();
  choicesEl.innerHTML = "";
  setSelected("");

  names.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = name;

    btn.addEventListener("click", () => {
      Array.from(choicesEl.querySelectorAll(".choice-btn")).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      setSelected(name);
    });

    choicesEl.appendChild(btn);
  });
}

function playPulsarThen(fn) {
  if (!pulsarEl) { fn(); return; }

  pulsarEl.classList.remove("hidden");
  pulsarEl.style.animation = "none";
  pulsarEl.offsetHeight; // reflow
  pulsarEl.style.animation = "";

  setTimeout(() => {
    pulsarEl.classList.add("hidden");
    fn();
  }, 650);
}

async function copyToClipboard(text) {
  // Best path on HTTPS + modern browsers
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  // iOS/older fallback
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "0";
  ta.style.opacity = "0";
  document.body.appendChild(ta);

  ta.focus();
  ta.select();
  ta.setSelectionRange(0, ta.value.length); // important for iOS

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(ta);
  return ok;
}

function setCopyStatus(message) {
  if (!copyStatusEl) return;
  copyStatusEl.textContent = message || "";
}

/* -------------------------
   EVENTS
------------------------- */

refreshBtn?.addEventListener("click", () => {
  playPulsarThen(() => renderChoices());
});

submitBtn?.addEventListener("click", () => {
  if (!selectedName) return;

  // IMPORTANT: do NOT auto-copy on submit (phones block it). Tell them to tap Copy.
  playPulsarThen(() => {
    if (finalNameEl) finalNameEl.textContent = selectedName;
    screenPick?.classList.add("hidden");
    screenConfirm?.classList.remove("hidden");

    setCopyStatus("Tap COPY to copy the team name, then paste it into the Booking area.");
  });
});

restartBtn?.addEventListener("click", () => {
  playPulsarThen(() => {
    setCopyStatus("");
    screenConfirm?.classList.add("hidden");
    screenPick?.classList.remove("hidden");
    renderChoices();
  });
});

copyBtn?.addEventListener("click", async () => {
  const text = (finalNameEl?.textContent || "").trim();
  if (!text || text === "—") return;

  try {
    const ok = await copyToClipboard(text);

    if (ok) {
      setCopyStatus("Copied! Now paste this TEAM-NAME into the Booking area.");
    } else {
      setCopyStatus("Copy blocked. Tap the team name, then tap-and-hold → Copy, then paste into Booking.");
    }
  } catch (e) {
    console.error("Copy failed:", e);
    setCopyStatus("Copy blocked. Tap the team name, then tap-and-hold → Copy, then paste into Booking.");
  }
});

/* -------------------------
   INIT
------------------------- */
renderChoices();
