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
  var parametroId = new URLSearchParams(new URL(url).search).get("id");
  var principal = document.getElementById("main");

  if (parametroId !== null) {
    console.log("ID encontrado na URL:", parametroId);
  } else {
    console.log("Nenhum ID encontrado na URL.");
  }
  produto = data.Produtos[parametroId];
  console.log(produto.Imagem.Img1)
  principal.innerHTML = `
    <div class="container p-4">
    <div class="row p-2">
      <div class="col-md-8">
        <div id="carousel" class="carousel slide">
          <div class="carousel-inner rounded">
            <div class="ratio ratio-16x9 carousel-item active">
              <img src="${produto.Imagem.Img1}" class="d-block w-100" style="max-width:100%;max-height:100%;margin:auto;object-fit: contain;">
            </div>
            <div class="ratio ratio-16x9 carousel-item">
              <img src="${produto.Imagem.Img2}" class="d-block w-100" style="max-width:100%;max-height:100%;margin:auto;object-fit: contain;">
            </div>
            <div class="ratio ratio-16x9 carousel-item">
              <img src="${produto.Imagem.Img3}" class="d-block w-100" style="max-width:100%;max-height:100%;margin:auto;object-fit: contain;">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div class="col-md-4 shadow-lg">
        <div class="row bg-dark text-light">
            <h2>${produto.Nome}</h2>
        </div>
        <div class="row mb-3">
            <div class="d-flex">
                <h1 class="d-inline">Valor: </h1>
                <h1 class="text-end d-inline" style="color: green;">R$ ${produto.Preco.toFixed(2)}</h1>
            </div>
            <div class="col-12"><b>Frente: Grátis para todo Brasil</b></div>
        </div>
        <div class="row m-2">
            <div class="col-12 text-end">
                <button class="btn btn-success" type="button" onclick="adicionarCarrinho('${parametroId}')">Adicionar ao carrinho
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </div>

    <div class="row p-2 shadow-lg">
      <h3>DETALHES DO PRODUTO:</h3>
      <p>${produto.Detalhes}</p>
    </div>
  </div>`
}

function adicionarCarrinho(produtoID) {
  // Verifica se o usuário está logado
  if (!verificarUsuarioLogado()) {
    window.location.href = 'login.html';
    return;
  }

  // Faz uma solicitação GET para obter os dados dos usuários
  fetch('https://aurum-joias-default-rtdb.firebaseio.com/.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Ocorreu um erro ao fazer a requisição.");
      }
      return response.json();
    })
    .then(data => {
      // Pegar o ID do usuario atual
      const email = localStorage.getItem('email');
      const userID = Object.keys(data.Usuarios).find(key => data.Usuarios[key].Email === email);

      if (!userID) {
        throw new Error('ID do usuário não encontrado.');
      }

      // Pega o produto novamente
      const produto = data.Produtos[produtoID];
      if (!produto) {
        throw new Error('Produto não encontrado.');
      }

      // Dados do produto a serem adicionados ao carrinho
      const produtoParaAdicionar = {
        Nome: produto.Nome,
        Preco: produto.Preco,
        Detalhes: produto.Detalhes
      };

      // URL da API para adicionar o produto ao carrinho do usuário
      const urlCarrinho = `https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/${userID}/Carrinho/.json`;

      // Configura as opções para a solicitação POST
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoParaAdicionar)
      };

      // Envia a solicitação POST para adicionar o produto ao carrinho
      fetch(urlCarrinho, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao adicionar produto ao carrinho.');
          }
          return response.json(); 
        })
        .then(data => {
          console.log('Produto adicionado ao carrinho:', data);
          window.location.href = 'carrinho.html';
        })
        .catch(error => {
          console.error('Erro ao adicionar produto ao carrinho:', error);
        });
    })
    .catch(error => {
      console.error(error);
    });
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