// Dados simulados
const simulatedOffers = [
    { id: 1, title: "Desconto 10% Padaria Local", description: "Use seus pontos para ganhar 10% de desconto.", points: 100 },
    { id: 2, title: "Café Grátis Cafeteria Central", description: "Troque 200 pontos por um café expresso.", points: 200 },
    { id: 3, title: "Vale-Compra R$20 Loja Sustentável", description: "500 pontos valem R$20 em compras.", points: 500 },
    { id: 4, title: "Ingresso Cinema", description: "Assista um filme com 300 pontos.", points: 300 }
];

const simulatedCoupons = [
    { id: 101, offerTitle: "Desconto 5% Supermercado", code: "RECICLA5OFF", expiry: "30/06/2025" },
    { id: 102, offerTitle: "Sorvete Grátis Sorveteria", code: "SORVETEHOJE", expiry: "15/05/2025" }
];

let currentScreen = 'login-screen';
let isLoggedIn = false;

// Função para mostrar uma tela específica
function showScreen(screenId) {
    // Esconde a tela atual
    document.getElementById(currentScreen).classList.remove('active');
    // Remove a classe 'active' de todos os botões de navegação
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));

    // Mostra a nova tela
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;

    // Adiciona a classe 'active' ao botão de navegação correspondente
    const activeButton = document.querySelector(`footer button[onclick="showScreen('${screenId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Carrega dados se necessário
    if (screenId === 'offers-screen') {
        loadOffers();
    } else if (screenId === 'coupons-screen') {
        loadCoupons();
    }
}

// Função de Login (simulada)
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    // Simulação simples de validação
    if (email === 'teste@reciclamais.com' && password === 'senha123') {
        isLoggedIn = true;
        errorElement.textContent = '';
        showScreen('dashboard-screen');
    } else {
        errorElement.textContent = 'Email ou senha inválidos (use teste@reciclamais.com / senha123)';
        isLoggedIn = false;
    }
}

// Função de Logout (simulada)
function logout() {
    isLoggedIn = false;
    // Limpa campos de login para segurança (opcional)
    // document.getElementById('email').value = '';
    // document.getElementById('password').value = '';
    showScreen('login-screen');
}

// Função para carregar ofertas simuladas
function loadOffers() {
    const offersList = document.getElementById('offers-list');
    offersList.innerHTML = ''; // Limpa a lista

    if (!isLoggedIn) return; // Não carrega se não estiver logado

    simulatedOffers.forEach(offer => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${offer.title}</h3>
            <p>${offer.description}</p>
            <p>Custo: <span class="points">${offer.points} pontos</span></p>
            <button onclick="alert('Funcionalidade de resgate não implementada nesta simulação.')">Resgatar</button>
        `;
        offersList.appendChild(card);
    });
}

// Função para carregar cupons simulados
function loadCoupons() {
    const couponsList = document.getElementById('coupons-list');
    couponsList.innerHTML = ''; // Limpa a lista

    if (!isLoggedIn) return; // Não carrega se não estiver logado

    if (simulatedCoupons.length === 0) {
        couponsList.innerHTML = '<p>Você ainda não possui cupons.</p>';
        return;
    }

    simulatedCoupons.forEach(coupon => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${coupon.offerTitle}</h3>
            <p>Código: <strong>${coupon.code}</strong></p>
            <p>Validade: ${coupon.expiry}</p>
        `;
        couponsList.appendChild(card);
    });
}

// Inicialização (opcional, pode ser útil para carregar dados iniciais se necessário)
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário deveria estar logado (ex: usando localStorage)
    // Neste exemplo simples, sempre começa na tela de login.
    showScreen('login-screen');
});
