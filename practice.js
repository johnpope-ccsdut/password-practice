const KEY_ROWS = [
  ["BACKTICK", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "MINUS", "EQUALS", "BACKSPACE"],
  ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "LEFT-BRACKET", "RIGHT-BRACKET", "BACKSLASH"],
  ["CAPS-LOCK", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SEMICOLON", "QUOTE", "ENTER"],
  ["SHIFT-LEFT", "Z", "X", "C", "V", "B", "N", "M", "COMMA", "PERIOD", "SLASH", "SHIFT-RIGHT"],
  ["CTRL-LEFT", "WINDOWS", "ALT-LEFT", "SPACE", "ALT-RIGHT", "CONTEXT-MENU", "CTRL-RIGHT"]
];

const KEY_LABELS = {
  BACKTICK: "`~",
  MINUS: "-_",
  EQUALS: "=+",
  BACKSPACE: "BACKSPACE",
  TAB: "TAB",
  "LEFT-BRACKET": "[{",
  "RIGHT-BRACKET": "]}",
  BACKSLASH: "\\|",
  "CAPS-LOCK": "CAPS LOCK",
  SEMICOLON: ";:",
  QUOTE: "'\"",
  ENTER: "ENTER",
  "SHIFT-LEFT": "SHIFT",
  COMMA: ",<",
  PERIOD: ".>",
  SLASH: "/?",
  "SHIFT-RIGHT": "SHIFT",
  "CTRL-LEFT": "CTRL",
  WINDOWS: "WIN",
  "ALT-LEFT": "ALT",
  SPACE: "SPACE",
  "ALT-RIGHT": "ALT",
  "CONTEXT-MENU": "MENU",
  "CTRL-RIGHT": "CTRL"
};

const KEY_CHARACTERS = {
  BACKTICK: "`~",
  MINUS: "-_",
  EQUALS: "=+",
  "LEFT-BRACKET": "[{",
  "RIGHT-BRACKET": "]}",
  BACKSLASH: "\\|",
  SEMICOLON: ";:",
  QUOTE: "'\"",
  COMMA: ",<",
  PERIOD: ".>",
  SLASH: "/?",
  SPACE: " "
};

const screens = {
  setup: document.querySelector("#setup-screen"),
  practice: document.querySelector("#practice-screen"),
  transition: document.querySelector("#transition-screen"),
  login: document.querySelector("#login-screen"),
  complete: document.querySelector("#complete-screen")
};
const keyboard = document.querySelector("#keyboard");
const loginKeyboard = document.querySelector("#login-keyboard");
const target = document.querySelector("#target");
const sequence = document.querySelector("#sequence");
const lessonSelect = document.querySelector("#lesson-select");
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const usernameForm = document.querySelector("#username-form");
const passwordForm = document.querySelector("#password-form");
const usernameHintButton = document.querySelector("#username-hint-button");
const usernameHint = document.querySelector("#username-hint");
const loginPasswordHint = document.querySelector("#login-password-hint");
const keyTemplate = document.querySelector("#key-template");
const celebrationTemplate = document.querySelector("#celebration-template");
const timerElement = document.querySelector("#timer");
const transitionAvatar = document.querySelector("#transition-avatar");
const completeAvatar = document.querySelector("#complete-avatar");

let credentials = null;
let lesson = "find";
let subject = "username";
let position = 0;
let showMap = true;
let elapsedSeconds = 0;
let timerId = null;
let mistakeKey = "";
let lastPasswordShift = false;
let passwordFailures = 0;
let continueAfterTransition = null;

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.hidden = key !== name;
  });
  document.querySelector("#unset-button").hidden = name === "setup";
  timerElement.hidden = name === "setup" || elapsedSeconds === 0;
}

function currentValue() {
  return credentials[subject];
}

function isUppercase(character) {
  return character >= "A" && character <= "Z";
}

function keyCharacter(keyValue) {
  return KEY_CHARACTERS[keyValue] || (KEY_LABELS[keyValue] ? "" : keyValue);
}

function keyMatches(keyValue, expected) {
  if (!expected) return false;
  return keyCharacter(keyValue).includes(expected) || keyCharacter(keyValue).toUpperCase().includes(expected.toUpperCase());
}

function keyHasUppercase(keyValue, value) {
  return keyValue.length === 1 && isUppercase(keyValue) && value.includes(keyValue);
}

function keyHasLowercase(keyValue, value) {
  return keyValue.length === 1 && isUppercase(keyValue) && value.includes(keyValue.toLowerCase());
}

function firstMismatch(expectedValue, attempt) {
  const length = Math.max(expectedValue.length, attempt.length);
  for (let index = 0; index < length; index += 1) {
    if (expectedValue[index] !== attempt[index]) return index;
  }
  return length;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function updateTimer() {
  timerElement.textContent = formatTime(elapsedSeconds);
  timerElement.classList.toggle("overtime", elapsedSeconds >= 300);
  timerElement.hidden = !screens.setup.hidden || elapsedSeconds === 0;
}

function startTimer(reset = true) {
  window.clearInterval(timerId);
  if (reset) {
    elapsedSeconds = 0;
    updateTimer();
  }
  timerId = window.setInterval(() => {
    elapsedSeconds += 1;
    updateTimer();
  }, 1000);
}

function drawKeyboard(container, expected, mappedValue = "", visible = showMap, errorKey = "") {
  container.hidden = !visible;
  container.replaceChildren();
  const mappedKeys = new Set(mappedValue.toUpperCase());
  const passwordMode = container === loginKeyboard ? !passwordForm.hidden : subject === "password";
  KEY_ROWS.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.className = `key-row row-${rowIndex}`;
    row.forEach((keyValue) => {
      const key = keyTemplate.content.firstElementChild.cloneNode(true);
      key.dataset.key = keyValue;
      const label = KEY_LABELS[keyValue] || keyValue;
      const mainLabel = key.querySelector("[data-key-main]");
      const shiftLabel = key.querySelector("[data-key-shift]");
      if (label.length === 2 && !KEY_CHARACTERS[keyValue]?.includes(" ")) {
        mainLabel.textContent = label[0];
        shiftLabel.textContent = label[1];
      } else {
        mainLabel.textContent = label;
        shiftLabel.hidden = true;
      }
      if (keyValue.startsWith("SHIFT")) key.classList.add("shift-key");
      if (visible && [...keyCharacter(keyValue).toUpperCase()].some((character) => mappedKeys.has(character))) {
        if (passwordMode && keyHasUppercase(keyValue, mappedValue) && keyHasLowercase(keyValue, mappedValue)) {
          key.classList.add("password-shared-key");
        } else if (passwordMode && keyHasUppercase(keyValue, mappedValue)) {
          key.classList.add("password-uppercase-key");
        } else {
          key.classList.add(passwordMode ? "password-key" : "username-key");
        }
      }
      if (visible && keyMatches(keyValue, expected)) {
        key.classList.remove("password-key", "password-uppercase-key", "password-shared-key", "username-current-key");
        key.classList.add("current-key");
        key.classList.add(passwordMode
          ? isUppercase(expected) ? "password-uppercase-key" : "password-key"
          : "username-current-key");
      }
      if (visible && keyValue === errorKey) key.classList.add("error-key");
      if (visible && keyValue === "SHIFT-LEFT" && passwordMode && isUppercase(expected)) {
        key.classList.add("current-key", "password-key", "shift-current");
      }
      rowElement.append(key);
    });
    container.append(rowElement);
  });
}

function renderSequenceInto(container, value, activePosition, mask, characterSubject, hideRemaining = false) {
  container.replaceChildren();
  [...value].forEach((character, index) => {
    const item = document.createElement("span");
    item.textContent = hideRemaining && index >= activePosition ? "" : mask ? "•" : character;
    item.className = index < activePosition ? "done" : index === activePosition ? "current" : "";
    if (hideRemaining && index > activePosition) item.classList.add("ghost");
    if (characterSubject === "username") {
      item.classList.add("username-character");
    } else if (isUppercase(character)) {
      item.classList.add("password-uppercase");
    } else {
      item.classList.add("password-lowercase");
    }
    container.append(item);
  });
}

function renderSequence(value, activePosition, mask) {
  sequence.hidden = false;
  renderSequenceInto(sequence, value, activePosition, lesson === "recall" ? false : mask, subject, lesson === "recall");
}

function renderPractice() {
  const value = currentValue();
  const expected = value[position] || "";
  document.querySelector("#phase-label").textContent = subject === "username" ? "Username" : "Password";
  target.hidden = true;
  renderSequence(value, position, subject === "password" && lesson !== "find");
  drawKeyboard(keyboard, expected, lesson === "find" ? value : "", showMap, mistakeKey);
}

function resetLesson(nextLesson = lesson) {
  lesson = nextLesson;
  subject = "username";
  position = 0;
  showMap = lesson === "find";
  mistakeKey = "";
  lessonSelect.value = lesson;
  renderPractice();
}

function nextLesson(currentLesson) {
  const order = ["find", "sequence", "recall", "login"];
  return order[order.indexOf(currentLesson) + 1] || "login";
}

function celebrate(kind) {
  const celebration = celebrationTemplate.content.firstElementChild.cloneNode(true);
  celebration.classList.add(kind);
  document.querySelector(".app-shell").append(celebration);
  window.setTimeout(() => celebration.remove(), 4200);
}

function finishPractice() {
  window.clearInterval(timerId);
  timerId = null;
  chooseAvatar(completeAvatar);
  showScreen("complete");
  window.requestAnimationFrame(() => screens.complete.focus());
  celebrate("success");
}

function showTransition(next) {
  continueAfterTransition = next;
  chooseAvatar(transitionAvatar);
  showScreen("transition");
  window.requestAnimationFrame(() => screens.transition.focus());
}

function chooseAvatar(element) {
  const avatarIndex = Math.floor(Math.random() * 12);
  const column = avatarIndex % 4;
  const row = Math.floor(avatarIndex / 4);
  element.style.backgroundPosition = `${column * 33.333333}% ${row * 50}%`;
}

function continueTransition() {
  const next = continueAfterTransition;
  continueAfterTransition = null;
  if (next) next();
}

function restartPractice() {
  if (!credentials) {
    clearSession();
    return;
  }
  startTimer(false);
  showScreen("practice");
  resetLesson("find");
}

function clearSession() {
  window.clearInterval(timerId);
  timerId = null;
  credentials = null;
  elapsedSeconds = 0;
  timerElement.classList.remove("overtime");
  document.querySelector("#setup-form").reset();
  loginUsername.value = "";
  loginPassword.value = "";
  showScreen("setup");
}

function advanceSubject() {
  if (subject === "username") {
    subject = "password";
    position = 0;
    showMap = lesson === "find";
    showTransition(() => {
      showScreen("practice");
      renderPractice();
    });
    return;
  }
  if (lesson === "login") {
    finishPractice();
    return;
  }
  const followingLesson = nextLesson(lesson);
  showTransition(() => {
    if (followingLesson === "login") {
      enterLogin();
      return;
    }
    showScreen("practice");
    resetLesson(followingLesson);
  });
}

function acceptPracticeKey(event) {
  if (screens.practice.hidden || !credentials || event.key.length !== 1) return;
  const expected = currentValue()[position];
  if (!expected) return;
  const matches = subject === "username"
    ? event.key.toLowerCase() === expected.toLowerCase()
    : event.key === expected;
  if (!matches) {
    showMap = true;
    mistakeKey = "";
    if (subject === "password" && expected >= "a" && expected <= "z" && event.key === expected.toUpperCase()) {
      mistakeKey = event.shiftKey ? expected.toUpperCase() : "CAPS-LOCK";
    }
    renderPractice();
    return;
  }
  mistakeKey = "";
  position += 1;
  celebrate("success");
  if (position >= currentValue().length) {
    advanceSubject();
  } else {
    renderPractice();
  }
}

function enterLogin() {
  showScreen("login");
  usernameForm.hidden = false;
  passwordForm.hidden = true;
  loginUsername.value = "";
  loginPassword.value = "";
  usernameHint.hidden = true;
  usernameHintButton.textContent = "Show username";
  loginPasswordHint.hidden = true;
  loginPasswordHint.replaceChildren();
  passwordFailures = 0;
  document.querySelector("#show-password").checked = false;
  loginPassword.type = "password";
  showMap = false;
  lessonSelect.value = "login";
  drawKeyboard(loginKeyboard, "", "", false);
  loginUsername.focus();
}

function chooseLesson(value) {
  if (!credentials) {
    lesson = value;
    lessonSelect.value = value;
    return;
  }
  if (value === "login") {
    enterLogin();
    return;
  }
  showScreen("practice");
  resetLesson(value);
}

document.querySelector("#setup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  credentials = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value
  };
  document.querySelector("#setup-form").reset();
  showScreen("practice");
  resetLesson("find");
});

lessonSelect.addEventListener("change", () => chooseLesson(lessonSelect.value));

document.addEventListener("keydown", (event) => {
  if (!timerId && credentials && event.key.length === 1 && (!screens.practice.hidden || !screens.login.hidden)) {
    startTimer();
  }
  acceptPracticeKey(event);
  if (!screens.login.hidden && event.target !== loginUsername && event.target !== loginPassword && event.key.length === 1) {
    const activeInput = passwordForm.hidden ? loginUsername : loginPassword;
    activeInput.focus();
  }
});

screens.transition.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    continueTransition();
  }
});

usernameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (loginUsername.value !== credentials.username) {
    showMap = true;
    const mismatch = firstMismatch(credentials.username, loginUsername.value);
    drawKeyboard(loginKeyboard, credentials.username[mismatch] || "", credentials.username, true);
    return;
  }
  usernameForm.hidden = true;
  passwordForm.hidden = false;
  document.querySelector("#login-title").textContent = "Password";
  showMap = false;
  drawKeyboard(loginKeyboard, "", "", false);
  loginPassword.focus();
});

usernameHintButton.addEventListener("click", () => {
  const isHidden = usernameHint.hidden;
  usernameHint.hidden = !isHidden;
  usernameHintButton.textContent = isHidden ? "Hide username" : "Show username";
  if (isHidden) {
    renderSequenceInto(usernameHint, credentials.username, -1, false, "username");
    drawKeyboard(loginKeyboard, credentials.username[loginUsername.value.length] || credentials.username[0], credentials.username, true);
  } else if (passwordForm.hidden) {
    drawKeyboard(loginKeyboard, "", "", false);
  }
});

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (loginPassword.value !== credentials.password) {
    passwordFailures += 1;
    passwordForm.hidden = false;
    document.querySelector("#login-title").textContent = "Password";
    showMap = true;
    const mismatch = firstMismatch(credentials.password, loginPassword.value);
    const expected = credentials.password[mismatch] || "";
    const actual = loginPassword.value[mismatch] || "";
    const errorKey = expected >= "a" && expected <= "z" && actual === expected.toUpperCase()
      ? lastPasswordShift ? expected.toUpperCase() : "CAPS-LOCK"
      : "";
    drawKeyboard(loginKeyboard, expected, credentials.password, true, errorKey);
    if (passwordFailures >= 2) {
      renderSequenceInto(loginPasswordHint, credentials.password, -1, false, "password");
      loginPasswordHint.hidden = false;
    }
    loginPassword.focus();
    return;
  }
  finishPractice();
});

document.querySelector("#show-password").addEventListener("change", (event) => {
  loginPassword.type = event.target.checked ? "text" : "password";
});

loginUsername.addEventListener("input", () => {
  if (!usernameHint.hidden) {
    drawKeyboard(loginKeyboard, credentials.username[loginUsername.value.length] || "", credentials.username, true);
  }
});

loginPassword.addEventListener("input", () => {
  if (showMap) {
    drawKeyboard(loginKeyboard, credentials.password[loginPassword.value.length] || "", credentials.password, true);
  }
});

loginPassword.addEventListener("keydown", (event) => {
  lastPasswordShift = event.shiftKey;
});

screens.complete.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    restartPractice();
  }
});
document.addEventListener("click", () => {
  if (!screens.transition.hidden) {
    continueTransition();
  } else if (!screens.complete.hidden) {
    restartPractice();
  }
});
document.querySelector("#unset-button").addEventListener("click", clearSession);
window.addEventListener("beforeunload", () => {
  credentials = null;
  window.clearInterval(timerId);
});
