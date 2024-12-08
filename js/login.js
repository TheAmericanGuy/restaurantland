document.addEventListener("DOMContentLoaded", function () {
    const pinDisplay = document.getElementById("pin-display");
    const keypadButtons = document.querySelectorAll(".key");
    const submitButton = document.getElementById("submit-button");
    const errorMessage = document.getElementById("error-message");

    let enteredPin = "";

    // Atualiza o display do PIN
    function updatePinDisplay() {
        pinDisplay.textContent = enteredPin.padEnd(4, "•");
    }

    // Eventos para os botões do teclado
    keypadButtons.forEach(button => {
        button.addEventListener("click", function () {
            const key = button.getAttribute("data-key");

            if (key === "clear") {
                enteredPin = "";
            } else if (key === "backspace") {
                enteredPin = enteredPin.slice(0, -1);
            } else if (enteredPin.length < 4) {
                enteredPin += key;
            }

            updatePinDisplay();
        });
    });

    // Envia o PIN ao backend ao clicar em "Login"
    submitButton.addEventListener("click", async function () {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin: enteredPin }),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Login bem-sucedido:", data.userType);

                // Redireciona baseado no tipo de usuário
                if (data.userType === "admin") {
                    window.location.href = "index.html"; // Página do administrador
                } else {
                    window.location.href = "index.html"; // Página de usuário normal
                }
            } else {
                errorMessage.style.display = "block"; // Mostra mensagem de erro
                setTimeout(() => {
                    errorMessage.style.display = "none";
                }, 2000); // Oculta mensagem após 2 segundos
                enteredPin = ""; // Reseta o PIN
                updatePinDisplay();
            }
        } catch (err) {
            console.error("Erro ao se conectar ao backend:", err);
            alert("Erro ao se conectar ao servidor.");
        }
    });

    // Inicializa o display do PIN
    updatePinDisplay();
});
