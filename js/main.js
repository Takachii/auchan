import { getProductJSON } from "./api.js";
import { requestPaginationRenderItems } from "./ui.js";
import {} from "./cart.js";
import { loadEventsContact } from "./contact.js";

let products = [];

export function getProducts() {
    return products;
}

export function getProductFromID(id) {
    for (const value of products)
        if (value.id === id) return value;
}

function fetchProducts() {

    getProductJSON().then(results => {
        products = results;
    })

    setTimeout(() => requestPaginationRenderItems(products, 1, 12), 350);

}

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    loadEventsContact();
});