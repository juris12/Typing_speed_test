import Game from './game.js'
import StoredProfiles from './helper.js'

const storedProfileInfo = new StoredProfiles('profilData1')
const testTyping = document.getElementById('test_typing');
const curentWord = document.getElementById('curent_word');
let testSpans = document.querySelectorAll('.test_span');
const statsElements = {
    countdownSpan: document.getElementById("countdown"),
    speedSpan: document.getElementById("speed"),
    accuracySpan: document.getElementById("accuracy"),
}


const game = new Game(60,statsElements,storedProfileInfo); // Duration of test. Initialize with 60 seconds
async function getRandomText() {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler');
      const data = await response.json();
      return data.join(' ');
    } catch (error) {
      console.error('Error fetching random text:', error);
      return ''
    }
  }
  const add_text = async (testTyping) => {
    const data = await getRandomText() + await getRandomText()
    data.split(' ').filter((val) => val !== '').forEach(word => {
        const spanElement = document.createElement('span');
        spanElement.className = 'test_span';
        spanElement.textContent = word;
        spanElement.id = '';
        testTyping.appendChild(spanElement);
    });
    game.text = [...game.text,...data.split(' ').filter((val) => val !== '')]
    return document.querySelectorAll('.test_span');
}


document.addEventListener("DOMContentLoaded", async function() {
    testSpans = await add_text(testTyping);
    let currentIndex = 0;
    const set_curent_span = async (i) => {
         testSpans.forEach(leater => {
            leater.id = ''
        })
        
        testSpans[i].id = 'test_span_curent';
    }
    set_curent_span(currentIndex)



    async function handleKeyPress() {
        game.startTimer();
        curentWord.innerHTML = ''
        let curentWordIndex = 0
        let removeIndex = 0
        let rowWidth = 0
        document.addEventListener("keyup", async function(event) {
            if (/^[a-zA-Z0-9,.\\-_]$/.test(event.key)) {
                const isShiftPressed = event.shiftKey;
                const pressedKey = isShiftPressed ? event.key.toUpperCase() : event.key;
                game.currentWord += pressedKey
                if (pressedKey === game.text[currentIndex][curentWordIndex]) {
                    curentWord.innerHTML += `<span class="test_span_old">${pressedKey}</span>`
                } else {
                    curentWord.innerHTML += `<span class="test_span_error">${pressedKey}</span>`
                }
                curentWordIndex++
            } else if (event.key === ' ') {
                console.log(game.text[currentIndex],testSpans[currentIndex].innerHTML,game.speed,game.words,game.allWords)
                rowWidth += testSpans[removeIndex].offsetWidth
                if(game.currentWord === game.text[currentIndex]) {
                    game.words++
                    testSpans[currentIndex].classList.add('test_span_old')
                } else {
                    game.errors++
                    testSpans[currentIndex].classList.add('test_span_error')
                }
                if (rowWidth >= testTyping.offsetWidth) {
                    currentIndex -= removeIndex
                    rowWidth = 0 
                    game.text.splice(0,removeIndex) 
                    while (testTyping.firstChild && removeIndex > 0) {
                        testTyping.removeChild(testTyping.firstChild);
                        removeIndex--;
                    }
                    testSpans = document.querySelectorAll('.test_span')
                }
                removeIndex++
                game.allWords++
                game.currentWord = ''
                currentIndex++
                set_curent_span(currentIndex)
                curentWord.innerText = ''
                curentWordIndex = 0
            } else if (event.key === 'Backspace') {
                  game.currentWord = game.currentWord.slice(0,-1)
                if (curentWord.lastChild) {
                    curentWord.removeChild(curentWord.lastChild)
                }
                curentWordIndex = curentWordIndex === 0 ? 0 : curentWordIndex - 1
            } else if (event.key === 'Enter') {
                location.reload();
            } else if (event.key === 'Escape') {
                location.reload();
            }
        });
        document.removeEventListener('keypress', handleKeyPress);
        }
    document.addEventListener('keypress', handleKeyPress);
});