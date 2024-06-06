document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const nombre = document.querySelector("#name");
  const mensaje = document.querySelector("#comentarios");
  const correo = document.querySelector("#email");
  const items = document.querySelectorAll(".item");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkInputs(items)) return sendEmail();
  });

  function sendEmail() {
    const bodyMensaje = `Nombre: ${nombre.value} <br> Email: ${correo.value} <br> Mensaje: ${mensaje.value}`;
    Email.send({
      SecureToken: "c45fb013-a74e-4bb6-86f8-d9e89b013acd",
      Host: "smtp.elasticemail.com",
      Username: "galeriaimagenes@gmail.com",
      Password: "A5FFE9640BDE54978A83DAFE015A30647E89",
      To: "gianb04@gmail.com",
      From: "gianb04@gmail.com",
      Subject: "This is the subject",
      Body: bodyMensaje,
    }).then((message) => {
      if (message === "OK") {
        Swal.fire({
          width: "400px",
          title: "Envío Exitoso",
          text: "El mensaje se envió correctamente.",
          icon: "success",
          customClass: {
            confirmButton: "custom-ok-button",
          },
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar el mensaje",
          icon: "error",
        });
      }
    });
  }

  function checkInputs(items) {
    let allValid = true;
    items.forEach((item) => {
      if (
        item.tagName.toLowerCase() === "input" ||
        item.tagName.toLowerCase() === "textarea"
      ) {
        if (item.value === "") {
          item.classList.add("error-inputs");
          allValid = false;
        } else {
          item.classList.remove("error-inputs");
        }
      }

      item.addEventListener("keyup", () => {
        if (item.value === "") {
          item.classList.add("error-inputs");
        } else {
          item.classList.remove("error-inputs");
        }
      });
    });

    if (!isCorreo(correo)) {
      allValid = false;
    }

    return allValid;
  }
  function isCorreo(correo) {
    const correoNormalizado = String(correo.value).toLowerCase();
    const regex =
      /^[a-zA-Z0-9._-]+@(gmail|hotmail|yahoo|outlook|aol|icloud|protonmail|yandex|mail|inbox)\.[a-zA-Z]{2,6}$/;
    if (regex.test(correoNormalizado)) {
      correo.classList.remove("error-inputs");
      return true;
    } else {
      correo.classList.add("error-inputs");
    }
  }
});
