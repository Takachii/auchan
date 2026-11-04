import { getProductFromID } from "./main.js";
import { addProductToCart } from "./cart.js";

export function requestLoadDragDropEvents() {

    document.addEventListener("dragstart", (event) => {
        const productElement = event.target.closest("[data-productid]");
        if (productElement) {
            event.dataTransfer.setData("productID", productElement.dataset.productid);
        }
    });

    document.addEventListener("dragover", (event) => {
        if (event.target.closest("#zone-drag-cart-items")) {
            event.preventDefault();
        }
    });

    document.addEventListener("drop", (event) => {
        const dropZone = event.target.closest("#zone-drag-cart-items");
        if (dropZone) {
            event.preventDefault();
            const productId = event.dataTransfer.getData("productID");
            if (!productId) return false;
            console.log("HELO")
            addProductToCart(getProductFromID(Number(productId)));
        }
    });

}