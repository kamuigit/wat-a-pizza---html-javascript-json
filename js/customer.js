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

const getPromise = axios.get("http://localhost:3001/customers");
// Write code to submit customer details 
function submitCustomerDetail(event) {

}



