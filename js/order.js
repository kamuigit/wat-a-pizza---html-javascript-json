// Reuse the solution created to dynamically create order form fields developed 
// in the previous sprint challenge

//Save the order details captured from the form in json-server using Axios API

// Write solution code here to dynamically add the form fields 

// Save the order details on clicking the submit button
let curDate = new Date().toISOString().split('T')[0];

const getPromise = axios.get(" http://localhost:3000/menu");
console.log(curDate);
document.getElementById("orderDate").min = curDate;


const OrderValues = [];



function addOrder() {
    const form = document.createElement("div");
    form.setAttribute("class", "row py-1 addOrder ");
    const row = document.getElementById("row-added");
    form.innerHTML = `<div class="col">
                <select class="form-control category" name="categoryName">
                  <option selected>Choose category...</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Starters">Starters</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
              <div class="col">
                <select class="form-control item" onfocus="showItem()" name="item">
                <option selected >choose Item...</option>
                </select>
              </div>
              <div class="col">
              <input type="number" readonly class="form-control price" onfocus="showPrice()" name="price" required>
              </div>
              <div class="col">
              <input type="number" min=1 class="form-control quantity" onkeyup="showItemAmount(); showAmount();" name="quantity" required>
              </div>
              <div class="col">
                <input type="number" readonly class="form-control amounts" name="amount">
              </div>
              `;
    row.appendChild(form);

}

var selectIndex = 0;
function showItem() {
    const categories = document.getElementsByClassName("category");
    const items = document.getElementsByClassName("item");


    for (let i = selectIndex; i < categories.length; i++) {
        let category = categories[i].value;
        let item = items[i];
        getPromise.then((response) => {
            let c = response.data.filter((a) => (a.category === category));
            let a = "";
            // console.log(c);
            c.forEach((i) => {
                a += "\n" + `
                <option value="${i.itemName}">${i.itemName}</option>`;
            }
            )
            item.innerHTML = a;
            //         if (category === "Starters") {
            //             item.innerHTML = `
            //   <option value="Dough Balls Doppio">Dough Balls Doppio</option>
            //   <option value="Mix Salad Bowl">Mix Salad Bowl</option>
            //   <option value="Garlic Bread Mozzarella">Garlic Bread Mozzarella</option>
            //   <option value ="Veg Wrap"> Veg Wrap</option>`
            //         }
            //         else if (category === "Main-Meal") {
            //             item.innerHTML = `
            //   <option value="Fruit Pizza">Fruit Pizza</option>
            //   <option value="Mexican Delight Pizza">Mexican Delight Pizza</option>
            //   <option value="Spaghetti">Spaghetti</option>
            //   <option value="Cheese Burst Pizza">Cheese Burst Pizza</option>
            //   <option value="Fresh Veggi Special Pizza">Fresh Veggi Special Pizza</option>`
            //         }
            //         else if (category === "Beverages") {
            //             item.innerHTML = `
            //   <option value="Berry Blast">Berry Blast</option>
            //   <option value="Oreo Monster Shake">Oreo Monster Shake</option>
            //   <option value="Classic Mojito">Classic Mojito</option>
            //   <option value="Water Melon Ice Tea">Water Melon Ice Tea</option>
            //   <option value="Diet Coke">Diet Coke</option>`
            //         }

        })

    }

}
function showPrice() {
    const categories = document.getElementsByClassName("category");
    const items = document.getElementsByClassName("item");
    const prices = document.getElementsByClassName("price");
    getPromise.then((response) => {
        for (let i = 0; i < items.length; i++) {
            let category = categories[i].value;
            let item = items[i].value;
            let pric = prices[i];

            let c = response.data.filter((a) => (a.category === category && a.itemName === item));
            pric.setAttribute('value', `${c[0].price}`);
        }
    });
    items[selectIndex].disabled = true;
    categories[selectIndex].disabled = true;
    selectIndex++;


    // if (item === "Dough Balls Doppio") {
    //     price.value = 5.95;
    // }
    // else if ((item === "Mix Salad Bowl")) {
    //     price.value = 4;
    // }
    // else if (item === "Garlic Bread Mozzarella") {
    //     price.value = 3.12;
    // }
    // else if (item === "Veg Wrap") {
    //     price.value = 9.5;
    // }
    // else if (item === "Fruit Pizza" || item === "Spaghetti") {
    //     price.value = 5;
    // }

    // else if (item === "Mexican Delight Pizza") {
    //     price.value = 4.2;
    // }
    // else if (item === "Fresh Veggi Special Pizza") {
    //     price.value = 15;
    // }
    // else if (item === "Cheese Burst Pizza") {
    //     price.value = 12;
    // }
    // else if (item === "Berry Blast") {
    //     price.value = 1.72;
    // }
    // else if (item === "Oreo Monster Shake") {
    //     price.value = 3.78;
    // }
    // else if (item === "Classic Mojito") {
    //     price.value = 3.44;
    // }
    // else if (item === "Water Melon Ice Tea") {
    //     price.value = 2.5;
    // }
    // else if (item === "Diet Coke") {
    //     price.value = 1;
    // }

}

function showItemAmount() {
    const prices = document.getElementsByClassName("price");
    const quantities = document.getElementsByClassName("quantity");
    const amounts = document.getElementsByClassName("amounts");
    for (let i = 0; i < prices.length; i++) {
        let price = Number(prices[i].value);
        let quantity = Number(quantities[i].value);
        let amount = amounts[i];
        amount.value = price * quantity;
    }
}

function showAmount() {
    const amounts = document.getElementsByClassName("amounts");
    const totalAmount = document.getElementById("total-amount");
    let total = 0;
    for (let i = 0; i < amounts.length; i++) {
        total = Math.round((total + Number(amounts[i].value)) * 100) / 100;
    }
    totalAmount.value = total;
}
const form1 = document.querySelector("#feedbackForm");
form1.addEventListener('submit', showOrder);

function showOrder(event) {
    let data = new FormData(event.target);
    event.preventDefault();
    saveOrder();
    const val = Object.fromEntries(data.entries()); // returns the object of entires name = value;
    val.OrderValue = OrderValues;

    //val is the object which has all values from the form ready to be entered into json
    const pos = axios.post("http://localhost:3002/order", val);
    pos.then((result) => {
        alert(`Order successfull Mr/Mrs ${val.customerName}`);
        location.reload();
    });


}
// when val categraname
function saveOrder() {
    const form2 = document.querySelectorAll(".addOrder");
    for (let i = 0; i < form2.length; i++) {
        const cate = document.getElementsByClassName("category")[i].value;
        const it = document.getElementsByClassName("item")[i].value;
        const pr = document.getElementsByClassName("price")[i].value;
        const qual = document.getElementsByClassName("quantity")[i].value;
        const amt = document.getElementsByClassName("amounts")[i].value;
        OrderValues.push({ category: cate, item: it, price: pr, quantity: qual, amount: amt });
    }
    form2.forEach((a) => (a.remove()));
}