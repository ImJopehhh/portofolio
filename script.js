document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOGIC LOADING PAGE (1x per hari) ---
    const loader = document.getElementById('loader');
    if(loader) { // Cek jika elemen loader ada di page (hanya di index)
        const lastVisited = localStorage.getItem('lastVisited');
        const today = new Date().toDateString(); // Format: "Tue Nov 25 2025"

        if (lastVisited !== today) {
            // Belum berkunjung hari ini -> Tampilkan Loading
            setTimeout(() => {
                loader.classList.add('loader-hidden');
                // Hapus elemen dari DOM setelah transisi css selesai agar tidak menutupi tombol
                setTimeout(() => { loader.style.display = 'none'; }, 500);
            }, 2000); // Loading 2 detik
            
            localStorage.setItem('lastVisited', today);
        } else {
            // Sudah berkunjung hari ini -> Sembunyikan langsung
            loader.style.display = 'none';
        }
    }

    // --- 2. DISCORD WEBHOOK LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const btn = contactForm.querySelector('button');

            // Ganti URL ini dengan Webhook URL Discord asli Anda
            const webhookURL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN";

            // Validasi sederhana
            if(!name || !email || !message) return alert("Mohon isi semua kolom.");

            // Ubah tombol jadi loading
            const originalBtnText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const payload = {
                username: "Portfolio Contact Form",
                avatar_url: "https://via.placeholder.com/50/EF4444/FFFFFF?text=JP",
                embeds: [
                    {
                        title: "📩 New Message Received!",
                        color: 15684420, // Warna Merah Decimal
                        fields: [
                            { name: "From", value: name, inline: true },
                            { name: "Email", value: email, inline: true },
                            { name: "Message", value: message }
                        ],
                        footer: { text: "Sent from JopehDeveloper Website" },
                        timestamp: new Date()
                    }
                ]
            };

            fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    alert("Pesan berhasil dikirim!");
                    contactForm.reset();
                } else {
                    alert("Gagal mengirim pesan. Coba lagi nanti.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Terjadi kesalahan sistem.");
            })
            .finally(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
            });
        });
    }
});

// --- 3. MOBILE MENU TOGGLE ---
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}
