var formulario = document.querySelector('form')

formulario.addEventListener('submit', function (e) {

    //bloqueia o refresh da página
    e.preventDefault()

    //url da pesquisa
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";

    //valor do input name
    let nome = document.getElementById("name")

    // concatena a url com o input name
    urlForm = urlForm + this.name.value

    //transforma os valores em minúsculas
    urlForm = urlForm.toLocaleLowerCase()

    //id content
    let resposta = document.getElementById('content')

    //id imagem pokemon
    let imagem = document.getElementById('imgPokemon')

    //resposta em HTML
    let html = ''

    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function (data) {
            
            html = 'Nome: ' + maiuscula(data.name) + '<br>'
            html = html + 'Type: ' + maiuscula(data.types[0].type.name)
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
        })
        .catch(function (err) {
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokémon não encontrado!'
            } else {
                html = 'Pokémon não encontrado. Erro: '+ err
            }
            resposta.innerHTML = html
        })
});

function maiuscula(val){
    return val[0].toUpperCase() + val.substr(1)
}