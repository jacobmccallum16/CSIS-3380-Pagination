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
  sessionStorage.setItem("pageNumber", page)
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

h3ContactTotal.innerHTML = `Total: ${number}`
createPaginationButtons()
loadPage(page)
