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
        window.location.href = 'login.html';
    }

    
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'login.html';
        });
    }
});