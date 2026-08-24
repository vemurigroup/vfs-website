// Entry point. Loaded after all other modules; wires everything together
// once the DOM is ready. No build step / bundler — plain script tags in
// dependency order, matching the pattern already used in mfd-backoffice.
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  ConfigApply.init();
  Nav.init();
  Calculators.init();
  Quiz.init();
  ContactForm.init();
  Testimonials.init();
  Reveal.init();

  // "Get a quote" / "Talk to an officer" used to be raw tel: links, which
  // trigger the OS's "open Phone app?" prompt on desktop. They now scroll
  // to the call-back form instead, with the relevant option preselected.
  document.querySelectorAll('.goal-shortcut').forEach((link) => {
    link.addEventListener('click', () => {
      const goalField = document.getElementById('f-goal');
      if (goalField && link.dataset.goal) goalField.value = link.dataset.goal;
    });
  });
});
