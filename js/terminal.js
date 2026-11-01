/**
 * CyberThreat Academy - Módulo Terminal Simulator
 * Gestiona el entorno interactivo de consola Unix/Cyber y comandos simulados
 */

function setupTerminalForLesson(lesson) {
  const screen = document.getElementById('terminal-screen');
  if (!screen) return;
  screen.textContent = lesson.terminal_sim?.initial_text || "CyberTerminal v1.0 listo. Escribe 'help'.";

  const quickBtnContainer = document.getElementById('terminal-quick-buttons');
  if (!quickBtnContainer) return;
  quickBtnContainer.innerHTML = '';

  if (lesson.terminal_sim?.commands) {
    Object.keys(lesson.terminal_sim.commands).forEach(cmd => {
      const btn = document.createElement('button');
      btn.className = 'px-3 py-1.5 rounded-lg bg-cyber-950 hover:bg-cyan-950/70 text-cyan-300 hover:text-cyan-100 font-mono text-xs border border-cyber-800 hover:border-cyan-500/60 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all duration-150 active:scale-95 cursor-pointer flex items-center gap-1.5';
      btn.innerHTML = `<span class="text-emerald-400 font-bold">$</span><span>${cmd}</span>`;
      btn.onclick = () => runTerminalCommand(cmd);
      quickBtnContainer.appendChild(btn);
    });
  }
}

function runTerminalCommand(cmd) {
  const screen = document.getElementById('terminal-screen');
  if (!screen) return;
  const lesson = window.ACADEMY_DATA?.courses[currentCourseIndex]?.modules[currentModuleIndex]?.lessons[currentLessonIndex];
  screen.textContent += `\n\nuser@threat-lab:~$ ${cmd}\n`;

  const cleanCmd = cmd.trim();
  const lower = cleanCmd.toLowerCase();

  if (lower === 'help') {
    const available = lesson?.terminal_sim?.commands ? Object.keys(lesson.terminal_sim.commands).join(', ') : 'No hay comandos específicos configurados';
    screen.textContent += `[Comandos disponibles]: ${available}, clear, help`;
  } else if (lower === 'clear') {
    screen.textContent = '';
  } else if (lesson?.terminal_sim?.commands && lesson.terminal_sim.commands[cleanCmd]) {
    screen.textContent += lesson.terminal_sim.commands[cleanCmd];
  } else {
    screen.textContent += `bash: ${cleanCmd}: orden no encontrada. Escribe 'help' para comandos válidos.`;
  }
  screen.scrollTop = screen.scrollHeight;
}

function handleTerminalSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('terminal-input');
  if (!input) return;
  const val = input.value.trim();
  if (val) {
    runTerminalCommand(val);
    input.value = '';
  }
}

function clearTerminal() {
  const screen = document.getElementById('terminal-screen');
  if (screen) {
    screen.textContent = 'CyberLab v1.0 - Terminal limpia.\n';
  }
}
