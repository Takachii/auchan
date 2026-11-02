import { getProductJSON } from "./api.js"
import { requestPaginationRenderItems } from "./ui.js"

let products = [];

function fetchProducts() {

    getProductJSON().then(results => {
        products = results;
    })

    setTimeout(() => requestPaginationRenderItems(products, 1, 12), 350);

}

fetchProducts();