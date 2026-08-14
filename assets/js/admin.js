document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const dashboardWrapper = document.getElementById('dashboardWrapper');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const authErrorMsg = document.getElementById('authErrorMsg');
    const logoutBtn = document.getElementById('logoutBtn');

    // MASTER CREDENTIALS
    const MASTER_EMAIL = "abilityofficial.2026@gmail.com";
    const MASTER_PASSCODE = "ability2026"; // Default passcode

    // Check existing session
    if (sessionStorage.getItem('abilityAdminAuthenticated') === 'true') {
        if (authModal) authModal.style.display = 'none';
        if (dashboardWrapper) dashboardWrapper.style.display = 'block';
    }

    // Login Form Handler
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('adminEmail').value.trim();
            const passInput = document.getElementById('adminPasscode').value.trim();

            if (emailInput.toLowerCase() === MASTER_EMAIL.toLowerCase() && passInput === MASTER_PASSCODE) {
                sessionStorage.setItem('abilityAdminAuthenticated', 'true');
                authModal.style.display = 'none';
                dashboardWrapper.style.display = 'block';
                authErrorMsg.style.display = 'none';
            } else {
                authErrorMsg.style.display = 'block';
            }
        });
    }

    // Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('abilityAdminAuthenticated');
            window.location.reload();
        });
    }

    // Tab Switching
    const sidebarItems = document.querySelectorAll('.admin-menu li');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(li => li.classList.remove('active'));
            tabContents.forEach(tab => tab.style.display = 'none');

            this.classList.add('active');
            const targetTab = document.getElementById(this.getAttribute('data-tab'));
            if (targetTab) {
                targetTab.style.display = 'block';
            }
        });
    });
});