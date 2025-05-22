// Controle das abas
const abas = document.querySelectorAll('.aba-link');
const conteudos = document.querySelectorAll('.aba-conteudo');

abas.forEach(aba => {
  aba.addEventListener('click', (e) => {
    e.preventDefault();

    abas.forEach(a => a.classList.remove('ativa'));
    conteudos.forEach(c => c.classList.remove('ativa'));

    aba.classList.add('ativa');
    const id = aba.getAttribute('data-aba');
    document.getElementById(id).classList.add('ativa');

    if (id !== 'sabores') {
      document.getElementById('detalhes-sabor').innerHTML = '';
    }
  });
});

// Dados dos sabores
const detalhesSabores = {
  Morango: `
    <h3>Morango</h3>
    <p><strong>Ingredientes:</strong> Morango fresco, leite, açúcar, creme de leite.</p>
    <p><strong>Preparo:</strong> Misturamos os ingredientes e congelamos lentamente para manter o sabor natural do morango.</p>
  `,
  Chocolate: `
    <h3>Chocolate</h3>
    <p><strong>Ingredientes:</strong> Cacau puro, leite integral, açúcar, creme de leite.</p>
    <p><strong>Preparo:</strong> Derretemos o cacau com os demais ingredientes e congelamos para um sorvete cremoso e intenso.</p>
  `,
  Baunilha: `
    <h3>Baunilha</h3>
    <p><strong>Ingredientes:</strong> Fava de baunilha, leite, açúcar, creme de leite.</p>
    <p><strong>Preparo:</strong> Misturamos tudo e congelamos garantindo aroma natural e sabor suave.</p>
  `
};

function mostrarDetalhes(sabor) {
  const divDetalhes = document.getElementById('detalhes-sabor');
  if (detalhesSabores[sabor]) {
    divDetalhes.innerHTML = detalhesSabores[sabor];
    divDetalhes.scrollIntoView({ behavior: 'smooth' });
  } else {
    divDetalhes.innerHTML = '<p>Detalhes não disponíveis.</p>';
  }
}

function enviarWhatsApp(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email) {
    alert('Por favor, preencha nome e e-mail.');
    return;
  }

  let texto = `Olá, meu nome é ${nome}.\nE-mail: ${email}`;
  if (mensagem) texto += `\nMensagem: ${mensagem}`;

  const numero = '5541999222039'; // número WhatsApp com código do Brasil e DDD
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
}
function mostrarDetalhes(sabor) {
  const conteudo = detalhesSabores[sabor];
  const modal = document.getElementById('modal-sabor');
  const conteudoModal = document.getElementById('conteudo-modal');

  if (conteudo) {
    conteudoModal.innerHTML = conteudo;
    modal.style.display = 'block';
  } else {
    conteudoModal.innerHTML = '<p>Detalhes não disponíveis.</p>';
    modal.style.display = 'block';
  }
}

function fecharModal() {
  document.getElementById('modal-sabor').style.display = 'none';
}

// Fechar ao clicar fora do modal
window.onclick = function(event) {
  const modal = document.getElementById('modal-sabor');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Verifica se o navegador suporta reconhecimento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Seu navegador não suporta reconhecimento de voz. Use o Chrome para melhor experiência.");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = false;

  const btnJarvis = document.getElementById('btnJarvis');
  const jarvisResposta = document.getElementById('jarvisResposta');

  btnJarvis.addEventListener('click', () => {
    jarvisResposta.style.display = 'block';
    jarvisResposta.textContent = 'Ouvindo... 🎙️';
    recognition.start();
  });

  recognition.addEventListener('result', (event) => {
    const texto = event.results[0][0].transcript.toLowerCase();
    responderJarvis(texto);
  });

  recognition.addEventListener('end', () => {
    // Pode reiniciar reconhecimento aqui, se quiser. Por enquanto, não.
  });

  function responderJarvis(texto) {
    let resposta = '';

    if (texto.includes('sabores')) {
      resposta = 'Temos sabores deliciosos como Morango, Chocolate e Baunilha.';
    } else if (texto.includes('horário')) {
      resposta = 'Estamos abertos das 9h às 22h todos os dias.';
    } else if (texto.includes('contato')) {
      resposta = 'Você pode nos encontrar no WhatsApp, Facebook e Instagram. Quer que eu abra alguma dessas para você?';
    } else if (texto.includes('obrigado') || texto.includes('valeu')) {
      resposta = 'De nada! Estou sempre aqui para ajudar.';
    } else {
      resposta = 'Desculpe, não entendi. Pode repetir?';
    }

    falar(resposta);
  }

  function falar(texto) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';

    jarvisResposta.textContent = texto;

    utterance.onstart = () => {
      btnJarvis.style.backgroundColor = '#7B68EE'; // muda cor botão enquanto fala
    };

    utterance.onend = () => {
      btnJarvis.style.backgroundColor = '#4B0082'; // volta a cor normal
    };

    synth.speak(utterance);
  }
}
