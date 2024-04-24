export default function toast() {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    const autoremove = setTimeout(function () {
      main.removeChild(toast);
    }, this.toasts.duration + 1000);

    toast.onclick = function (e) {
      if (e.target.closest(".toast__closed")) main.removeChild(toast);
      clearTimeout(autoremove);
    };

    const icons = {
      success: "bi bi-check",
      error: "bi bi-exclamation-triangle-fill",
      warn: "bi bi-exclamation-circle-fill",
    };
    const icon = icons[this.toasts.type];
    const delay = (this.toasts.duration / 1000).toFixed(2);
    toast.style.animation = `slideInLeft ease .3s forwards, fadeOut linear 1s ${delay}s forwards`;
    toast.classList.add("toasts", `toast--${this.toasts.type}`);
    toast.innerHTML = `
              <div class="toast__icon">
                  <i class="${icon}"></i>
              </div>
              <div class="toast__body">
                  <h3 class="toast__title">${this.toasts.title}</h3>
                  <p class="toast__msg">
                     ${this.toasts.msg}
                  </p>
              </div>
              <div class="toast__closed">
                 <i class="bi bi-x-circle-fill text-danger"></i>
              </div>
      `;
    main.appendChild(toast);
  }
}
