function verificarUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
        console.log(localStorage.getItem('email'));
    } else {
        alert("Precisa estar logado. Você será redirecionado para tela de login.")
        window.location.href = 'login.html';
    }
}

function Mostrar(data) {
    var principal = document.getElementById('main');
    var user = verificarUsuario(data);

    if (!user || !user.Carrinho || user.Carrinho.length === 0) {
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
    } else {
        let total = 0;
        let conteudo = "";
        conteudo += `
        <div class="container p-3">`;

        for (const key in user.Carrinho) {
            if (user.Carrinho.hasOwnProperty(key)) {
                const item = user.Carrinho[key];
                conteudo += `
                    <div class="row border">
                        <div class="col-8 p-2">
                            <h4><b>${item.Nome}</b></h4>
                        </div>
                        <div class="col-3 p-2">
                            <h4><b class="text-warning text-end">R$ ${item.Preco}</b></h4>
                        </div>
                        <div class="col-1 p-2">
                            <buttom class="btn btn-danger" type="buttom" onclick="removerCarrinho('${item.Nome}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                </svg>
                            </buttom>
                        </div>
                    </div>`;
                total += item.Preco;
            }
        }

        conteudo += `
        <div class="row border mt-2">             
            <div class="col-10 p-2">
                <h3 class="text-start">Total a Pagar: <b class="text-success">R$ ${total}</b></h3>
            </div>
            <div class="col-2 d-flex justify-content-end p-2">
                <buttom class="btn btn-success" onclick="Pagar()">
                    <b>Pagar </b>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                    </svg>
                </buttom>
            </div>
        </div>
        </div>`;

        principal.innerHTML = conteudo;
    }
}

//remove do carrinho
function removerCarrinho(itemNome) {
    fetch('https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do Firebase.');
            }
            return response.json();
        })
        .then(data => {
            const email = localStorage.getItem('email');
            const userID = Object.keys(data).find(key => data[key].Email === email);

            if (!userID) {
                console.error('Usuário não encontrado com o email:', email);
                return;
            }

            const carrinho = data[userID]?.Carrinho || {};
            const itemID = Object.keys(carrinho).find(key => carrinho[key].Nome === itemNome);

            if (!itemID) {
                console.error('Item não encontrado no carrinho do usuário com o email:', email);
                return;
            }

            // Construir a URL do endpoint corretamente
            const url = `https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/${userID}/Carrinho/${itemID}.json`;

            // Enviar solicitação DELETE para excluir o item do carrinho
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao excluir o item do Firebase.');
                    }
                    console.log('Item excluído com sucesso do Firebase.');
                    location.reload();
                })
                .catch(error => {
                    console.error('Erro ao excluir o item do Firebase:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao obter dados do Firebase:', error);
        });
}

function Pagar() {
    fetch('https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do Firebase.');
            }
            return response.json();
        })
        .then(data => {
            const email = localStorage.getItem('email');
            const userID = Object.keys(data).find(key => data[key].Email === email);

            if (!userID) {
                console.error('Usuário não encontrado com o email:', email);
                return;
            }

            // Construir a URL do endpoint do carrinho do usuário
            const url = `https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/${userID}/Carrinho/.json`;

            // Enviar solicitação DELETE para limpar o carrinho do usuário
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao limpar o carrinho do Firebase.');
                    }
                    console.log('Carrinho limpo com sucesso.');
                    // Atualiza a página após a limpeza bem-sucedida
                    location.reload();
                })
                .catch(error => {
                    console.error('Erro ao limpar o carrinho do Firebase:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao obter dados do Firebase:', error);
        });

}

function verificarUsuario(data) {
    const email = localStorage.getItem('email');
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].Email === email) {
            return data[key];
        }
    }
}

window.onload = function () {
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