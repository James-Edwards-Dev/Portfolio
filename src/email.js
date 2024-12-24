import emailjs from "@emailjs/browser"

// Contact form

const contactForm = document.querySelector("#contact-form-form");
const sumbitBtn = document.querySelector("#submit-contact");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const publicKey = "Mom9JcScPRUDHw_ga"

const surviceID = "service_6xy26rs";
const templateID = "template_c76zw7r";

emailjs.init(publicKey);

// Sumbit form event 
contactForm.addEventListener("submit", e => {
    e.preventDefault();
    
    sumbitBtn.innerHTML = "Sending Emails..."

    const inputFields = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    }
    
    emailjs.send(surviceID, templateID, inputFields)
        .then(() => {

            contactForm.innerHTML = "Email Sent";
        }, (error) => {

            console.log(error);
            alert("Somthing went wrong with sending the Email")
            sumbitBtn.innerHTML="Send Email"
        });
});
