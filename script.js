// ==========================================
// 1. INJEKSI HTML OTOMATIS
// ==========================================
const uiElements = `
<div id="purchaseModal" class="modal-overlay">
    <div class="modal-content">
        <button class="close-btn" onclick="closeModal()">×</button>
        <div class="modal-product-info">
            <img id="modalImg" src="" alt="Product">
            <div class="modal-text">
                <h3 id="modalName">Nama Produk</h3>
                <p id="modalPrice">Rp 0</p>
            </div>
        </div>
        <div class="quantity-section">
            <label>Pilih Jumlah:</label>
            <div class="qty-control-modal">
                <button onclick="updateModalQty(-1)">-</button>
                <span id="qtyInputModal">1</span>
                <button onclick="updateModalQty(1)">+</button>
            </div>
        </div>
        <div class="total-section-modal">
            <span>Subtotal:</span>
            <span id="modalTotal" class="total-price-modal">Rp 0</span>
        </div>
        <button class="add-to-cart-btn" onclick="confirmAddToCart()">
            Masukkan Keranjang
        </button>
    </div>
</div>

<div id="staticCheckoutBox" class="static-checkout-box">
    <div id="cartItemsContainer" class="cart-items-container">
        <div class="empty-cart-msg" id="emptyCartMsg">
            Belum ada item terpilih
        </div>
    </div>

    <div class="compact-payment" id="paymentArea" style="display: none;">
        <span class="pay-title">Pilih Pembayaran:</span>
        <div class="pay-scroll-area">
            <button class="pay-btn" data-pay="QRIS">QRIS</button>
            <button class="pay-btn" data-pay="BRI">BRI</button>
            <button class="pay-btn" data-pay="DANA">DANA</button>
            <button class="pay-btn" data-pay="SeaBank">SeaBank</button>
            <button class="pay-btn" data-pay="ShopeePay">ShopeePay</button>
            <button class="pay-btn" data-pay="GoPay">GoPay</button>
        </div>
    </div>

    <div class="scb-total">
        <span class="scb-label">Total Pembayaran:</span>
        <span id="scbTotalHarga" class="scb-price">Rp 0</span>
    </div>
    <button id="scbBtnCheckout" class="scb-btn disabled" onclick="processFinalCheckout()">
        <i class="fab fa-whatsapp"></i> Checkout via WA
    </button>
</div>
`;

// Pasang pop-up ke dalam body HTML
if (!document.getElementById('purchaseModal')) {
    document.body.insertAdjacentHTML('beforeend', uiElements);
}

// ==========================================
// 2. DATA PRODUK & KERANJANG
// ==========================================
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

let cart = {};
let tempItem = {};
let modalQty = 1;

// Render Grid Produk
const grid = document.getElementById('itemGrid');

items.forEach((item, index) => {
    const card = document.createElement('div');
    const isReady = item.stock > 0;
    
    let stockClass = isReady ? (item.stock <= 3 ? 'low' : 'ready') : 'soldout';
    let stockLabel = isReady ? `Stock: ${item.stock}` : 'Out of Stock';

    card.id = `card-${item.id}`;
    card.className = `item-card fade-in`;
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
        <div class="cart-qty-badge" id="badge-${item.id}" style="display: none;"></div>
        <div class="stock-status ${stockClass}">
            <span>${stockLabel}</span>
        </div>
        <div class="product-image-container">
            <img src="${item.imageUrl}" class="product-image" alt="${item.name}">
        </div>
        <div class="product-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
        </div>
    `;

    if (isReady) {
        card.onclick = () => {
            openModal(item.id, item.name, item.price, item.imageUrl);
        };
    } else {
        card.style.opacity = "0.4";
        card.style.filter = "grayscale(1)";
        card.style.cursor = "not-allowed";
    }

    grid.appendChild(card);
});

// ==========================================
// 3. LOGIKA POP-UP MODAL & KERANJANG
// ==========================================
function openModal(id, name, price, imageSrc) {
    let numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
    
    tempItem = {
        id: id,
        name: name,
        numericPrice: numericPrice,
        image: imageSrc
    };

    modalQty = cart[id] ? cart[id].qty : 1;

    document.getElementById('modalName').innerText = name;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalImg').src = imageSrc;
    document.getElementById('qtyInputModal').innerText = modalQty;

    updateModalDisplay();
    document.getElementById('purchaseModal').classList.add('active');
}

function closeModal() {
    document.getElementById('purchaseModal').classList.remove('active');
}

function updateModalQty(change) {
    modalQty += change;
    
    if (modalQty < 1) {
        modalQty = 1;
    }
    
    document.getElementById('qtyInputModal').innerText = modalQty;
    updateModalDisplay();
}

function updateModalDisplay() {
    let subtotal = tempItem.numericPrice * modalQty;
    document.getElementById('modalTotal').innerText = "Rp " + subtotal.toLocaleString('id-ID');
}

function confirmAddToCart() {
    cart[tempItem.id] = {
        id: tempItem.id,
        name: tempItem.name,
        price: tempItem.numericPrice,
        image: tempItem.image,
        qty: modalQty
    };
    
    renderCart();
    closeModal();
}

function renderCart() {
    let container = document.getElementById('cartItemsContainer');
    let totalHarga = 0;
    
    container.innerHTML = '';

    // Bersihkan semua badge merah di awal
    document.querySelectorAll('.item-card').forEach(c => {
        c.classList.remove('in-cart');
    });
    
    document.querySelectorAll('.cart-qty-badge').forEach(b => {
        b.style.display = 'none';
    });

    let keys = Object.keys(cart);

    // Jika Keranjang Kosong
    if (keys.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Belum ada item terpilih</div>';
        
        document.getElementById('paymentArea').style.display = 'none';
        document.getElementById('staticCheckoutBox').classList.remove('active');
        document.getElementById('scbBtnCheckout').classList.add('disabled');
        document.getElementById('scbTotalHarga').innerText = "Rp 0";
        
        return;
    }

    // Jika Keranjang Ada Isinya
    document.getElementById('paymentArea').style.display = 'block';

    keys.forEach(key => {
        let item = cart[key];
        let subTotal = item.price * item.qty;
        totalHarga += subTotal;

        // Nyalakan badge merah di produk grid
        let card = document.getElementById(`card-${item.id}`);
        let badge = document.getElementById(`badge-${item.id}`);
        
        if (card && badge) {
            card.classList.add('in-cart');
            badge.innerText = item.qty + "x";
            badge.style.display = 'block';
        }

        // Cetak daftar barang ke dalam kotak checkout
        let row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div class="cir-left">
                <img src="${item.image}" alt="">
                <span class="cir-name">${item.name}</span>
            </div>
            <div class="cir-right">
                <div class="qty-control-mini">
                    <button onclick="changeCartQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeCartQty(${item.id}, 1)">+</button>
                </div>
                <span class="cir-price">Rp ${subTotal.toLocaleString('id-ID')}</span>
            </div>
        `;
        
        container.appendChild(row);
    });

    document.getElementById('scbTotalHarga').innerText = "Rp " + totalHarga.toLocaleString('id-ID');
    document.getElementById('staticCheckoutBox').classList.add('active');
    document.getElementById('scbBtnCheckout').classList.remove('disabled');
}

function changeCartQty(id, change) {
    if (!cart[id]) return;
    
    cart[id].qty += change;
    
    if (cart[id].qty <= 0) {
        delete cart[id];
    }
    
    renderCart();
}

// ==========================================
// 4. CHECKOUT WA & PEMBAYARAN (UNIVERSAL & AMAN DARI ERROR)
// ==========================================
let selectedPayment = null;

// Event Listener untuk Tombol Pembayaran
document.querySelectorAll('.pay-btn').forEach(opt => {
    opt.onclick = () => {
        document.querySelectorAll('.pay-btn').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        selectedPayment = opt.getAttribute('data-pay');
    };
});

function processFinalCheckout() {
    let keys = Object.keys(cart);

    if (keys.length === 0) {
        alert("Silakan klik produk yang ingin dibeli terlebih dahulu!");
        return;
    }

    const user = document.getElementById('robloxUser').value.trim();
    const phone = "6285199649646";

    if (!user) {
        alert("Jangan lupa isi Roblox Username kamu!");
        document.getElementById('robloxUser').focus();
        return;
    }

    if (!selectedPayment) {
        alert("Silakan pilih Metode Pembayaran terlebih dahulu!");
        return;
    }

    let totalHargaGabungan = 0;
    let daftarBarangText = "";

    // MENGGUNAKAN TANDA PANAH STANDARD (->) AGAR 100% TERBACA DI SEMUA HP
    keys.forEach(key => {
        let item = cart[key];
        let subTotal = item.price * item.qty;
        totalHargaGabungan += subTotal;
        
        daftarBarangText += `  -> ${item.name} (${item.qty}x) : Rp ${subTotal.toLocaleString('id-ID')}\n`;
    });

    // MENGGUNAKAN EMOJI DASAR DAN GARIS STANDARD (=) AGAR TIDAK ERROR
    let pesanRapi = 
        `*HZNova FISH IT MARKET | ORDER*\n\n` +
        `*✦ INVOICE PEMESANAN ✦*\n` +
        `──────────────────────\n` +
        `👤 *Username:* ${user}\n` +
        `💳 *Pembayaran:* ${selectedPayment}\n\n` +
        `📦 *Daftar Pesanan:*\n` +
        `${daftarBarangText}\n` +
        `──────────────────────\n` +
        `📃 *TOTAL TAGIHAN:* *Rp ${totalHargaGabungan.toLocaleString('id-ID')}*\n\n` +
        `_Mohon di tunggu sampai adminnya balas✨_`;

    // Encode URL agar enter dan teks aman saat dikirim
    let pesanWA = encodeURIComponent(pesanRapi);

    // Membuka tab baru menuju WhatsApp
    window.open(`https://wa.me/${phone}?text=${pesanWA}`, '_blank');
}