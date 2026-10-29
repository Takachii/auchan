import { getProductJSON } from "./api.js"

let products = {};

function loadProductsFromJSON() {

    getProductJSON().then(results => {
        products = results;
    })

}

loadProductsFromJSON();