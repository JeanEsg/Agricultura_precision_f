let sensorData = null;

document.getElementById('sensor-data').addEventListener('click', () => {
    fetch('http://127.0.0.1:8002/sensor-data') // Cambiar el puerto a conveniencia
        .then(response => response.json())
        .then(data => {
            sensorData = {
                temperatura: data.temperatura,
                humedad_aire: data.humedad_aire,
                humedad_suelo: data.humedad_suelo
            };

            const resultElement = document.getElementById('result');
            resultElement.innerHTML = `
            <p>Temperatura: ${data.temperatura}°C</p>
            <p>Humedad Relativa del Aire: ${data.humedad_aire}%</p>
            <p>Humedad del Suelo: ${data.humedad_suelo}%</p>
        `;
        }) 
        .catch(error => console.error('Error:', error));
});

document.getElementById('save').addEventListener('click', () => {
    if (!sensorData){
        alert('Por favor, primero obtén los datos de los sensores');
        return;
    }
    fetch('http://127.0.0.1:8002/save',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sensorData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.text();
    })
    .then(data => {
        alert(data) 
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('cantidad-agua-litros').addEventListener('click', () => {
    const dataEntrada = document.getElementById('result2').value;
    const datos = dataEntrada.split(",").map(x => parseFloat(x.trim()));
    if (datos.length === 4){
        const AguaRequest = {
            area: datos[0],
            temperatura: datos[1],
            humedad_aire: datos[2],
            humedad_suelo: datos[3]
        };
        fetch('http://127.0.0.1:8002/cantidad',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(AguaRequest)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('result2').textContent = data; // Mostrar la cadena directamente
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingresa exactamente cuatro valores separados por comas.');
    }
});

document.getElementById('generar-recomendacion').addEventListener('click', () => {
    const promptText = document.getElementById('result3').value;
    const promptRequest = {
        prompt: promptText
    };
    fetch('http://127.0.0.1:8002/generar_respuesta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(promptRequest)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        let res = "";            
        res += `Recomendacion:\n ${data.response}\n`;
        const cadenaConSaltos = res.replace(/\n/g, '<br>');
        document.getElementById('result3').innerHTML = cadenaConSaltos;
    })
    .catch(error => console.error('Error:', error));
});

