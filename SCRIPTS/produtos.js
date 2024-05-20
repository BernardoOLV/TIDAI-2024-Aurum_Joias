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
    
    

    conteudo += `<div class="container">`;
    //Mostrar produtos que tiverem a catégoria
    for (let produtoID in data.Produtos) {
      let element = data.Produtos[produtoID];
      if (element.Categoria === parametro) {
          conteudo += `
              <a href="detalhes.html?id=${produtoID}" style="text-decoration:none;">
                  <div class="col-md-4 p-2 card m-2 shadow-lg">
                      <div class="row">
                          <img src="${element.Imagem.Img1}" alt="${element.Categoria}">
                      </div>
                      <div class="row p-2">
                          <h5><b>${element.Nome}</b></h5>
                          <br>
                          <h4 class="text-success text-end">R$${element.Preco}</h4>
                      </div>
                  </div>
              </a>
          `;
      }
  }
  

    conteudo += `<\div>`;
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