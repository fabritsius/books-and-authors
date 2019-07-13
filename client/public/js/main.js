const topAuthorsBox = document.querySelector('#top-authors-box');

window.addEventListener('load', (event) => {
    
    fetch('http://localhost:5001/top5').then((res) => {
        return res.json();
    }).then((res) => {
        
        if (!res.ok) {
            console.error('Sorry, some error happend');
            return;
        }

        topAuthorsBox.innerHTML = ""
        for (let author of res.results) {

            const {id, name, age} = author;

            const authorBox = document.createElement('div');
            const authorText = document.createElement('span');
            authorText.innerHTML = `${id}: ${name} (age ${age})`;
            authorBox.appendChild(authorText);
            
            topAuthorsBox.appendChild(authorBox);
        }
    });
});