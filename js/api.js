export function getProductJSON() {
    return fetch("./data/data.json").then(response => response.json())
}