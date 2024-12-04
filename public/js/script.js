var swiper1 = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});
var swiper2 = new Swiper(".mySwiper-2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",    
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        520: {
            slidesPerView: 2
        },
        950: {
            slidesPerView: 3
        },
    },
});
//cart
const cart = document.getElementById('cart');
const elements1 = document.getElementById('list-1');
const elements2 = document.getElementById('list-2');
const list = document.querySelector('#cart-list tbody');
const cleanCartBtn = document.getElementById('clean-cart');
const buyCartBtn = document.getElementById('buy-cart');
loadEventListeners();
function loadEventListeners() {
    elements1.addEventListener('click', buyElement);
    elements2.addEventListener('click', buyElement);
    cart.addEventListener('click', removeElement);
    cleanCartBtn.addEventListener('click', cleanCart);
    buyCartBtn.addEventListener('click', buyCart);

}
function buyElement(e) {
    e.preventDefault();
    if(e.target.classList.contains('add-cart')) {
        const element = e.target.parentElement.parentElement;
        readElement(element);
    }
}
function readElement(element) {
    const infoElement = {
        image: element.querySelector('img').src,
        title: element.querySelector('h3').textContent,
        price: parseFloat(element.querySelector('.price, .price-2').textContent.replace('$', '').trim()), // Asegúrate de convertir a número
        id: element.querySelector('a').getAttribute('data-id')
    }
    insertCart(infoElement);
}

function insertCart(element) {
    // Verifica si el producto ya está en el carrito
    const existingRow = Array.from(list.rows).find(row => row.querySelector('a').getAttribute('data-id') === element.id);
    
    if (existingRow) {
        // Si ya existe, aumenta la cantidad
        const quantityCell = existingRow.querySelector('.quantity');
        quantityCell.textContent = parseInt(quantityCell.textContent) + 1; // Incrementa la cantidad
    } else {
        // Si no existe, lo agrega al carrito
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${element.image}" width=100>
            </td>
            <td>
                ${element.title}
            </td>
            <td>
                $<span class="price">${element.price.toFixed(2)}</span>
            </td>
            <td class="quantity">
                1
            </td>
            <td>
                <a href="#" class="delete" data-id="${element.id}">X</a>
            </td>
        `;
        list.appendChild(row);
    }
}

function removeElement(e) {
    e.preventDefault();
    let element, elementId;
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        element = e.target.parentElement.parentElement;
        elementId = element.querySelector('a').getAttribute('data-id');
    }
}
function cleanCart() {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    return false;
}
async function buyCart() {
    const items = Array.from(list.rows).map(row => ({
        productId: row.querySelector('a').getAttribute('data-id'),
        quantity: parseInt(row.querySelector('.quantity').textContent)
    }));

    try {
        const response = await fetch('/api/v1/orders/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        });

        if (!response.ok) {
            throw new Error('Error en la compra');
        }

        const result = await response.json();
        console.log(result);
        alert('Compra exitosa!');
        cleanCart(); // Limpia el carrito después de la compra
    } catch (error) {
        console.error('Error:', error);
        alert('Error al realizar la compra.');
    }
}
// Función para manejar el inicio de sesión
async function loginUser(email, password) {
    try {
        const response = await axios.post('/login', { email, password });
        console.log('Login successful:', response.data.msg);
        // Aquí puedes redirigir al usuario o almacenar el token
    } catch (error) {
        if (error.response) {
            alert(error.response.data.error || 'Something went wrong');
        } else if (error.request) {
            alert('No response from the server');
        } else {
            alert('Error: ' + error.message);
        }
    }
}
// Maneja el envío del formulario
document.querySelector('#loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email, password);
});
module.exports = {
    loadEventListeners,
    readElement,
    insertCart,
    removeElement,
    cleanCart,
    buyCart
};