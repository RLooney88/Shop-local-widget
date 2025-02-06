(() => {
  // Create styles
  const styles = document.createElement('style');
  styles.textContent = `
    .shop-local-widget {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .shop-local-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: #00A7B7;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 2147483649;
    }

    .shop-local-button:hover {
      background: #008A99;
      transform: scale(1.1);
    }

    .shop-local-button.hidden {
      opacity: 0;
      transform: scale(0);
      pointer-events: none;
    }

    .shop-local-chat {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 400px;
      height: 600px;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease;
      z-index: 2147483648;
      pointer-events: none;
      visibility: hidden;
      display: none; /* Ensure it's fully hidden initially */
    }

    .shop-local-chat.open {
      max-height: 600px;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      visibility: visible;
      display: block;
    }

    .shop-local-iframe {
      border: none;
      width: 100%;
      height: 100%;
      background: transparent !important;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: none;
    }

    .shop-local-iframe.loaded {
      opacity: 1;
      display: block;
    }

    @media (max-width: 480px) {
      .shop-local-chat {
        width: 100%;
        bottom: 0;
        right: 0;
        transform: translateY(100%);
      }

      .shop-local-chat.open {
        max-height: 100vh;
        transform: translateY(0);
      }

      .shop-local-iframe {
        height: 100vh;
      }
    }
  `;
  document.head.appendChild(styles);

  // Create widget elements
  const widget = document.createElement('div');
  widget.className = 'shop-local-widget';

  const button = document.createElement('button');
  button.className = 'shop-local-button';
  button.setAttribute('aria-label', 'Open chat');
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  `;

  const chat = document.createElement('div');
  chat.className = 'shop-local-chat';

  // Create iframe for chat content
  const iframe = document.createElement('iframe');
  iframe.src = 'https://ai-local-buddy-rlooney.replit.app';
  iframe.className = 'shop-local-iframe';
  iframe.title = 'Shop Local Assistant Chat';
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups');

  // Add elements to the page
  chat.appendChild(iframe);
  widget.appendChild(button);
  widget.appendChild(chat);
  document.body.appendChild(widget);

  let isOpen = false;

  function toggleChat() {
    if (isOpen) {
      chat.classList.remove('open');
      setTimeout(() => {
        chat.style.display = 'none'; // Fully remove empty space
      }, 300);
      button.classList.remove('hidden');
    } else {
      if (iframe.classList.contains('loaded')) {
        chat.style.display = 'block';
        chat.classList.add('open');
        button.classList.add('hidden');
      }
    }
    isOpen = !isOpen;
  }

  // Add event listeners
  button.addEventListener('click', toggleChat);

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleChat();
    }
  });

  // Ensure the chat only appears after the iframe has loaded
  iframe.addEventListener('load', () => {
    iframe.classList.add('loaded');
    chat.style.display = 'none'; // Hide until user clicks
  });
})();
