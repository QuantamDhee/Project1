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

    let input = document.createElement('input')
    input.name = 'comment' 
    input.type = 'text'

    let submitInput = document.createElement('input')
    submitInput.type = 'submit'
    submitInput.value = 'Submit'

    form.addEventListener('submit', submitRev)

    form.append(input, submitInput)
    div.append(heading, img, p, ul, form)

    
    // lists the comments/reviews into an unordered list
    gamer.comments.forEach(comment => {
        let li = document.createElement('li')
        li.innerText = comment 
        // li.dataset.gameId = comment
        ul.appendChild(li)
    })
    gameDiv.appendChild(div)
}

const submitRev = event => {
    event.preventDefault()
   const id = event.target.dataset.gameId
    let revObj = {
        comments: [...selectGame.comments, event.target.comment.value] 
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


// // const filteredComments = game.comments.filter(comments => comments.length)

// function handleLike(e){
//     console.log(e.target.tagName)
//     // uses event delegation to detect origin/target of event
//     // conditional so that we only execute code when the event target was a button
//     if(e.target.tagName ==="BUTTON"){
//         // gets the right book id from the event target dataset; need the id for the PATCH request
//         const id = e.target.dataset.bookId
//         console.log(id)
//         // conditional to check whether the button should add or remove a liker/user
//         if (e.target.innerText == 'LIKE') {
//             getOneBook(id)
//             .then(book => {
//                 // adds the current user to the request body
//                 const body = {
//                     users: [...book.users, currentUser]
//                 }
//                 updateLikes(body, id)
//             })
//         } else {
//             getOneBook(id)
//             .then(book => {
//                 // removes the currentUser from the users array
//                 const filteredUsers = book.users.filter(user => user.id != currentUser.id)
//                 const body = {
//                     users: filteredUsers
//                 }
//                 updateLikes(body, id)
//             })
//         }
//     }

// }

