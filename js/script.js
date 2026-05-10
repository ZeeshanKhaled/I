const toast = document.getElementById("toast");

function showToast(message = "Copied!") {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1400);
}

function setCopyButtonState(button, message = "Copied!") {
  const originalText = button.textContent;

  button.textContent = message;
  button.classList.add("copied");

  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove("copied");
  }, 1400);
}

function setupCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const textToCopy = button.dataset.copy;

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopyButtonState(button);
        showToast("Copied to clipboard!");
      } catch (error) {
        button.textContent = "Failed";
        showToast("Copy failed");
        console.error("Copy failed:", error);
      }
    });
  });
}

const searchInput = document.getElementById("commandSearch");
const commandCards = document.querySelectorAll(".command-card");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function updateCommandCards() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

  commandCards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    const cardCategory = card.dataset.category;

    const matchesSearch = cardText.includes(searchTerm);
    const matchesFilter = currentFilter === "all" || cardCategory === currentFilter;

    if (matchesSearch && matchesFilter) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", updateCommandCards);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.dataset.filter;
    updateCommandCards();
  });
});

const bannerPatterns = {
  "1": [
    ["stripe_center", "fg"],
    ["square_top_left", "fg"],
    ["curly_border", "bg"],
    ["stripe_bottom", "fg"],
    ["border", "bg"]
  ],
  "2": [
    ["stripe_top", "fg"],
    ["rhombus", "bg"],
    ["stripe_bottom", "fg"],
    ["stripe_downleft", "fg"],
    ["border", "bg"]
  ],
  "3": [
    ["stripe_bottom", "fg"],
    ["stripe_middle", "fg"],
    ["stripe_top", "fg"],
    ["curly_border", "bg"],
    ["stripe_right", "fg"],
    ["border", "bg"]
  ],
  "4": [
    ["stripe_left", "fg"],
    ["half_horizontal_bottom", "bg"],
    ["stripe_right", "fg"],
    ["stripe_middle", "fg"],
    ["border", "bg"]
  ],
  "5": [
    ["stripe_bottom", "fg"],
    ["rhombus", "bg"],
    ["stripe_top", "fg"],
    ["stripe_downright", "fg"],
    ["border", "bg"]
  ],
  "6": [
    ["stripe_bottom", "fg"],
    ["stripe_right", "fg"],
    ["half_horizontal", "bg"],
    ["stripe_middle", "fg"],
    ["stripe_top", "fg"],
    ["stripe_left", "fg"],
    ["border", "bg"]
  ],
  "7": [
    ["stripe_downleft", "fg"],
    ["stripe_top", "fg"],
    ["border", "bg"]
  ],
  "8": [
    ["stripe_top", "fg"],
    ["stripe_left", "fg"],
    ["stripe_middle", "fg"],
    ["stripe_bottom", "fg"],
    ["stripe_right", "fg"],
    ["border", "bg"]
  ],
  "9": [
    ["stripe_left", "fg"],
    ["half_horizontal_bottom", "bg"],
    ["stripe_middle", "fg"],
    ["stripe_top", "fg"],
    ["stripe_right", "fg"],
    ["stripe_bottom", "fg"],
    ["border", "bg"]
  ],
  "0": [
    ["stripe_bottom", "fg"],
    ["stripe_left", "fg"],
    ["stripe_top", "fg"],
    ["stripe_right", "fg"],
    ["stripe_downleft", "fg"],
    ["border", "bg"]
  ]
};

const letterBannerPatterns = {
  A: [["stripe_right", "fg"], ["stripe_left", "fg"], ["stripe_middle", "fg"], ["stripe_top", "fg"], ["border", "bg"]],
  B: [["stripe_right", "fg"], ["stripe_bottom", "fg"], ["stripe_top", "fg"], ["curly_border", "bg"], ["stripe_left", "fg"], ["stripe_middle", "fg"], ["border", "bg"]],
  C: [["stripe_top", "fg"], ["stripe_bottom", "fg"], ["stripe_right", "fg"], ["stripe_middle", "bg"], ["stripe_left", "fg"], ["border", "bg"]],
  D: [["stripe_right", "fg"], ["stripe_bottom", "fg"], ["stripe_top", "fg"], ["curly_border", "bg"], ["stripe_left", "fg"], ["border", "bg"]],
  E: [["stripe_left", "fg"], ["stripe_top", "fg"], ["stripe_middle", "fg"], ["stripe_bottom", "fg"], ["border", "bg"]],
  F: [["stripe_middle", "fg"], ["stripe_right", "bg"], ["stripe_top", "fg"], ["stripe_left", "fg"], ["border", "bg"]],
  G: [["stripe_right", "fg"], ["half_horizontal", "bg"], ["stripe_bottom", "fg"], ["stripe_left", "fg"], ["stripe_top", "fg"], ["border", "bg"]],
  H: [["stripe_top", "fg"], ["stripe_bottom", "fg"], ["stripe_left", "bg"], ["stripe_right", "bg"], ["border", "fg"]],
  I: [["stripe_center", "fg"], ["stripe_top", "fg"], ["stripe_bottom", "fg"], ["border", "bg"]],
  J: [["stripe_left", "fg"], ["half_horizontal", "bg"], ["stripe_bottom", "fg"], ["stripe_right", "fg"], ["border", "bg"]],
  K: [["stripe_downright", "fg"], ["half_horizontal", "bg"], ["stripe_downleft", "fg"], ["stripe_left", "fg"], ["border", "bg"]],
  L: [["stripe_bottom", "fg"], ["stripe_left", "fg"], ["border", "bg"]],
  M: [["triangle_top", "fg"], ["triangles_top", "bg"], ["stripe_left", "fg"], ["stripe_right", "fg"], ["border", "bg"]],
  N: [["stripe_left", "fg"], ["triangle_top", "bg"], ["stripe_downright", "fg"], ["stripe_right", "fg"], ["border", "bg"]],
  O: [["stripe_left", "fg"], ["stripe_right", "fg"], ["stripe_bottom", "fg"], ["stripe_top", "fg"], ["border", "bg"]],
  P: [["stripe_right", "fg"], ["half_horizontal_bottom", "bg"], ["stripe_middle", "fg"], ["stripe_top", "fg"], ["stripe_left", "fg"], ["border", "bg"]],
  Q: [["rhombus", "fg"], ["stripe_right", "bg"], ["stripe_left", "bg"], ["square_bottom_right", "bg"], ["border", "fg"]],
  R: [["half_horizontal", "fg"], ["stripe_center", "bg"], ["stripe_top", "fg"], ["stripe_left", "fg"], ["stripe_downright", "fg"], ["border", "bg"]],
  S: [["rhombus", "fg"], ["stripe_middle", "fg"], ["stripe_downright", "bg"], ["border", "fg"]],
  T: [["stripe_top", "fg"], ["stripe_center", "fg"], ["border", "bg"]],
  U: [["stripe_bottom", "fg"], ["stripe_left", "fg"], ["stripe_right", "fg"], ["border", "bg"]],
  V: [["stripe_downleft", "fg"], ["stripe_left", "fg"], ["triangle_bottom", "bg"], ["stripe_downleft", "fg"], ["border", "bg"]],
  W: [["triangle_bottom", "fg"], ["triangles_bottom", "bg"], ["stripe_left", "fg"], ["stripe_right", "fg"], ["border", "bg"]],
  X: [["cross", "fg"], ["border", "bg"]],
  Y: [["stripe_downright", "fg"], ["half_horizontal_bottom", "bg"], ["stripe_downleft", "fg"], ["border", "bg"]],
  Z: [["stripe_top", "fg"], ["stripe_downleft", "fg"], ["stripe_bottom", "fg"], ["border", "bg"]]
};

function buildBannerCommand(baseColour, patterns, foregroundColour) {
  const patternText = patterns
    .map(([pattern, colourType]) => {
      const colour = colourType === "fg" ? foregroundColour : baseColour;
      return `{pattern:${pattern},color:${colour}}`;
    })
    .join(",");

  return `/give @p ${baseColour}_banner[banner_patterns=[${patternText}]]`;
}

const bannerNumber = document.getElementById("bannerNumber");
const bannerBaseColour = document.getElementById("bannerBaseColour");
const bannerNumberColour = document.getElementById("bannerNumberColour");
const generatedBannerCommand = document.getElementById("generatedBannerCommand");
const copyGeneratedBanner = document.getElementById("copyGeneratedBanner");

function generateNumberBannerCommand() {
  if (!bannerNumber || !bannerBaseColour || !bannerNumberColour || !generatedBannerCommand) return;

  const number = bannerNumber.value;
  const baseColour = bannerBaseColour.value;
  const numberColour = bannerNumberColour.value;
  const command = buildBannerCommand(baseColour, bannerPatterns[number], numberColour);

  generatedBannerCommand.textContent = command;

  if (copyGeneratedBanner) {
    copyGeneratedBanner.dataset.copy = command;
  }
}

if (bannerNumber && bannerBaseColour && bannerNumberColour) {
  bannerNumber.addEventListener("change", generateNumberBannerCommand);
  bannerBaseColour.addEventListener("change", generateNumberBannerCommand);
  bannerNumberColour.addEventListener("change", generateNumberBannerCommand);
  generateNumberBannerCommand();
}

const letterBannerLetter = document.getElementById("letterBannerLetter");
const letterBannerBaseColour = document.getElementById("letterBannerBaseColour");
const letterBannerLetterColour = document.getElementById("letterBannerLetterColour");
const generatedLetterBannerCommand = document.getElementById("generatedLetterBannerCommand");
const copyGeneratedLetterBanner = document.getElementById("copyGeneratedLetterBanner");

function generateLetterBannerCommand() {
  if (
    !letterBannerLetter ||
    !letterBannerBaseColour ||
    !letterBannerLetterColour ||
    !generatedLetterBannerCommand
  ) {
    return;
  }

  const letter = letterBannerLetter.value;
  const baseColour = letterBannerBaseColour.value;
  const letterColour = letterBannerLetterColour.value;
  const command = buildBannerCommand(baseColour, letterBannerPatterns[letter], letterColour);

  generatedLetterBannerCommand.textContent = command;

  if (copyGeneratedLetterBanner) {
    copyGeneratedLetterBanner.dataset.copy = command;
  }
}

if (letterBannerLetter && letterBannerBaseColour && letterBannerLetterColour) {
  letterBannerLetter.addEventListener("change", generateLetterBannerCommand);
  letterBannerBaseColour.addEventListener("change", generateLetterBannerCommand);
  letterBannerLetterColour.addEventListener("change", generateLetterBannerCommand);
  generateLetterBannerCommand();
}

const playerHeadName = document.getElementById("playerHeadName");
const generatedPlayerHeadCommand = document.getElementById("generatedPlayerHeadCommand");
const copyGeneratedPlayerHead = document.getElementById("copyGeneratedPlayerHead");

function generatePlayerHeadCommand() {
  if (!playerHeadName || !generatedPlayerHeadCommand) return;

  const rawName = playerHeadName.value.trim() || "Ninja_Zeesh";
  const safeName = rawName.replace(/\\/g, "").replace(/"/g, "");
  const command = `/give @p minecraft:player_head[minecraft:profile={name:"${safeName}"}]`;

  generatedPlayerHeadCommand.textContent = command;

  if (copyGeneratedPlayerHead) {
    copyGeneratedPlayerHead.dataset.copy = command;
  }
}

if (playerHeadName) {
  playerHeadName.addEventListener("input", generatePlayerHeadCommand);
  generatePlayerHeadCommand();
}

setupCopyButtons();
