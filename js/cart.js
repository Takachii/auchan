const div_navbar_carte = document.getElementById("div-store-carte");

div_navbar_carte.addEventListener("click", () => {

    const element_asied_carte = document.getElementById("aside-store-carte");
    element_asied_carte.classList.toggle("hidden");

});