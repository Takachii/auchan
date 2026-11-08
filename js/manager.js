import { getProducts, setProducts } from "./main.js";
import { validateTitle, validatePrice, validateCount, validateStars, validateCategory, validateImage } from "./validation.js";

function requestRenderManagerProduct(data) {
    return `
        <tr data-managerid="${data.id}" class="hover:bg-gray-50/75 transition-colors">
            <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                    <img src="${data.imgUrl ? data.imgUrl : `assets/images/item_${data.id}.jpg`}" alt="${data.title}" class="h-12 w-12 rounded-lg object-cover bg-gray-100 shrink-0" onerror="this.src='assets/images/item_1.jpg'" />
                    <div>
                        <p class="font-semibold text-gray-900">${data.title}</p>
                        <p class="text-xs text-gray-500 line-clamp-1 max-w-xs">${data.description}</p>
                    </div>
                </div>
            </td>
            <td class="px-4 py-3">
                <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">${data.category}</span>
            </td>
            <td class="px-4 py-3 font-semibold text-green-700">
                ${Number(data.price).toFixed(2)} DH
            </td>
            <td class="px-4 py-3 text-gray-700">
                ${data.count}
            </td>
            <td class="px-4 py-3">
                <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <span class="text-xs font-semibold text-gray-700">${data.stars}</span>
                </div>
            </td>
            <td class="px-4 py-3">
                <span class="text-xs text-gray-600">${Array.isArray(data.sizes) ? data.sizes.join(", ") : (data.sizes || "S, M, L, XL")}</span>
            </td>
            <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                    <button data-action="edit" data-id="${data.id}" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors" title="Modifier">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </button>
                    <button data-action="delete" data-id="${data.id}" class="p-1.5 text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors" title="Supprimer">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T760-120H280Zm480-600H280v520h480v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

export function renderManagerTable() {
    const tbody = document.getElementById("tbody-manager-products");
    if (!tbody) return;

    const input_search = document.getElementById("input-manager-search");
    const select_cat = document.getElementById("select-manager-category");
    const emptyState = document.getElementById("manager-empty-state");

    const searchValue = input_search ? input_search.value.toLowerCase().trim() : "";
    const categoryValue = select_cat ? select_cat.value : "";

    const allProducts = getProducts();

    const filtered = allProducts.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchValue) || p.description.toLowerCase().includes(searchValue);
        const matchesCat = categoryValue === "" || p.category === categoryValue;
        return matchesSearch && matchesCat;
    });

    tbody.innerHTML = "";

    if (filtered.length === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
    } else {
        if (emptyState) emptyState.classList.add("hidden");
        filtered.forEach(p => {
            tbody.innerHTML += requestRenderManagerProduct(p);
        });
    }
}

function openProductModal(product) {
    
    const modal = document.getElementById("modal-product");
    const modalTitle = document.getElementById("modal-product-title");
    const form = document.getElementById("form-product");
    const errorBox = document.getElementById("form-product-error");

    if (!modal || !form) return;

    form.reset();
    if (errorBox) {
        errorBox.textContent = "";
        errorBox.classList.add("hidden");
    }

    const input_id = document.getElementById("input-product-id");
    const input_name = document.getElementById("input-product-name");
    const select_cat = document.getElementById("select-product-form-category");
    const input_price = document.getElementById("input-product-price");
    const input_count = document.getElementById("input-product-count");
    const input_stars = document.getElementById("input-product-stars");
    const input_image = document.getElementById("input-product-image");
    const input_desc = document.getElementById("input-product-desc");
    const sizeCheckboxes = document.querySelectorAll("input[name='product-size']");

    if (product) {
        modalTitle.textContent = "Modifier le produit";
        input_id.value = product.id;
        input_name.value = product.title;
        select_cat.value = product.category;
        input_price.value = product.price;
        input_count.value = product.count;
        input_stars.value = product.stars;
        input_image.value = product.imgUrl || "";
        input_desc.value = product.description;

        const sizes = Array.isArray(product.sizes) ? product.sizes : (product.sizes ? String(product.sizes).split(",").map(s => s.trim()) : ["S", "M", "L", "XL"]);
        sizeCheckboxes.forEach(cb => {
            cb.checked = sizes.includes(cb.value);
        });
    } else {
        modalTitle.textContent = "Ajouter un produit";
        input_id.value = "";
        sizeCheckboxes.forEach(cb => {
            cb.checked = true;
        });
    }

    modal.classList.remove("hidden");
}

function closeProductModal() {
    const modal = document.getElementById("modal-product");
    if (modal) modal.classList.add("hidden");
}

function handleProductSubmit(event) {
    event.preventDefault();

    const input_id = document.getElementById("input-product-id");
    const input_name = document.getElementById("input-product-name");
    const select_cat = document.getElementById("select-product-form-category");
    const input_price = document.getElementById("input-product-price");
    const input_count = document.getElementById("input-product-count");
    const input_stars = document.getElementById("input-product-stars");
    const input_image = document.getElementById("input-product-image");
    const input_desc = document.getElementById("input-product-desc");

    const id = input_id.value;
    const title = input_name.value.trim();
    const category = select_cat.value;
    const price = parseFloat(input_price.value);
    const count = parseInt(input_count.value, 10);
    const stars = parseFloat(input_stars.value);
    const imgUrl = input_image.value.trim();
    const description = input_desc.value.trim();

    const selectedSizes = [];
    document.querySelectorAll("input[name='product-size']:checked").forEach(cb => {
        selectedSizes.push(cb.value);
    });

    if (!validateTitle(title)) {
        showFormError("Le nom du produit doit comporter au moins 3 caractères.");
        return;
    }

    if (!validateCategory(category)) {
        showFormError("Veuillez sélectionner une catégorie valide.");
        return;
    }

    if (!validatePrice(price)) {
        showFormError("Le prix doit être un nombre positif supérieur à 0.");
        return;
    }

    if (!validateCount(count)) {
        showFormError("Le stock doit être un entier positif ou nul.");
        return;
    }

    if (!validateStars(stars)) {
        showFormError("La note doit être un nombre entre 0 et 5.");
        return;
    }

    if (!validateImage(imgUrl)) {
        showFormError("L'URL de l'image n'est pas valide.");
        return;
    }

    const currentProducts = [...getProducts()];

    if (id) {
        const productIndex = currentProducts.findIndex(p => p.id === Number(id));
        if (productIndex !== -1) {
            currentProducts[productIndex] = {
                ...currentProducts[productIndex],
                title,
                category,
                price,
                count,
                stars,
                imgUrl: imgUrl || currentProducts[productIndex].imgUrl,
                description,
                sizes: selectedSizes
            };
        }
    } else {
        const nextId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;
        const newProduct = {
            id: nextId,
            title,
            category,
            price,
            count,
            stars,
            imgUrl: imgUrl || `assets/images/item_${nextId}.jpg`,
            description,
            sizes: selectedSizes
        };
        currentProducts.unshift(newProduct);
    }

    setProducts(currentProducts);
    renderManagerTable();
    closeProductModal();
}

function showFormError(message) {
    const errorBox = document.getElementById("form-product-error");
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

function handleDeleteProduct(productId) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    const currentProducts = getProducts().filter(p => p.id !== Number(productId));
    setProducts(currentProducts);
    renderManagerTable();
}

export function loadEventsManager() {
    const tbody = document.getElementById("tbody-manager-products");
    if (!tbody) return false;

    renderManagerTable();

    const btn_open = document.getElementById("btn-open-add-modal");
    if (btn_open) {
        btn_open.addEventListener("click", () => openProductModal());
    }

    const btn_close = document.getElementById("btn-close-modal");
    if (btn_close) {
        btn_close.addEventListener("click", () => closeProductModal());
    }

    const btn_cancel = document.getElementById("btn-cancel-modal");
    if (btn_cancel) {
        btn_cancel.addEventListener("click", () => closeProductModal());
    }

    const form = document.getElementById("form-product");
    if (form) {
        form.addEventListener("submit", handleProductSubmit);
    }

    const input_search = document.getElementById("input-manager-search");
    if (input_search) {
        input_search.addEventListener("input", () => renderManagerTable());
    }

    const select_cat = document.getElementById("select-manager-category");
    if (select_cat) {
        select_cat.addEventListener("change", () => renderManagerTable());
    }

    tbody.addEventListener("click", (event) => {
        const btnEdit = event.target.closest("[data-action='edit']");
        const btnDelete = event.target.closest("[data-action='delete']");

        if (btnEdit) {
            const id = btnEdit.dataset.id;
            const product = getProducts().find(p => p.id === Number(id));
            if (product) openProductModal(product);
        } else if (btnDelete) {
            const id = btnDelete.dataset.id;
            handleDeleteProduct(id);
        }
    });

    const modal = document.getElementById("modal-product");
    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeProductModal();
        });
    }

    return true;
}