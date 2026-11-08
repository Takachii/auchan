export function calculatePriceBySize(price, size) {
    const numPrice = Number(price);
    if (size === "M") return Number((numPrice * 1.05).toFixed(2));
    if (size === "L") return Number((numPrice * 1.10).toFixed(2));
    if (size === "XL") return Number((numPrice * 1.20).toFixed(2));
    return Number(numPrice.toFixed(2));
}

export function addProductItem(products, productData) {
    const newProduct = {
        id: crypto.randomUUID(),
        ...productData
    };
    return [newProduct, ...products];
}

export function updateProductItem(products, id, productData) {
    return products.map(product => {
        if (product.id === Number(id)) {
            return { ...product, ...productData };
        }
        return product;
    });
}

export function deleteProductItem(products, id) {
    return products.filter(product => product.id !== Number(id));
}