document.getElementById('cepForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let cep = document.getElementById('cep').value;
    cep = cep.replace("-", "").trim();

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('erro').textContent = "CEP não encontrado.";
                document.getElementById('resultado').innerHTML = "";
            } else {
                document.getElementById('erro').textContent = "";
                document.getElementById('resultado').innerHTML = `
                    <h3>Resultado:</h3>
                    <ul>
                        <li><strong>CEP:</strong> <span id="cepOutput">${data.cep}</span></li>
                        <li><strong>Logradouro:</strong> <span id="logradouroOutput">${data.logradouro}</span></li>
                        <li><strong>Complemento:</strong> <span id="complementoOutput">${data.complemento}</span></li>
                        <li><strong>Bairro:</strong> <span id="bairroOutput">${data.bairro}</span></li>
                        <li><strong>Cidade:</strong> <span id="cidadeOutput">${data.localidade}</span></li>
                        <li><strong>Estado:</strong> <span id="estadoOutput">${data.uf}</span></li>
                    </ul>
                    <button class="copy-btn" onclick="copyToClipboard()">Copiar CEP</button>
                `;
            }
        })
        .catch(error => {
            document.getElementById('erro').textContent = "Erro ao consultar a API.";
            document.getElementById('resultado').innerHTML = "";
        });
});

function copyToClipboard() {
    const cep = document.getElementById('cepOutput').textContent;

    navigator.clipboard.writeText(cep)
        .then(() => {
            alert('CEP copiado para a área de transferência!');
        })
        .catch(err => {
            alert('Falha ao copiar o CEP: ' + err);
        });
}
