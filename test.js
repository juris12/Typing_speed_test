import Game from './game.js'
import StoredProfiles from './helper.js'

const storedProfileInfo = new StoredProfiles('profilData')

const texttttt = 'Lorem ipsum lremu cumledum lorem ipsuahst jajsf afgj ajjawksfkk ao asfa'.split('')


const add_text = (text,testTyping) => {
    text.forEach(leater => {
        const spanElement = document.createElement('span');
        spanElement.className = 'test_span';
        spanElement.textContent = leater;
        spanElement.id = '';
        if(leater === ' '){spanElement.classList.add('test_span_whitespace')};
        
        testTyping.appendChild(spanElement);
    });
}






document.addEventListener("DOMContentLoaded", function() {

    const statsElements = {
        countdownSpan: document.getElementById("countdown"),
        speedSpan: document.getElementById("speed"),
        errorsSpan: document.getElementById("errors"),
        errorRateSpan: document.getElementById("errorRate"),
        lastKeySpan: document.getElementById("lastKey"),
        signsSpan: document.getElementById("signs")
    }


    const testTyping = document.getElementById('test_typing');
    add_text(texttttt,testTyping);
    let currentIndex = 0;
    let currentAllLetterIndex = 0;
    let testSpans = document.querySelectorAll('.test_span');

    const game = new Game(5,statsElements,storedProfileInfo); // Initialize with 60 seconds
   



    const set_curent_span = (i) => {
        testSpans.forEach(leater => {
            leater.id = ''
        })
        testSpans[i].id = 'test_span_curent';
    }
    set_curent_span(currentAllLetterIndex)
    testTyping.style.right = `${(testSpans[0].offsetWidth/2) +parseInt(testTyping.style.right)}px`

    function handleKeyPress(event) {
        game.startTimer(); // Start the timer
        document.addEventListener("keyup", function(event) {
            game.updateErrorRateStats(currentAllLetterIndex)
            if (/^[a-zA-Z0-9 ]$/.test(event.key)) {
                const isShiftPressed = event.shiftKey;
                const pressedKey = isShiftPressed ? event.key.toUpperCase() : event.key;
                const curentElementh = testSpans[currentAllLetterIndex]
                
                if (pressedKey === texttttt[currentIndex]) {
                    game.signs += 1
                    game.lastkey = pressedKey
                    if(texttttt[currentIndex + 1] === ' '){
                        game.words += 1
                    }
                    set_curent_span(currentAllLetterIndex+1)
                    let newRightValue=(parseFloat(getComputedStyle(testSpans[currentAllLetterIndex+1]).width)/2)+parseFloat(getComputedStyle(curentElementh).width)/2
                    testTyping.style.right = `${newRightValue +parseFloat(testTyping.style.right)}px`
                    curentElementh.classList.add('test_span_old')

                    currentIndex++
                    currentAllLetterIndex++
                    testSpans = document.querySelectorAll('.test_span')


                } else {
                    game.error += 1;
                    const wrongLeter = document.createElement('span');
                    wrongLeter.style.color = 'red'
                    wrongLeter.className = 'test_span';
                    wrongLeter.textContent = pressedKey === ' ' ? '_' : pressedKey;

                    testTyping.insertBefore(wrongLeter, curentElementh);
                    testTyping.style.right = `${parseFloat(getComputedStyle(wrongLeter).width) + parseFloat(testTyping.style.right)}px`
                    currentAllLetterIndex++;
                    testSpans = document.querySelectorAll('.test_span');
                }
            }
        });
        document.removeEventListener('keypress', handleKeyPress);
        }
    document.addEventListener('keypress', handleKeyPress);
});