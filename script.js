document.addEventListener('DOMContentLoaded', function() {
  // Modal functionality
  const modal = document.getElementById('loginModal');
  const reservationModal = document.getElementById('reservationModal');
  const loginBtn = document.getElementById('loginBtn');
  const closeBtn = document.querySelector('.close');
  const closeReservationBtn = document.querySelector('.close-reservation');
  const showRegisterLink = document.getElementById('showRegister');
  const showLoginLink = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const featureCards = document.querySelectorAll('.feature-card[data-requires-auth="true"]');
  const reservationCard = document.querySelector('.feature-card[data-reservation="true"]');

  // Subject options mapping
  const subjectOptions = {
    matematica: [
      'Estadística y Probabilidad',
      'Derivadas',
      'Integrales',
      'Funciones',
      'Álgebra Lineal',
      'Geometría Analítica'
    ],
    fisica: [
      'Mecánica Clásica',
      'Termodinámica',
      'Electromagnetismo',
      'Óptica',
      'Física Moderna'
    ],
    programacion: [
      'Introducción a la Programación',
      'Python',
      'JavaScript',
      'Estructura de Datos',
      'Algoritmos',
      'Desarrollo Web'
    ],
    administracion: [
      'Contabilidad Básica',
      'Marketing',
      'Gestión de Proyectos',
      'Recursos Humanos',
      'Finanzas Empresariales'
    ]
  };

  // Update subject topics based on main subject selection
  const subjectSelect = document.getElementById('subject');
  const topicSelect = document.getElementById('topic');

  subjectSelect?.addEventListener('change', function() {
    const selectedSubject = this.value;
    topicSelect.innerHTML = '<option value="">Selecciona un tema</option>';
    
    if (subjectOptions[selectedSubject]) {
      subjectOptions[selectedSubject].forEach(topic => {
        const option = document.createElement('option');
        option.value = topic.toLowerCase().replace(/\s+/g, '-');
        option.textContent = topic;
        topicSelect.appendChild(option);
      });
    }
  });

  // Feature cards click handler (for auth-required cards)
  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });

  // Reservation card click handler
  reservationCard?.addEventListener('click', () => {
    reservationModal.style.display = 'block';
  });

  // Header scroll behavior
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Login button click handler
  loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // Close button click handler
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close reservation button click handler
  closeReservationBtn?.addEventListener('click', () => {
    reservationModal.style.display = 'none';
  });

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
    if (e.target === reservationModal) {
      reservationModal.style.display = 'none';
    }
  });

  // Toggle between login and register forms
  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelector('.hero-content').style.transform = `translateY(${scrolled * 0.3}px)`;
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  // Observe elements for animation
  document.querySelectorAll('.professor-card, .feature-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(item);
  });

  // Terms and Conditions Modal
  const termsBtn = document.getElementById('termsBtn');
  const termsModal = document.getElementById('termsModal');
  const closeTermsBtn = document.querySelector('.close-terms');

  termsBtn.addEventListener('click', () => {
    termsModal.style.display = 'block';
  });

  closeTermsBtn.addEventListener('click', () => {
    termsModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === termsModal) {
      termsModal.style.display = 'none';
    }
  });

  // Handle reservation form submission
  const reservationForm = document.getElementById('reservationForm');
  reservationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create and show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Tu reserva quedó lista!';
    document.body.appendChild(successMessage);
    successMessage.style.display = 'block';
    
    // Hide success message and close modal after 3 seconds
    setTimeout(() => {
      successMessage.style.opacity = '0';
      setTimeout(() => {
        reservationModal.style.display = 'none';
        reservationForm.reset();
        document.body.removeChild(successMessage);
      }, 300);
    }, 3000);
  });

  // Add hamburger menu functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
      navLinks?.classList.remove('active');
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Float menu functionality
  const floatMenuTrigger = document.querySelector('.float-menu-trigger');
  const floatMenu = document.querySelector('.float-menu');

  floatMenuTrigger.addEventListener('click', () => {
    floatMenuTrigger.classList.toggle('active');
    floatMenu.classList.toggle('active');
  });

  // Close float menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.float-menu') && 
        !e.target.closest('.float-menu-trigger') && 
        floatMenu.classList.contains('active')) {
      floatMenu.classList.remove('active');
      floatMenuTrigger.classList.remove('active');
    }
  });

  function updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('#themeToggleBtn i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  updateTheme(savedTheme);

  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  });

  // Add scroll indicators for mobile carousels
  const addScrollIndicators = () => {
    const sections = [
      { container: '.professors-grid', text: 'Desliza para ver más profesores' },
      { container: '.features-grid', text: 'Desliza para ver más cursos' }
    ];

    sections.forEach(section => {
      const container = document.querySelector(section.container);
      if (container) {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = `<i class="fas fa-arrow-left"></i> ${section.text} <i class="fas fa-arrow-right"></i>`;
        container.parentNode.insertBefore(indicator, container.nextSibling);
      }
    });
  };

  addScrollIndicators();

  // Improve modal responsiveness
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    const content = modal.querySelector('.modal-content');
    content.addEventListener('click', e => e.stopPropagation());
  });

  // Persistent storage improvements
  const storage = {
    save: (key, data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    },
    load: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
      }
    }
  };

  // User Authentication and Profile Management
  const userAuth = {
    currentUser: null,
    users: [],

    init() {
      this.users = storage.load('users') || [];
      this.currentUser = storage.load('currentUser');
      this.updateUI();
      this.setupAuthListeners();
    },

    register(userData) {
      if (this.users.find(user => user.email === userData.email)) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: null,
        birthDate: null
      };

      this.users.push(newUser);
      storage.save('users', this.users);
      this.login(userData.email, userData.password);
    },

    login(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      this.currentUser = user;
      storage.save('currentUser', user);
      this.updateUI();
    },

    logout() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      this.updateUI();
    },

    updateProfile(data) {
      if (!this.currentUser) return;

      const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
      if (userIndex === -1) return;

      this.users[userIndex] = {
        ...this.users[userIndex],
        ...data
      };

      this.currentUser = this.users[userIndex];
      storage.save('users', this.users);
      storage.save('currentUser', this.currentUser);
      this.updateUI();

      // Show success notification
      this.showSuccessNotification('Cambios guardados exitosamente');
    },

    showSuccessNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'success-notification';
      notification.textContent = message;
      document.body.appendChild(notification);

      // Trigger animation
      setTimeout(() => notification.classList.add('show'), 100);

      // Remove notification after animation
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 500);
      }, 3000);
    },

    updateUI() {
      const loginBtn = document.getElementById('loginBtn');
      const userProfileBtn = document.getElementById('userProfileBtn');
      const restrictedContent = document.querySelectorAll('[data-requires-auth="true"]');

      if (this.currentUser) {
        loginBtn.style.display = 'none';
        userProfileBtn.style.display = 'flex';
        document.getElementById('userProfileImage').src = this.currentUser.profileImage || 'https://via.placeholder.com/40';
        document.getElementById('userProfileName').textContent = this.currentUser.name;

        // Update click handlers for auth-required content
        restrictedContent.forEach(element => {
          element.onclick = function() {
            window.location.href = 'planes.html';
          };
        });
      } else {
        loginBtn.style.display = 'flex';
        userProfileBtn.style.display = 'none';
        
        // Update click handlers to show login modal
        restrictedContent.forEach(element => {
          element.onclick = () => document.getElementById('loginModal').style.display = 'block';
        });
      }
    },

    setupAuthListeners() {
      // Login Form Handler
      document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;

        try {
          this.login(email, password);
          document.getElementById('loginModal').style.display = 'none';
          e.target.reset();
        } catch (error) {
          alert(error.message);
        }
      });

      // Register Form Handler
      document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
          name: e.target.querySelector('input[type="text"]').value,
          email: e.target.querySelector('input[type="email"]').value,
          password: e.target.querySelector('input[type="password"]').value,
          confirmPassword: e.target.querySelector('input[placeholder="Confirmar contraseña"]').value
        };

        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }

        try {
          this.register(formData);
          document.getElementById('loginModal').style.display = 'none';
          e.target.reset();
        } catch (error) {
          alert(error.message);
        }
      });

      // Logout Handler
      document.getElementById('logoutBtn').addEventListener('click', () => {
        this.logout();
      });

      // Profile Update Handler
      document.getElementById('profileForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
          birthDate: e.target.querySelector('input[name="birthDate"]').value,
        };

        const imageInput = e.target.querySelector('input[name="profileImage"]');
        if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = (event) => {
            formData.profileImage = event.target.result;
            this.updateProfile(formData);
            document.getElementById('profileModal').style.display = 'none';
          };
          reader.readAsDataURL(imageInput.files[0]);
        } else {
          this.updateProfile(formData);
          document.getElementById('profileModal').style.display = 'none';
        }
      });
    }
  };

  // Initialize user authentication system
  userAuth.init();

  // Add smooth scrolling for carousel
  const addSmoothScroll = () => {
    const containers = document.querySelectorAll('.professors-grid, .features-grid');
    containers.forEach(container => {
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', e => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
      });

      container.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });
    });
  };

  // Initialize smooth scroll for carousel
  addSmoothScroll();
});