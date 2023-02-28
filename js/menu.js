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
category.addEventListener('change', function (e) {
    findItems(category.value);
});
const tab = document.getElementById('table');
function findItems(categoryName) {
    getPromise.then((response) => {
        let c = response.data.filter((a) => (a.category === categoryName));

        let opt = document.createElement("tr");

        opt.innerHTML = `
       <td></td>`
    })
}


