const url = "http://localhost:3000/games/1"

document.addEventListener('DOMContentLoaded', event => {
    game()
})

const game = () => {
    fetch(url)
    .then(r => r.json())
    .then(data => console.log(data))
}

const gamerList = () => {
    
}