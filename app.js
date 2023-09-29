let form = document.getElementById("form");
let table = document.getElementById("table");
let tableBody = document.getElementById("tableBody");
const submitBtn = document.getElementById("submit-btn")

form.addEventListener("submit", addItem)

async function addItem(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let desc = e.target.desc.value;
    let price = e.target.price.value;
    let quantity = e.target.quantity.value;
    e.target.name.value = "";
    e.target.desc.value = "";
    e.target.price.value = "";
    e.target.quantity.value = "";

    let item = {
        name: name,
        desc: desc,
        price: price,
        quantity: quantity
    }

    try {
        await axios.post("https://crudcrud.com/api/9f8c49780ac2478080a890c2164ab8f7/items", item)
        printData()
    } catch (error) {
        console.log(error)
    }
}


async function printData() {
    try {
        const result = await axios.get("https://crudcrud.com/api/9f8c49780ac2478080a890c2164ab8f7/items");
        const items = result.data

        if (items.length == 0) {
            table.classList.add("d-none");
        }
        else {
            table.classList.remove("d-none");
        }

        let data = "";
        if (items) {
            items.forEach((item, index) => {
                data = data + `<tr> <th scope="row">${index + 1}</th>
            <td>${item.name}</td>
            <td>${item.desc}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td><button class="btn btn-sm btn-primary" onclick="decreaseOne('${item._id}', '${item.name}', '${item.desc}', '${item.price}', '${item.quantity}')">Buy 1</button></td>
            <td><button class="btn btn-sm btn-primary" onclick="decreaseTwo('${item._id}', '${item.name}', '${item.desc}', '${item.price}', '${item.quantity}')">Buy 2</button></td>
            <td><button class="btn btn-sm btn-primary" onclick="decreaseThree('${item._id}', '${item.name}', '${item.desc}', '${item.price}', '${item.quantity}')">Buy 3</button></td>
            </tr>`;
            });
        }
        tableBody.innerHTML = data;

    } catch (error) {
        console.log(error)
    }
}

async function decreaseOne(id, n, d, p, qty) {
    try {
        await axios.put(`https://crudcrud.com/api/9f8c49780ac2478080a890c2164ab8f7/items/${id}`, {
            name: n,
            desc: d,
            price: p,
            quantity: qty-1
        })
        printData()
    } catch (error) {
        console.log(error)
    }
}

async function decreaseTwo(id, n, d, p, qty) {
    try {
        await axios.put(`https://crudcrud.com/api/9f8c49780ac2478080a890c2164ab8f7/items/${id}`, {
            name: n,
            desc: d,
            price: p,
            quantity: qty-2
        })
        printData()
    } catch (error) {
        console.log(error)
    }
}

async function decreaseThree(id, n, d, p, qty) {
    try {
        await axios.put(`https://crudcrud.com/api/9f8c49780ac2478080a890c2164ab8f7/items/${id}`, {
            name: n,
            desc: d,
            price: p,
            quantity: qty-3
        })
        printData()
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", printData)