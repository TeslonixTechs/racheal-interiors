const projectDetails = {
  serein: {
    name: "Serein House",
    location: "Ibadan, Oyo State",
    type: "Residential · Living room",
    description: "A welcoming family home shaped by soft natural light, warm wood and pieces chosen to make everyday living feel quietly special.",
    services: "Interior design · Space planning · Furniture & styling",
    images: ["photo-1600210492486-724fe5c67fb0", "photo-1600607687939-ce8a6c25118c"]
  },
  terracotta: {
    name: "The Terracotta Suite",
    location: "Ibadan, Oyo State",
    type: "Residential · Bedroom",
    description: "An intimate bedroom retreat layered with tactile finishes, a softened palette and gentle contrast for a restful end to the day.",
    services: "Interior decoration · Wall finishes · Furniture & styling",
    images: ["photo-1616486338812-3dadae4b4ace", "photo-1611892440504-42a792e24d32"]
  },
  "form-and-field": {
    name: "Form & Field",
    location: "Ibadan, Oyo State",
    type: "Commercial · Office",
    description: "A considered, collaborative workplace with a calm visual language and practical zones that support focus and shared ideas.",
    services: "Commercial interiors · Space planning · Furniture & styling",
    images: ["photo-1497366754035-f200968a6e72", "photo-1497366811353-6870744d04b2"]
  },
  "olive-house": {
    name: "Olive House",
    location: "Ibadan, Oyo State",
    type: "Residential · Kitchen & living",
    description: "A connected kitchen and living space designed for easy hosting, thoughtful storage and the lovely rituals of being at home.",
    services: "Kitchen design · Space planning · Interior design",
    images: ["photo-1600607687939-ce8a6c25118c", "photo-1600607687644-c7171b42498f"]
  },
  "the-refresh": {
    name: "The Refresh",
    location: "Ibadan, Oyo State",
    type: "Residential · Before & after",
    description: "A living room reimagined with a clearer layout, softer layers and a more personal mix of materials, colour and collected pieces.",
    services: "Renovation · Space planning · Interior decoration",
    images: ["photo-1600607687920-4e2a09cf159d", "photo-1600210492486-724fe5c67fb0"]
  },
  "quiet-hours": {
    name: "Quiet Hours",
    location: "Ibadan, Oyo State",
    type: "Residential · Bedroom",
    description: "A restful bedroom with an edited palette, considered lighting and layers of texture that bring warmth without adding clutter.",
    services: "Interior design · Wall finishes · Furniture & styling",
    images: ["photo-1611892440504-42a792e24d32", "photo-1616486338812-3dadae4b4ace"]
  }
};

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const projectDialog = document.querySelector(".project-dialog");
const dialogContent = document.querySelector(".dialog-content");

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

document.querySelectorAll(".filter-button").forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const selectedFilter = filterButton.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((button) => {
      const isSelected = button === filterButton;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    document.querySelectorAll(".project-card").forEach((projectCard) => {
      const categories = projectCard.dataset.categories.split(",");
      projectCard.hidden = selectedFilter !== "All" && !categories.includes(selectedFilter);
    });
  });
});

document.querySelectorAll(".project-card").forEach((projectCard) => {
  projectCard.addEventListener("click", () => {
    const project = projectDetails[projectCard.dataset.project];
    if (!project) return;

    const gallery = project.images.map((imageId) => {
      const imageUrl = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1200&q=85`;
      return `<img src="${imageUrl}" alt="${project.name} interior detail" loading="lazy">`;
    }).join("");

    dialogContent.innerHTML = `
      <div class="dialog-hero"><img src="https://images.unsplash.com/${project.images[0]}?auto=format&fit=crop&w=1800&q=90" alt="${project.name} interior"></div>
      <div class="dialog-copy">
        <div><p class="eyebrow">${project.location} · ${project.type}</p><h2 id="dialog-title">${project.name}</h2></div>
        <p>${project.description}</p>
      </div>
      <p class="dialog-services"><strong>Services provided:</strong> ${project.services}</p>
      <div class="dialog-gallery">${gallery}</div>
      <a class="dialog-enquire" href="https://wa.me/2349024489401?text=${encodeURIComponent(`Hello Decor By Rachel Interiors, I'd like to discuss a project like ${project.name}.`)}" target="_blank" rel="noopener">Discuss a similar project <span aria-hidden="true">↗</span></a>
    `;
    projectDialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});