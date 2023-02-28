//Write code to get menu data from the json-server using axios API

const getPromise = axios.get(" http://localhost:3000/menu");
//Write code to load menu data using window onload event: getPromise is the promise result obained from Axios call
window.onload = () => getPromise.then((response) => {
    let cat = new Set(response.data.reduce((acc, cur) => {
        if (acc.category != cur.category)
            acc.push(cur.category);
        return acc;
    }, [])
    );
    cat.forEach(element => {
        let opt = document.createElement("option");
        opt.setAttribute(`value`, `${element}`)
        opt.innerHTML = `${element}`;
        category.appendChild(opt);
    });
});

//Write code to filter the menu item from list
const category = document.getElementById('category');
category.addEventListener('change', (event) => {
    findItems(category.value);
});
const tab = document.getElementById('table');
function findItems(categoryName) {
    const opt3 = document.getElementById('menuvalues');
    if (opt3) {
        opt3.remove();
    }
    let opt2 = document.createElement("tbody");
    opt2.setAttribute('id', 'menuvalues');
    getPromise.then((response) => {
        let c = response.data.filter((a) => (a.category === categoryName));
        console.log(c);

        c.forEach((i) => {
            let opt1 = document.createElement("tr");
            opt1.innerHTML = `
            <td>${i.itemName}</td>
            <td>${i.price}</td>`;
            opt2.appendChild(opt1);
        }
        )
    })
    tab.appendChild(opt2);
}


