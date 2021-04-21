const url = "http://localhost:3000/games/1"

document.addEventListener('DOMContentLoaded', event => {
    gotGames()
})

const gotGames = () => {
    fetch(url)
    .then(r => r.json())
    .then(data => gamerList(data))
}

const gamerList = (gamer) => {

    let div = document.createElement('div')
    div.className = 'game'

    let heading = document.createElement('h2')
    heading.innerText = gamer.name

    let img = document.createElement('img')
    img.className = 'game-img'
    img.src = gamer.image

    let p = document.createElement('p')
    p.innerText = gamer.developer

    div.append(heading, img, p)

    let gameDiv = document.querySelector('#game-collection')
    gameDiv.appendChild(div)
}