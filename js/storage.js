export function getStoredProducts() {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : null;
}

export function setStoredProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

export function getStoredCart() {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
}

export function setStoredCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}