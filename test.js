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
      return data.join(' ');
    } catch (error) {
      console.error('Error fetching random text:', error);
      return ''
    }
  }
  const add_text = async (testTyping) => {
    const data = await getRandomText()
    data.split(' ').filter((val) => val !== '').forEach(word => {
        const spanElement = document.createElement('span');
        spanElement.className = 'test_span';
        spanElement.textContent = word;
        spanElement.id = '';
        testTyping.appendChild(spanElement);
    });
    game.text = [...game.text,...data.split(' ').filter((val) => val !== '')]
    console.log('-----------------------------------------')
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
        game.startTimer(); // Start the timer
        curentWord.innerHTML = ''
        let curentWordIndex = 0
        let removeIndex = 0
        let row = 0 
        
        let rowWidth = 0
        document.addEventListener("keyup", async function(event) {
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
                rowWidth += testSpans[removeIndex].offsetWidth
                console.log(game.text[currentIndex],testSpans[currentIndex].innerHTML,testSpans.length,game.text.length,removeIndex,row, currentIndex)
                if(game.currentWord === game.text[currentIndex]) {
                    testSpans[currentIndex].classList.add('test_span_old')
                } else {
                    testSpans[currentIndex].classList.add('test_span_error')
                }
                if (rowWidth >= testTyping.offsetWidth) {
                    if(row == 2){
                        row = 0
                        console.log('+++++++++++++++++++++++++++++++++++++++')
                        testSpans = await add_text(testTyping);
                        testSpans = document.querySelectorAll('.test_span')
                        
                        console.log('ll',row)
                    } else {
                        currentIndex -= removeIndex
                        row++
                        rowWidth = 0 
                        game.text.splice(0,removeIndex) 
                        while (testTyping.firstChild && removeIndex > 0) {
                            testTyping.removeChild(testTyping.firstChild);
                            removeIndex--;
                        }
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