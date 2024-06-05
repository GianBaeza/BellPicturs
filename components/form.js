document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const nombre = document.querySelector("#name");
  const correo = document.querySelector("#email");
  const mensaje = document.querySelector("#comentarios");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkInputs()) {
      sendEmail();
    }
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
      if (message !== "OK") {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar el mensaje",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Envio con Exito",
          text: "El mensaje se envio con exito",
          icon: "success",
        });
      }
    });
  }

  function checkInputs() {
    const items = document.querySelectorAll(".item");
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
        if (item.value !== "") {
          item.classList.remove("error-inputs");
        } else {
          item.classList.add("error-inputs");
        }
      });
    });
    //validamos el campo de correo
    if (!checkEmail(correo)) {
      allValid = false;
    }

    return allValid;
  }

  function checkEmail(correo) {
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!correo.value.match(regex)) {
      correo.classList.add("error-inputs");
      return false;
    } else {
      correo.classList.remove("error-inputs");
      return true;
    }
  }
});
