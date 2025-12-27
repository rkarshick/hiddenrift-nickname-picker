// HiddenRift Nickname Picker (standalone)
// No backend. Just refresh + select + copy/share/export.

const ALL_NICKNAMES = [
  "Ace","Shorty","Red","Tiny","Lucky","Sparky","Skip","Scout","Duke","Chip",
  "Sunny","Moose","Goose","Patch","Dozer","Buzz","Flash","Dash","Rocky","Spike",
  "Jinx","Drift","Rook","Vex","Echo","Nova","Orbit","Slate","Frost","Ember",
  "Riddle","Proxy","Circuit","Pixel","Byte","Ghost","Raven","Canyon","Flint","Viper",
  "Benny","Mikey","Ricky","Tasha","Lex","Dani","Theo","Abby","Jules","Ronnie",
  "Nessa","Cass","Lenny","Joey","Tino","Bree","Remy","Max","Louie","Geo",
  "Peanut","Biscuit","Snickers","Tater","Pickles","Bubbles","Noodle","Waffles","Gummy","Muffin",
  "Pockets","Doodle","Sprout","Cricket","Pippin","Tumble","Jello","Toast","Grits","Squee",
  "Pathfinder","Trailblazer","Wayfarer","Outlander","Voyager","Sentinel","Seeker","Vanguard","Strider","Nomad",
  "Wanderer","Tracker","Ranger","Pioneer","Cipher","Anchor","Guardian","Lantern","Compass","Breaker",
  "Bolt","Grit","Vale","Knox","Jett","Sable","Onyx","Rogue","Shade","Pulse","Flux","Quill","Snipe","Haze","Wren","Cove","Rune"
];

const nicknameGrid = document.getElementById("nicknameGrid");
const refreshBtn = document.getElementById("refreshBtn");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const exportBtn = document.getElementById("exportBtn");
const selectedNameEl = document.getElementById("selectedName");
const pulse = document.getElementById("pulse");

let currentSet = [];
let selected = "";

// pick N random unique nicknames
function pickSet(n = 4) {
  const pool = [...ALL_NICKNAMES];
  const out = [];
  while (out.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

function playPulse() {
  pulse.classList.remove("play");
  // force reflow so animation restarts
  void pulse.offsetWidth;
  pulse.classList.add("play");
}

function render() {
  nicknameGrid.innerHTML = "";
  currentSet.forEach((name) => {
    const btn = document.createElement("div");
    btn.className = "nick" + (name === selected ? " selected" : "");
    btn.textContent = name;
    btn.onclick = () => {
      selected = name;
      selectedNameEl.textContent = name;
      copyBtn.disabled = false;
      shareBtn.disabled = false;
      render();
    };
    nicknameGrid.appendChild(btn);
  });

  if (!selected) {
    selectedNameEl.textContent = "—";
    copyBtn.disabled = true;
    shareBtn.disabled = true;
  }
}

refreshBtn.onclick = () => {
  playPulse();
  selected = "";
  currentSet = pickSet(4);
  render();
};

copyBtn.onclick = async () => {
  if (!selected) return;
  await navigator.clipboard.writeText(selected);
  alert(`Copied: ${selected}`);
};

shareBtn.onclick = async () => {
  if (!selected) return;
  const text = `My HiddenRift nickname: ${selected}`;
  if (navigator.share) {
    await navigator.share({ title: "HiddenRift Nickname", text });
  } else {
    await navigator.clipboard.writeText(text);
    alert("Share not supported — copied to clipboard instead.");
  }
};

exportBtn.onclick = (e) => {
  e.preventDefault();
  const blob = new Blob([JSON.stringify({ nicknames: ALL_NICKNAMES }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hiddenrift-nicknames.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// initial load
currentSet = pickSet(4);
render();
