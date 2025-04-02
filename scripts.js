
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function closeWindow() {
    self.close();
}

let currentImg = 0;
let items;

function updateCarousel() {
    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'prev2', 'next2');
        
        const totalItems = items.length;
        const prevIndex = (currentImg - 1 + totalItems) % totalItems;
        const prev2Index = (currentImg - 2 + totalItems) % totalItems;
        const nextIndex = (currentImg + 1) % totalItems;
        const next2Index = (currentImg + 2) % totalItems;

        if (index === currentImg) {
            item.classList.add('active');
        } else if (index === prevIndex) {
            item.classList.add('prev');
        } else if (index === nextIndex) {
            item.classList.add('next');
        } else if (index === prev2Index) {
            item.classList.add('prev2');
        } else if (index === next2Index) {
            item.classList.add('next2');
        }
    });
}

function nextSlide() {
    currentImg = (currentImg + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    currentImg = (currentImg - 1 + items.length) % items.length;
    updateCarousel();
}

function showChallenge(challengeId) {
    const challenges = document.querySelectorAll('.challenge');
    challenges.forEach(challenge => {
        challenge.classList.remove('active');
    });
    document.getElementById(challengeId).classList.add('active');
}

function convertTemperature() {
    const celsius = parseFloat(document.getElementById('tempInput').value);
    const result = document.getElementById('tempResult');
    if (isNaN(celsius)) {
        result.textContent = 'Please enter a valid number.';
        return;
    }
    const fahrenheit = (celsius * 9/5) + 32;
    result.textContent = `${celsius}°C is ${fahrenheit.toFixed(2)}°F`;
}

function findLongerWord() {
    const word1 = document.getElementById('word1').value.trim();
    const word2 = document.getElementById('word2').value.trim();
    const result = document.getElementById('wordResult');
    if (!word1 || !word2) {
        result.textContent = 'Please enter both words.';
        return;
    }
    if (word1.length > word2.length) {
        result.textContent = `"${word1}" is longer than "${word2}".`;
    } else if (word2.length > word1.length) {
        result.textContent = `"${word2}" is longer than "${word1}".`;
    } else {
        result.textContent = `Both words are the same length: ${word1.length} characters.`;
    }
}

function findBirthstone() {
    const month = parseInt(document.getElementById('birthMonth').value);
    const result = document.getElementById('birthstoneResult');
    const birthstones = {
        1: 'Garnet', 2: 'Amethyst', 3: 'Aquamarine', 4: 'Diamond', 5: 'Emerald',
        6: 'Pearl', 7: 'Ruby', 8: 'Peridot', 9: 'Sapphire', 10: 'Opal',
        11: 'Topaz', 12: 'Turquoise'
    };
    const birthstone = birthstones[month] || 'Unknown';
    result.textContent = `Your birthstone is ${birthstone}.`;
}

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    const result = document.getElementById('operatorResult');
    if (isNaN(num1) || isNaN(num2)) {
        result.textContent = 'Please enter valid numbers.';
        return;
    }
    let calcResult;
    switch (operator) {
        case 'add':
            calcResult = num1 + num2;
            result.textContent = `${num1} + ${num2} = ${calcResult}`;
            break;
        case 'subtract':
            calcResult = num1 - num2;
            result.textContent = `${num1} - ${num2} = ${calcResult}`;
            break;
        case 'multiply':
            calcResult = num1 * num2;
            result.textContent = `${num1} × ${num2} = ${calcResult}`;
            break;
        case 'divide':
            if (num2 === 0) {
                result.textContent = 'Cannot divide by zero.';
                return;
            }
            calcResult = num1 / num2;
            result.textContent = `${num1} ÷ ${num2} = ${calcResult.toFixed(2)}`;
            break;
        default:
            result.textContent = 'Please select an operator.';
    }
}

function computeAcceleration() {
    const velocity = parseFloat(document.getElementById('velocity').value);
    const time = parseFloat(document.getElementById('time').value);
    const result = document.getElementById('accelerationResult');
    if (isNaN(velocity) || isNaN(time)) {
        result.textContent = 'Please enter valid numbers.';
        return;
    }
    if (time === 0) {
        result.textContent = 'Time cannot be zero.';
        return;
    }
    const acceleration = velocity / time;
    result.textContent = `Acceleration: ${acceleration.toFixed(2)} m/s²`;
}

function toggleHeart(heart) {
    heart.classList.toggle('liked');
    heart.innerText = heart.classList.contains('liked') ? '♥' : '♡';
    const likeCount = heart.closest('.image-wrapper').nextElementSibling.querySelector('.like-count');
    let count = parseInt(likeCount.innerText) || 0;
    likeCount.innerText = heart.classList.contains('liked') ? `${count + 1} likes` : `${count - 1 || 0} likes`;
}

function postComment(button) {
    const textarea = button.previousElementSibling;
    const commentText = textarea.value.trim();
    if (!commentText) {
        alert('Please enter a comment before posting.');
        return;
    }
    const commentsDiv = button.nextElementSibling;
    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerText = commentText;
    commentsDiv.appendChild(comment);
    textarea.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    items = document.querySelectorAll('.carousel-item');
    updateCarousel();

    document.getElementById('nav-home').addEventListener('click', () => showSection('home'));
    document.getElementById('nav-portfolio').addEventListener('click', () => showSection('portfolio'));
    document.getElementById('nav-favorites').addEventListener('click', () => showSection('favorites'));
    document.getElementById('nav-close').addEventListener('click', closeWindow);

    document.querySelector('.carousel-prev').addEventListener('click', prevSlide);
    document.querySelector('.carousel-next').addEventListener('click', nextSlide);

    setInterval(nextSlide, 3000);

    showSection('home');

    document.getElementById('challenge-temperature').addEventListener('click', () => showChallenge('temperature'));
    document.getElementById('challenge-longerWord').addEventListener('click', () => showChallenge('longerWord'));
    document.getElementById('challenge-birthstone').addEventListener('click', () => showChallenge('birthstone'));
    document.getElementById('challenge-operators').addEventListener('click', () => showChallenge('operators'));
    document.getElementById('challenge-acceleration').addEventListener('click', () => showChallenge('acceleration'));

    document.getElementById('convert-temp').addEventListener('click', convertTemperature);
    document.getElementById('compare-words').addEventListener('click', findLongerWord);
    document.getElementById('find-birthstone').addEventListener('click', findBirthstone);
    document.getElementById('calculate').addEventListener('click', calculate);
    document.getElementById('compute-acceleration').addEventListener('click', computeAcceleration);

    document.querySelectorAll('.heart').forEach(heart => {
        heart.addEventListener('click', () => toggleHeart(heart));
    });

    document.querySelectorAll('.post-comment').forEach(button => {
        button.addEventListener('click', () => postComment(button));
    });
});