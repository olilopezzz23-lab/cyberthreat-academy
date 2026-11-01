/**
 * CyberThreat Academy - Módulo Quiz y Autoevaluación
 * Renderiza preguntas y valida respuestas técnicas de cada lección
 */

function renderQuizForLesson(lesson) {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  container.innerHTML = '';
  const questions = lesson.quiz || [];

  const scoreBadge = document.getElementById('quiz-score-badge');
  if (scoreBadge) {
    scoreBadge.textContent = `${questions.length} Pregunta(s)`;
  }

  questions.forEach((q, qIdx) => {
    const qCard = document.createElement('div');
    qCard.className = 'bg-cyber-900 border border-cyber-800 rounded-xl p-5 space-y-3';

    const qTitle = document.createElement('h4');
    qTitle.className = 'font-semibold text-white text-sm';
    qTitle.textContent = `${qIdx + 1}. ${q.question}`;
    qCard.appendChild(qTitle);

    const optsList = document.createElement('div');
    optsList.className = 'space-y-2';

    const feedback = document.createElement('div');
    feedback.className = 'hidden text-xs p-3 rounded-lg mt-3 leading-relaxed';

    q.options.forEach((opt, oIdx) => {
      const btnOpt = document.createElement('button');
      btnOpt.className = 'w-full text-left px-4 py-2.5 rounded-lg border border-cyber-800 bg-cyber-950/60 hover:bg-cyber-800/80 text-xs text-slate-300 transition flex items-center justify-between cursor-pointer';
      btnOpt.innerHTML = `<span>${opt}</span>`;
      btnOpt.onclick = () => {
        // Verificar respuesta
        if (oIdx === q.correctIndex) {
          btnOpt.className = 'w-full text-left px-4 py-2.5 rounded-lg border border-emerald-500 bg-emerald-950/40 text-emerald-300 text-xs font-semibold';
          feedback.className = 'block text-xs p-3 rounded-lg mt-3 bg-emerald-950/50 border border-emerald-800 text-emerald-200';
          feedback.innerHTML = `<strong>¡Correcto!</strong> ${q.explanation}`;
        } else {
          btnOpt.className = 'w-full text-left px-4 py-2.5 rounded-lg border border-red-500 bg-red-950/40 text-red-300 text-xs';
          feedback.className = 'block text-xs p-3 rounded-lg mt-3 bg-red-950/50 border border-red-800 text-red-200';
          feedback.innerHTML = `<strong>Incorrecto.</strong> ${q.explanation}`;
        }
      };
      optsList.appendChild(btnOpt);
    });

    qCard.appendChild(optsList);
    qCard.appendChild(feedback);
    container.appendChild(qCard);
  });
}
