const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

// Toggle para mostrar/ocultar el carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Variables y referencias
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productList = document.querySelector('.container-items');
let allProducts = [];
let valorTotal = document.querySelector('.total-pagar')
const countProducts = document.querySelector('#contador-productos')




// Evento para agregar productos al carrito
productList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) { // Uso correcto de classList.contains
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1, // Cambio de 'quanty' a 'quantity'
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };
        const exits = allProducts.some(product => product.title === infoProduct.title)
        if(exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                }else{
                    return product
                }
            })
            allProducts = [...products]
        }else{
            allProducts = [...allProducts, infoProduct];
        }
        
        showHTML(); // Actualizar el HTML del carrito
    }
});

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        // Encontrar el elemento padre que contiene la información del producto
        const product = e.target.closest('.cart-product');
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        // Filtrar el array para eliminar el producto con ese título
        allProducts = allProducts.filter(product => product.title !== title);

        // Actualizar la vista del carrito
        showHTML();
    }
});


// Función para mostrar los productos en el carrito
const showHTML = () => {
    if(!allProducts.length){
        containerCartProducts.innerHTML=`
            <p class="cart-empty">El carrito esta vacio</>
        `;
    }
    rowProduct.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
    
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="icon-close"
            >
             <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        `;
        rowProduct.append(containerProduct); // Agregar producto al contenedor
        total = total + parseInt(product.quantity * product.price.slice(1))
        totalOfProducts = totalOfProducts + product.quantity;
    });
    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};

// Buscador


function buscarProducto() {
    const searchTerm = document.getElementById('search').value.toLowerCase(); // Obtener el término de búsqueda
    const items = document.querySelectorAll('.item');
    const noResultsMessage = document.getElementById('no-results-message'); // Mensaje de no resultados

    let found = false; // Variable para verificar si se encontró algún producto

    // Mostrar o ocultar productos según la búsqueda
    items.forEach(item => {
        const productName = item.querySelector('h2').textContent.toLowerCase(); // Obtener el nombre del producto
        if (productName.includes(searchTerm) && searchTerm !== "") {
            item.style.display = 'block'; // Mostrar el producto si coincide
            found = true;
        } else {
            item.style.display = 'none'; // Ocultar el producto si no coincide
        }
    });

    // Mostrar mensaje de no resultados si no se encuentra nada
    if (!found && searchTerm !== "") {
        if (!noResultsMessage) {
            const message = document.createElement('p');
            message.id = 'no-results-message';
            message.textContent = 'No se encontraron productos';
            document.querySelector('.container-items').appendChild(message); // Agregar mensaje al contenedor
        }
    } else {
        // Eliminar el mensaje si hay resultados
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Si el campo de búsqueda está vacío, mostrar todos los productos
    if (searchTerm === "") {
        items.forEach(item => {
            item.style.display = 'block'; // Mostrar todos los productos
        });

        // Eliminar el mensaje si el campo de búsqueda está vacío
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
}
