let timezone = 'America/New_York'; 

async function updateDateTime() {
    try {
        const response = await fetch(`http://localhost:3000/datetime?timezone=${timezone}`);
        const data = await response.json();
        
    
        document.getElementById("date").textContent = data.date;
        document.getElementById("time").textContent = data.time;
    } catch (error) {
        console.error('Erro ao obter data e hora:', error);
        document.getElementById("date").textContent = 'Erro ao carregar data';
        document.getElementById("time").textContent = '';
    }
}


updateDateTime();
setInterval(updateDateTime, 1000); 