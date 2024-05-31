function verificarUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        console.log(localStorage.getItem('email'));
        window.location.href = 'perfil.html';
    }
}

// Função para realizar o login
function fazerLogin(email, senha) {
    // Fazer a autenticação com o servidor
    fetch("https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Ocorreu um erro ao fazer a requisição. Status: " + response.status);
            }
            return response.json();
        })
        .then(usuarios => {
            // Verificar se existe um usuário com o email fornecido
            console.log(email);
            if (verificarCredenciais(email, senha, usuarios)) {
                // Autenticação bem-sucedida
                console.log('Login bem-sucedido para o usuário:', email);
                // Armazenar o estado de autenticação do usuário no localStorage
                localStorage.setItem('usuarioLogado', true);
                localStorage.setItem('email', email);
                // Redirecionar o usuário para a página principal
                if(document.referrer.endsWith("login.html")||document.referrer.endsWith("cadastro.html")){
                    window.location.href = 'homepage.html';
                }else{
                    window.history.back();
                }
            } else {
                // Credenciais inválidas
                console.error('Credenciais inválidas.');
                alert('Email ou senha incorretos. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            // Tratar erros de requisição
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Tente novamente mais tarde.');
        });
}

//verifica se o email e senha correspondem no banco de dados
function verificarCredenciais(email, senha, data) {
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].Email === email && data[key].Senha === senha) {
            console.log('Email: ' + email + '\nSenha: ' + senha);
            return true; // Email e senha correspondem
        }
    }
    return false; // Email e/ou senha não correspondem
}

// Event listener para o formulário de login
document.addEventListener('DOMContentLoaded', function() {
    var btnLogar = document.getElementById('btnLogar');
    
    btnLogar.addEventListener('click', function(event) {

        // Pega os valores dos campos de email e senha
        let email = document.getElementById('email').value;
        let senha = document.getElementById('senha').value;

        if(senha && email){
            fazerLogin(email, senha);
        }else{
            alert('Preencha todos os campos!');
        }
    });
});

window.onload = function() {
    verificarUsuarioLogado();
};

