// dark/light mode
function toggleMode() {
    const element = document.body;
    element.classList.toggle('light-mode');
}

const btn = document.getElementById('mode');
btn.addEventListener('click', toggleMode);