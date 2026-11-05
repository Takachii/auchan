export function getProductJSON() {
    return fetch("./data/data.json").then(response => response.json());
}

export function getRandomUserJSON() {
    return fetch("https://randomuser.me/api/").then(response => response.json());
}