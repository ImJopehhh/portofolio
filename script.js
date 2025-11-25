document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Logic ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            // Toggle icon between bars and times (X)
            const icon = btn.querySelector('i');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // --- Discord Webhook Logic ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const submitBtn = contactForm.querySelector('button');

            // Ubah status tombol saat loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // GANTI URL INI DENGAN WEBHOOK DISCORD KAMU
            const WEBHOOK_URL = "GANTI_DENGAN_URL_WEBHOOK_DISCORD_KAMU_DISINI"; 
            
            // Validasi sederhana jika user lupa ganti URL
            if(WEBHOOK_URL.includes("GANTI_DENGAN")) {
                alert("Developer Error: Webhook URL belum disetting di script.js!");
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            const payload = {
                username: "Portfolio Contact Form",
                avatar_url: "https://i.imgur.com/4M34hi2.png",
                embeds: [
                    {
                        title: "New Contact Message!",
                        color: 15684436, // Warna Merah Decimal
                        fields: [
                            { name: "Name", value: name, inline: true },
                            { name: "Email", value: email, inline: true },
                            { name: "Message", value: message }
                        ],
                        timestamp: new Date()
                    }
                ]
            };

            try {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert("Pesan berhasil dikirim! Terima kasih.");
                    contactForm.reset();
                } else {
                    alert("Gagal mengirim pesan. Coba lagi nanti.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Terjadi kesalahan koneksi.");
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
