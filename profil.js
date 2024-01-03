import StoredProfiles from './helper.js'
const profilList = document.getElementById('profil_list')
const profilInerRight = document.getElementById('profil_iner_right')
const addProfilButton = document.querySelector('.add_profil_button')
const addProfilForm = document.querySelector('form')

const storedProfileInfo = new StoredProfiles('profilData')

addProfilButton.addEventListener('click', () => {
    profilInerRight.style.display = 'flex'
    addProfilButton.style.display = 'none'
})

storedProfileInfo.data.forEach((value) => {
    const listElement = document.createElement('li')
    const listButton = document.createElement('button')
    listButton.textContent = value.name + " " +  value.score
    listButton.addEventListener('click', () => {
        if (storedProfileInfo.logIn(value.name)) {
            window.location.href = '/profil_page.html';
        }
    })
    listElement.appendChild(listButton)
    profilList.appendChild(listElement)
})



addProfilForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let newName = document.querySelector('#newProfileName')
    if (newName.value != '') {
        storedProfileInfo.writeProfiles({
            name: newName.value,
            score: 0,
            tests: []
        })
        newName.value = ''
        location.reload()
    } else {
        alert('sss')
    }
})