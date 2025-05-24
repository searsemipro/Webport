// Portfolio Rendering
document.addEventListener("DOMContentLoaded", () => {
  const portfolioItems = [
    {
      title: "UI Design - App Concept",
      image: "images/project1.webp",
      description: "A sleek mobile app UI concept for task management.",
      link: "https://www.figma.com/file/yourproject1"
    },
    {
      title: "Web Design - Landing Page",
      image: "images/project2.webp",
      description: "A modern landing page design for a SaaS product.",
      link: "https://www.figma.com/file/yourproject2"
    },
    {
      title: "E-commerce Product Page",
      image: "images/project3.webp",
      description: "Responsive and stylish product detail page layout.",
      link: "https://www.figma.com/file/yourproject3"
    }
  ];

  const portfolioGrid = document.getElementById("portfolioGrid");

  portfolioItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "portfolio-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank">View Project</a>
    `;

    portfolioGrid.appendChild(card);
  });

  // Auto close menu on nav link click (mobile)
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navMenu = document.getElementById('navMenu');
      if (window.innerWidth <= 768 && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  });
});

// Hamburger toggle
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('show');
}
