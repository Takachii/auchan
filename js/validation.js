export function validateTitle(title) {
    const regex = /^[a-zA-Z0-9\sÀ-ÿ\-\'\,\.\(\)\&]{3,100}$/;
    return regex.test(title.trim());
}

export function validatePrice(price) {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(String(price)) && Number(price) > 0;
}

export function validateCount(count) {
    const regex = /^\d+$/;
    return regex.test(String(count)) && Number(count) >= 0;
}

export function validateStars(stars) {
    const regex = /^(?:[0-5](?:\.\d+)?)$/;
    return regex.test(String(stars)) && Number(stars) >= 0 && Number(stars) <= 5;
}

export function validateCategory(category) {
    return Boolean(category && category.trim().length > 0);
}

export function validateImage(url) {
    if (!url || url.trim() === "") return true;
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp|gif)|assets\/images\/.*\.(?:png|jpg|jpeg|svg|webp|gif))$/i;
    return regex.test(url.trim());
}

export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

export function validatePhone(phone) {
    const regex = /^(\+212|0)[5-7]\d{8}$/;
    return regex.test(phone.replace(/\s+/g, ""));
}