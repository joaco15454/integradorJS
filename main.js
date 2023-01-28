/*Secciones del html*/ 
const containerComics = document.querySelector(`.cards-container`)
const previousPageBtn = document.querySelector(".left");
const nextPageBtn = document.querySelector(".right");
const pageNumberbtn = document.querySelector(".page-number")
const btnCarrito = document.querySelector(`.cart-label`)
const containerBuy = document.querySelector(`.comic`)
const overlayIndex = document.querySelector(`.overlay`)
const btnComprar = document.querySelector(`.comprar`)
const containerComicsCart = document.querySelector(`.comic-container`)
const priceTotal = document.querySelector(`.total`)
const btnCompraFinal = document.querySelector(`.btn-buy`)
const btnBorrarFinal = document.querySelector(`.btn-delete`)
/* Movimiento del carrusel de imagenes*/
const imgContainer = document.querySelector(`.container-img`)
let maxScrollLeft = (Number(imgContainer.scrollWidth) - Number(imgContainer.clientWidth))
let intervaloImagen = null;
let step = 1
console.log(maxScrollLeft)
const startIMG = () => {
    intervaloImagen = setInterval(function () {
        imgContainer.scrollLeft = imgContainer.scrollLeft + step;
        if (imgContainer.scrollLeft === maxScrollLeft) {
            step = step * -1;

        } else if (imgContainer.scrollLeft === 0) {
            step = step * -1;
            console.log("Estoy al final")
        }

    }, 10)
};

const stopIMG = () => {
    clearInterval(intervaloImagen)
}
const controlDisabilited = () => {
    if (valorOffset === 3) {
        previousPageBtn.classList.add(`deshabilitado`)
    } else {
        previousPageBtn.classList.remove(`deshabilitado`)
    }
}
//CARRITO
let comicSelected = JSON.parse(localStorage.getItem(`comicSelected`)) || []; 

const SaveLocalStorage = (comic) => {
    localStorage.setItem(`comic`, JSON.stringify(comic))
}
const renderCartComic = ({ id, name, price, img, quantity}) => {
    return `
    <div class="cart__comic">
        <img src="${img}" alt="foto del comic">
        <div class="comic__info">
            <h3 class="comic__title">${name}</h3>
            <p class="comic__price">${price}$</p>
            <span class="quantity-handler up" data-id="${id}"></span>
        </div>
        <div class="comic-quantity">
            <span class="quantity-handler down" data-id="${id}">-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    
    `
}
const finalizarAccionCarrito = (mensajeConfirmacion, mensajeFinalizado) => { 
    if (!comicSelected.length) {
        return
    }
    if (window.confirm(mensajeConfirmacion)) {
        resetearCart()
    }
}
const resetearCart = () => {
    comicSelected = [];
    checkCartState()
}
const finishBuy = () => {
    finalizarAccionCarrito("¿Desea finalizar su compra?", "Su compra ha sido realizada, gracias.")
}
const deleteCart = () => {
    finalizarAccionCarrito("¿Desea borrar su carrito?", "Su carrito ha sido borrado.")
}
const renderComicsCart = () => {

    if (!comicSelected.length) {
        
        containerComicsCart.innerHTML = `<p>El carrito esta vacio!</p>`
        return
    }
    else {
        console.log("Estoy en else de rendercomic")
        containerComicsCart.innerHTML= comicSelected.map(renderCartComic).join("")
    }
    
}
//Comics repetidos
const repeatedComic = ({ id }) => 
    comicSelected.some((comic)=> comic.id === id)

const createdcomicToCart = (comicToCart) => {
    comicSelected = [...comicSelected, { ...comicToCart, quantity: 1 }];
}

const showSucces = msg => {
    //queda hacer un mensaje de que salio todo bien UwU
}
const addComicRepeated = (comicToCart) => {
    comicSelected = comicSelected.map((comicProduct) => comicProduct.id === comicToCart.id ? {...comicProduct, quantity: comicProduct.quantity + 1 } : comicProduct);
};
const checkCartState = () => {
    //guarde en el local storage mis productos
    SaveLocalStorage(comicSelected)

    //renderize el carrito
    renderComicsCart()
    statusPrice()
    //calcule y muestre el total
    //Muestre la cantidad de elementos en el carrito 
}
const addProduct = (e) => {
    
    if (!e.target.classList.contains(`comprar`)) {
        console.log("No sobrevivi al if :(")
        return;
    } 
    const { id, name, price, img } = e.target.dataset;
    const comicToCart = { id, name, price, img }
    
    if (repeatedComic(comicToCart)) {
        console.log("Estoy en comic repetido")
        //agregar unidades al producto existente
        
        addComicRepeated(comicToCart);
        console.log(comicToCart.quantity)
        //mostrar mensaje de succes
    } else {
        
        createdcomicToCart(comicToCart)
        //agregar producto al carro
        //mensaje de succes 
        
    }
    checkCartState();
}

const updatePrice = () => {
    return comicSelected.reduce((accum,currentValue) => accum + Number(currentValue.price) * currentValue.quantity, 0)
}
const statusPrice = () => {
    priceTotal.innerHTML = `${updatePrice().toFixed(2)}$`
}
const sumarCantidad = id => {
    const existingProduct = comicSelected.find(product => product.id === id)
    addComicRepeated(existingProduct)
}
const removeProduct = ({id}) => {
    comicSelected = comicSelected.filter ( comic => comic.id !== id)
    checkCartState()
}
const removerUnidadProducto = ({id}) => {
    comicSelected = comicSelected.map (comic => comic.id === id ? { ...comic, quantity: comic.quantity - 1  }: comic)
}
const restarCantidad = id => {
    const existingProduct = comicSelected.find(product => product.id === id)
    if (existingProduct.quantity === 1) {
        removeProduct(existingProduct)
        return
    }
    removerUnidadProducto(existingProduct)
}

const cambiarCantidad = e => {
    if (e.target.classList.contains(`down`)) {
        //Restar un producto
        restarCantidad(e.target.dataset.id)
    } else if (e.target.classList.contains(`up`)) {
        sumarCantidad(e.target.dataset.id)
    }
    checkCartState()
}
const statusButton = () => {
        
    console.log("Hopla")
    if (!comicSelected.length) {
        btnBorrarFinal.classList.add(`deshabilitado`)
        btnCompraFinal.classList.add(`deshabilitado`)
    }
    else {
        btnBorrarFinal.classList.remove(`deshabilitado`)
        btnCompraFinal.classList.remove(`deshabilitado`)
    }
}

//INIT
const init = () => {
    imgContainer.addEventListener(`mouseover`, () => {
        stopIMG()
    })
    imgContainer.addEventListener(`mouseout`, () => {
        startIMG()
    })
    window.addEventListener(`DOMContentLoaded`, async () => {
        startIMG() /*funcion del carrusel*/
        /*PARTE COMICS*/
        controlDisabilited()
        const results = await fetchComics()
        const resultsData = results.data.results        
        renderComics(resultsData)
        
    })
    nextPageBtn.addEventListener(`click`, async () => {
        
        valorOffset+=8
        controlDisabilited()
        const results = await fetchComics(valorOffset)
        const resultsData = results.data.results        
        renderComics(resultsData)
        pageController.page+=1
        pageNumberbtn.innerHTML=pageController.page
    })
    previousPageBtn.addEventListener(`click`, async () => {
        if (valorOffset === 3) {
            return
        }

        pageController.page-=1
        pageNumberbtn.innerHTML=pageController.page
        valorOffset-=8
        const results = await fetchComics(valorOffset)
        const resultsData = results.data.results        
        renderComics(resultsData)
    })
    btnCarrito.addEventListener(`click`, () => {
        containerBuy.classList.toggle(`oculto`)
        overlayIndex.classList.toggle(`oculto`)
    })
    document.addEventListener(`DOMContentLoaded`, renderComicsCart)
    containerComics.addEventListener(`click`, addProduct)
    document.addEventListener(`DOMContentLoaded`, statusPrice)
    
    btnCompraFinal.addEventListener(`click`, finishBuy)    
    btnBorrarFinal.addEventListener(`click`, deleteCart)  
    
    containerComicsCart.addEventListener(`click`, cambiarCantidad)


    document.addEventListener(`DOMContentLoaded`, statusButton) //deshabilita los botones de comprar y borrar carrito
    containerComics.addEventListener(`click`, statusButton)
    }

init()




/*COMICS*/
let valorOffset = 3 // va a ir cambiando segun la paginacion
const pageController = {
    page:0,
};

const conversionDolarPeso = (precioDolar) => {
    const pasadoAPeso = Math.floor(Number(precioDolar) * 355)  
    return pasadoAPeso
} 


const getComicHTML = ({id, title, thumbnail, prices,urls}) => { 
    
    return `
    <div class="card">
            
            <img src="${thumbnail.path}.jpg" alt="">
            
            
            <div class="container__text">
                <div class="title">
                    <h3>${title}</h3>  
                </div>
                <div class="precio">
                    <span>$${conversionDolarPeso(prices[0].price)}</span> 
                </div>
                    <button class="comprar" data-id='${id}'
                    data-name='${title}'
                    data-price='${conversionDolarPeso(prices[0].price)}'
                    data-img='${thumbnail.path}.jpg'>
                        <p>
                            Agregar al carro
                        </p>
                    </button>
                 </div>
                 <div class="info-comic">
                    <a href="${urls[0].url}" target="#blank"><i class="fa-solid fa-circle-info"></i></a>
                 </div>
            </div>
        `
}

const renderComics = (comics) => {    
    containerComics.innerHTML = comics.map(comic => getComicHTML(comic)).join(``) 
    
    
    
       

}
