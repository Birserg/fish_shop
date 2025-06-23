// Telegram Web App Integration Script
(function() {
  'use strict';

  // Check if running in Telegram
  if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Initialize the Web App
    tg.ready();

    // Expand the Web App to full height
    tg.expand();

    // Set theme colors based on Telegram theme
    if (tg.themeParams) {
      const root = document.documentElement;

      if (tg.themeParams.bg_color) {
        root.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color);
      }
      if (tg.themeParams.text_color) {
        root.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color);
      }
      if (tg.themeParams.button_color) {
        root.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color);
      }
      if (tg.themeParams.button_text_color) {
        root.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color);
      }
    }

    // Add Telegram-specific event listeners
    tg.onEvent('viewportChanged', function() {
      // Handle viewport changes
      console.log('Viewport changed:', tg.viewportHeight);
    });

    tg.onEvent('themeChanged', function() {
      // Handle theme changes
      console.log('Theme changed:', tg.colorScheme);
      location.reload(); // Reload to apply new theme
    });

    // Expose Telegram Web App to global scope for React components
    window.TelegramWebApp = tg;

    console.log('Telegram Web App initialized');
  } else {
    console.log('Not running in Telegram Web App');
  }
})();
