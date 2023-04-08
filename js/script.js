const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', event => {
    event.preventDefault();
    if(event.code.toLowerCase() === 'space');
    setRandomColors();
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } 
    else if(type === 'copy') {
        copyToClipboard(event.target.textContent);
    }
    else {
        setRandomColors();
    }
})

function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColors() : [];
    columns.forEach((column, index) => {
        const isLocked = column.querySelector('i').classList.contains('fa-lock');
        const text = column.querySelector('h2');
        const btn = column.querySelector('button');
        if(isLocked) {
            colors.push(text.textContent);
            return;
        }
        const color = isInitial 
            ? colors[index] 
                ? colors[index] 
                : chroma.random()
            : chroma.random();
        if(!isInitial) colors.push(color);
        text.textContent = color;
        column.style.background = chroma.random();
        setTextColor(text, color);
        setTextColor(btn, color);
    })
    updateColorsHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((color) => color.toString().substring(1)).join('-');
}

function getColors() {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return [];
}

setRandomColors(true);