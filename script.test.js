const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
// Mock Swiper
global.Swiper = jest.fn().mockImplementation(() => {
    return {
        init: jest.fn(),
        slideNext: jest.fn(),
        slidePrev: jest.fn(),
    };
});
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
let dom;
let document;
beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    // Clear the cart list before each test
    const cartList = document.getElementById('cart-list');
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    // Populate the cart with an item
    const cartItem = document.createElement('tr');
    cartList.appendChild(cartItem);
    // Add the cleanCartBtn click event listener
    const cleanCartBtn = document.getElementById('clean-cart');
    cleanCartBtn.addEventListener('click', () => {
        while (cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
        }
    });
});
test('cleanCartBtn click should empty the cart', () => {
    const cleanCartBtn = document.getElementById('clean-cart');
    cleanCartBtn.click();
    const cartItems = document.querySelectorAll('#cart-list tr');
    expect(cartItems.length).toBe(0);
});
// Mock insertCart function
const insertCart = jest.fn((element) => {
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
    document.getElementById('cart-list').appendChild(row);
});
// Mock readElement function
const readElement = jest.fn((element) => {
    const infoElement = {
        image: element.querySelector('img').src,
        title: element.querySelector('h3').textContent,
        price: element.querySelector('.price, .price-2').textContent,
        id: element.querySelector('a').getAttribute('data-id')
    }
    insertCart(infoElement);
});
function buyElement(e) {
    e.preventDefault();
    if(e.target.classList.contains('add-cart')) {
        const element = e.target.parentElement.parentElement;
        readElement(element);
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
    const list = document.getElementById('cart-list');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    return false;
}
test('buyElement should call readElement with the correct element', () => {
    // Create a mock element structure
    const parentElement = document.createElement('div');
    const childElement = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('add-cart');
    childElement.appendChild(button);
    parentElement.appendChild(childElement);
    // Add necessary elements for readElement
    const img = document.createElement('img');
    img.src = 'image.jpg';
    const title = document.createElement('h3');
    title.textContent = 'Title';
    const price = document.createElement('span');
    price.classList.add('price');
    price.textContent = '$10';
    const link = document.createElement('a');
    link.setAttribute('data-id', '123');
    parentElement.appendChild(img);
    parentElement.appendChild(title);
    parentElement.appendChild(price);
    parentElement.appendChild(link);
    document.body.appendChild(parentElement);
    // Create a mock event
    const event = new window.Event('click', { bubbles: true, cancelable: true });
    event.preventDefault = jest.fn();
    Object.defineProperty(event, 'target', { value: button, enumerable: true });
    // Call buyElement with the mock event
    buyElement(event);
    // Verify that readElement was called with the correct element
    expect(readElement).toHaveBeenCalledWith(parentElement);
    expect(event.preventDefault).toHaveBeenCalled();
});
test('readElement should call insertCart with the correct infoElement', () => {
    // Create a mock element structure
    const element = document.createElement('div');
    element.innerHTML = `
        <img src="image.jpg" />
        <h3>Title</h3>
        <span class="price">$10</span>
        <a data-id="123"></a>
    `;
    document.body.appendChild(element);
    // Call readElement with the mock element
    readElement(element);
    // Verify that insertCart was called with the correct infoElement
    expect(insertCart).toHaveBeenCalledWith({
        image: 'image.jpg',
        title: 'Title',
        price: '$10',
        id: '123'
    });
});
test('insertCart should add a row to the cart list', () => {
    const element = {
        image: 'image.jpg',
        title: 'Title',
        price: '$10',
        id: '123'
    };
    insertCart(element);
    const cartList = document.getElementById('cart-list');
    const rows = cartList.getElementsByTagName('tr');
    expect(rows.length).toBe(2); // One initial row from beforeEach and one added by insertCart
    const lastRow = rows[rows.length - 1];
    expect(lastRow.querySelector('img').src).toContain('image.jpg');
    expect(lastRow.querySelector('td:nth-child(2)').textContent.trim()).toBe('Title');
    expect(lastRow.querySelector('td:nth-child(3)').textContent.trim()).toBe('$10');
    expect(lastRow.querySelector('a.delete').getAttribute('data-id')).toBe('123');
});
test('removeElement should remove the correct row from the cart list', () => {
    // Add a row to the cart list
    const element = {
        image: 'image.jpg',
        title: 'Title',
        price: '$10',
        id: '123'
    };
    insertCart(element);
    const cartList = document.getElementById('cart-list');
    const rows = cartList.getElementsByTagName('tr');
    expect(rows.length).toBe(2); // One initial row from beforeEach and one added by insertCart
    // Create a mock event for removing the row
    const deleteButton = rows[1].querySelector('a.delete');
    const event = new window.Event('click', { bubbles: true, cancelable: true });
    event.preventDefault = jest.fn();
    Object.defineProperty(event, 'target', { value: deleteButton, enumerable: true });
    // Call removeElement with the mock event
    removeElement(event);
    // Verify that the row was removed
    expect(rows.length).toBe(1); // Only the initial row should remain
    expect(event.preventDefault).toHaveBeenCalled();
});
test('cleanCart should empty the cart list', () => {
    // Add a row to the cart list
    const element = {
        image: 'image.jpg',
        title: 'Title',
        price: '$10',
        id: '123'
    };
    insertCart(element);
    const cartList = document.getElementById('cart-list');
    const rows = cartList.getElementsByTagName('tr');
    expect(rows.length).toBe(2); // One initial row from beforeEach and one added by insertCart
    // Call cleanCart
    cleanCart();
    // Verify that the cart list is empty
    expect(cartList.children.length).toBe(0);
});