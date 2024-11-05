document.getElementById('sensor-data').addEventListener('click', () => {
    fetch('http://127.0.0.1:8002/sensor-data') // Cambiar el puerto a conveniencia
        .then(response => response.json())
        .then(data => {
            const resultElement = document.getElementById('result');
            resultElement.innerHTML = `
            <p>Temperatura: ${data.temperatura}°C</p>
            <p>Humedad: ${data.humedad}%</p>
            <p>Humedad Relativa: ${data.humedadR}%</p>
        `;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('cantidad-agua-litros').addEventListener('click', () => {
    fetch('http://127.0.0.1:8002/cantidad') // Cambiar el puerto a conveniencia
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
});

document.getElementById('generar-recomendacion').addEventListener('click', () => {
    fetch('http://127.0.0.1:8002/generar_respuesta') // Cambiar el puerto a conveniencia
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let res = "";            
            res += `Recomendacion:\n ${data.recomendacion}\n`;

            const cadenaConSaltos = res.replace(/\n/g, '<br>');
            document.getElementById('result3').innerHTML = cadenaConSaltos;
            

        })
        .catch(error => console.error('Error:', error));
});

