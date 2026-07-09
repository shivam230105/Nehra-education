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
