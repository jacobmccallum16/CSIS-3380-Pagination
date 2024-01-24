let ulContactList = document.getElementById("contactList")
let h3ContactTotal = document.getElementById("contactTotal")
let ulPagination = document.getElementById("pagination")

let number = 22
let maxNumber = users.length
let page = 1
let pagesNeeded = 1 // This is because I think there should still be 1 page even with 0 contacts
if (number > 10) {
  pagesNeeded = number / 10 + 1
}

let dynamicData = false // this will be flipped if it becomes true

// I added a little feature to stay on the same page even with a page refresh
let storedPage = Number.parseInt(sessionStorage.getItem("pageNumber"))
if (storedPage > 0 && storedPage <= pagesNeeded) {
  page = storedPage
}

function createPaginationButtons() {
  ulPagination.innerHTML = ""
  for (let i = 1; i <= pagesNeeded; i++) {
    ulPagination.innerHTML += `<li><button id="page${i}" onclick="loadPage(${i})">${i}</button></li>`
  }
}

function loadPage(newPage) {
  ulPagination.children[page-1].children[0].classList.remove("active")
  page = newPage
  if (!dynamicData) {
    sessionStorage.setItem("pageNumber", page)
  }
  ulPagination.children[page-1].children[0].classList.add("active")
  ulContactList.innerHTML = ""
  for (let i = (page*10-10); i < number && i < page*10; i++) {
    ulContactList.innerHTML += `
    <li class="contact-item cf">
    <div class="contact-details">
        <img class="avatar" src="${users[i].image}">
        <h3>${users[i].name}t</h3>
        <span class="email">iboya.vat@example.com</span>
    </div>
      <div class="joined-details">
        <span class="date">Joined ${users[i].joined}</span>
      </div>
    </li>
    `
  }
}

// adding a feature to load new data, this data will disappear on page refresh, though
let newDataDiv = document.getElementById("newDataDiv")
async function getNewData() {
  let newCount = Math.floor(Math.random() * 76) + 25 // number between 25 and 100
  let usersNewObj = await fetch(`https://randomuser.me/api/?results=${newCount}&inc=name,picture,registered`)
  let usersNewText = await usersNewObj.text()
  let usersNewData = JSON.parse(usersNewText)
  let newData = usersNewData.results
  // document.getElementsByTagName("body")[0].innerHTML += `<div style="text-align: center">${usersNewText}</div>`
  // document.getElementsByTagName("body")[0].innerHTML += `<div style="text-align: center">${newData}</div>`
  number = newCount
  page = 1
  pagesNeeded = number / 10 + 1
  users = []
  for (let i = 0; i < newCount; i++) {
    // It looks wild but this date-parsing method is easier for me
    let date = newData[i].registered.date
    users[i] = {
      "name" : `${newData[i].name.first} ${newData[i].name.last}`,
      "image" : `${newData[i].picture.thumbnail}`,
      "joined" : `${date[8]}${date[9]}/${date[5]}${date[6]}/${date[0]}${date[1]}${date[2]}${date[3]}`
    }
  }
  h3ContactTotal.innerHTML = `Total: ${number}`
  createPaginationButtons()
  loadPage(page)
  // document.getElementsByTagName("body")[0].innerHTML += `<div style="text-align: center">USERS: ${users}</div>`
  dynamicData = true
}
newDataDiv.innerHTML += `<button id="newDataBtn" onclick="getNewData()">Get New Data (25-100 results)</button>`
// Loading it before some other things to make the page-load feel smoother

h3ContactTotal.innerHTML = `Total: ${number}`
createPaginationButtons()
loadPage(page)
