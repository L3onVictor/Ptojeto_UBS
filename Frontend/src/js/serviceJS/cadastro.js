document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nomeInput').value;
    const email = document.getElementById('emailInput').value;
    const cpf = document.getElementById('cpfInput').value;
    const senha = document.getElementById('senhaInput').value;

    const data = {
        name: nome,
        email: email,
        cpf: cpf,
        password: senha
    };

    try {
    const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        // Redireciona para a página de login
        window.location.href = 'login.html'; 
    } else {
        alert('Erro no cadastro: ' + result.error);
    }
} catch (error) {
    console.error('Erro de conexão:', error);
    alert('Erro ao conectar com a API. Verifique se o API Gateway está rodando.');
}});