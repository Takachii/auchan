import { getProductFromID } from "./main.js";
import { getStoredCart, setStoredCart } from "./storage.js";

const cartProducts = getStoredCart() || [];

const div_navbar_carte = document.getElementById("div-store-carte");
if (div_navbar_carte) {

    div_navbar_carte.addEventListener("click", () => {
    
        const element_asied_carte = document.getElementById("aside-store-carte");
        if (element_asied_carte) {
            element_asied_carte.classList.toggle("hidden");
        }
    
    });

}

function requestRenderCartItem(data, count = 1) {
    return `
        <li class="li-cart-items">
            <div class="flex justify-between items-center p-4">

                <div class="flex items-center">

                    <img src="${ data.imgUrl ? data.imgUrl : `assets/images/item_${data.id}.jpg`}" alt="item image" class="h-16 w-16 bg-gray-200" />

                    <div class="ml-2">
                        <h3 class="text-sm font-medium text-gray-900 text-wrap">${data.title}</h3>
                        <p data-cartcountprice="${data.id}" class="text-sm text-gray-500">X${count} | ${(data.price * count).toFixed(2)} DH</p>
                    </div>

                </div>

                <div>
                    <button id="${data.id}" class="text-gray-400 hover:text-gray-500 cursor-pointer">
                        &#x2715;
                    </button>
                </div>

            </div>
        </li>
    `
}

export function updateCartNavbarTotal() {
    const total = cartProducts.reduce((sum, item) => {
        const prod = getProductFromID(item.productID);
        return sum + (prod ? Number(prod.price) * item.count : 0);
    }, 0);

    const spans = document.querySelectorAll("#div-store-carte span, header span.font-bold");
    spans.forEach(element => {
        element.textContent = `${total.toFixed(2)} DH`;
    });
}

export function initRenderCart() {
    const list_cart_items = document.getElementById("list-cart-items");
    if (!list_cart_items) return;

    cartProducts.forEach(item => {
        const prod = getProductFromID(item.productID);
        if (prod) {
            list_cart_items.innerHTML += requestRenderCartItem(prod, item.count);
        }
    });

    updateCartNavbarTotal();
}

export function getCartProducts() {
    return cartProducts || [];
}

export function getCartProductFromID(productID) {
    for (const value of cartProducts)
        if (value.productID == productID) return value;
}

export function addProductToCart(data) {
    if (!data) return false;
    
    const list_cart_items = document.getElementById("list-cart-items");
    if (!list_cart_items) return false;

    const productCartObject = getCartProductFromID(data.id);
    if (productCartObject) {

        productCartObject.count++;
        
        const text_cartProduct = document.querySelectorAll("[data-cartcountprice]");
        text_cartProduct.forEach(element => {
            if (Number(element.dataset.cartcountprice) === data.id)
                element.textContent = `X${productCartObject.count} | ${(data.price * productCartObject.count).toFixed(2)} DH`
        });

        setStoredCart(cartProducts);
        updateCartNavbarTotal();
        return true;
    }
    
    cartProducts.push({
        id: crypto.randomUUID(),
        productID: data.id,
        count: 1,
    })

    list_cart_items.innerHTML += requestRenderCartItem(data, 1);
    setStoredCart(cartProducts);
    updateCartNavbarTotal();
    return true;

}

function removeProductFromCartByID(productID) {
    for (let i=0; i<cartProducts.length; i++) {
        if (cartProducts[i].productID === Number(productID)) {
            cartProducts.splice(i, 1);
            setStoredCart(cartProducts);
            updateCartNavbarTotal();
            return true;
        }
    }
}

const list_cart_items = document.getElementById("list-cart-items");
if (list_cart_items) {

    list_cart_items.addEventListener("click", (event) => {
    
        const li_cart_item = event.target.closest(".li-cart-items");
        if (!li_cart_item) return false;
    
        if (event.target && event.target.tagName === "BUTTON") {
            removeProductFromCartByID(event.target.id);
            li_cart_item.remove();
        }
    
    })

}