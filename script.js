// Navbar Mobile Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if(btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

// Discord Webhook Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const btnSubmit = this.querySelector('button');

        // Ubah tombol jadi loading
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        btnSubmit.disabled = true;

        // GANTI URL INI DENGAN WEBHOOK DISCORD ASLI KAMU
        const webhookURL = "YOUR_DISCORD_WEBHOOK_URL_HERE";

        const payload = {
            embeds: [{
                title: "📩 Pesan Baru dari Portfolio!",
                color: 15684436, // Merah (Decimal color)
                fields: [
                    { name: "Nama", value: name, inline: true },
                    { name: "Email", value: email, inline: true },
                    { name: "Pesan", value: message }
                ],
                timestamp: new Date()
            }]
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if(response.ok) {
                alert("Pesan berhasil dikirim ke JopehDeveloper!");
                contactForm.reset();
            } else {
                alert("Gagal mengirim pesan. Coba lagi nanti.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Terjadi kesalahan.");
        })
        .finally(() => {
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        });
    });
}
