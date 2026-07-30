const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");
const toast = document.querySelector("#toast");
const pageName = document.body.dataset.page;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function setActiveNav() {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === pageName);
  });
}

function setupMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupHomeSearch() {
  const searchForm = document.querySelector("#homeSearch");
  const searchInput = document.querySelector("#searchInput");
  const pathwayFilter = document.querySelector("#pathwayFilter");
  const serviceCards = Array.from(document.querySelectorAll(".service-card"));
  const emptyResult = document.querySelector("#emptyResult");
  const tabs = document.querySelectorAll(".tab");

  if (!searchForm || !searchInput || !pathwayFilter) return;

  function filterCards() {
    const query = searchInput.value.trim().toLowerCase();
    const pathway = pathwayFilter.value;
    const activeTab = document.querySelector(".tab.active");
    const audience = activeTab ? activeTab.dataset.audience : "students";
    let visible = 0;

    serviceCards.forEach((card) => {
      const typeMatch = pathway === "all" || card.dataset.type === pathway;
      const audienceMatch = (card.dataset.audience || "").includes(audience);
      const text = `${card.textContent} ${card.dataset.tags}`.toLowerCase();
      const queryMatch = query.length === 0 || text.includes(query);
      const shouldShow = typeMatch && audienceMatch && queryMatch;

      card.classList.toggle("is-hidden", !shouldShow);
      if (shouldShow) visible += 1;
    });

    if (emptyResult) emptyResult.hidden = visible > 0;
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterCards();
    document.querySelector(".audience-section").scrollIntoView({ behavior: "smooth" });
  });

  searchInput.addEventListener("input", filterCards);
  pathwayFilter.addEventListener("change", filterCards);

  document.querySelectorAll("[data-query]").forEach((button) => {
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.query;
      filterCards();
      showToast(`Showing options related to ${button.dataset.query}.`);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      filterCards();
      showToast(`${tab.textContent.trim()} view selected.`);
    });
  });

  filterCards();
}

function setupPlanner() {
  const plannerForm = document.querySelector("#plannerForm");
  if (!plannerForm) return;

  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const course = document.querySelector("#courseSelect").value;
    const goal = document.querySelector("#goalSelect").value;
    showToast(`${goal} plan started for ${course}.`);
  });
}

function setupCounters() {
  const statsRow = document.querySelector(".stats-row");
  if (!statsRow) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll("[data-count]").forEach((counter) => {
        const target = Number(counter.dataset.count);
        const start = performance.now();
        const duration = 1200;

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          counter.textContent = `${Math.floor(progress * target).toLocaleString("en-IN")}+`;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  observer.observe(statsRow);
}

function setupContactForms() {
  document.querySelectorAll("#contactForm").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name") || "Student";
      const leads = JSON.parse(localStorage.getItem("edugatewayLeads") || "[]");
      leads.push({
        name,
        phone: formData.get("phone") || "",
        email: formData.get("email") || "",
        interest: formData.get("interest") || "",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("edugatewayLeads", JSON.stringify(leads));
      showToast(`Thanks ${name}. Your callback request is saved.`);
      form.reset();
    });
  });
}

setActiveNav();
setupMenu();
setupHomeSearch();
setupPlanner();
setupCounters();
setupContactForms();

/* ============================================================
   CUSTOMER ENQUIRY FORM
   - Client-side validation (name / email / phone / subject / message)
   - Loading state, success/error status
   - Email delivery via FormSubmit (no backend, no API keys)
   - WhatsApp redirect with pre-filled enquiry details
   ============================================================ */

// ⬇⬇⬇  EDIT THESE TWO LINES  ⬇⬇⬇
const ENQUIRY_EMAIL   = "info@nehraeducation.com"; // ← your receiving email
const WHATSAPP_NUMBER = "919217670285";            // ← country code + number, digits only
// ⬆⬆⬆  EDIT THESE TWO LINES  ⬆⬆⬆

(function initEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const submitBtn   = form.querySelector("#submitBtn");
  const statusEl    = form.querySelector("#formStatus");
  const whatsappBtn = form.querySelector("#whatsappBtn");

  const fields = {
    fullName: form.querySelector("#fullName"),
    phone:    form.querySelector("#phone"),
    email:    form.querySelector("#email"),
    subject:  form.querySelector("#subject"),
    message:  form.querySelector("#message"),
  };

  // ---------- Validation helpers ----------
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[0-9]{10,15}$/; // digits only, 10–15 (handles country codes)

  function setError(fieldName, message) {
    const input = fields[fieldName];
    if (!input) return;
    const group = input.closest(".input-group");
    const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (message) {
      group?.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
      input.setAttribute("aria-invalid", "true");
    } else {
      group?.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
      input.removeAttribute("aria-invalid");
    }
  }

  function validate() {
    let ok = true;
    const name  = fields.fullName.value.trim();
    const phone = fields.phone.value.replace(/[\s\-()+]/g, "");
    const email = fields.email.value.trim();
    const subj  = fields.subject.value.trim();
    const msg   = fields.message.value.trim();

    if (name.length < 2)        { setError("fullName", "Please enter your full name."); ok = false; }
    else                         setError("fullName", "");

    if (!PHONE_RE.test(phone))  { setError("phone", "Enter a valid phone number (10–15 digits)."); ok = false; }
    else                         setError("phone", "");

    if (!EMAIL_RE.test(email))  { setError("email", "Enter a valid email address."); ok = false; }
    else                         setError("email", "");

    if (!subj)                  { setError("subject", "Please choose a service."); ok = false; }
    else                         setError("subject", "");

    if (msg.length < 5)         { setError("message", "Please share a short message (min 5 characters)."); ok = false; }
    else                         setError("message", "");

    return ok;
  }

  // Clear per-field errors as user types
  Object.entries(fields).forEach(([key, el]) => {
    el.addEventListener("input", () => setError(key, ""));
    el.addEventListener("change", () => setError(key, ""));
  });

  // ---------- Status helpers ----------
  function setStatus(kind, message) {
    statusEl.className = "form-status" + (kind ? ` is-${kind}` : "");
    statusEl.textContent = message || "";
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.classList.toggle("is-loading", loading);
    submitBtn.querySelector(".btn-label").textContent =
      loading ? "Sending..." : "Submit Enquiry →";
  }

  // ---------- WhatsApp link ----------
  function buildWhatsAppLink(data) {
    const text =
      `*New Customer Enquiry*%0A%0A` +
      `*Name:* ${encodeURIComponent(data.fullName)}%0A` +
      `*Email:* ${encodeURIComponent(data.email)}%0A` +
      `*Phone:* ${encodeURIComponent(data.phone)}%0A` +
      `*Subject:* ${encodeURIComponent(data.subject)}%0A` +
      `*Message:* ${encodeURIComponent(data.message)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }

  // ---------- Submit ----------
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("", "");
    whatsappBtn.hidden = true;

    if (!validate()) {
      setStatus("error", "Please fix the highlighted fields and try again.");
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      firstError?.focus();
      return;
    }

    const data = {
      fullName: fields.fullName.value.trim(),
      email:    fields.email.value.trim(),
      phone:    fields.phone.value.trim(),
      subject:  fields.subject.value,
      message:  fields.message.value.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    setLoading(true);
    try {
      // FormSubmit — free, no signup required (first submission triggers a
      // one-time confirmation email to ENQUIRY_EMAIL). Docs: https://formsubmit.co
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(ENQUIRY_EMAIL)}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Enquiry: ${data.subject} — ${data.fullName}`,
          _template: "table",
          _captcha: "false",
          "Customer Name":        data.fullName,
          "Customer Email":       data.email,
          "Phone Number":         data.phone,
          "Subject / Service":    data.subject,
          "Message":              data.message,
          "Submission Date/Time": data.submittedAt,
        }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      setStatus("success",
        "Thank you! Your enquiry has been submitted. Our team will contact you shortly."
      );

      // Prepare WhatsApp CTA
      whatsappBtn.href = buildWhatsAppLink(data);
      whatsappBtn.hidden = false;

      form.reset();
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      setStatus("error",
        "We couldn't send your enquiry right now. Please try again, or contact us on WhatsApp."
      );
      // Still offer WhatsApp fallback with entered details
      whatsappBtn.href = buildWhatsAppLink(data);
      whatsappBtn.hidden = false;
    } finally {
      setLoading(false);
    }
  });
})();
