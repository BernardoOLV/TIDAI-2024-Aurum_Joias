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
    data.Produtos.forEach(element => {
        if(element.Categoria == parametro){
          let produtoID = Object.keys(data.Produtos).find(key => data.Produtos[key].Nome === element.Nome);
          conteudo += `
            <a href="detalhes.html?id=${produtoID}">
              <div class="col-md-4 card">
                <div class="row">
                  ${element.Imagem}
                <\div>
                <div class="row">
                  <h6><b>${element.Nome}<\b><\h6>
                  <br>
                  <h4 class="text-success">${element.Preco}<\h4>
                <\div>
              <\div>
            <\a>
          `
        }
    });

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