document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const cpf = document.getElementById('cpfInput').value;
    const senha = document.getElementById('passwordInput').value;

    const data = {
        cpf: cpf,
        password: senha
    };

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // AQUI ESTÁ A CORREÇÃO:
            // JSON (com J maiúsculo) é um objeto global e não precisa ser importado.
            localStorage.setItem('usuarioLogado', JSON.stringify(result));

            alert('Login efetuado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Erro no login: ' + result.error);
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro ao conectar com a API.');
    }
});