// Loader, Theme, Language, Menu, Form JS for BZMA E QADIR

document.addEventListener('DOMContentLoaded', function () {
     // Elements
     const loader = document.getElementById('loader');
     const mainContent = document.getElementById('main-content');
     const themeBtns = document.querySelectorAll('.theme-btn');
     const themeToggle = document.getElementById('theme-toggle');
     const footerThemeToggle = document.getElementById('footer-theme-toggle');
     const menuToggle = document.getElementById('menu-toggle');
     const navLinks = document.querySelector('.nav-links');
     const admissionForm = document.getElementById('admission-form');
     const courseCheckboxes = document.querySelectorAll('.course-checkbox');
     const selectedCoursesInput = document.getElementById('selected-courses');

     // Always show loader on page load, ask for theme every time
     loader.style.display = 'flex';
     loader.style.opacity = '1';
     mainContent.style.display = 'none';
     document.getElementById('theme-choice').style.display = 'block';

     let selectedTheme = null;

     function applyTheme(theme) {
          if (theme === 'dark') {
               document.body.classList.add('dark');
               if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
               if (footerThemeToggle) footerThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          } else {
               document.body.classList.remove('dark');
               if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
               if (footerThemeToggle) footerThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          }
     }

     themeBtns.forEach(btn => {
          btn.onclick = function () {
               selectedTheme = btn.getAttribute('data-theme');
               applyTheme(selectedTheme);
               // Hide loader and show main content after theme choice
               loader.style.opacity = '0';
               setTimeout(() => {
                    loader.style.display = 'none';
                    mainContent.style.display = 'block';
               }, 400);
          };
     });

     // Theme toggle buttons (after loader)
     function toggleTheme() {
          selectedTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
          applyTheme(selectedTheme);
     }
     if (themeToggle) themeToggle.onclick = toggleTheme;
     if (footerThemeToggle) footerThemeToggle.onclick = toggleTheme;

     // --- Responsive Menu ---
     menuToggle.onclick = function () {
          navLinks.classList.toggle('open');
     };
     // Close menu on link click (mobile)
     navLinks.querySelectorAll('a').forEach(link => {
          link.onclick = () => navLinks.classList.remove('open');
     });

     const ourCourses = document.querySelectorAll('.course-card');
     // --- Sync Courses Selection with Form ---
     function updateSelectedCourses() {
          const selected = Array.from(courseCheckboxes)
               .filter(cb => cb.checked)
               .map(cb => cb.parentElement.querySelector('span').innerText.trim());
          selectedCoursesInput.value = selected.join(', ');
          selectedCoursesInput.setCustomValidity(selected.length === 0 ? 'Please select at least one course.' : '');
     }
     courseCheckboxes.forEach(cb => {
          cb.addEventListener('change', updateSelectedCourses);
     });
     // Initial update
     updateSelectedCourses();

     // --- Form Validation ---
     if (admissionForm) {
          admissionForm.onsubmit = function (e) {
               const name = admissionForm.name.value.trim();
               const email = admissionForm.email.value.trim();
               const courses = selectedCoursesInput.value.trim();
               const message = admissionForm.message.value.trim();
               let valid = true;
               if (!name) valid = false;
               if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) valid = false;
               if (!courses) {
                    valid = false;
                    // Scroll to courses section and highlight
                    const coursesSection = document.getElementById('skills');
                    if (coursesSection) {
                         coursesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                         coursesSection.classList.add('skills-grid');
                         setTimeout(() => coursesSection.classList.remove('skills-grid'), 1200);
                    }
               }
               if (!message) valid = false;
               if (!valid) {
                    alert('Please fill all fields correctly.');
                    e.preventDefault();
               }
          };
     }

     // --- Skill Card Toggle for Last Sabak ---
     const skillCheckboxes = document.querySelectorAll('.skill-checkbox');
     const skillCards = document.querySelectorAll('.skill-card');
     skillCheckboxes.forEach((cb, i) => {
          cb.addEventListener('change', function () {
               // The CSS handles the show/hide, so just for accessibility, focus the sabak
               if (cb.checked) {
                    const sabak = skillCards[i].querySelector('.skill-card');
                    if (sabak) sabak.focus && sabak.focus();
               }
          });
     });

     // --- Enhanced Section Reveal Animation on Scroll ---
     function revealOnScroll() {
          const animatedSections = document.querySelectorAll('[data-animate]');
          const trigger = window.innerHeight * 0.85;

          animatedSections.forEach((section, index) => {
               const rect = section.getBoundingClientRect();
               if (rect.top < trigger && !section.classList.contains('visible')) {
                    section.classList.add('visible');

                    // Add staggered animation to child elements
                    const animatedChildren = section.querySelectorAll('.course-card, .skill-card, .social-img-btn');
                    animatedChildren.forEach((child, childIndex) => {
                         child.style.animationDelay = `${childIndex * 0.1}s`;
                         child.classList.add('animate-in');
                    });
               }
          });
     }

     // Throttled scroll event for better performance
     let ticking = false;
     function updateScroll() {
          if (!ticking) {
               requestAnimationFrame(() => {
                    revealOnScroll();
                    ticking = false;
               });
               ticking = true;
          }
     }

     window.addEventListener('scroll', updateScroll);
     window.addEventListener('resize', updateScroll);
     setTimeout(revealOnScroll, 100); // Initial

     // --- Smooth Scroll for Anchor Links ---
     document.querySelectorAll('a[href^="#"]').forEach(link => {
          link.addEventListener('click', function (e) {
               const target = document.querySelector(this.getAttribute('href'));
               if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }
          });
     });

     // --- Enhanced Button Animations ---
     const exploreBtn = document.querySelector('.hero .btn');
     if (exploreBtn) {
          exploreBtn.addEventListener('click', function (e) {
               // Add ripple effect
               const ripple = document.createElement('span');
               ripple.classList.add('btn-ripple');
               this.appendChild(ripple);

               const rect = this.getBoundingClientRect();
               const size = Math.max(rect.width, rect.height);
               const x = e.clientX - rect.left - size / 2;
               const y = e.clientY - rect.top - size / 2;

               ripple.style.left = x + 'px';
               ripple.style.top = y + 'px';
               ripple.style.width = ripple.style.height = size + 'px';

               setTimeout(() => ripple.remove(), 600);
          });
     }

     // Add hover animations to course cards
     const courseCards = document.querySelectorAll('.skill-card');
     courseCards.forEach(card => {
          card.addEventListener('mouseenter', function () {
               this.style.transform = 'translateY(-2px) scale(1.05) rotate(1deg)';
               this.style.animation = 'bounce 0.6s var(--bounce)';
          });

          card.addEventListener('mouseleave', function () {
               this.style.transform = '';
               this.style.animation = '';
          });
     });

     // --- Social Post Fullscreen Modal ---
     const socialModal = document.getElementById('social-modal');
     const socialModalImg = document.getElementById('social-modal-img');
     const socialModalClose = document.querySelector('.social-modal-close');
     const socialImgBtns = document.querySelectorAll('.social-img-btn');

     socialImgBtns.forEach(btn => {
          btn.addEventListener('click', function () {
               const imgSrc = btn.getAttribute('data-img');
               socialModalImg.src = imgSrc;
               socialModal.classList.add('open');
               document.body.style.overflow = 'hidden';
          });
     });
     function closeSocialModal() {
          socialModal.classList.remove('open');
          socialModalImg.src = '';
          document.body.style.overflow = '';
     }
     socialModalClose.addEventListener('click', closeSocialModal);
     socialModal.addEventListener('click', function (e) {
          if (e.target === socialModal) closeSocialModal();
     });
     document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && socialModal.classList.contains('open')) closeSocialModal();
     });

     // --- FAQ Accordion ---
     const faqItems = document.querySelectorAll('.faq-item');
     faqItems.forEach(item => {
          const question = item.querySelector('h4');
          question.addEventListener('click', function (e) {
               e.stopPropagation();
               // Close others
               faqItems.forEach(i => { if (i !== item) i.classList.remove('open'); });
               // Toggle this one
               item.classList.toggle('open');
               // Scroll into view if opening
               if (item.classList.contains('open')) {
                    setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
               }
          });
          // Keyboard accessibility
          question.tabIndex = 0;
          question.addEventListener('keydown', function (e) {
               if (e.key === 'Enter' || e.key === ' ') question.click();
          });
     });

     // --- Speed Dial Floating Action Button ---
     const speedDial = document.getElementById('speed-dial');
     const speedDialMain = document.getElementById('speed-dial-main');
     const speedDialActions = document.getElementById('speed-dial-actions');
     const speedDialWhatsapp = document.getElementById('speed-dial-whatsapp');
     const speedDialMessage = document.getElementById('speed-dial-message');
     const speedDialTop = document.getElementById('speed-dial-top');

     function closeSpeedDial() {
          speedDial.classList.remove('open');
     }
     if (speedDialMain) {
          speedDialMain.addEventListener('click', function (e) {
               e.stopPropagation();
               speedDial.classList.toggle('open');
          });
     }
     // Close on outside click
     document.addEventListener('click', function (e) {
          if (!speedDial.contains(e.target)) closeSpeedDial();
     });
     // WhatsApp action
     if (speedDialWhatsapp) {
          speedDialWhatsapp.addEventListener('click', function (e) {
               window.open('https://wa.me/923312374987', '_blank');
               closeSpeedDial();
          });
     }
     // Message action
     if (speedDialMessage) {
          speedDialMessage.addEventListener('click', function (e) {
               const contact = document.getElementById('contact');
               if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
               closeSpeedDial();
          });
     }
     // Top action
     if (speedDialTop) {
          speedDialTop.addEventListener('click', function (e) {
               window.scrollTo({ top: 0, behavior: 'smooth' });
               closeSpeedDial();
          });
     }
     // Ripple effect for speed dial actions
     document.querySelectorAll('.speed-dial-action').forEach(btn => {
          btn.addEventListener('click', function (e) {
               let ripple = document.createElement('span');
               ripple.className = 'btn-ripple';
               ripple.style.left = (e.offsetX || 28) + 'px';
               ripple.style.top = (e.offsetY || 28) + 'px';
               this.appendChild(ripple);
               setTimeout(() => ripple.remove(), 600);
          });
     });
     // Only show Top button if scrolled down
     function updateSpeedDialTop() {
          if (window.scrollY > 200) {
               speedDialTop.style.display = '';
          } else {
               speedDialTop.style.display = 'none';
          }
     }
     window.addEventListener('scroll', updateSpeedDialTop);
     setTimeout(updateSpeedDialTop, 100);
});
