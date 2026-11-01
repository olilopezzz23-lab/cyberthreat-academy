/**
 * CyberThreat Academy - Módulo Principal (App)
 * Coordina navegación, renderizado de módulos, progreso y estado global
 */

// Estado global de la aplicación
var currentCourseIndex = 0;
var currentModuleIndex = 0;
var currentLessonIndex = 0;
var completedLessons = JSON.parse(localStorage.getItem('cyber_completed_lessons') || '[]');

function initAcademy() {
  if (!window.ACADEMY_DATA || !window.ACADEMY_DATA.courses) {
    console.error("No se pudo cargar la base de datos de cursos.");
    return;
  }
  renderCourseTabs();
  loadCourse(0);
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Renderizar botones de nivel en la cabecera
function renderCourseTabs() {
  const container = document.getElementById('course-tabs');
  if (!container) return;
  container.innerHTML = '';

  window.ACADEMY_DATA.courses.forEach((course, idx) => {
    const btn = document.createElement('button');
    btn.className = `px-3 py-1.5 rounded-lg transition text-xs font-semibold cursor-pointer ${
      idx === currentCourseIndex ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
    }`;
    btn.textContent = course.level;
    btn.onclick = () => loadCourse(idx);
    container.appendChild(btn);
  });
}

// Cargar un curso específico
function loadCourse(index) {
  currentCourseIndex = index;
  currentModuleIndex = 0;
  currentLessonIndex = 0;
  renderCourseTabs();

  const course = window.ACADEMY_DATA.courses[currentCourseIndex];
  if (!course) return;

  const levelTag = document.getElementById('course-sidebar-level');
  if (levelTag) levelTag.textContent = course.level;

  const durationTag = document.getElementById('course-sidebar-duration');
  if (durationTag) durationTag.innerHTML = `<i data-lucide="clock" class="w-3.5 h-3.5"></i> ${course.duration}`;

  const titleTag = document.getElementById('course-sidebar-title');
  if (titleTag) titleTag.textContent = course.title;

  renderSidebarLessons();
  loadLesson(0, 0);
  updateOverallProgress();
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Renderizar la lista de módulos y lecciones en la barra lateral
function renderSidebarLessons() {
  const container = document.getElementById('lessons-nav');
  if (!container) return;
  container.innerHTML = '';
  const course = window.ACADEMY_DATA.courses[currentCourseIndex];
  if (!course) return;

  course.modules.forEach((mod, mIdx) => {
    const modBox = document.createElement('div');
    modBox.className = 'space-y-1.5';

    const modTitle = document.createElement('h3');
    modTitle.className = 'text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-2 py-1';
    modTitle.textContent = mod.title;
    modBox.appendChild(modTitle);

    const list = document.createElement('div');
    list.className = 'space-y-1';

    mod.lessons.forEach((les, lIdx) => {
      const isCurrent = (mIdx === currentModuleIndex && lIdx === currentLessonIndex);
      const isDone = completedLessons.includes(les.id);

      const item = document.createElement('div');
      item.className = `p-2.5 rounded-lg text-xs font-medium cursor-pointer transition flex items-center justify-between ${
        isCurrent ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold' : 'hover:bg-cyber-800/80 text-slate-300'
      }`;
      item.onclick = () => loadLesson(mIdx, lIdx);

      const left = document.createElement('div');
      left.className = 'flex items-center gap-2.5 truncate';
      left.innerHTML = `
        <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}" class="w-4 h-4 ${isDone ? 'text-emerald-400' : 'text-slate-600'} flex-shrink-0"></i>
        <span class="truncate">${les.title}</span>
      `;

      const right = document.createElement('span');
      right.className = 'text-[10px] font-mono text-slate-500 flex-shrink-0';
      right.textContent = les.duration;

      item.appendChild(left);
      item.appendChild(right);
      list.appendChild(item);
    });

    modBox.appendChild(list);
    container.appendChild(modBox);
  });
}

// Cargar contenido de la lección seleccionada
function loadLesson(mIdx, lIdx) {
  currentModuleIndex = mIdx;
  currentLessonIndex = lIdx;
  const course = window.ACADEMY_DATA.courses[currentCourseIndex];
  if (!course || !course.modules[mIdx] || !course.modules[mIdx].lessons[lIdx]) return;
  const lesson = course.modules[mIdx].lessons[lIdx];

  // Cabecera
  const modTag = document.getElementById('lesson-module-tag');
  if (modTag) modTag.textContent = `Módulo ${mIdx + 1}`;

  const durTag = document.getElementById('lesson-duration-tag');
  if (durTag) durTag.textContent = lesson.duration;

  const titleTag = document.getElementById('lesson-title');
  if (titleTag) titleTag.textContent = lesson.title;

  const sumTag = document.getElementById('lesson-summary');
  if (sumTag) sumTag.textContent = lesson.summary;

  // Estado de completado
  updateCompleteButtonState(lesson.id);

  // 1. Render Teoría (Markdown)
  const theoryBox = document.getElementById('theory-content');
  if (theoryBox && window.marked) {
    theoryBox.innerHTML = marked.parse(lesson.theory);
  }

  // 2. Render Laboratorio
  if (lesson.lab) {
    const labTitle = document.getElementById('lab-title');
    if (labTitle) labTitle.textContent = lesson.lab.title;

    const labObj = document.getElementById('lab-objective');
    if (labObj) labObj.textContent = lesson.lab.objective;

    const labPrereq = document.getElementById('lab-prerequisites');
    if (labPrereq) labPrereq.textContent = lesson.lab.prerequisites;

    const labDeliv = document.getElementById('lab-deliverable');
    if (labDeliv) labDeliv.textContent = lesson.lab.deliverable;

    const stepsList = document.getElementById('lab-steps-list');
    if (stepsList) {
      stepsList.innerHTML = '';
      lesson.lab.steps.forEach(st => {
        const card = document.createElement('div');
        card.className = 'bg-cyber-900/70 border border-cyber-800 rounded-lg p-4 space-y-2';
        card.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-cyan-400">Paso ${st.step}</span>
            <button onclick="copyToClipboard('${st.command.replace(/'/g, "\\'")}')" class="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar
            </button>
          </div>
          <p class="text-xs font-semibold text-slate-200">${st.instruction}</p>
          <div class="bg-black/80 rounded p-2.5 font-mono text-xs text-emerald-400 overflow-x-auto border border-cyber-800">
            <code>${st.command}</code>
          </div>
          <p class="text-[11px] text-slate-400 italic">${st.explanation}</p>
        `;
        stepsList.appendChild(card);
      });
    }
  }

  // 3. Render Consola / Terminal Simulator (definida en js/terminal.js)
  if (typeof setupTerminalForLesson === 'function') {
    setupTerminalForLesson(lesson);
  }

  // 4. Render Quiz (definido en js/quiz.js)
  if (typeof renderQuizForLesson === 'function') {
    renderQuizForLesson(lesson);
  }

  // 5. Render Guion de Vídeo
  renderVideoScriptForLesson(lesson);

  // Actualizar sidebar visualmente e iconos
  renderSidebarLessons();
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Render Guion Multimedia
function renderVideoScriptForLesson(lesson) {
  if (!lesson.video_script) return;
  const scriptTitle = document.getElementById('video-script-title');
  if (scriptTitle) scriptTitle.textContent = lesson.video_script.title;

  const durationTarget = document.getElementById('video-target-duration');
  if (durationTarget) durationTarget.textContent = lesson.video_script.target_duration;

  const scenesList = document.getElementById('video-scenes-list');
  if (!scenesList) return;
  scenesList.innerHTML = '';

  lesson.video_script.scenes.forEach((sc, idx) => {
    const item = document.createElement('div');
    item.className = 'bg-cyber-900 border border-cyber-800 rounded-lg p-4 space-y-2';
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold text-cyan-400">Escena ${idx + 1} (${sc.time})</span>
        <span class="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Visual + Audio</span>
      </div>
      <div class="text-xs text-amber-300/90 font-mono bg-cyber-950 p-2 rounded border border-cyber-800">
        <strong>🎬 Visual:</strong> ${sc.visual}
      </div>
      <div class="text-xs text-slate-200 leading-relaxed pl-1 border-l-2 border-cyan-500/50">
        <strong>🎙️ Locución:</strong> "${sc.audio}"
      </div>
    `;
    scenesList.appendChild(item);
  });
}

// Cambiar pestañas de la lección
function switchView(viewName) {
  document.querySelectorAll('.view-panel').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active', 'border-cyan-400', 'text-cyan-400');
    btn.classList.add('border-transparent', 'text-slate-400');
  });

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.remove('hidden');

  const activeBtn = document.getElementById(`tab-btn-${viewName}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'border-cyan-400', 'text-cyan-400');
    activeBtn.classList.remove('border-transparent', 'text-slate-400');
  }
}

// Marcar lección como completada
function toggleCurrentLessonComplete() {
  const course = window.ACADEMY_DATA.courses[currentCourseIndex];
  if (!course || !course.modules[currentModuleIndex]) return;
  const lesson = course.modules[currentModuleIndex].lessons[currentLessonIndex];
  if (!lesson) return;

  const idx = completedLessons.indexOf(lesson.id);
  if (idx > -1) {
    completedLessons.splice(idx, 1);
  } else {
    completedLessons.push(lesson.id);
  }

  localStorage.setItem('cyber_completed_lessons', JSON.stringify(completedLessons));
  updateCompleteButtonState(lesson.id);
  renderSidebarLessons();
  updateOverallProgress();
  if (window.lucide) {
    lucide.createIcons();
  }
}

function updateCompleteButtonState(lessonId) {
  const isDone = completedLessons.includes(lessonId);
  const btn = document.getElementById('btn-toggle-complete');
  const text = document.getElementById('complete-btn-text');
  if (!btn || !text) return;

  if (isDone) {
    btn.className = 'flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500 bg-emerald-950/60 text-emerald-400 transition cursor-pointer';
    text.textContent = 'Completada ✓';
  } else {
    btn.className = 'flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-cyber-700 bg-cyber-900 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition cursor-pointer';
    text.textContent = 'Marcar como completada';
  }
}

function updateOverallProgress() {
  let total = 0;
  if (!window.ACADEMY_DATA?.courses) return;
  window.ACADEMY_DATA.courses.forEach(c => {
    c.modules.forEach(m => total += m.lessons.length);
  });
  const percent = total > 0 ? Math.round((completedLessons.length / total) * 100) : 0;
  const progressTag = document.getElementById('progress-percent');
  if (progressTag) progressTag.textContent = `${percent}%`;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert('¡Comando copiado al portapapeles!');
}

function copyFullScript() {
  const course = window.ACADEMY_DATA.courses[currentCourseIndex];
  const lesson = course?.modules[currentModuleIndex]?.lessons[currentLessonIndex];
  if (!lesson || !lesson.video_script) return;

  let full = `# ${lesson.video_script.title}\nDuración: ${lesson.video_script.target_duration}\n\n`;
  lesson.video_script.scenes.forEach((sc, i) => {
    full += `## Escena ${i+1} [${sc.time}]\nVISUAL: ${sc.visual}\nLOCUCIÓN: ${sc.audio}\n\n`;
  });
  navigator.clipboard.writeText(full);
  alert('¡Guion completo copiado al portapapeles!');
}

function toggleVideoExportModal() {
  alert("Integración lista: Puedes conectar estos guiones directamente con tu pipeline local de Remotion/ElevenLabs para compilar los vídeos automáticamente.");
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', initAcademy);
