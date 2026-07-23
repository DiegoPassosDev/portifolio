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
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (formFeedback) {
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback";
      }

      let formData = new FormData(this);
      formData.append("service_id", "gmailMesseger");
      formData.append("template_id", "template_fmdrmbr");
      formData.append("user_id", "MUSa7mECe5DmIO0uS");
      formData.append("subject", "Mensagem do Portfólio");

      const submitBtn = contactForm.querySelector('input[type="submit"]');
      if (submitBtn) {
        submitBtn.value = "Enviando...";
        submitBtn.disabled = true;
      }

      fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            if (formFeedback) {
              formFeedback.textContent = "Mensagem enviada com sucesso!";
              formFeedback.className = "form-feedback success";
            }
            contactForm.reset();
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .catch((error) => {
          if (formFeedback) {
            formFeedback.textContent = "Erro ao enviar mensagem. Tente novamente.";
            formFeedback.className = "form-feedback error";
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.value = "Enviar";
            submitBtn.disabled = false;
          }
        });
    });
  }
});
