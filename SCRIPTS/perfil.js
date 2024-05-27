function verificarUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
        console.log(localStorage.getItem('email'));
    } else {
        alert("Precisa estar logado. Você será redirecionado para tela de login.")
        window.location.href = 'login.html';
    }
}

function Mostrar(data){
    var principal = document.getElementById("main");
    var email = localStorage.getItem('email');

    verificarUsuarioLogado();

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let element = data[key];
            if (element.Email === email) {
                principal.innerHTML = `
                <div class="container p-4 shadow-lg">
                    <div class="row p-2 bg-success text-light">
                        <h2>${element.Nome}</h2>
                    </div> 
                    <div class="row p-2">
                        <div class="col-md-4">
                            <h5>Email:</h5>
                            <p>${element.Email}</p>
                        </div>
                        <div class="col-md-4">
                            <h5>Celular:</h5>
                            <p>${element.Celular}</p>
                        </div>
                        <div class="col-md-4">
                            <h5>Endereço:</h5>
                            <p>${element.Endereco}</p>
                        </div>
                    </div>
                    <div class="row p-2">
                        <div class="col">
                            <button id="btnLogout" class="btn btn-danger" onclick="fazerLogout()">Sair do Perfil</button>
                        </div>
                    </div>
                </div>`;

                console.log("Perfil carregado com sucesso");
                break; // Para o loop após encontrar o elemento correspondente
            }
        }
    }
    
}

function fazerLogout() {
    // Remover o estado de autenticação do localStorage
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('email');
    console.log("Perfil deslogado...");
    window.location.href = 'homepage.html'; // Redirecionar para a página inicial após o logout
}

window.onload = function () {
    fetch("https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/.json")
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
