//Write  password validation code here 
function setPasswordConfirmValidity() {
    const pas = document.getElementById("custPasword").value;
    const pas2 = document.getElementById("custConfirmPassword").value;
    const but = document.getElementById("register");
    if (pas === pas2) {
        but.disabled = false;
    }
    else {
        window.alert("passwords do not match,enter password that matches.");
        but.disabled = true;
    }
}
const form = document.getElementById("customerRegistrationForm");
// Write code to submit customer details 
function submitCustomerDetail(event) {
    let data = new FormData(event.target);
    event.preventDefault();
    const obj = Object.fromEntries(data.entries());
    const pos = axios.post(" http://localhost:3001/customers", obj);
    pos.then((result) => {
        window.alert(result);
    });
    form.reset();
}



