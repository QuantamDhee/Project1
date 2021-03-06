const url = "http://localhost:3000/games"
const list = document.querySelector("#list")

document.addEventListener('DOMContentLoaded', event => {
    // form.addEventListener('submit', submitRev)
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
    // console.log(id)
    fetch(url + `/${id}`)
    .then(r => r.json())
    .then(game => {
        gamerView(game)
    })
}



let selectGame = {}

//once game is clicked it shows this format of heading, img, p, ul
const gamerView = (gamer) => {

    selectGame = gamer

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

    let form = document.createElement('form')
    form.dataset.gameId = gamer.id

    // let updateForm = document.createElement('form')
    // updateForm.dataset.gameId = gamer.id

    let input = document.createElement('input')
    input.name = 'comment' 
    input.type = 'text'

    // let upInput = document.createElement('input')
    // upInput.name = 'comment'
    // upInput.type = 'text'

    let submitInput = document.createElement('input')
    submitInput.type = 'submit'
    submitInput.value = 'Submit'

    // let updateInput = document.createElement('input')
    // updateInput.type = 'update'
    // updateInput.value = 'Update'
    

    form.addEventListener('submit', submitRev)
    // form.addEventListener('update', updateRev)

    form.append(input, submitInput)
    div.append(heading, img, p, ul, form)

    
    // lists the comments/reviews into an unordered list
    
    gamer.comments.forEach(comment => {
        let button = document.createElement('button')
        button.innerText = 'ew'
        button.data = gamer.id
        let li = document.createElement('li')
        li.innerText = comment 
        li.dataset.gameId = comment
        // li.append(button)
        ul.append(li, button)
        // li.addEventListener('click', updateRev)
        button.addEventListener('click', event => updateRev(event, gamer))
        // button.addEventListener('click', () => ul.removeChild(li))
    })


    gameDiv.appendChild(div)
}

const submitRev = event => {
    event.preventDefault()
   const id = event.target.dataset.gameId
    let revObj = {
        comments: [...selectGame.comments, event.target.comment.value] 
    }

    // games.comments.filter(game => game.comments)
    // console.log(submitRev)

    let configObj ={
        method: 'PATCH',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(revObj)
    }

    fetch(url + `/${id}`, configObj)
    .then(r => r.json())
    .then(game => gamerView(game))
}


const updateRev = (event, gamer) => {
    const id = event.target.data
    let filterComment = gamer.comments.filter(comments => comments != event.target.previousElementSibling.textContent)
    // console.log(filterComment)
    // let filterComment = [...selectGame.comments, event.target.comment.value].filter
    let revObj = {
        comments: filterComment
    }
    let configObj ={
        method: 'PATCH',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(revObj)
    }
    fetch(url + `/${id}`, configObj)
    .then(r => r.json())
    .then(game => gamerView(game))
}

// const something = function(event, li) {
//     event.preventDefault()

//     let button = document.createElement('button')
//     button.innerText = 'no'
    
//     li.append(button)
//     button.addEventListener('click', () => ul.removeChild(li))
// }
