document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const modelLinks = document.querySelectorAll('.model-link');
  const models = document.querySelectorAll('.model');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active from all links
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Hide all sections
      sections.forEach(sec => sec.classList.remove('active'));

      // Show the target section
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  modelLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active from all model links
      modelLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Hide all models
      models.forEach(model => model.classList.remove('active'));

      // Show the target model
      const targetId = link.getAttribute('model-target');
      const targetModel = document.getElementById(targetId);
      if (targetModel) {
        targetModel.classList.add('active');
      }
    });
  });

  // Show Profile by default
  document.getElementById('profile').classList.add('active');
});