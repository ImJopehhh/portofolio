document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL ANIMATION OBSERVER ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up', 'opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    // Cari semua elemen yang punya class 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(el);
    });

    // --- 2. DYNAMIC PORTFOLIO LOADER (JSON) ---
    const projectContainer = document.getElementById('project-grid');
    if (projectContainer) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                projectContainer.innerHTML = ''; // Bersihkan loading state
                
                projects.forEach(project => {
                    // Cek Label Color (Biar variatif)
                    let labelColor = 'bg-gray-600';
                    if(project.label.includes('Unggulan')) labelColor = 'bg-brand text-white';
                    else if(project.label.includes('Stable')) labelColor = 'bg-blue-600 text-white';

                    // Generate HTML Card
                    const cardHTML = `
                    <div class="reveal bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-brand hover:shadow-neon relative group hover:-translate-y-2 transition-all duration-300">
                        <div class="absolute top-3 left-3 ${labelColor} text-xs font-bold px-2 py-1 rounded z-10 shadow-md">
                            ${project.is_pinned ? '<i class="fas fa-star text-yellow-300 mr-1"></i>' : ''} ${project.label}
                        </div>
                        
                        <div class="h-48 overflow-hidden">
                            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition duration-500">
                        </div>
                        
                        <div class="p-6">
                            <h3 class="font-heading text-xl font-bold text-white mb-2">${project.title}</h3>
                            <p class="text-gray-400 text-sm mb-4 line-clamp-3">${project.description}</p>
                            
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${project.tags.map(tag => `<span class="px-2 py-1 bg-gray-900 text-[10px] rounded text-gray-300 border border-gray-700">${tag}</span>`).join('')}
                            </div>
                            
                            <div class="flex gap-3">
                                <a href="${project.link_published}" class="flex-1 text-center py-2 bg-brand text-white text-sm font-bold rounded hover:bg-red-700 hover:shadow-neon transition">Visit</a>
                                <a href="${project.link_code}" class="flex-1 text-center py-2 bg-gray-700 text-white text-sm font-bold rounded hover:bg-gray-600 transition">Code</a>
                            </div>
                        </div>
                    </div>
                    `;
                    projectContainer.innerHTML += cardHTML;
                });

                // Re-observe elemen baru yang baru di-render
                const newCards = projectContainer.querySelectorAll('.reveal');
                newCards.forEach(el => {
                    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
                    observer.observe(el);
                });
            })
            .catch(err => {
                projectContainer.innerHTML = '<p class="text-red-500 text-center col-span-3">Gagal memuat project. Pastikan file projects.json ada.</p>';
                console.error(err);
            });
    }    
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
