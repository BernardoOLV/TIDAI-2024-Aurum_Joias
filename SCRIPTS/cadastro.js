// Função para enviar os dados para a API
function EnviarDados(payload) {
  
    fetch('https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                console.log('POST bem-sucedido!');
                console.log('Resposta da API:', response);
                alert('Cadastro Bem sucedido');
            } else {
                console.error('Erro:', response.status);
                alert("Erro ao cadastrar, tente novamente!");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao cadastrar, tente novamente! " + error);
        });
}

//função para enviar formulário de cadastro com verificação se tudo pedido foi enviado
document.addEventListener('DOMContentLoaded', function() {
    var btnCadastrar = document.getElementById('btnCadastrar');
    btnCadastrar.addEventListener('click', function(event) {
        
        // Pega os valores
        var nome = document.getElementById('nome').value;
        var celular = document.getElementById('celular').value;
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;
        var endereco = document.getElementById('endereco').value;
        var termos = document.getElementById('termos');
        
        // Constroi o payload em formato JSON
        var payload = {
            'Carrinho':{
                'ID':null
            },
            'Celular': celular,
            'Email':email,
            'Endereco':endereco,
            'Nome':nome,
            'Senha':senha
        };
        console.log(payload);

        if(nome.length>=2 && senha.length >= 5 && celular.length >= 10 && endereco >= 10 && email.length >= 3 && termos.checked){
            Verificar(payload);
        }
    });
});

//não deixa cadastrar se o email utilizado for um já cadastrado
function Verificar(payload) {
    fetch("https://aurum-joias-default-rtdb.firebaseio.com/Usuarios/.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Ocorreu um erro ao fazer a requisição.");
            }
            return response.json();
        })
        .then(data => {
            // Verifica se o email já existe no banco de dados
            if (emailExiste(payload.Email, data)) {
                Alert("O email já está em uso. Por favor, escolha outro.");
            } else {
                // Se o email não existe, envia os dados
                EnviarDados(payload);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

// Função para verificar se um email já existe no banco de dados
function emailExiste(email, data) {
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].Email === email) {
            return true; // O email já existe
        }
    }
    return false; // O email não existe
}

