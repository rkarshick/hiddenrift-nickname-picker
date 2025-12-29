// app.js
// Can U Xcape Team Name Generator (2-screen, pulsar transition + COPY modal + auto refresh)
// Works on PC + phone. Clipboard works best on https or localhost; fallback included.

const ADJECTIVES = [
  "Epic","Legendary","Savage","Rad","Wild","Dope","Crazy","Insane","Lit","Boss",
  "Extra","Fire","Fierce","Fresh","Fly","Funky","Hyped","Sick","Sweet","Imaginary",
  "Wicked","Awesome","Brutal","Chill","Cool","Dynamic","Electric","Fabulous","Glam","Groovy",
  "Hilarious","Hyper","Jazzy","Killer","Lively","Mad","Neon","Outrageous","Pumped","Quirky",
  "Raging","Sassy","Spicy","Thrilling","Unreal","Viral","Xtreme","Youthful","Velvet","Breezy",
  "Cheeky","Dazzling","Energetic","Fiery","Gritty","Illuminated","Jolly",
  "Mighty","Nimble","Psyched","Wonderful","Riot","Spunky","Turbo","Ultra","Vivid","Whacky",
  "Blazing","Cosmic","Galactic","Kinetic","Mystic","Radiant","Stellar","Swirling",
  "Soft","Big","Drifting","Echoing","Fluxing","Glowing","Sleepy","Igniting","Broken",
  "Rebel","Messy","Ultimate","Valiant","Annoying","Brave","Swift",
  "Gaming","Noob","Small","Stoked","Expired","Burnt","Turnt","Sour","Shook",
  "Bizarre","Strange","Unusual","Absurd","Chunky","Smelly","Limping"
];

// Group/team nouns (should NOT get pluralized again)
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
  ["Smooth Criminal", "Smooth Criminals"],
  ["Soul Sister", "Soul Sisters"],
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
  "Toaster","Clown","Carpet","Bookworm","Emu","Bicycle","Spider",
  "Nugget","Puppet","Hat","Bacon","Bagel","Backpack","Nacho","Cup",
  "Key","Burrito","Candy","Umbrella","Camera","Guitar","Troublemaker",
  "Hammer","Nail","Screwdriver","Wrench","Cube","Hedgehog",
  "Otter","Cat King","Hero","Sloth","Toilet",
  "Litter Box","Warrior","Badger","Fish","Apple","Hamster","Bean",
  "Mailman","Flashlight","Tent","Sleeping Bag","Garter Snake","Jacket","Boots","Scarf","Beanie",
  "Bracelet","Necklace","Earring","Flat Earther","Turnip","Fisherman","Drone",
  "Zombie","Dancer","Sunflower","Earwig","Ninja","Dog Catcher","Mouse","Avocado",
  "Sparrow","Hoodie","Coffee","Joker","Smooth Criminal","Pepper","Spice","Dude","Sauce",
  "Butter","Cheese","Milk Carton","Juice","Coward","Cowboy","Popcorn","Chips",
  "Pretzel","Corn Dog","Vortex","Panda","Bull","Penguin","Bee","Stranger","Gamer","Bunny","Lunchlady",
  "Dragon","Knight","Bandit","Hunk","Rascal",

  "Rizzler","Main Character","Side Quest","Glow Up","Vibe","Vibe Check","NPC","Meme",
  "Sigma","GigaChad","Skibidi","Chad","Goblin Mode","Gremlin","Chaos Gremlin",
  "Braincell","Goober","Lore","Plot Twist","Skill Issue","Touch Grass",
  "Snack","Slay","W","L","Yap","Yapper","Mood","Delulu","Ick",
  "Yeet","Drip","Receipts","Hot Take","Cringe",

  "Cult","Overlords","Squad","Crew","Council","Pack","Clan","Guild","Horde","Mob",
  "Legion","Swarm","Gang","Alliance","Cartel","Syndicate","Cabal","Order",
  "Party","Tribe","Collective","Clique","Posse","Unit","Regime","Brotherhood","Sisterhood",

  "Mom","Dad","Cousin","Uncle","Aunt","Grandma","Grandpa","Nana","Papa",
  "Sibling","Brother","Sister","Twin","Sherlock","Soul Sister",
  "Nephew","Niece","Godmother","Godfather","Umpa-Lumpa",
  "Roommate","Neighbor","Bestie","BFF","Frenemy",
  "Babysitter","Chaperone","Drama Kid","Band Kid","Gym Bro","Cat Mom","Dog Dad",
  "Snack Dealer","Chaos Child","Legend","Sleepyhead",

  "King","Queen","Prince","Princess","Duke","Duchess","Baron","Baroness",
  "Emperor","Empress","Warlord","Overlord","Supreme Leader",
  "Captain","Commander","General","Marshal","Admiral",
  "Paladin","Samurai","Viking","Gladiator","Mercenary",
  "Nomad","Raider","Ranger","Assassin","Outlaw","Pirate",
  "Wizard","Sorcerer","Witch","Warlock","Alchemist","Oracle",
  "Sensei","Sage","Prophet","Monk","Herald",
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

const copyBtn        = document.getElementById("copyBtn");
const copyModal      = document.getElementById("copyModal");
const copyModalClose = document.getElementById("copyModalClose");
const copyModalText  = document.getElementById("copyModalText");
const copyModalInput = document.getElementById("copyModalInput");

let selectedName = "";
let submittedName = "";        // IMPORTANT: what we copy
let autoRefreshTimer = null;

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
      Array.from(choicesEl.querySelectorAll(".choice-btn"))
        .forEach(b => b.classList.remove("selected"));
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
  // force reflow
  pulsarEl.offsetHeight;
  pulsarEl.style.animation = "";

  setTimeout(() => {
    pulsarEl.classList.add("hidden");
    fn();
  }, 650);
}

function openCopyModal(nameText) {
  if (!copyModal) return;
  if (copyModalInput) copyModalInput.value = nameText || "";
  copyModal.classList.remove("hidden");

  // mobile: select text so they can manually copy if needed
  if (copyModalInput) {
    copyModalInput.focus();
    copyModalInput.select();
    // iOS sometimes needs an explicit range:
    try { copyModalInput.setSelectionRange(0, copyModalInput.value.length); } catch {}
  }
}

function closeCopyModal() {
  if (!copyModal) return;
  copyModal.classList.add("hidden");
}

async function copyToClipboard(text) {
  // 1) Modern clipboard (needs user gesture; works best on https/localhost)
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    await navigator.clipboard.writeText(text);
    return true;
  }

  // 2) Fallback: execCommand
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();

  let ok = false;
  try { ok = document.execCommand("copy"); } catch { ok = false; }
  document.body.removeChild(ta);
  return ok;
}

function startAutoRefreshCountdown() {
  if (autoRefreshTimer) clearTimeout(autoRefreshTimer);

  let seconds = 5;
  const setMsg = () => {
    if (!copyModalText) return;
    copyModalText.textContent =
      `Please close this pop-up and PASTE this TEAM-NAME into the Booking area! Auto-refreshing in ${seconds} seconds...`;
  };

  setMsg();

  const tick = () => {
    seconds -= 1;
    if (seconds <= 0) {
      playPulsarThen(() => {
        closeCopyModal();
        if (screenConfirm) screenConfirm.classList.add("hidden");
        if (screenPick) screenPick.classList.remove("hidden");
        submittedName = "";
        renderChoices();
      });
      return;
    }
    setMsg();
    autoRefreshTimer = setTimeout(tick, 1000);
  };

  autoRefreshTimer = setTimeout(tick, 1000);
}

/* -------------------------
   EVENTS
------------------------- */

refreshBtn?.addEventListener("click", () => {
  playPulsarThen(() => renderChoices());
});

submitBtn?.addEventListener("click", () => {
  if (!selectedName) return;

  submittedName = selectedName; // IMPORTANT: persist what they submitted

  playPulsarThen(() => {
    if (finalNameEl) finalNameEl.textContent = submittedName;
    screenPick?.classList.add("hidden");
    screenConfirm?.classList.remove("hidden");
  });
});

restartBtn?.addEventListener("click", () => {
  playPulsarThen(() => {
    closeCopyModal();
    if (autoRefreshTimer) clearTimeout(autoRefreshTimer);
    submittedName = "";
    screenConfirm?.classList.add("hidden");
    screenPick?.classList.remove("hidden");
    renderChoices();
  });
});

copyBtn?.addEventListener("click", async () => {
  const text = (submittedName || (finalNameEl ? finalNameEl.textContent : "") || "").trim();
  if (!text || text === "—") return;

  // Show modal immediately (so they always see feedback)
  if (copyModalText) copyModalText.textContent = "Copying…";
  openCopyModal(text);

  try {
    const ok = await copyToClipboard(text);

    // Always show the “Copy complete!” modal text you requested
    if (copyModalText) {
      copyModalText.textContent =
        ok
          ? `Please close this pop-up and PASTE this TEAM-NAME into the Booking area! Auto-refreshing in 5 seconds...`
          : `Copy blocked by your browser. Tap and hold the team name field to copy, then paste into the Booking area. Auto-refreshing in 5 seconds...`;
    }

    startAutoRefreshCountdown();
  } catch (e) {
    console.error("Copy failed:", e);
    if (copyModalText) {
      copyModalText.textContent =
        `Copy blocked by your browser. Tap and hold the team name field to copy, then paste into the Booking area. Auto-refreshing in 5 seconds...`;
    }
    startAutoRefreshCountdown();
  }
});

copyModalClose?.addEventListener("click", () => {
  closeCopyModal();
  // timer continues (as requested)
});

// clicking backdrop closes
copyModal?.addEventListener("click", (e) => {
  if (e.target === copyModal) closeCopyModal();
});

// init
renderChoices();
