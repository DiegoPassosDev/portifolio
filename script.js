document.addEventListener("DOMContentLoaded", function () {
  let btnMenu = document.getElementById("btn-menu-open");
  let menu = document.getElementById("menu-mobile");
  let overlay = document.getElementById("overlay-menu");
  let btnClose = document.querySelector(".btn-close");

  if (btnMenu && menu && overlay) {
    btnMenu.addEventListener("click", () => {
      menu.classList.add("open-menu");
    });

    if (btnClose) {
      btnClose.addEventListener("click", () => {
        menu.classList.remove("open-menu");
      });
    }

    overlay.addEventListener("click", () => {
      menu.classList.remove("open-menu");
    });

    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open-menu");
      });
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = new FormData(this);
      formData.append("service_id", "gmailMesseger");
      formData.append("template_id", "template_fmdrmbr");
      formData.append("user_id", "MUSa7mECe5DmIO0uS");
      formData.append("subject", "Mensagem do Portfólio");

      fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert("E-mail enviado com sucesso!");
            document.getElementById("contact-form").reset();
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .catch((error) => {
          alert("Erro ao enviar e-mail: " + error);
        });
    });
  }

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
