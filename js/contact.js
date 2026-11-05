import { getRandomUserJSON } from "./api.js";

function setRandomUser() {

    getRandomUserJSON().then(data => {

        const input_contact_name = document.getElementById("input-contact-name");
        const input_contact_email = document.getElementById("input-contact-email");
        const input_contact_phone = document.getElementById("input-contact-phone");
        const input_contact_message = document.getElementById("input-contact-message");

        input_contact_name.value = `${data.results[0].name.first} ${data.results[0].name.last}`
        input_contact_email.value = data.results[0].email
        input_contact_phone.value = data.results[0].phone
        input_contact_message.value = `Hi Im ${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last} and I would like to ask some questions about delivery costs to a country other like ${data.results[0].country} Code POSTAL: ${data.results[0].postcode}`

    });

}

export function loadEventsContact() {

    const btn_contact_fetch = document.getElementById("btn-contact-fetch");
    if (!btn_contact_fetch) return false;
    btn_contact_fetch.addEventListener("click", () => {
        setRandomUser()
    })

}