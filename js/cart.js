const cartProducts = [];

const div_navbar_carte = document.getElementById("div-store-carte");

div_navbar_carte.addEventListener("click", () => {

    const element_asied_carte = document.getElementById("aside-store-carte");
    element_asied_carte.classList.toggle("hidden");

});

function requestRenderCartItem(data) {
    return `
        <li class="li-cart-items">
            <div class="flex justify-between items-center p-4">

                <div class="flex items-center">

                    <img src="${ data.imgUrl ? data.imgUrl : `assets/images/item_${data.id}.jpg`}" alt="item image" class="h-16 w-16 bg-gray-200" />

                    <div>
                        <h3 class="text-sm font-medium text-gray-900 text-wrap">${data.title}</h3>
                        <p class="text-sm text-gray-500">${data.price} DH</p>
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

function removeProductFromCartByID(productID) {
    for (const i=0; i<cartProducts.length; i++) {
        if (cartProducts[i].productID === Number(productID)) {
            cartProducts.splice(i, 1);
            return true;
        }
    }
}

export function getCartProducts() {
    return cartProducts || [];
}

export function addProductToCart(data) {
    
    const list_cart_items = document.getElementById("list-cart-items");
    if (!list_cart_items) return false;

    cartProducts.push({
        id: crypto.randomUUID(),
        productID: data.id,
        count: 1,
    })

    list_cart_items.innerHTML += requestRenderCartItem(data);

    return true;

}

export function refreshCartProducts(data) {
    
    const list_cart_items = document.getElementById("list-cart-items");
    if (!list_cart_items) return false;

    list_cart_items.innerHTML = "";

    data.forEach(value => {
        list_cart_items.innerHTML += requestRenderCartItem(value);
    });

    return true;

}

const list_cart_items = document.getElementById("list-cart-items");
list_cart_items.addEventListener("click", (event) => {

    const li_cart_item = event.target.closest(".li-cart-items");
    if (!li_cart_item) return false;

    if (event.target && event.target.tagName === "BUTTON") {
        removeProductFromCartByID(event.target.id);
        li_cart_item.remove();
    }

})