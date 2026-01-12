const TOKEN = "";

function consultarIP(e) {
    e.preventDefault();

    const ip = document.getElementById("ip").value.trim();
    const resultado = document.getElementById("resultado");
    const erro = document.getElementById("erro");

    resultado.innerHTML = "";
    erro.innerHTML = "";

    const url = ip
        ? `https://ipinfo.io/${ip}/json${TOKEN ? '?token=' + TOKEN : ''}`
        : `https://ipinfo.io/json${TOKEN ? '?token=' + TOKEN : ''}`;

    fetch(url)
        .then(r => r.json())
        .then(data => {
            if (data.error) {
                erro.innerText = "IP inválido ou erro na consulta.";
                return;
            }

            resultado.innerHTML = `
                <ul>
                    <li><b>IP:</b> ${data.ip}</li>
                    <li><b>Cidade:</b> ${data.city || '-'}</li>
                    <li><b>Região:</b> ${data.region || '-'}</li>
                    <li><b>País:</b> ${data.country || '-'}</li>
                    <li><b>CEP:</b> ${data.postal || '-'}</li>
                    <li><b>Localização:</b> ${data.loc || '-'}</li>
                    <li><b>Fuso horário:</b> ${data.timezone || '-'}</li>
                    <li><b>Org / ASN:</b> ${data.org || '-'}</li>
                </ul>
                <button class="copy-btn" onclick="copiar()">Copiar dados</button>
            `;

            window._dados = JSON.stringify(data, null, 2);
        })
        .catch(() => {
            erro.innerText = "Erro ao conectar à API.";
        });
}

function copiar() {
    navigator.clipboard.writeText(window._dados);
    alert("Dados copiados!");
}
