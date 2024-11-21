document.addEventListener("DOMContentLoaded", function () {
    console.log("Login page loaded");

    const pinDisplay = document.getElementById("pin-display");
    const keypadButtons = document.querySelectorAll(".key");
    const submitButton = document.getElementById("submit-button");
    const errorMessage = document.getElementById("error-message");

    const adminPin = "1234"; // PIN do administrador
    let users = JSON.parse(localStorage.getItem("users")) || []; // Recupera usuários do localStorage
    let enteredPin = "";

    // Atualiza o display do PIN
    function updatePinDisplay() {
        pinDisplay.textContent = enteredPin.padEnd(4, "•");
    }

    // Adiciona evento a cada botão do teclado
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

    // Verifica o PIN ao clicar em "Login"
    submitButton.addEventListener("click", function () {
        
        // Verifica se o PIN é de administrador
        if (enteredPin === adminPin) {
            console.log("Admin login successful");
            localStorage.setItem("userType", "admin");
            window.location.href = "index.html"; // Redireciona como administrador
        } 
        // Verifica se o PIN é de um usuário registrado
        else if (users.some(user => user.pin === enteredPin)) {
            console.log("User login successful");
            localStorage.setItem("userType", "user");
            window.location.href = "index.html"; // Redireciona como usuário
        } 
        // Caso o PIN seja inválido
        else {
            errorMessage.style.display = "block"; // Mostra a mensagem de erro
            setTimeout(() => {
                errorMessage.style.display = "none";
            }, 2000); // Oculta a mensagem após 2 segundos
            enteredPin = ""; // Reseta o PIN
            updatePinDisplay();
        }
    });

    // Inicializa o display do PIN
    updatePinDisplay();
});
