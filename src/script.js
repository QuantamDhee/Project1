const url = "http://localhost:3000/games"
const list = document.querySelector("#list")

document.addEventListener('DOMContentLoaded', event => {
    gotGames()
})

const gotGames = () => {
    fetch(url)
    .then(r => r.json())
    .then(games => listedGames(games))
}
 
const listedGames = games =>{
    games.forEach(game => lister(game))
}
const lister = game => {
    const li = document.createElement('li')
    li.textContent = game.name
    li.dataset.gameId = game.id
    li.addEventListener('click', viewOne)
    list.appendChild(li)
}

const viewOne = event =>{
    const id = event.target.dataset.gameId
    console.log(id)
    fetch(url + `/${id}`)
    .then(r => r.json())
    .then(game => gamerView(game))
}

// const getAGame = id =>{
//     return fetch(url + `/${id}`)
//     .then(r => r.json())
// }

// function initialize(){
//     listedGames()
// }
// initialize()


// const viewAGame = () =>{
//     return fetch(url + `/${id}`)
//     .then(r => r.json())
// }

// const someGame = (data) =>{
//     data.forEach(gamer => gamerList(gamer))
// }

// const gamerList = gamer =>{
//     const li = document.createElement('li')
//     li.textContent = gamer.name
//     // li.dataset.gamerId = gamer.id
//     list.appendChild(li)
// }

const gamerView = (gamer) => {
    let gameDiv = document.querySelector('#game-collection')
    gameDiv.innerHTML = ""

    let div = document.createElement('div')
    div.className = 'game'

    let heading = document.createElement('h2')
    heading.innerText = gamer.name

    let img = document.createElement('img')
    img.className = 'game-img'
    img.src = gamer.image

    let p = document.createElement('p')
    p.innerText = `DEVELOPER: ${gamer.developer}`

    let ul = document.createElement('ul')


    div.append(heading, img, p, ul)
    
    gamer.comments.forEach(comment => {
        let li = document.createElement('li')
        li.innerText = comment 
        ul.appendChild(li)
    })
    gameDiv.appendChild(div)
}



