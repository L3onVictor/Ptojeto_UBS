document.addEventListener('DOMContentLoaded', () => {
    const userProfileDiv = document.getElementById('userProfile');
    const userName = localStorage.getItem('userName');
    const userProfilePicture = localStorage.getItem('userProfilePicture');
    const userToken = localStorage.getItem('userToken');

    if (userName && userProfilePicture && userToken) {
        userProfileDiv.innerHTML = `
            <img src="${userProfilePicture}" alt="Foto de perfil" class="rounded-circle me-2" width="40" height="40">
            <span class="me-3">${userName}</span>
            <a href="#" class="btn btn-outline-danger" id="logoutButton">Sair</a>
        `;
    } else {
        // Se o usuário não estiver logado, redireciona para a página de login
        window.location.href = 'login.html';
    }

    // Adiciona o evento de logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear(); // Limpa todos os dados do localStorage
            window.location.href = 'login.html'; // Redireciona para o login
        });
    }
});