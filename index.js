let data = [];
const URL = 'http://localhost:3000/dataInput'

// READ
axios.get(URL)
    .then(response => {
        const listHTML = document.getElementById('savedData');
        data = response.data;
        console.log(data);

        data.forEach(item => {
            const {
                id,
                name,
                price,
                quantity

            } = item;

            const itemHTML = `
                <tr>
                    <th scope="col">${id}</th>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td>${quantity}</td>
                    <td>
                        <button class="btn btn-primary" onclick="hapus(${id})"><i class="fa fa-shopping-cart fa-2x"></i></button>
                        <button class="btn btn-danger" onclick="ganti(${id})"><i class="fa fa-trash fa-2x"></i></button>
                        <a href="./index.html"><button class="btn btn-dark"><i class="fa fa-arrow-circle-o-left fa-2x"></i></button></a>
                    </td>
                </tr>
            `;
            listHTML.innerHTML += itemHTML;
        })
    })
    .catch((pesanError) => {
        console.error(pesanError);
    })

document.getElementById('addData').addEventListener('click', function(event) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;


    // CREATE
    axios.post(URL, {name, price, quantity})
        .then(res => {
            console.log(res);
            window.alert('Berhasil menambah data');
        })
        .catch(err => {
            console.log(err);
        });
});


const hapus = id => {
    axios.delete(`${URL}/${id}`)
}

const ganti = (id) => {
    const stock = data.find(item => {
        return item === id
    })
    
    if (stock) {
        const id = window.prompt('Id', stock.id)
        const name = window.prompt('Name', stock.name)
        const price = window.prompt('Price', stock.price)
        const quantity = window.prompt('Quantity', stock.quantity)

        axios.put(`${URL}/${id}`, {
            id,
            name,
            price,
            quantity
        });
    }
}
