// DATA PRODUK DENGAN GAMBAR LOKAL
const items = [
    { 
        id: 1, 
        name: "Secret Tumbal", 
        price: "IDR 300", 
        stock: 27, 
        imageUrl: "./image/sctb.jpg" 
    },
    { 
        id: 2, 
        name: "Batu Evo", 
        price: "IDR 250", 
        stock: 612, 
        imageUrl: "./image/batuevo.jpg" 
    },
    { 
        id: 3, 
        name: "Koin 1M", 
        price: "IDR 1.000", 
        stock: 20, 
        imageUrl: "./image/koin.jpg" 
    },
    { 
        id: 4, 
        name: "Laba Laba Kuil", 
        price: "IDR 3.000", 
        stock: 13, 
        imageUrl: "./image/labalabakuil.jpg" 
    },
    { 
        id: 5, 
        name: "Ruby Gemstone/Permata", 
        price: "IDR 13.000", 
        stock: 0, 
        imageUrl: "./image/rubygemstone.jpg" 
    },
    { 
        id: 6, 
        name: "lochness Monster", 
        price: "IDR 8.000", 
        stock: 1, 
        imageUrl: "./image/lochness.jpg" 
    },
    { 
        id: 7, 
        name: "Cursed Kraken", 
        price: "IDR 11.000", 
        stock: 0, 
        imageUrl: "./image/cursedkraken.jpg" 
    },
    { 
        id: 8, 
        name: "King Jelly", 
        price: "IDR 1.500", 
        stock: 4, 
        imageUrl: "./image/kingjelly.jpg" 
    },
    { 
        id: 9, 
        name: "Crystal Crab", 
        price: "IDR 4.000", 
        stock: 0, 
        imageUrl: "./image/crystalcrab.jpg" 
    },
        { 
        id: 10, 
        name: "Mosasaurus", 
        price: "IDR 1.500", 
        stock: 2, 
        imageUrl: "./image/mosasaurus.jpg" 
    },
    { 
        id: 11, 
        name: "Robot Kraken", 
        price: "IDR 1.500", 
        stock: 3, 
        imageUrl: "./image/robotkraken.jpg" 
    },
    { 
        id: 12, 
        name: "Bone Whale", 
        price: "IDR 1.500", 
        stock: 3, 
        imageUrl: "./image/bonewhale.jpg" 
    },
    { 
        id: 13, 
        name: "Elshark Gran Maja", 
        price: "IDR 15.000", 
        stock: 11, 
        imageUrl: "./image/maja.jpg" 
    },
    { 
        id: 14, 
        name: "Megalodon", 
        price: "IDR 8.000", 
        stock: 0, 
        imageUrl: "./image/megalodon.jpg" 
    },
    { 
        id: 15, 
        name: "Worm Fish", 
        price: "IDR 7.000", 
        stock: 1, 
        imageUrl: "./image/wormfish.jpg" 
    },
    { 
        id: 16, 
        name: "Ancient Lochness Monster", 
        price: "IDR 12.000", 
        stock: 9, 
        imageUrl: "./image/lochnesskuno.jpg" 
    },
    { 
        id: 17, 
        name: "Elshark Gran Maja Pirate", 
        price: "IDR 5.000", 
        stock: 4, 
        imageUrl: "./image/majapirate.jpg" 
    }
];

// --- LOGIKA RENDER GRID & WA (TETAP SAMA SEPERTI SEBELUMNYA) ---
const grid = document.getElementById('itemGrid');
let selectedItem = null;

items.forEach((item, index) => {
    const card = document.createElement('div');
    const isReady = item.stock > 0;
    let stockClass = isReady ? (item.stock <= 3 ? 'low' : 'ready') : 'soldout';
    let stockLabel = isReady ? `Stock: ${item.stock}` : 'Out of Stock';

    card.className = `item-card fade-in`;
    card.style.animationDelay = `${index * 0.08}s`;
    
    // RENDER GAMBAR LOKAL
    card.innerHTML = `
        <div class="stock-status ${stockClass}">
            <div class="dot"></div>
            <span>${stockLabel}</span>
        </div>
        <div class="product-image-container">
            <img src="${item.imageUrl}" alt="${item.name}" class="product-image" loading="lazy">
        </div>
        <div class="product-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
        </div>
    `;

    if (isReady) {
        card.onclick = () => {
            document.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedItem = item;
        };
    } else {
        card.style.opacity = "0.4";
        card.style.filter = "grayscale(1)";
        card.style.cursor = "not-allowed";
    }
    grid.appendChild(card);
});

// --- LOGIKA PILIH PEMBAYARAN (TETAP SAMA SEPERTI SEBELUMNYA) ---
let selectedPayment = null;
const payOptions = document.querySelectorAll('.pay-option');
payOptions.forEach(option => {
    option.onclick = () => {
        payOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        selectedPayment = option.getAttribute('data-pay');
    };
});

// --- FUNGSI KIRIM WA (SUDAH RAPI, TIDAK GABUNG SETELAH GARIS) ---
document.getElementById('btnBayar').onclick = () => {
    const user = document.getElementById('robloxUser').value.trim();
    const phone = "6285199649646"; // No WA Admin

    if (!user || !selectedItem || !selectedPayment) {
        alert("Lengkapi data: Username, Item, & Pembayaran!");
        return;
    }

    const enter = "%0A";
    const line = "━━━━━━━━━━━━━━━━━━━━━";

    let pesan = "*HZNova FISH IT | NEW ORDER*" + enter;
    pesan += line + enter + enter; 
    pesan += "👤 *Username:* " + user + enter;
    pesan += "📦 *Product:* " + selectedItem.name + enter;
    pesan += "💰 *Price:* " + selectedItem.price + enter;
    pesan += "💳 *Method:* " + selectedPayment + enter + enter;
    pesan += line + enter;
    pesan += "_Halo Admin, saya ingin membayar via " + selectedPayment + ". Mohon instruksinya!_";

    const waLink = `https://api.whatsapp.com/send?phone=${phone}&text=${pesan}`;
    
    window.open(waLink, '_blank');
};