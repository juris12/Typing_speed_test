
export default class StoredProfiles {
    constructor(storedObjName) {
        this.storedObjName = storedObjName
        this.storedProfileInfo = localStorage.getItem(this.storedObjName)
        this.curentProfile = JSON.parse(localStorage.getItem(`${this.storedObjName}Curent`))
        this.data = []
        if(this.storedProfileInfo){
            this.data = JSON.parse(this.storedProfileInfo)
        }
    }
    updateData(results) {
        
        const curentProfilIndex = this.data.findIndex(prof => prof.name === this.curentProfile?.name)
        if (curentProfilIndex !== -1) {
            const resultsToBeSaved = {
                speed: results.speed,
                errors: results.errors,
                date: results.date,
                words: results.words,
                accuracy: (results.words/results.allWords*100).toFixed(2)
            }
            this.curentProfile.tests.push(resultsToBeSaved)
            this.curentProfile.score = this.curentProfile.tests.reduce((sum,val) => sum += parseFloat(val.speed),0)/this.curentProfile.tests.length
            this.data[curentProfilIndex].tests.push(resultsToBeSaved)
            this.data[curentProfilIndex].score = resultsToBeSaved.speed
            localStorage.setItem(`${this.storedObjName}Curent`,JSON.stringify(this.curentProfile))
            localStorage.setItem(this.storedObjName,JSON.stringify(this.data))
        }else{
            console.error('not loged in!')
        }
    }
    logIn(name) { 
        const curentProfil = this.data.find(prof => prof.name === name)
        if (curentProfil != undefined) {
            this.curentProfile = curentProfil
            localStorage.setItem(`${this.storedObjName}Curent`,JSON.stringify(curentProfil))
            return true
        } else {
            alert(`Profil with name: ${name} does not exit!`)
        }
    }
    logOut() {
        this.curentProfil = '{}'
        localStorage.setItem(`${this.storedObjName}Curent`,JSON.stringify('{}'))
    }
    getProfiles() {
        if(this.storedProfileInfo){
            this.data = JSON.parse(this.storedProfileInfo)
        }
    }
    writeProfiles(profil) {
        if (profil) {
            this.data.push(profil)
            localStorage.setItem(this.storedObjName,JSON.stringify(this.data))
        }else{
            console.error('You must add name')
        }
    }
    
}
