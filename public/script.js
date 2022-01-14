function getPrimeraPagina(event){
    fetch('http://127.0.0.1:3000/')
    .then( resp => resp.json() )
}

