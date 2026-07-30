(function () {
  "use strict";

  const programs = {
    "Generative AI": [
      { logo: "IITM Pravartak", title: "Advanced Executive Program In Applied Generative AI", description: "Master generative AI models, prompt engineering, and enterprise-grade deployment.", duration: "5 Months", badge: "Most Popular" },
      { logo: "IIT Patna", title: "Professional Certificate Program in Agentic AI & Multi-Agent Systems", description: "Design autonomous, collaborating AI agents for complex real-world workflows.", duration: "10 Weeks", badge: "Trending Now" },
      { logo: "E&ICT IIT Kanpur", title: "Professional Certificate Course in GenAI and Agentic AI", description: "Blend generative and agentic AI to build next-generation intelligent applications.", duration: "5 Months", badge: "New Launch" },
      { logo: "IITM Pravartak", title: "Professional Certificate in Generative AI, ML and Intelligent Control Systems", description: "Combine ML foundations with generative AI and control systems expertise.", duration: "6 Months" },
      { logo: "Microsoft", title: "Microsoft Applied Agentic AI: Systems Design & Impact", description: "Architect scalable agentic AI systems using Microsoft's stack.", duration: "10 Weeks" },
      { logo: "Michigan Engineering", title: "Generative AI Applications for Leaders", description: "Leadership-focused program on adopting GenAI across organizations.", duration: "12 Weeks" },
    ],
    "AI & Machine Learning": [
      { logo: "Purdue", title: "Post Graduate Program in AI and Machine Learning", description: "Hands-on ML, deep learning, NLP, and computer vision with real projects.", duration: "11 Months", badge: "Most Popular" },
      { logo: "Caltech", title: "AI & Machine Learning Bootcamp", description: "Fast-track bootcamp covering the full modern AI toolkit.", duration: "6 Months", badge: "Trending Now" },
      { logo: "IBM", title: "Applied AI Professional Certificate", description: "Practical AI skills using IBM Watson and open-source tools.", duration: "4 Months" },
    ],
    "Cyber Security": [
      { logo: "EC-Council", title: "Advanced Executive Program in Cyber Security", description: "Threat detection, ethical hacking, and enterprise security operations.", duration: "9 Months", badge: "Most Popular" },
      { logo: "MIT xPRO", title: "Professional Certificate in Cybersecurity", description: "Defensive strategies, cryptography, and incident response.", duration: "6 Months" },
      { logo: "IIIT Bangalore", title: "Cyber Security Expert Program", description: "SOC operations, cloud security, and compliance frameworks.", duration: "8 Months", badge: "New Launch" },
    ],
    "Project Management": [
      { logo: "PMI", title: "PMP® Certification Training", description: "Prepare for the globally recognized PMP® exam with real case studies.", duration: "90 Days", badge: "Most Popular" },
      { logo: "UMass", title: "Post Graduate Program in Project Management", description: "Agile, Scrum, and traditional PM methodologies in one program.", duration: "6 Months" },
      { logo: "Scrum Alliance", title: "Certified ScrumMaster® (CSM)", description: "Master Scrum framework for high-performing teams.", duration: "2 Days" },
    ],
    "Data Science & Business Analytics": [
      { logo: "Purdue", title: "Post Graduate Program in Data Science", description: "Statistics, Python, ML, and big data with capstone projects.", duration: "11 Months", badge: "Most Popular" },
      { logo: "IBM", title: "Data Analyst Professional Certificate", description: "SQL, Excel, Python, Tableau — analytics from end to end.", duration: "4 Months", badge: "Trending Now" },
      { logo: "Wharton", title: "Business Analytics Program", description: "Data-driven decision making for business leaders.", duration: "6 Months" },
    ],
    "Business and Leadership": [
      { logo: "Wharton", title: "Executive Leadership Program", description: "Strategic leadership skills for senior executives.", duration: "9 Months", badge: "Most Popular" },
      { logo: "MIT Sloan", title: "MBA Essentials", description: "Core MBA concepts condensed into a practical program.", duration: "6 Months" },
    ],
    "Product and Design": [
      { logo: "Pace University", title: "Post Graduate Program in Product Management", description: "End-to-end product lifecycle, discovery, and go-to-market.", duration: "6 Months", badge: "Trending Now" },
      { logo: "IDF", title: "UX Design Professional Certificate", description: "User research, prototyping, and interaction design.", duration: "5 Months" },
    ],
    "Cloud Computing & DevOps": [
      { logo: "Caltech", title: "Post Graduate Program in DevOps", description: "CI/CD, Kubernetes, Docker, and infrastructure as code.", duration: "9 Months", badge: "Most Popular" },
      { logo: "AWS", title: "AWS Solutions Architect Certification", description: "Design resilient, cost-optimized AWS architectures.", duration: "3 Months" },
      { logo: "Microsoft Azure", title: "Azure Cloud Architect Program", description: "Master Azure services and hybrid cloud design.", duration: "6 Months", badge: "New Launch" },
    ],
    "Software Development": [
      { logo: "Caltech", title: "Full Stack Developer Bootcamp", description: "MERN stack, DevOps, and modern web development.", duration: "9 Months", badge: "Most Popular" },
      { logo: "IIT Madras", title: "Java Backend Developer Program", description: "Spring Boot, microservices, and system design.", duration: "6 Months" },
    ],
    "IT Service and Architecture": [
      { logo: "AXELOS", title: "ITIL® 4 Foundation", description: "Modern IT service management best practices.", duration: "3 Days", badge: "Most Popular" },
      { logo: "TOGAF", title: "TOGAF® 9 Certified Training", description: "Enterprise architecture framework mastery.", duration: "5 Days" },
    ],
    "Agile and Scrum": [
      { logo: "Scrum Alliance", title: "Certified ScrumMaster® (CSM)", description: "Facilitate high-performing Scrum teams.", duration: "2 Days", badge: "Most Popular" },
      { logo: "PMI", title: "PMI-ACP® Certification", description: "Agile practices across multiple methodologies.", duration: "90 Days" },
      { logo: "Scaled Agile", title: "SAFe® Agilist Certification", description: "Lead enterprise-scale agile transformations.", duration: "3 Days", badge: "New Launch" },
    ],
    "Digital Marketing": [
      { logo: "Purdue", title: "Post Graduate Program in Digital Marketing", description: "SEO, SEM, social, analytics, and content strategy.", duration: "8 Months", badge: "Trending Now" },
      { logo: "Meta", title: "Meta Social Media Marketing Certificate", description: "Grow brands using Facebook and Instagram ads.", duration: "5 Months" },
    ],
    "Quality Management": [
      { logo: "KPMG", title: "Lean Six Sigma Green Belt", description: "Process improvement and quality management essentials.", duration: "3 Months", badge: "Most Popular" },
      { logo: "ASQ", title: "Certified Quality Engineer Program", description: "Advanced quality engineering methods and tools.", duration: "6 Months" },
    ],
  };

  const badgeClass = {
    "Most Popular": "program-card__badge--popular",
    "Trending Now": "program-card__badge--trending",
    "New Launch": "program-card__badge--new",
  };

  const sidebarList = document.querySelector(".program-sidebar__list");
  const gridEl = document.querySelector(".program-grid");
  const contentEl = document.querySelector(".program-content");
  const headingEl = document.querySelector(".program-content__heading");
  const subtitleEl = document.querySelector(".program-content__subtitle");

  const categories = Object.keys(programs);
  let activeCategory = categories[0];

  function renderSidebar() {
    sidebarList.innerHTML = "";
    categories.forEach((cat) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "program-category" + (cat === activeCategory ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", cat === activeCategory ? "true" : "false");
      btn.dataset.category = cat;
      btn.innerHTML = `<span class="program-category__label">${cat}</span><span class="program-category__chevron" aria-hidden="true">›</span>`;
      btn.addEventListener("click", () => selectCategory(cat));
      btn.addEventListener("keydown", handleKeyNav);
      li.appendChild(btn);
      sidebarList.appendChild(li);
    });
  }

  function handleKeyNav(e) {
    const buttons = Array.from(sidebarList.querySelectorAll(".program-category"));
    const idx = buttons.indexOf(e.currentTarget);
    if (idx === -1) return;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = buttons[(idx + 1) % buttons.length];
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = buttons[(idx - 1 + buttons.length) % buttons.length];
    else if (e.key === "Home") next = buttons[0];
    else if (e.key === "End") next = buttons[buttons.length - 1];
    if (next) { e.preventDefault(); next.focus(); selectCategory(next.dataset.category); }
  }

  function selectCategory(cat) {
    if (!programs[cat]) return;
    activeCategory = cat;
    sidebarList.querySelectorAll(".program-category").forEach((btn) => {
      const isActive = btn.dataset.category === cat;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive && window.matchMedia("(max-width: 767px)").matches) {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
    renderGrid();
    if (contentEl && contentEl.scrollTo) contentEl.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderGrid() {
    headingEl.textContent = "Career Aligned Learning Paths";
    subtitleEl.textContent = "Master essential skills for your dream career";
    const list = programs[activeCategory] || [];
    gridEl.innerHTML = "";
    list.forEach((p) => {
      const card = document.createElement("article");
      card.className = "program-card";
      card.setAttribute("role", "listitem");
      const badgeHTML = p.badge
        ? `<span class="program-card__badge ${badgeClass[p.badge] || ""}">${p.badge}</span>`
        : "";
      card.innerHTML = `
        <div class="program-card__logo"><span>${p.logo}</span></div>
        <h3 class="program-card__title">${p.title}</h3>
        <p class="program-card__desc">${p.description}</p>
        <div class="program-card__footer">
          <span class="program-card__duration">${p.duration}</span>
          ${badgeHTML}
        </div>
        <button type="button" class="program-card__cta" aria-label="View details for ${p.title.replace(/"/g, "&quot;")}">View Program</button>
      `;
      gridEl.appendChild(card);
    });
  }

  renderSidebar();
  renderGrid();
})();
