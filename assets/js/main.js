(function () {
  'use strict';

  var progress = document.getElementById('scroll-progress');
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var ticking = false;
  function updateScrollProgress() {
    if (!progress) return;
    var doc = document.documentElement;
    var range = Math.max(0, doc.scrollHeight - doc.clientHeight);
    var ratio = range ? Math.min(1, Math.max(0, doc.scrollTop / range)) : 0;
    progress.style.width = (ratio * 100).toFixed(2) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollProgress);
    }
  }, { passive: true });
  updateScrollProgress();

  var form = document.getElementById('project-form');
  if (!form) return;
  var textarea = document.getElementById('project-idea');
  var counter = document.getElementById('idea-count');
  var status = document.getElementById('form-status');
  var submit = document.getElementById('submit-project');
  var endpoint = (form.getAttribute('data-endpoint') || '').trim();
  var isConfigured = /^https:\/\/formspree\.io\/f\/[a-z0-9]{4,}$/i.test(endpoint) && !/YOUR_REAL_FORM_ID/i.test(endpoint);

  function setStatus(message, isError) {
    status.textContent = message;
    status.classList.toggle('error', !!isError);
  }
  function updateCount() {
    counter.textContent = textarea.value.length + ' / ' + textarea.maxLength;
  }
  textarea.addEventListener('input', updateCount);
  updateCount();

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!isConfigured) {
      setStatus('This form needs its Formspree endpoint connected before it can send. See README.md in the project files.', true);
      return;
    }
    // Native HTML form POST remains a fallback if JavaScript is disabled.
    var originalLabel = submit.innerHTML;
    submit.disabled = true;
    submit.textContent = 'Sending your brief…';
    setStatus('', false);
    try {
      var response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });
      if (!response.ok) {
        var data = null;
        try { data = await response.json(); } catch (ignore) {}
        var message = 'We couldn’t send the brief. Please try again.';
        if (data && Array.isArray(data.errors) && data.errors.length) {
          message = data.errors.map(function (e) { return e.message || 'Please review your details.'; }).join(' ');
        } else if (response.status === 429) {
          message = 'Too many requests right now. Please try again a little later.';
        }
        throw new Error(message);
      }
      setStatus('Your project brief was sent successfully. Thanks — we’ll follow up using the email you provided.', false);
      form.reset();
      updateCount();
    } catch (error) {
      setStatus(error && error.message ? error.message : 'Network error. Please try again.', true);
    } finally {
      submit.disabled = false;
      submit.innerHTML = originalLabel;
    }
  });
})();
