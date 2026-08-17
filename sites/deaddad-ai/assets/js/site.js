/* ==========================================================
   DeadDad.AI — front page behaviour

   Just the signup form. Front-end validation only; point
   ENDPOINT at a backend and it will POST the email as JSON.
   ========================================================== */
(function () {
  "use strict";

  var ENDPOINT = ""; // e.g. "https://api.example.com/waitlist"

  var form   = document.getElementById("signup");
  var email  = document.getElementById("email");
  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var value = email.value.trim();
    status.className = "form-status";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      email.setAttribute("aria-invalid", "true");
      status.textContent = "That address won't reach you. Try again.";
      status.className = "form-status is-error";
      email.focus();
      return;
    }

    email.removeAttribute("aria-invalid");

    if (!ENDPOINT) {
      form.reset();
      status.textContent = "Queued. He'll be with you shortly. (Demo — nothing was sent.)";
      status.className = "form-status is-ok";
      return;
    }

    var button = form.querySelector("button");
    button.disabled = true;
    status.textContent = "Uploading…";

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value })
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed: " + res.status);
        form.reset();
        status.textContent = "Queued. He'll be with you shortly.";
        status.className = "form-status is-ok";
      })
      .catch(function () {
        status.textContent = "Reanimation failed. Try again in a moment.";
        status.className = "form-status is-error";
      })
      .finally(function () { button.disabled = false; });
  });
})();
