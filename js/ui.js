import { getProducts, getProductFromID } from "./main.js"
import { addProductToCart } from "./cart.js"
import { requestLoadDragDropEvents } from "./dragDrop.js"

function getRenderStoreItemsByType(type, data) {
    if (type === "grid") {

        return `

            <div data-productid="${data.id}" class="flex justify-between bg-white rounded-2xl p-4 shadow-md cursor-grab" draggable="true">
    
                <div class="flex items-center gap-4">
    
                    <div>
                        <img class="rounded-2xl h-20 w-20" src="${ data.imgUrl ? data.imgUrl : `assets/images/item_${data.id}.jpg`}" alt="item image" draggable="false">
                    </div>

                    <div class=w-50>
                        <h2 class="text-xl font-bold">${data.title}</h2>
                        <p class="text-xs">${data.description}</p>
                    </div>
                    
                </div>
                
                <div class="flex gap-0.5 items-center">
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="28px" width="28px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="28px" width="28px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="28px" width="28px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="28px" width="28px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="28px" width="28px" fill="#F19E39"><path d="M15.15,16.85l-0.82-3.6l2.78-2.4l-3.65-0.33L12,7.13v7.8l3.15,1.93ZM5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <p class="text-xs shrink-0 ml-1">(${data.stars})</p>
                </div>
    
                <div class="flex flex-col justify-between items-end mr-3">
                    <svg class="mt-2 hover:fill-red-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="22px" width="22px" fill="red"><path d="M5.59,21.41Q5,20.83 5,20t0.59-1.41T7,18q0.83,0 1.41,0.59Q9,19.18 9,20T8.41,21.41Q7.83,22 7,22T5.59,21.41Zm10,0Q15,20.83 15,20t0.59-1.41T17,18t1.41,0.59Q19,19.18 19,20t-0.59,1.41T17,22t-1.41-0.59ZM5.2,4H19.95q0.57,0 0.88,0.51t0.02,1.04l-3.55,6.4q-0.27,0.5-0.74,0.78T15.55,13H8.1L7,15H19v2H7q-1.13,0-1.7-0.99q-0.58-0.99-0.05-1.96L6.6,11.6L3,4H1V2H4.25L5.2,4Z"/></svg>    
                    <span class="text-green-700 font-bold text-2xl">${data.price} DH</span>
                </div>
    
            </div>
    
        `;
    }

    return `
        <div data-productid="${data.id}" class="bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between cursor-grab" draggable="true">

            <div>

                <div class="mt-2">
                    <img class="rounded-2xl w-full" src="${ data.imgUrl ? data.imgUrl : `assets/images/item_${data.id}.jpg`}" alt="item image" draggable="false">
                </div>

                <div class="flex justify-center gap-0.5 items-center mt-3 shrink-0">
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20px" width="20px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20px" width="20px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20px" width="20px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20px" width="20px" fill="#F19E39"><path d="M5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20px" width="20px" fill="#F19E39"><path d="M15.15,16.85l-0.82-3.6l2.78-2.4l-3.65-0.33L12,7.13v7.8l3.15,1.93ZM5.83,21l1.63-7.03L2,9.25L9.2,8.63L12,2l2.8,6.63L22,9.25l-5.45,4.72L18.18,21L12,17.27L5.83,21Z"/></svg>
                    <p class="text-xs shrink-0 ml-1">(${data.stars})</p>
                </div>

                <div class="mt-3 flex flex-wrap gap-4 items-baseline">
                    <p class="text-sm"><strong>${data.title}</strong> ${data.description}</p>
                </div>

            </div>

            <div class="flex justify-between items-center mt-3">
                <span class="text-green-700 font-bold text-2xl">${data.price} DH</span>
                <svg class="hover:fill-red-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="22px" width="22px" fill="red"><path d="M5.59,21.41Q5,20.83 5,20t0.59-1.41T7,18q0.83,0 1.41,0.59Q9,19.18 9,20T8.41,21.41Q7.83,22 7,22T5.59,21.41Zm10,0Q15,20.83 15,20t0.59-1.41T17,18t1.41,0.59Q19,19.18 19,20t-0.59,1.41T17,22t-1.41-0.59ZM5.2,4H19.95q0.57,0 0.88,0.51t0.02,1.04l-3.55,6.4q-0.27,0.5-0.74,0.78T15.55,13H8.1L7,15H19v2H7q-1.13,0-1.7-0.99q-0.58-0.99-0.05-1.96L6.6,11.6L3,4H1V2H4.25L5.2,4Z"/></svg>
            </div>

        </div>
    `;
}

export function requestPaginationRenderItems(products, targetPage, itemsPerPage) {

    const currentFilter = document.getElementById("input-items-search").value;

    const element_store_products_grid = document.getElementById("grid-store-products");
    const element_store_products_category = document.getElementById("cat-store-products");

    const filtered = products.filter(product => product.title.toLowerCase().includes(currentFilter));
    const start = (targetPage - 1) * itemsPerPage;
    const pageProducts = filtered.slice(start, start + itemsPerPage);

    element_store_products_grid.innerHTML = "";
    element_store_products_category.innerHTML = "";

    for (const value of pageProducts) {
        element_store_products_grid.innerHTML += getRenderStoreItemsByType("grid", value);
        element_store_products_category.innerHTML += getRenderStoreItemsByType("category", value);
    }

    const element_pagination_store_products = document.getElementById("pagination-store-products");
    element_pagination_store_products.innerHTML = "";

    if (targetPage > 1) {

        const backBtn = document.createElement("button");
        backBtn.id = "btn-pagination-back";
        backBtn.className = "shadow-md hover:shadow-xl rounded-full p-4 font-semibold cursor-pointer";
        backBtn.textContent = "< Précédente";
        
        backBtn.addEventListener("click", () => {
            requestPaginationRenderItems(products, targetPage - 1, itemsPerPage);
        });

        element_pagination_store_products.appendChild(backBtn);
    
    }

    const pages = Math.ceil(filtered.length / itemsPerPage);
    for (let i = 1; i <= pages; i++) {
        
        const pageBtn = document.createElement("button");
        pageBtn.className = "hover:shadow-xl rounded-full p-4 cursor-pointer";
        
        if (i === targetPage) {
            pageBtn.classList.add("bg-gray-100");
        }

        pageBtn.textContent = i;

        pageBtn.addEventListener("click", () => {
            requestPaginationRenderItems(products, i, itemsPerPage);
        });

        element_pagination_store_products.appendChild(pageBtn);
        
    }

    if (targetPage < pages) {

        const nextBtn = document.createElement("button");
        nextBtn.id = "btn-pagination-next";
        nextBtn.className = "shadow-md hover:shadow-xl rounded-full p-4 font-semibold cursor-pointer";
        nextBtn.textContent = "Suivante >";
    
        nextBtn.addEventListener("click", () => {
            requestPaginationRenderItems(products, targetPage + 1, itemsPerPage);
        });
    
        element_pagination_store_products.appendChild(nextBtn);

    }

    return true;
}

const input_pagination_search = document.getElementById("input-items-search");
input_pagination_search.addEventListener("input", () => {
    requestPaginationRenderItems(getProducts(), 1, 12);
})

const btn_listVeiwCategory = document.getElementById("btn-listView-category");
const btn_listVeiwGridlist = document.getElementById("btn-listView-gridlist");

btn_listVeiwCategory.addEventListener("click", () => {
    
    const element_grid = document.getElementById("grid-store-products");
    element_grid.classList.add("hidden");

    const element_category = document.getElementById("cat-store-products");
    element_category.classList.remove("hidden");

    btn_listVeiwCategory.className = "p-2 bg-white text-red-600 rounded-md shadow-xs hover:bg-gray-50 cursor-pointer"
    btn_listVeiwGridlist.className = "p-2 bg-transparent text-gray-500 hover:text-gray-800 rounded-md cursor-pointer"

})

btn_listVeiwGridlist.addEventListener("click", () => {
    
    const element_grid = document.getElementById("grid-store-products");
    element_grid.classList.remove("hidden");

    const element_category = document.getElementById("cat-store-products");
    element_category.classList.add("hidden");

    btn_listVeiwGridlist.className = "p-2 bg-white text-red-600 rounded-md shadow-xs hover:bg-gray-50 cursor-pointer"
    btn_listVeiwCategory.className = "p-2 bg-transparent text-gray-500 hover:text-gray-800 rounded-md cursor-pointer"

})

const container_list_products = document.getElementById("container-list-products");
container_list_products.addEventListener("click", (event) => {

    const container_list_target = event.target.closest("[data-productid]");
    if (!container_list_target) return false;

    if (event.target && (event.target.tagName === "path" || event.target.tagName === "svg")) {

        event.stopPropagation();

        const productID = Number(container_list_target.dataset.productid)
        if (!productID) return false;

        addProductToCart(getProductFromID(productID))

    }

})

requestLoadDragDropEvents();