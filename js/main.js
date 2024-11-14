let timezone = 'America/New_York'; 

async function updateDateTime() {
    try {
        const response = await fetch(`http://localhost:3000/datetime?timezone=${timezone}`);
        const data = await response.json();
        
    
        document.getElementById("date").textContent = data.date;
        document.getElementById("time").textContent = data.time;
    } catch (error) {
        console.error('Error to get time and date:', error);
        document.getElementById("date").textContent = 'Error loading date';
        document.getElementById("time").textContent = '';
    }
}


updateDateTime();
setInterval(updateDateTime, 1000); 

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".reservation-schedule form");
    const phoneInput = form.querySelector("#phone");

    phoneInput.addEventListener("input", function() {
        let phoneNumber = phoneInput.value.replace(/\D/g, ""); 

        if (phoneNumber.length <= 3) {
            phoneInput.value = `(${phoneNumber}`;
        } else if (phoneNumber.length <= 6) {
            phoneInput.value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        } else {
            phoneInput.value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".reservation-schedule form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = form.querySelector("#name").value;
        const phone = form.querySelector("#phone").value;
        const reservationDate = form.querySelector("#reservation-date").value;
        const reservationTime = form.querySelector("#reservation-time").value;

        if (name && phone && reservationDate && reservationTime) {
            displaySuccessMessage("Your reservation has been recorded with success");
            saveReservation({ name, phone, date: reservationDate, time: reservationTime });

            form.reset();

            setTimeout(() => {
                window.location.href = "index.html";
            }, 100);
        }
    });

    function displaySuccessMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("success-message");
        messageElement.textContent = message;
        messageElement.style.cssText = `
            color: green;
            font-weight: bold;
            text-align: center;
            font-size: 2em;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, 0.9);
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;

        document.body.appendChild(messageElement);

        setTimeout(() => messageElement.remove(), 2500);
    }

    function saveReservation(reservation) {
        // Recupera as reservas existentes
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        reservations.push(reservation);
        reservations.sort((a, b) => new Date(a.date) - new Date(b.date)); // Ordena por data
        localStorage.setItem("reservations", JSON.stringify(reservations));
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const reservationsContainer = document.querySelector(".reservations");

    // Carrega as reservas do localStorage
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    // Adiciona as reservas abaixo do título <h2>
    reservations.forEach((reservation, index) => {
        const reservationItem = createReservationItem(reservation, index);
        reservationsContainer.appendChild(reservationItem);
    });

    // Função para criar um item de reserva com a opção de remoção
    function createReservationItem(reservation, index) {
        const reservationItem = document.createElement("div");
        reservationItem.classList.add("reservation-item");

        reservationItem.style.cssText = `
            margin-bottom: 15px;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        `;

        // Formata a data e a hora
        const formattedDate = formatDate(reservation.date);
        const formattedTime = formatTime(reservation.time);

        reservationItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <div>
                    <p style="font-size: 2em; font-weight: bold;"><strong>${reservation.name}</strong></p>
                    <p style="font-size: 2em;">${reservation.phone}</p>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 2em; font-weight: bold;">${formattedDate}</p>
                    <p style="font-size: 2em;">${formattedTime}</p>
                </div>
            </div>
        `;

        // Adiciona o evento de clique ao item completo da reserva
        reservationItem.addEventListener("click", function() {
            confirmDelete(index, reservation.name);
        });

        return reservationItem;
    }

    // Função para exibir o pop-up de confirmação com o nome da reserva
    function confirmDelete(index, reservationName) {
        const popup = document.createElement("div");
        popup.classList.add("popup-confirm");
        popup.innerHTML = `
            <div class="popup-content" style="
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
                max-width: 400px;
                text-align: center;
            ">
                <p style="font-size: 1.3em; color: #333; margin-bottom: 20px;">
                    Are you sure you want to delete <strong>${reservationName}</strong> reservation?
                </p>
                <button id="confirm-yes" style="
                    background-color: #f44336;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    font-size: 1em;
                    cursor: pointer;
                    margin-right: 10px;
                    transition: background-color 0.3s;
                ">Yes</button>
                <button id="confirm-cancel" style="
                    background-color: #ccc;
                    color: #333;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    font-size: 1em;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">Cancel</button>
            </div>
        `;
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        `;

        document.body.appendChild(popup);

        // Evento para remover a reserva ao clicar em "Yes"
        document.getElementById("confirm-yes").addEventListener("click", function() {
            deleteReservation(index);
            popup.remove();
        });

        // Evento para fechar o pop-up ao clicar em "Cancel"
        document.getElementById("confirm-cancel").addEventListener("click", function() {
            popup.remove();
        });
    }

    function deleteReservation(index) {
        reservations.splice(index, 1);
        localStorage.setItem("reservations", JSON.stringify(reservations));

        reservationsContainer.innerHTML = "<h2>Reservations</h2>";
        reservations.forEach((reservation, newIndex) => {
            const reservationItem = createReservationItem(reservation, newIndex);
            reservationsContainer.appendChild(reservationItem);
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function formatTime(timeString) {
        const [hour, minute] = timeString.split(":");
        let hours = parseInt(hour, 10);
        const suffix = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minute} ${suffix}`;
    }
});




