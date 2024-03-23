// Função para verificar se o usuário está logado
function verificarUsuarioLogado() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (usuarioLogado) {
      return true;
  } else {
      return false;
  }
}


function Mostrar(data){
    var url = window.location.href;
    var parametroId = new URLSearchParams(new URL(url).search).get("id");
    var principal = document.getElementById("main");

    if (parametroId !== null) {
        console.log("ID encontrado na URL:", parametroId);
    } else {
        console.log("Nenhum ID encontrado na URL.");
    }
    produto = data.Produto[parametroId];
    /*
    principal.innerHTML = `
    <div class="container p-4">
    <div class="row p-2">
      <div class="col-md-8">
        <div id="carousel" class="carousel slide">
          <div class="carousel-inner rounded">
            <div class="ratio ratio-16x9 carousel-item active">
              <iframe src="https://www.youtube.com/embed/sfHIYITAL60" title="YouTube video" allowfullscreen></iframe>
            </div>
            <div class="ratio ratio-16x9 carousel-item">
              <iframe src="https://www.youtube.com/embed/LavdQQduH8A" title="YouTube video" allowfullscreen></iframe>
            </div>
            <div class="ratio ratio-16x9 carousel-item">
              <iframe src="https://www.youtube.com/embed/Z6g5orxJ_Rk" title="YouTube video" allowfullscreen></iframe>
            </div>
            <div class="ratio ratio-16x9 carousel-item">
              <iframe src="https://www.youtube.com/embed/skQq-FoD7D8" title="YouTube video" allowfullscreen></iframe>
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
        <h2>${produto.Nome}</h2>
        <h1 style="color: green;">R$ ${produto.Preco}</h1>
        <button class="btn btn-success" type="submit">Adicionar ao carrinho
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check"
            viewBox="0 0 16 16">
            <path
              d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
            <path
              d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </button>
      </div>
    </div>

    <div class="row p-2 shadow-lg">
      <h3>DETALHES DO PRODUTO:</h3>
      <p>${produto.Detalhes}</p>
    </div>
  </div>`*/
}

window.onload = function(){
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