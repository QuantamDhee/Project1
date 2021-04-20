const url = "http://localhost:3000/games/1"

document.addEventListener('DOMContentLoaded', event => {
    gotGames()
})

const gotGames = () => {
    fetch(url)
    .then(r => r.json())
    .then(data => gamerList(data))
}

const gamerList = (gamez) => {

    let div = document.createElement('div')
    div.className = 'game'

    let heading = document.createElement('h2')
    heading.innerText = gamez.name

    let img = document.createElement('img')
    img.src = gamez.image

    div.append(heading, img)
}