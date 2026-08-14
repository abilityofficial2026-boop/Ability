/* ====================================================
   ABILITY Master Control Hub Logic
   Multi-Admin Authentication & Dynamic Content Controller
==================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. INITIAL ADMIN ACCOUNTS REGISTRY
    const DEFAULT_ADMINS = [
        { name: "Super Administrator", email: "abilityofficial.2026@gmail.com", pass: "ability2026", role: "Master Controller" },
        { name: "Nobel Mahfuz", email: "nobel@abilitybd.com", pass: "nobel2026", role: "Founder & Lead" },
        { name: "Hossain Rahul", email: "rahul@abilitybd.com", pass: "rahul2026", role: "Co-Founder (Media)" },
        { name: "Abdur Rakib", email: "rakib@abilitybd.com", pass: "rakib2026", role: "Co-Founder (Operations)" },
        { name: "Mohammad Badol Rana", email: "badol@abilitybd.com", pass: "badol2026", role: "Co-Founder (Youth Dev)" }
    ];

    // Load or initialize admin accounts
    let adminAccounts = JSON.parse(localStorage.getItem('ability_admin_accounts')) || DEFAULT_ADMINS;
    localStorage.setItem('ability_admin_accounts', JSON.stringify(adminAccounts));

    // Elements
    const authModal = document.getElementById('authModal');
    const dashboardWrapper = document.getElementById('dashboardWrapper');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const authErrorMsg = document.getElementById('authErrorMsg');
    const logoutBtn = document.getElementById('logoutBtn');
    const loggedInEmail = document.getElementById('loggedInEmail');
    const userRoleBadge = document.getElementById('userRoleBadge');

    // Check active session
    const currentSession = JSON.parse(sessionStorage.getItem('ability_current_admin'));
    if (currentSession) {
        unlockDashboard(currentSession);
    }

    // 2. AUTHENTICATION HANDLER
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('adminEmail').value.trim().toLowerCase();
            const passInput = document.getElementById('adminPasscode').value.trim();

            const foundAdmin = adminAccounts.find(acc => acc.email.toLowerCase() === emailInput && acc.pass === passInput);

            if (foundAdmin) {
                sessionStorage.setItem('ability_current_admin', JSON.stringify(foundAdmin));
                unlockDashboard(foundAdmin);
                authErrorMsg.style.display = 'none';
            } else {
                authErrorMsg.style.display = 'block';
            }
        });
    }

    function unlockDashboard(admin) {
        if (authModal) authModal.style.display = 'none';
        if (dashboardWrapper) dashboardWrapper.style.display = 'block';
        if (loggedInEmail) loggedInEmail.textContent = admin.email;
        if (userRoleBadge) userRoleBadge.textContent = admin.role;
        renderAdminList();
    }

    // 3. LOGOUT HANDLER
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('ability_current_admin');
            window.location.reload();
        });
    }

    // 4. TAB NAVIGATION
    const sidebarItems = document.querySelectorAll('.admin-menu li');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(li => li.classList.remove('active'));
            tabContents.forEach(tab => tab.style.display = 'none');

            this.classList.add('active');
            const target = document.getElementById(this.getAttribute('data-tab'));
            if (target) target.style.display = 'block';
        });
    });

    // 5. ADD NEW ADMIN ACCOUNT
    const addNewAdminForm = document.getElementById('addNewAdminForm');
    if (addNewAdminForm) {
        addNewAdminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('newAdminName').value.trim();
            const email = document.getElementById('newAdminEmail').value.trim().toLowerCase();
            const pass = document.getElementById('newAdminPass').value.trim();
            const role = document.getElementById('newAdminRole').value;

            // Check if email exists
            if (adminAccounts.some(acc => acc.email.toLowerCase() === email)) {
                alert('An admin with this email address already exists!');
                return;
            }

            adminAccounts.push({ name, email, pass, role });
            localStorage.setItem('ability_admin_accounts', JSON.stringify(adminAccounts));
            renderAdminList();
            addNewAdminForm.reset();
            alert(`Admin account created successfully for ${name}!`);
        });
    }

    function renderAdminList() {
        const tableBody = document.getElementById('adminAccountsTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        adminAccounts.forEach((admin, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${admin.name}</strong></td>
                <td><code>${admin.email}</code></td>
                <td>${admin.role}</td>
                <td><span class="status-tag confirmed">Active Access</span></td>
                <td>
                    ${index === 0 ? '<em class="text-muted">Root Admin</em>' : `<button class="btn btn-outline btn-small" onclick="removeAdmin(${index})">Revoke</button>`}
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.removeAdmin = function(index) {
        if (confirm(`Revoke access for ${adminAccounts[index].name}?`)) {
            adminAccounts.splice(index, 1);
            localStorage.setItem('ability_admin_accounts', JSON.stringify(adminAccounts));
            renderAdminList();
        }
    };

    // 6. CUSTOM BROADCAST EVENT CONTROLLER
    const customEventForm = document.getElementById('customEventForm');
    if (customEventForm) {
        customEventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const eventConfig = {
                badgeText: document.getElementById('cfgBadgeText').value,
                title: document.getElementById('cfgEventTitle').value,
                date: document.getElementById('cfgEventDate').value,
                venue: document.getElementById('cfgEventVenue').value,
                notice: document.getElementById('cfgSpecialNotice').value
            };

            localStorage.setItem('ability_event_config', JSON.stringify(eventConfig));
            alert('Custom event notice successfully broadcasted to website!');
        });
    }
});