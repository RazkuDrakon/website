const screen = document.getElementById("screen");
let typing = false;
let systemReady = false;

const initialLines = [
  "INITIALIZING SYSTEM PROFILE ................. OK",
  "",
  "COPYRIGHT (C) 2026 SERGIO SUCH [GITHUB: RZK-DEV]",
  "",
  "CPU ............... OK",
  "MEMORY CHECK ...... 640KB OK",
  "FLOPPY DRIVE A: ... DETECTED",
  "FLOPPY DRIVE B: ... NOT PRESENT",
  "HARD DISK 0 ....... 20MB OK",
  "SERIAL PORT COM1 .. OK",
  "PARALLEL PORT LPT1 OK",
  "",
  "BOOTING FROM DISK...",
  "",
  "WEBSITE PROJECT INITIALIZING ........... OK",
  "HTML FILE .............................. DETECTED",
  "CSS FILE ............................... DETECTED",
  "JAVASCRIPT FILE ........................ DETECTED",
  "DEVELOPER DATA  ........................ LOADED",
  "",
  "SYSTEM READY. PRESS ENTER TO CONTINUE...",
];

const sections = {
  DEVELOPER:[
  "DEVELOPER IDENTIFICATION",
  "----------------------",
  "NAME ................. SERGIO SUCH",
  "ROLE ................. SOFTWARE DEVELOPER",
  "CONTACT .............. SERGIO.SUCHPICO@GMAIL.COM",
  "PHONE ................ +34 676 22 97 32",
  "",
  "AVAILABLE COMMANDS:",
  ">WORK ...... LOAD WORK EXPERIENCE",
  ">EDUCATION . LOAD EDUCATION EXPERIENCE",
  ">PROJECTS .. LOAD PERSONAL PROJECTS",
  ">TECH ...... LOAD TECHNICAL SKILLS",
  ">CONTACT ... LOAD CONTACT INFORMATION",
  ">CV ........ DOWNLOAD CURRICULUM VITAE [PDF]",
  ">HELP ...... LIST AVAILABLE COMMANDS",
  ">REBOOT .... RESTART SYSTEM",
  ">EXIT ...... CLOSE TERMINAL",
  "",
  "DEVELOPER DATA READY. ENTER COMMAND:",
  ],
  WORK: [
    "",
    "LOADING WORK MODULES",
    "--------------------",
    "[OK] DUAL LINK SYSTEMS MODULE",
    "     ROLE ............ FULL-STACK SOFTWARE DEVELOPER",
    "     PERIOD .......... 04/2024 - PRESENT",
    "     STATUS .......... ACTIVE",
    "     NOTES:",
    "       - Custom client functionality development",
    "       - Billing anomaly detection tool developed",
    "       - Incident rate reduced by 15%",
    "       - Database error management tools developed",
    "",
    "[OK] GRUPO SIME LEGACY MODULE",
    "     ROLE ............ JUNIOR SOFTWARE DEVELOPER",
    "     PERIOD .......... 10/2023 - 04/2024",
    "     NOTES:",
    "       - HESTIA cloud backend maintenance",
    "       - BACCUS multiplatform frontend routines",
    "       - Unit testing protocols (CYPRESS / FLUTTER)",
    "",
    "[OK] AOINK TRAINING MODULE",
    "     ROLE ............ SOFTWARE DEVELOPER INTERN",
    "     PERIOD .......... 03/2023 - 08/2023",
    "     NOTES:",
    "       - Front-end specialization",
    "       - UI/UX interface optimization",
    "",
    "SYSTEM STATUS ................ STABLE",
    "MODULE LOADED SUCCESSFULLY",
  ],
  EDUCATION: [
    "",
    "READING EDUCATION ROM",
    "---------------------",
    "[ROM] ADV. TECHNICIAN - MULTIPLATFORM APPLICATION DEVELOPMENT",
    "      IES PERE MARIA ORTS I BOSCH",
    "      CYCLES ......... 2000 HOURS",
    "",
    "[ROM] MASTER DEGREE - GAME DESIGN AND DEVELOPMENT",
    "      IDESIGNER SCHOOL",
    "      CYCLES ......... 600 HOURS",
    "",
    "SYSTEM STATUS ................ STABLE",
    "ROMS LOADED SUCCESSFULLY",
  ],
  PROJECTS: [
    "",
    "LOADING PERSONAL PROJECTS PACKAGES",
    "----------------------------------",
    "[PKG] GASTOBOT",
    "      DAILY EXPENSE MANAGEMENT BOT",
    "      NODEJS",
    "",
    "[PKG] FIUUUUM!!!",
    "      LOCAL MULTIPLAYER ARCADE RACING GAME",
    "      GLOBAL GAME JAM 2024 BUILD",
    "",
    "[PKG] THE PROTECTIVE SAMURAI",
    "      RETRO TWO-PLAYER COOP GAME",
    "      LUDUM DARE 46 BUILD",
    "",
    "[PKG] THE WIZARD'S DUNGEON",
    "      GAME BOY COLOR GAME DEVELOPMENT RESEARCH PROTOTYPE",
    "",
    "SYSTEM STATUS ................ STABLE",
    "PACKAGES LOADED SUCCESSFULLY",
  ],
  TECH: [
    "",
    "REGISTERING TECH SUPPORTED PROTOCOLS",
    "------------------------------------",
    "LANGUAGES ...... JAVASCRIPT | PYTHON | CSS | SQL",
    "                 SWIFT | C# | JAVA | HTML",
    "",
    "FRAMEWORKS ..... REACT NATIVE | ANGULAR | NODEJS",
    "                 ASP.NET | SWIFTUI | MYSQL",
    "",
    "OTHER .......... GIT | REST | CI/CD | UNIT TESTING",
    "                 SCRUM / AGILE",
    "",
    "SYSTEM STATUS ................ STABLE",
    "PROTOCOLS LOADED SUCCESSFULLY",
  ],
  CONTACT: [
    "",
    "LOADING CONTACT INFORMATION MODULE",
    "-----------------------------",
    "EMAIL .................. SERGIO.SUCHPICO@GMAIL.COM",
    "PHONE .................. +34 676 22 97 32",
    "LINKEDIN ............... HTTPS://LINKEDIN.COM/IN/SERGIO-SUCH",
    "",
    "SYSTEM STATUS ................ STABLE",
    "MODULE LOADED SUCCESSFULLY",
  ],
  HELP: [
    "",
    "ENTERING HELP MODULE",
    "--------------------",
    "[OK] AVAILABLE COMMANDS",
    "     - WORK",
    "     - EDUCATION",
    "     - PROJECTS",
    "     - TECH",
    "     - CONTACT",
    "     - CV",
    "     - REBOOT",
    "",
    "SYSTEM STATUS ................ STABLE",
    "MODULE LOADED SUCCESSFULLY",
  ],
};

//TYPEWRITER
function typeLines(lines, callback) {
  typing = true;
  let i = 0;

  function next() {
    if (i >= lines.length) {
      typing = false;
      callback && callback();
      return;
    }

    screen.appendChild(document.createTextNode(lines[i] + "\n"));
    screen.scrollTop = screen.scrollHeight;
    i++;
    setTimeout(next, Math.random() * 400 + 40);
  }

  next();
}
//PROMPT
function createPrompt() {
  const line = document.createElement("div");
  line.className = "prompt-container";

  const symbol = document.createElement("span");
  symbol.textContent = "> ";

  const input = document.createElement("span");
  input.className = "input-text";

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  line.append(symbol, input, cursor);
  screen.appendChild(line);
  screen.scrollTop = screen.scrollHeight;
}

//BOOT
function boot() {
  screen.textContent = "";
  systemReady = false;

  typeLines(initialLines, createPrompt);
}

boot();

//KEYBOARD
document.addEventListener("keydown", (e) => {
  if (typing) return;

  const prompts = document.getElementsByClassName("prompt-container");
  if (!prompts.length) return;

  const current = prompts[prompts.length - 1];
  const input = current.querySelector(".input-text");

  if (e.key.length === 1) {
    input.textContent += e.key.toUpperCase();
  }

  if (e.key === "Backspace") {
    input.textContent = input.textContent.slice(0, -1);
  }

  if (e.key === "Enter") {
    const cmd = input.textContent.trim();
    current.remove();

    if (!systemReady && cmd === "") {
  systemReady = true;

  screen.textContent = "";

  setTimeout(() => {
    typeLines(sections.DEVELOPER, createPrompt);
  }, 300);

  return;
}


    handleCommand(cmd);
  }
});

//COMMAND HANDLER
function handleCommand(command) {
  const cmd = command.toUpperCase();

  if (cmd === "REBOOT") {
    boot();
    return;
  }

  if (cmd === "CV") {
  screen.appendChild(
    document.createTextNode("ACCESSING FILESYSTEM .............. OK\n")
  );
  screen.appendChild(
    document.createTextNode("ACCESS GRANTED\n")
  );
  screen.appendChild(
    document.createTextNode("OPENING /CV/SERGIO_SUCH_CV.PDF ..... OK\n")
  );

  window.open("cv/EN_Software_Developer_Sergio_Such.pdf", "_blank");

  createPrompt();CSPViolationReportBody
  return;
  }

  if (cmd === "EXIT") {
    screen.appendChild(document.createTextNode("CLOSING SYSTEM ............. OK\n"));
    setTimeout(() => {
        window.close();
    }, 500);
    return;
}


  if (sections[cmd]) {
    typeLines(sections[cmd], createPrompt);
    return;
  }

  screen.appendChild(
    document.createTextNode("UNKNOWN COMMAND: " + command + "\n")
  );
  createPrompt();
}