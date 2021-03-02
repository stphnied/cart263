const d = document;

let mainHeading = d.getElementById(`main-heading`);
let img = d.getElementById(`clown-image`);
// let headers = d.getElementsByClassName(`header`);
let headers = d.querySelectorAll(`.header`);
// let headers = d.querySelectorAll(`h1,h2`);
let h2s = d.getElementsByTagName(`h2`);
let newP = d.createElement(`p`);
let clownSection = d.getElementById(`clown-section`);

// Main heading style
mainHeading.style[`color`] = `#339966`;
mainHeading.style[`font-size`] = `3rem`;
mainHeading.style[`font-family`] = `Courier, monospace`;


// Changing img attribute
img.setAttribute(`src`, `https://emoji.gg/assets/emoji/CattoBlush.png`);

// Changing headers' color
for (let i = 0; i < h2s.length; i++) {
    h2s[i].style[`color`] = `#334066`;
}

// Add new paragraph in clown section
newP.innerText = `New PP`;
clownSection.appendChild(newP);

// Remove main heading
// mainHeading.parentElement.removeChild(mainHeading);
