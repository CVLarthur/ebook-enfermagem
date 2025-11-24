// Pega o formulário pelo ID
const form = document.getElementById("ebook-form");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // NÃO deixa o navegador fazer o envio padrão

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    // Mensagem enquanto envia
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Se deu tudo certo no Formspree
        form.reset();

        if (submitButton) {
          submitButton.textContent = "Confira seu e-mail 💌";
        }

        alert("Pronto! O link do e-book foi enviado para o seu e-mail.");
      } else {
        if (submitButton) {
          submitButton.textContent = "Quero receber o e-book";
        }
        alert("Algo deu errado ao enviar. Tente novamente em alguns instantes.");
      }
    } catch (error) {
      console.error(error);
      if (submitButton) {
        submitButton.textContent = "Quero receber o e-book";
      }
      alert("Erro de conexão. Verifique sua internet e tente de novo.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}