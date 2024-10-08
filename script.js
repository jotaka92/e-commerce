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
loadEventListeners();
function loadEventListeners() {
    elements1.addEventListener('click', buyElement);
    elements2.addEventListener('click', buyElement);
    cart.addEventListener('click', removeElement);
    cleanCartBtn.addEventListener('click', cleanCart);
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
        price: element.querySelector('.price, .price-2').textContent,
        id: element.querySelector('a').getAttribute('data-id')
    }
    insertCart(infoElement);
}
function insertCart(element) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${element.image}" width=100>
        </td>
        <td>
            ${element.title}
        </td>
        <td>
            ${element.price}
        </td>
        <td>
            <a href="#" class="delete" data-id="${element.id}">X</a>
        </td>
    `;
    list.appendChild(row);
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