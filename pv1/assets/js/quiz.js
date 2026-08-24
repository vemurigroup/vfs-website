// 4-tap "what should you do first?" quiz. Question set and branching logic
// ported verbatim from the original Component's quizData()/result().
'use strict';

const Quiz = {
  QUESTIONS: [
    { q: 'Do you have 6 months of expenses set aside in cash?', o: [['No, not really', 'no'], ['Some of it', 'part'], ['Yes, comfortably', 'yes']], k: 'fund' },
    { q: 'Does anyone depend on your income, or do you have a loan?', o: [['Yes', 'yes'], ['Not yet', 'no']], k: 'depend' },
    { q: 'Beyond your employer policy, do you own health cover?', o: [['No', 'no'], ['Yes, my own policy', 'yes']], k: 'health' },
    { q: 'How much can you invest every month, without stress?', o: [['Under ₹2,000', 'low'], ['₹2,000 – ₹10,000', 'mid'], ['More than ₹10,000', 'high']], k: 'amount' }
  ],

  state: { step: 0, answers: {} },

  result() {
    const a = this.state.answers;
    const amt = a.amount === 'high' ? '₹10,000+' : a.amount === 'mid' ? '₹5,000' : '₹1,000';

    if (a.fund === 'no') return {
      title: 'Build the emergency fund first.',
      body: 'Before any SIP into equity, park 6 months of expenses somewhere boring and liquid. It is what stops you selling investments at the worst possible time.',
      steps: [['01', 'Start a ' + amt + '/month SIP into a liquid or arbitrage fund'], ['02', 'Target 6 months of expenses, then stop adding'], ['03', 'Only then move new money into equity SIPs']]
    };
    if (a.depend === 'yes') return {
      title: 'Buy term cover this month.',
      body: 'Someone relies on your income, so the cheapest thing you will ever buy is 10–15× your annual income in pure term cover. Premiums only go up with age.',
      steps: [['01', 'Get quotes for 10–15× your annual income'], ['02', 'Term until your planned retirement age, no riders you cannot explain'], ['03', 'Then start a ' + amt + '/month equity SIP']]
    };
    if (a.health === 'no') return {
      title: 'Get your own health cover.',
      body: 'Your employer policy ends the day the job does, and it usually will not cover your parents. A family floater plus a super top-up is cheap at your age.',
      steps: [['01', 'Family floater sized to your city, plus a super top-up'], ['02', 'Check the network hospitals near where you live'], ['03', 'Then start a ' + amt + '/month equity SIP']]
    };
    return {
      title: 'You are covered — go compound.',
      body: 'Downside handled. Now put money to work on goals with dates on them, and add NPS if you are paying tax under the old regime.',
      steps: [['01', 'One SIP per goal, starting at ' + amt + '/month'], ['02', 'Top up the amount every year you get a raise'], ['03', 'Add NPS for the extra ₹50,000 deduction under 80CCD(1B)']]
    };
  },

  init() {
    const progressFill = document.getElementById('quizProgressFill');
    const progressLabel = document.getElementById('quizProgressLabel');
    const questionBlock = document.getElementById('quizQuestion');
    const resultBlock = document.getElementById('quizResult');
    const questionTitle = document.getElementById('quizQuestionText');
    const optionsList = document.getElementById('quizOptions');
    const resultTitle = document.getElementById('quizResultTitle');
    const resultBody = document.getElementById('quizResultBody');
    const stepsList = document.getElementById('quizSteps');
    const restartBtn = document.getElementById('quizRestart');

    if (!questionBlock || !resultBlock) return;

    const render = () => {
      const total = this.QUESTIONS.length;
      const done = this.state.step >= total;
      const pct = Math.round((Math.min(this.state.step, total) / total) * 100);

      progressFill.style.width = pct + '%';
      progressLabel.textContent = done ? 'Done' : 'Step ' + (this.state.step + 1) + ' of ' + total;

      questionBlock.style.display = done ? 'none' : 'flex';
      resultBlock.style.display = done ? 'flex' : 'none';

      if (!done) {
        const cur = this.QUESTIONS[this.state.step];
        questionTitle.textContent = cur.q;
        optionsList.replaceChildren(...cur.o.map(([label, value]) => {
          const li = document.createElement('li');
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'quiz-option';
          btn.innerHTML = '<span></span><span class="quiz-option__arrow" aria-hidden="true">→</span>';
          btn.querySelector('span').textContent = label;
          btn.addEventListener('click', () => {
            this.state.answers[cur.k] = value;
            this.state.step += 1;
            render();
          });
          li.appendChild(btn);
          return li;
        }));
      } else {
        const res = this.result();
        resultTitle.textContent = res.title;
        resultBody.textContent = res.body;
        stepsList.replaceChildren(...res.steps.map(([n, text]) => {
          const li = document.createElement('li');
          const numSpan = document.createElement('span');
          numSpan.className = 'quiz-steps__num';
          numSpan.textContent = n;
          const textSpan = document.createElement('span');
          textSpan.textContent = text;
          li.append(numSpan, textSpan);
          return li;
        }));
      }
    };

    restartBtn.addEventListener('click', () => {
      this.state = { step: 0, answers: {} };
      render();
    });

    render();
  }
};
