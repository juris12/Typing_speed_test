import StoredProfiles from './helper.js'
const profilList = document.getElementById('profil_list')
const profilInerRight = document.getElementById('profil_iner_right')
const addProfilButton = document.querySelector('.add_profil_button')
const profilInerLeft = document.querySelector('#profil_iner_left')
const addProfilForm = document.querySelector('form')
const goBackProfilButton = document.querySelector('.go_back_profil_button')

const storedProfileInfo = new StoredProfiles('profilData1')

addProfilButton.addEventListener('click', () => {
    profilInerRight.style.display = 'flex'
    profilInerLeft.style.display = 'none'
})
goBackProfilButton.addEventListener('click', () => {
    profilInerRight.style.display = 'none'
    profilInerLeft.style.display = 'flex'
})
storedProfileInfo.data.forEach((value) => {
    const listElement = document.createElement('li')
    const listButton = document.createElement('button')
    listButton.textContent = `${value.name} Score: ${value.score} wpm`
    listButton.addEventListener('click', () => {
        if (storedProfileInfo.logIn(value.name)) {
            window.location.href = '../profil_page.html';
        }
    })
    listElement.appendChild(listButton)
    profilList.appendChild(listElement)
})



addProfilForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let newName = document.querySelector('#newProfileName')
    if (newName.value != '' && !storedProfileInfo.data.some(obj => obj.name === newName.value)) {
        storedProfileInfo.writeProfiles({
            name: newName.value,
            score: 0,
            tests: []
        })
        newName.value = ''
        location.reload()
    } else {
        alert('Profile either doesn’t exit or text field is empty!')
    }
})