function verificarUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
  
    if (usuarioLogado) {
        console.log(localStorage.getItem('email'));
    } else {
        window.location.href = 'homepage.html';
    }
}

function Mostrar(data){
    var principal = document.getElementById('main');
    var user = verificarUsuario(data);

    if(!user || !user.Carrinho || user.Carrinho.length === 0){
        principal.innerHTML = `
        <div class="container pt-5">
            <div class="col-4 mx-auto">
                <div class="row text-center">
                    <b>
                        <h3>O seu carrinho está vazio.</h3>
                    </b>
                    <p>Deseja olhar outro produtos similares?</p>
                </div>
                <div class="row">
                    <a href="homepage.html" class="btn btn-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        <b>CONTINUAR COMPRANDO</b>
                    </a>
                </div>
            </div>
        </div>
        `;
    }else{
        let total = 0;
        let conteudo = "";
        conteudo += `
        <div class="container">`;

        for (const key in user.Carrinho) {
            if (user.Carrinho.hasOwnProperty(key)) {
                const item = user.Carrinho[key]; 
                conteudo += `
                    <div class="row border">
                        <div class="col-8">
                            <h4><b>${item.nome}</b></h4>
                        </div>
                        <div class="col-4">
                            <h4><b>${item.preco}</b></h4>
                        </div>
                    </div>`;
                total += item.preco; 
            }
        }

        conteudo += `
        <div class="row border">             
            <div class="col-8">
                <h3 class="text-start">Total a Pagar:</h3>
            </div>
            <div class="col-4">
                <h3 class="text-end text-success"><b>${total}</b></h3>
            </div>
        </div>
        </div>`;

        principal.innerHTML = conteudo;
    }
}

function verificarUsuario(data){
    const email = localStorage.getItem('email');
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].Email === email) {
            return data[key];
        }
    }
}

window.onload = function(){
    verificarUsuarioLogado();
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