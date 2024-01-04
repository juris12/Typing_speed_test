import StoredProfiles from './helper.js'

export default class Game {
    constructor(initialTime, statsElements) {
        this.text = []
        this.time = initialTime;
        this.timerInterval = null;
        this.timePased = 0
        this.date = `${String(new Date().getDate()).padStart(2,'0')}.${String(new Date().getMonth() + 1).padStart(2,'0')}`
        this.countdownSpan = statsElements.countdownSpan
        this.speedSpan = statsElements.speedSpan
        this.speed = 0
        this.words = 0
        this.allWords = 0
        this.currentWord = ''
        this.storedProfileInfo = new StoredProfiles('profilData')
    }

    startTimer() {
        let second = 0
        this.timerInterval = setInterval(() => {
        if (this.time > 0) {
            second++
            if(second == 10){
                this.timePased++
                this.time--
                second = 0
            }
            
            this.updateTimer()
        } else {
            this.stopTimer()
            this.storedProfileInfo.updateData(this)
            window.location.href = './profil_page.html'
        }
        }, 100);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }

   
    updateTimer() {
        let formattedTime = `${Math.floor(this.time / 60).toString().padStart(2, '0')}:${(this.time % 60).toString().padStart(2, '0')}`;
        this.speed = ((this.signs*0.2) / (this.timePased / 60)).toFixed(2)
        this.countdownSpan.innerText = formattedTime
        this.speedSpan.innerText = Math.floor(this.speed)
    }
}