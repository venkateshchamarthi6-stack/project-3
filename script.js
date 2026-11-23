/**
 * NEXORA AI — Futuristic AI Technology Platform Scripts
 * Implements real-time neural streaming simulation, interactive playground,
 * token generator, modal managers, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navbar & ScrollSpy ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const scrollY = window.pageYOffset + 120;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Drawer Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Live AI Neural Playground / Terminal Simulator ---
  const promptDisplay = document.getElementById('promptDisplay');
  const streamText = document.getElementById('streamText');
  const chipBtns = document.querySelectorAll('.chip-btn');
  const consoleForm = document.getElementById('consoleForm');
  const customPromptInput = document.getElementById('customPromptInput');

  // Simulated AI response dictionary
  const responses = {
    'Analyze global market telemetry and synthesize 3-year risk vectors.':
      'Synthesizing multi-dimensional risk matrix across 48 global indices... Initializing latent probabilistic graph. Risk variance bounded at 2.4%. Recommendation: Deploy automated hedge protocol in parallel with algorithmic currency stabilization reserves. Projected Sharpe ratio improvement: +31.8%.',

    'Generate autonomous Python microservice with automated failover and telemetry.':
      'Compiling async ASGI neural proxy... Implementing distributed Raft consensus with circuit-breaker fallback. Telemetry configured with OpenTelemetry hooks and gRPC streaming at 0.4ms overhead. Self-healing health check daemon initiated successfully on port 8080.',

    'Inspect multimodal MRI medical scan and isolate cellular anomalies.':
      'Deconstructing 3D voxel density matrix across T1/T2 MRI sequences... Identified micro-vascular anomaly at coordinates [X:142, Y:89, Z:34]. Confidence score: 99.84%. Generating volumetric heat map and comparative retrospective biomarker report for clinical review.',

    'Formulate self-healing cybersecurity firewall rules for zero-day mitigation.':
      'Ingesting global threat intelligence telemetry... Detected anomalous payload signature on port 443. Isolating malicious socket via eBPF kernel filter. Synthesized dynamic iptables defense rule and propagated encrypted blocklist hash to all 16 cluster nodes in 420 microseconds.'
  };

  let typeInterval = null;

  function streamOutputText(text) {
    if (!streamText) return;
    clearInterval(typeInterval);
    streamText.textContent = '';
    let index = 0;

    typeInterval = setInterval(() => {
      if (index < text.length) {
        streamText.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 14);
  }

  // Handle Preset Chips Click
  chipBtns.forEach((chip) => {
    chip.addEventListener('click', () => {
      chipBtns.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const prompt = chip.getAttribute('data-prompt');
      if (promptDisplay) promptDisplay.textContent = prompt;
      if (customPromptInput) customPromptInput.value = prompt;

      const reply = responses[prompt] || 'Processing query across Nexus neural clusters... Synthesizing optimal cognitive inference.';
      streamOutputText(reply);
      showToast('Executing neural workflow...');
    });
  });

  // Handle Custom Prompt Submit
  if (consoleForm && customPromptInput) {
    consoleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userQuery = customPromptInput.value.trim();
      if (!userQuery) return;

      chipBtns.forEach((c) => c.classList.remove('active'));
      if (promptDisplay) promptDisplay.textContent = userQuery;

      const generatedReply = `Query received: "${userQuery}". Connecting to distributed GPU tensor core... Decomposing natural language tokens into 1536-dimensional embeddings. Neural reasoning synthesized across 128 attention heads in 1.4ms. Status: Computation Verified.`;
      
      streamOutputText(generatedReply);
      showToast('Computed via NEXORA-OMNI-5.4');
    });
  }

  // --- 4. "Explore AI" Early Access Modal Dialog ---
  const accessModal = document.getElementById('accessModal');
  const openAccessModalBtn = document.getElementById('openAccessModalBtn');
  const mobileAccessBtn = document.getElementById('mobileAccessBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const quickAccessForm = document.getElementById('quickAccessForm');
  const tokenBox = document.getElementById('tokenBox');
  const copyTokenBtn = document.getElementById('copyTokenBtn');
  const tokenCode = document.getElementById('tokenCode');

  const openModal = () => {
    if (!accessModal) return;
    accessModal.classList.add('open');
    accessModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!accessModal) return;
    accessModal.classList.remove('open');
    accessModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openAccessModalBtn) openAccessModalBtn.addEventListener('click', openModal);
  if (mobileAccessBtn) {
    mobileAccessBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('active');
      openModal();
    });
  }
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (accessModal) {
    accessModal.addEventListener('click', (e) => {
      if (e.target === accessModal) closeModal();
    });
  }

  // Form generates sandbox token
  if (quickAccessForm) {
    quickAccessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const randomHex = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
      const generated = `nex_live_${randomHex}`;
      if (tokenCode) tokenCode.textContent = generated;
      if (tokenBox) tokenBox.classList.add('visible');
      showToast('Sandbox Token Generated!');
    });
  }

  if (copyTokenBtn && tokenCode) {
    copyTokenBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(tokenCode.textContent);
      }
      showToast('Copied token to clipboard!');
    });
  }

  // --- 5. Contact & Consultation Form ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `<span>Encrypting &amp; Dispatching...</span>`;
      }

      setTimeout(() => {
        if (formSuccess) formSuccess.classList.add('visible');
        contactForm.reset();
        showToast('Enterprise trial request submitted!');
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = `<span>Initialize AI Key Generation</span>`;
        }
      }, 1000);
    });
  }

  // --- 6. Newsletter Subscription Form ---
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterConfirm = document.getElementById('newsletterConfirm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (newsletterConfirm) newsletterConfirm.classList.add('visible');
      newsletterForm.reset();
      showToast('Subscribed to NEXORA AI Research Feed!');
      setTimeout(() => {
        if (newsletterConfirm) newsletterConfirm.classList.remove('visible');
      }, 5000);
    });
  }

  // --- 7. Floating Toast Notification Helper ---
  const nexoraToast = document.getElementById('nexoraToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(msg) {
    if (!nexoraToast || !toastMessage) return;
    toastMessage.textContent = msg;
    nexoraToast.classList.add('visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      nexoraToast.classList.remove('visible');
    }, 3600);
  }

  // Close modals on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (accessModal && accessModal.classList.contains('open')) closeModal();
    }
  });

});
