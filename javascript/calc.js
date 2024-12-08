'use strict'

let main = document.getElementById('main')
let textContainer = document.getElementById('text-container')
let resultsContainer = document.getElementById('results')
let wpmText = document.getElementById('wpm')
let accuracyText = document.getElementById('accuracy')
let timeText = document.getElementById('time')


document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                document.body.style.filter = "blur(10px)"; // Применяем размытие
								console.log("[+] nonfocus");
            } else {
                document.body.style.filter = "blur(0px)"; // Убираем размытие
								console.log("[+] focused");
            }
        });

document.addEventListener('copy', function(event){
  event.preventDefault();
  document.getElementById('message').style.display = "block";
});
document.addEventListener('paste', function(event){
  event.preventDefault();
  document.getElementById('message2').style.display = "block";
})

const invalidKeys =
	'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(
		' '
	)
const text =
	'Technology has transformed the way we learn and access information. With the advent of the internet, students can now find resources and educational materials at their fingertips. Online courses and virtual classrooms have made education more accessible to people around the world. However, it is essential to strike a balance between technology and traditional learning methods. While technology can enhance the learning experience, face-to-face interactions and hands-on activities remain vital for developing critical thinking and social skills.';
const textArr = text.split('')
const htmlArr = textArr.map((item, index, array) => {
	if (item === ' ') {
		return `<span class="space" id="span${index}">${item}</span>`
	}
	return `<span class="char" id="span${index}">${item}</span>`
})
let errors = []
textContainer.innerHTML = htmlArr.join('')
let firstTime = true
let currentPos = 0
let backspaceNeeded = false
let currentTime = 0
let repeat
document.addEventListener('keydown', event => {
	if (event.key === ' ') {
		event.preventDefault()
	}
	if (firstTime) {
		firstTime = false
		repeat = setInterval(() => currentTime++, 1000)
	}
	if (event.location === 0 && !invalidKeys.includes(event.key)) {
		handleKey(event.key)
	}
})

const layoutDisplay = document.getElementById('layoutDisplay');

document.addEventListener('keydown', (event) => {
    const key = event.key;


    if (/^[a-zA-Z]$/.test(key)) {
        layoutDisplay.textContent = 'keyboard layout: eu';
    }

    else if (/^[а-яА-Я]$/.test(key)) {
        layoutDisplay.textContent = 'keyboard layout: ru';
    } else{
			layoutDisplay.textContent = 'keyboard layout: ??'
		}
});

function handleKey(key) {
	let span = document.getElementById(`span${currentPos}`).style
	if (!backspaceNeeded) {
		if (key === textArr[currentPos]) {
			span.color = 'green'
			currentPos++
		} else {
			if (textArr[currentPos] === ' ') {
				span.backgroundColor = 'red'
			} else {
				span.color = 'red'
			}
			backspaceNeeded = true
			errors.push(textArr[currentPos])
		}
	} else {
		if (event.key === 'Backspace') {
			if (textArr[currentPos] === ' ') {
				span.backgroundColor = 'transparent'
			} else {
				span.color = 'black'
			}
			backspaceNeeded = false
		}
	}
	if (currentPos === textArr.length) {
		clearInterval(repeat)
		handleEnd()
	}
}







function handleEnd() {
	let wpm = Math.floor(textArr.length / 5 / (currentTime / 60))
	let accuracy = Math.floor(
		((textArr.length - errors.length) / textArr.length) * 100
	)
	let multiples = Math.floor(currentTime / 60)
	let seconds = currentTime - multiples * 60
	wpmText.innerHTML = `${wpm} wpm`
	accuracyText.innerHTML = `${accuracy}%`
	timeText.innerHTML = `${multiples} m ${seconds} s`
	main.style.display = 'none'
	resultsContainer.style.display = 'block'
}
