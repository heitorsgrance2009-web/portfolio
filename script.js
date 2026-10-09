// =====================================================
// script.js - JavaScript do portfólio (todas as páginas)
// Fica no final do <body>, depois que o HTML já carregou.
//
// O que tem aqui:
//   1. Botão de modo claro / escuro
//   2. Animação ao rolar a página (animate on scroll)
//   3. Botão de voltar ao topo
//   4. Formulário de contato com máscaras e validação
//   5. Modal (janela de aviso)
// =====================================================


// ------------------------------------------------------
// 1. MODO CLARO / ESCURO
// ------------------------------------------------------
var botaoTema = document.getElementById("botao-tema");

// Muda o texto do botão de acordo com o tema atual
function atualizarBotaoTema() {
  // indexOf devolve -1 quando NÃO encontra a palavra
  if (document.documentElement.className.indexOf("claro") != -1) {
    botaoTema.innerHTML = "🌙 Modo escuro";
  } else {
    botaoTema.innerHTML = "☀️ Modo claro";
  }
}

// Troca o tema e salva a escolha no navegador (localStorage)
function trocarTema() {
  var novoTema = "claro";

  if (document.documentElement.className.indexOf("claro") != -1) {
    novoTema = "escuro";
    document.documentElement.className = "js";
  } else {
    document.documentElement.className = "js claro";
  }

  // Salva a escolha (o try/catch evita erro se o navegador bloquear)
  try {
    localStorage.setItem("tema", novoTema);
  } catch (erro) {
    // se não der para salvar, o tema só vale nesta página
  }

  atualizarBotaoTema();
}

botaoTema.onclick = trocarTema;
atualizarBotaoTema();


// ------------------------------------------------------
// 2. ANIMAÇÃO AO ROLAR A PÁGINA
// Os elementos com a classe "revelar" começam escondidos.
// Quando aparecem na tela, ganham a classe "mostrar".
// ------------------------------------------------------
function revelarElementos() {
  var itens = document.getElementsByClassName("revelar");

  for (var i = 0; i < itens.length; i++) {
    // distância do elemento até o topo da tela
    var topo = itens[i].getBoundingClientRect().top;

    // se ele já entrou na parte visível da tela, mostra
    if (topo < window.innerHeight - 60) {
      itens[i].classList.add("mostrar");
    }
  }
}

revelarElementos(); // roda uma vez ao abrir a página


// ------------------------------------------------------
// 3. BOTÃO DE VOLTAR AO TOPO
// O botão é criado aqui pelo JavaScript e só aparece
// depois que a pessoa rola a página para baixo.
// ------------------------------------------------------
var botaoTopo = document.createElement("button");
botaoTopo.className = "botao-topo";
botaoTopo.innerHTML = "↑";
botaoTopo.title = "Voltar ao topo";
document.body.appendChild(botaoTopo);

botaoTopo.onclick = function () {
  window.scrollTo(0, 0);
};

function mostrarBotaoTopo() {
  // window.scrollY = quantos pixels já rolou
  if (window.scrollY > 300) {
    botaoTopo.classList.add("visivel");
  } else {
    botaoTopo.classList.remove("visivel");
  }
}

// Sempre que a página rolar, roda as duas funções
window.onscroll = function () {
  revelarElementos();
  mostrarBotaoTopo();
};


// ------------------------------------------------------
// 4. FORMULÁRIO DE CONTATO (só existe na página contato)
// ------------------------------------------------------
var formulario = document.getElementById("formulario");

if (formulario != null) {

  var campoNome = document.getElementById("nome");
  var campoTelefone = document.getElementById("telefone");
  var campoEmail = document.getElementById("email");
  var campoMensagem = document.getElementById("mensagem");

  // Mostra (ou limpa) a mensagem de erro de um campo
  function mostrarErro(campo, idErro, texto) {
    document.getElementById(idErro).innerHTML = texto;
    if (texto != "") {
      campo.className = "invalido";  // borda vermelha
    } else {
      campo.className = "";
    }
  }

  // ----- MÁSCARA DO NOME: aceita só letras e espaço -----
  // O replace troca tudo que NÃO é letra por nada ("")
  campoNome.oninput = function () {
    campoNome.value = campoNome.value.replace(/[^A-Za-zÀ-ÿ ]/g, "");
  };

  // ----- MÁSCARA DO TELEFONE: (31) 99999-9999 -----
  campoTelefone.oninput = function () {
    // deixa só os números (\D = tudo que não é número)
    var numeros = campoTelefone.value.replace(/\D/g, "");

    // no máximo 11 números (DDD + 9 dígitos)
    if (numeros.length > 11) {
      numeros = numeros.substring(0, 11);
    }

    // vai montando o texto formatado aos poucos
    var texto = "";
    if (numeros.length > 0) {
      texto = "(" + numeros.substring(0, 2);
    }
    if (numeros.length >= 3) {
      texto = texto + ") " + numeros.substring(2, 7);
    }
    if (numeros.length >= 8) {
      texto = texto + "-" + numeros.substring(7);
    }
    campoTelefone.value = texto;
  };

  // ----- MÁSCARA DO E-MAIL: sem espaços e tudo minúsculo -----
  campoEmail.oninput = function () {
    campoEmail.value = campoEmail.value.replace(/\s/g, "").toLowerCase();
  };

  // ----- CONTADOR DE CARACTERES DA MENSAGEM -----
  campoMensagem.oninput = function () {
    document.getElementById("contador").innerHTML = campoMensagem.value.length + "/500";
  };

  // ----- VALIDAÇÕES (devolvem true se está certo) -----
  function validarNome() {
    var nome = campoNome.value.trim();
    if (nome.length < 3) {
      mostrarErro(campoNome, "erro-nome", "Digite seu nome completo.");
      return false;
    }
    mostrarErro(campoNome, "erro-nome", "");
    return true;
  }

  function validarTelefone() {
    var numeros = campoTelefone.value.replace(/\D/g, "");
    if (numeros.length != 11) {
      mostrarErro(campoTelefone, "erro-telefone", "Digite o celular com DDD. Ex: (31) 99999-9999");
      return false;
    }
    mostrarErro(campoTelefone, "erro-telefone", "");
    return true;
  }

  function validarEmail() {
    var email = campoEmail.value;
    var posicaoArroba = email.indexOf("@");
    var posicaoPonto = email.lastIndexOf(".");

    // precisa ter algo antes do @, um ponto depois do @ e algo depois do ponto
    if (posicaoArroba < 1 || posicaoPonto < posicaoArroba + 2 || posicaoPonto == email.length - 1) {
      mostrarErro(campoEmail, "erro-email", "Digite um e-mail válido. Ex: nome@email.com");
      return false;
    }
    mostrarErro(campoEmail, "erro-email", "");
    return true;
  }

  function validarMensagem() {
    var mensagem = campoMensagem.value.trim();
    if (mensagem.length < 10) {
      mostrarErro(campoMensagem, "erro-mensagem", "Escreva pelo menos 10 caracteres.");
      return false;
    }
    mostrarErro(campoMensagem, "erro-mensagem", "");
    return true;
  }

  // Valida cada campo quando o visitante sai dele
  campoNome.onblur = validarNome;
  campoTelefone.onblur = validarTelefone;
  campoEmail.onblur = validarEmail;
  campoMensagem.onblur = validarMensagem;

  // ----- QUANDO CLICAR EM ENVIAR -----
  formulario.onsubmit = function (evento) {
    // impede a página de recarregar
    evento.preventDefault();

    // valida TODOS os campos (assim todos os erros aparecem juntos)
    var nomeOk = validarNome();
    var telefoneOk = validarTelefone();
    var emailOk = validarEmail();
    var mensagemOk = validarMensagem();

    // se tudo estiver certo, abre o modal
    if (nomeOk && telefoneOk && emailOk && mensagemOk) {
      abrirModal();
    }
  };
}


// ------------------------------------------------------
// 5. MODAL (janela de aviso que aparece por cima do site)
// ------------------------------------------------------
var modal = document.getElementById("modal");

function abrirModal() {
  // Monta o texto do e-mail com os dados do formulário
  var assunto = "Contato pelo portfólio - " + campoNome.value;
  var corpo = "Nome: " + campoNome.value + "\n";
  corpo = corpo + "Telefone: " + campoTelefone.value + "\n";
  corpo = corpo + "E-mail: " + campoEmail.value + "\n\n";
  corpo = corpo + "Mensagem:\n" + campoMensagem.value;

  // encodeURIComponent deixa o texto seguro para usar em um link
  var link = "mailto:heitorsgrance2009@gmail.com";
  link = link + "?subject=" + encodeURIComponent(assunto);
  link = link + "&body=" + encodeURIComponent(corpo);
  document.getElementById("enviar-email").href = link;

  modal.classList.add("aberto");
}

function fecharModal() {
  modal.classList.remove("aberto");
}

// Só liga os botões se o modal existir na página
if (modal != null) {
  document.getElementById("modal-x").onclick = fecharModal;
  document.getElementById("modal-fechar").onclick = fecharModal;

  // Clicar fora da caixa (no fundo escuro) também fecha
  modal.onclick = function (evento) {
    if (evento.target == modal) {
      fecharModal();
    }
  };

  // Apertar ESC fecha o modal
  document.onkeydown = function (evento) {
    if (evento.key == "Escape") {
      fecharModal();
    }
  };
}
