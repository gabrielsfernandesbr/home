const TOKEN = "";

function consultarIP() {
    const ip = document.getElementById("ip").value.trim();
    const resultado = document.getElementById("resultado-ip");
    const erro = document.getElementById("erro-ip");

    resultado.innerHTML = "";
    erro.innerHTML = "";

    const url = ip
        ? `https://ipinfo.io/${ip}/json${TOKEN ? '?token=' + TOKEN : ''}`
        : `https://ipinfo.io/json${TOKEN ? '?token=' + TOKEN : ''}`;

    resultado.innerHTML = 'Consultando IP...';

    fetch(url)
        .then(r => r.json())
        .then(data => {
            if (data.error) {
                erro.innerText = "IP inválido ou erro na consulta.";
                resultado.innerHTML = "";
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
            resultado.innerHTML = "";
        });
}

function copiar() {
    if (!window._dados) return;
    navigator.clipboard.writeText(window._dados)
        .then(() => alert("Dados copiados para a área de transferência!"))
        .catch(() => alert("Erro ao copiar os dados."));
}

async function consultarUsername() {
    const username = document.getElementById('username')?.value.trim();
    const resultado = document.getElementById('resultado-username');
    const erro = document.getElementById('erro-username');

    if (!resultado || !erro) return;

    resultado.innerHTML = '';
    erro.innerHTML = '';

    if (!username) {
        erro.innerText = 'Erro: digite um username válido';
        return;
    }

    resultado.innerHTML = 'Consultando username...';

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const data = {
            results: [
                { platform: 'Instagram', url: `https://instagram.com/${username}`, status: 'Encontrado' },
                { platform: 'Twitter', url: `https://twitter.com/${username}`, status: 'Não encontrado' },
                { platform: 'TikTok', url: `https://tiktok.com/@${username}`, status: 'Encontrado' }
            ]
        };

        const lista = data.results.map(item =>
            `<li><b>${item.platform}:</b> 
             <a href="${item.url}" target="_blank">${item.url}</a> 
             (${item.status})</li>`
        ).join('');

        resultado.innerHTML = `<ul>${lista}</ul>`;
    } catch {
        erro.innerText = 'Erro ao processar consulta';
        resultado.innerHTML = '';
    }
}

function consultarCEP() {

  document.getElementById('consultar')
    .addEventListener('click', async function () {

      const cep = document.getElementById('cep').value.trim().replace(/\D/g, '');
      const erro = document.getElementById('erro');
      const resultado = document.getElementById('resultado');

      erro.innerHTML = '';
      resultado.innerHTML = '';

      if (cep.length !== 8) {
        erro.innerText = 'CEP inválido';
        return;
      }

      try {
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resp.json();

        if (dados.erro) {
          erro.innerText = 'CEP não encontrado';
          return;
        }

        resultado.innerHTML = `
          Logradouro: ${dados.logradouro} <br>
          Bairro: ${dados.bairro} <br>
          Cidade: ${dados.localidade} <br>
          Estado: ${dados.uf}
        `;
      } catch {
        erro.innerText = 'Erro ao consultar API';
      }

    });
}

document.addEventListener('DOMContentLoaded', iniciarConsultaCep);
