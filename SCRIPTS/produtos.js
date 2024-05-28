// Função para verificar se o usuário está logado
function verificarUsuarioLogado() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (usuarioLogado) {
    return true;
  } else {
    return false;
  }
}


function Mostrar(data) {
  var url = window.location.href;
  var parametro = new URLSearchParams(new URL(url).search).get("category");
  var principal = document.getElementById("main");
  var conteudo = " ";

  if (parametro !== null) {
    console.log("Categoria encontrada na URL:", parametro);
  } else {
    console.log("Nenhuma categoria encontrada na URL.");
  }


  //Mostrar produtos que tiverem a catégoria

  conteudo += `<div class="container"><div class="row">`;
  let count = 0;
  for (let produtoID in data.Produtos) {
    let element = data.Produtos[produtoID];
    if (element.Categoria === parametro || parametro === "todos") {
      count++;
      conteudo += `
      <div class="col-md-4 p-4">
        <a href="detalhes.html?id=${produtoID}" style="text-decoration:none;color:black">
          <div class="card m-2 shadow-lg h-100 d-flex flex-column">
            <div class="row">
              <img src="${element.Imagem.Img1}" alt="${element.Categoria}" class="w-100">
            </div>
            <div class="row p-2 flex-grow-1">
              <h5><b>${element.Nome}</b></h5>
              <br>
              <h4 class="text-success text-end">R$${element.Preco.toFixed(2)}</h4>
            </div>
          </div>
        </a>
      </div>
    `;
      if (count % 3 === 0) {
        conteudo += `</div><div class="row">`; // Abre uma nova linha a cada 4 produtos
      }
    }
  }

  conteudo += `</div></div>`;

  principal.innerHTML = conteudo;
}


window.onload = function () {
  fetch("https://aurum-joias-default-rtdb.firebaseio.com/.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Ocorreu um erro ao fazer a requisição.");
      }
      return response.json();
    })
    .then(data => {
      Mostrar(data);
    })
    .catch(error => {
      console.error(error);
    });
}