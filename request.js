const urlBASE = `https://gateway.marvel.com:443/v1/public/comics
` /*Configurada para un maximo de 8 comics(por el momento)*/ 
const urlKEY = `&ts=1&apikey=9d3f91af165ba12e1c8d5df6784ae9a2&hash=8770890b6578b78f63c325c41c27da40`

const ArrivalOrden = `https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=`
const FirstVol =`https://gateway.marvel.com:443/v1/public/comics?orderBy=issueNumber&limit=8&offset=`
const OnSale = `https://gateway.marvel.com:443/v1/public/comics?orderBy=onsaleDate&limit=8&offset=`

const fetchComics = async (filterSearch, offset=3) => {
    const response = await fetch(`${filterSearch}${offset}${urlKEY}`)   
    const data = await response.json();
    console.log(data)
    return data
}
fetchComics()   /*FUNCIONA!*/ 