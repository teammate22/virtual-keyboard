const layouts = {
  en: [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l",
    "z", "x", "c", "v", "b", "n", "m", "Backspace",
    "Space", "Lang"
  ],
  ru: [
    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
    "ф", "ы", "в", "а", "п", "р", "о", "л", "д",
    "я", "ч", "с", "м", "и", "т", "ь", "Backspace",
    "Space", "Lang"
  ]
};

let currentLayout = "en";
const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");

function renderKeyboard(layout) {
  keyboard.innerHTML = "";
  layouts[layout].forEach(key => {
    const keyEl = document.createElement("div");
    keyEl.className = "key";

    if (key === "Backspace") {
      keyEl.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
        <path d="M20 12H9"></path>
      </svg>`;
      keyEl.classList.add("backspace-key");
    } else if (key === "Space") {
      keyEl.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>`;
      keyEl.classList.add("space-key");
    } else if (key === "Lang") {
      keyEl.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 0 20"></path>
        <path d="M12 2a15.3 15.3 0 0 0 0 20"></path>
      </svg>`;
      keyEl.classList.add("lang-key");
    } else {
      keyEl.textContent = key;
    }

    keyEl.addEventListener("click", () => handleKeyPress(key));
    keyboard.appendChild(keyEl);
  });
}


function handleKeyPress(key) {
  if (key === "Backspace") {
    output.value = output.value.slice(0, -1);
    return;
  }

  if (key === "Space") {
    animatePrint(" ");
    return;
  }

  if (key === "Lang") {
    currentLayout = currentLayout === "en" ? "ru" : "en";
    renderKeyboard(currentLayout);
    return;
  }

  animatePrint(key);
}

function animatePrint(char) {
  const oldValue = output.value;
  output.value += char;

  const lastIndex = output.value.length - 1;
  const textarea = output;
  textarea.setSelectionRange(lastIndex + 1, lastIndex + 1);

  textarea.style.animation = "none";
  textarea.offsetHeight;
  textarea.style.animation = "typeEffect 0.2s ease";
}

renderKeyboard(currentLayout);
