/* ─── script.js ─── */

const beginBtn = document.getElementById('beginBtn');

beginBtn.addEventListener('click', () => {
  beginBtn.classList.add('loading');
  beginBtn.disabled = true;

  // Navigate to dashboard after brief loading animation
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1200);
});
