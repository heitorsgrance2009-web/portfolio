// =====================================================
// tema.js - roda LOGO NO COMEÇO (dentro do <head>)
// Serve para lembrar se o visitante escolheu o modo
// claro ou escuro, assim o tema continua igual quando
// ele troca de página (e a tela não "pisca").
// =====================================================

var temaSalvo = null;

// try/catch evita que o site quebre se o navegador
// não deixar guardar dados (modo anônimo, por exemplo)
try {
  // Pego o que foi salvo no navegador (se não tiver nada, vem null)
  temaSalvo = localStorage.getItem("tema");
} catch (erro) {
  temaSalvo = null;
}

// A classe "js" avisa o CSS que o JavaScript está funcionando
// A classe "claro" liga o modo claro
if (temaSalvo == "claro") {
  document.documentElement.className = "js claro";
} else {
  document.documentElement.className = "js";
}
