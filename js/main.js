import { getProductJSON } from "./api.js";
import { requestPaginationRenderItems } from "./ui.js";
import { initRenderCart, updateCartNavbarTotal } from "./cart.js";
import { loadEventsContact } from "./contact.js";
import { loadEventsManager } from "./manager.js";
import { getStoredProducts, setStoredProducts } from "./storage.js";

let products = [];

export function getProducts() {
    return products;
}

export function setProducts(newProducts) {
    products = newProducts;
    setStoredProducts(products);
}

export function getProductFromID(id) {
    for (const value of products)
        if (value.id === id) return value;
}

function fetchProducts() {

    const storedProducts = getStoredProducts();
    if (storedProducts && storedProducts.length > 0) {
        products = storedProducts;
        requestPaginationRenderItems(products, 1, 12);
        loadEventsManager();
        initRenderCart();
        updateCartNavbarTotal();
        return;
    }

    getProductJSON().then(results => {
        products = results;
        setStoredProducts(products);
        requestPaginationRenderItems(products, 1, 12);
        loadEventsManager();
        initRenderCart();
        updateCartNavbarTotal();
    });

}

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    loadEventsContact();
});