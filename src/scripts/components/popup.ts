export interface PopupOptions {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export class Popup {
  private static container: HTMLElement | null = null;

  private static createContainer() {
    if (this.container) return this.container;

    const container = document.createElement('div');
    container.className = 'popup-container';
    document.body.appendChild(container);
    this.container = container;
    return container;
  }

  static show(options: PopupOptions) {
    const { message, type = 'info', duration = 3000 } = options;
    const container = this.createContainer();

    const popup = document.createElement('div');
    popup.className = `popup popup-${type}`;
    popup.innerHTML = `
      <span class="popup-message">${message}</span>
      <button class="popup-close">&times;</button>
    `;

    container.appendChild(popup);

    // animation on
    setTimeout(() => {
      popup.classList.add('show');
    }, 10);

    // close btn
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn?.addEventListener('click', () => {
      this.close(popup);
    });

    // auto close
    if (duration > 0) {
      setTimeout(() => {
        this.close(popup);
      }, duration);
    }
  }

  private static close(popup: HTMLElement) {
    popup.classList.remove('show');
    popup.classList.add('hide');
    setTimeout(() => {
      popup.remove();
    }, 300);
  }
}