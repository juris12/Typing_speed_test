import Game from './game.js'
import StoredProfiles from './helper.js'

const storedProfileInfo = new StoredProfiles('profilData')
const testTyping = document.getElementById('test_typing');
const curentWord = document.getElementById('curent_word');
let testSpans = document.querySelectorAll('.test_span');
const texttttt = 'Lorem ipsum lremu cumledum lorem ipLorem ipsum lremu cumledum lorem ipsuahst jajsf afgj ajjawksfkk ao asfa Lorem ipsum lremu cumledum lorem ipsuahst jajsf afgj ajjawksfkk ao asfa Lorem ipsum lremu cumledum lorem ipsuahst jajsf afgj ajjawksfkk ao asfa Lorem ipsum lremu cumledum lorem ipsuahst jajsf afgj ajjawksfkk ao asfa Lorem ipsum lremu cumledum lorem ipsuahst jajsf afgj ajjawksfkk ao asfa Lorem ipsum lremu cumledum lorem ipsuahst jajsf afgj ajjawksfkk ao asfa suahst jajsf afgj ajjawksfkk ao asfa'
const statsElements = {
    countdownSpan: document.getElementById("countdown"),
    speedSpan: document.getElementById("speed"),
}
const game = new Game(500,statsElements,storedProfileInfo); // Initialize with 60 seconds
async function getRandomText() {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler');
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error fetching random text:', error);
      return ''
    }
  }
const add_text = async (testTyping) => {
    let text = ''
    getRandomText().then(random => {
        random.split(' ').forEach(word => {
            const spanElement = document.createElement('span');
            spanElement.className = 'test_span';
            spanElement.textContent = word;
            spanElement.id = '';
            
            testTyping.appendChild(spanElement);
        });
        game.text = [...game.text,...text.split(' ')]
        
    })
}


document.addEventListener("DOMContentLoaded", async function() {

    let currentIndex = 0;
    const set_curent_span = async (i) => {
        await add_text(testTyping);
        testSpans.forEach(leater => {
            leater.id = ''
        })
        
        testSpans[i].id = 'test_span_curent';
    }
    set_curent_span(currentIndex)



    function handleKeyPress(event) {
        game.startTimer(); // Start the timer
        curentWord.innerHTML = ''
        let curentWordIndex = 0
        let row = 0
        let rowWidth = 0
        document.addEventListener("keyup", function(event) {
            if (/^[a-zA-Z0-9]$/.test(event.key)) {
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
                rowWidth += testSpans[row].offsetWidth
                console.log(row + ' ' + testSpans[row].offsetWidth+ ' ' +  rowWidth + ' ' + testSpans.length)
                if (rowWidth >= testTyping.offsetWidth-50) {
                    currentIndex -= row
                    rowWidth = 0 
                    for (let i = 0; i < row; i++) {
                        if (testTyping.firstChild) {
                            testTyping.removeChild(testTyping.firstChild);
                        }
                    }
                    row = 0
                    testSpans = document.querySelectorAll('.test_span')
                }
                if (game.currentWord == game.text[currentIndex]) {
                    game.words++
                    testSpans[currentIndex].className += ' test_span_old'    
                } else {
                    testSpans[currentIndex].className += ' test_span_error' 
                }
                game.allWords++
                game.currentWord = ''
                currentIndex++
                row++
                set_curent_span(currentIndex)
                curentWord.innerText = ''
                curentWordIndex = 0
            } else if (event.key === 'Backspace') {
                  game.currentWord = game.currentWord.slice(0,-1)
                curentWord.removeChild(curentWord.lastChild)
                curentWordIndex = curentWordIndex === 0 ? 0 : curentWordIndex - 1
            } else if (event.key === 'Enter') {

            } else if (event.key === 'Escape') {

            }
        });
        document.removeEventListener('keypress', handleKeyPress);
        }
    document.addEventListener('keypress', handleKeyPress);
});