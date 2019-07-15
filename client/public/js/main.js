const topAuthorsBox = document.querySelector('#top-authors-box');

window.addEventListener('load', (event) => {
    
    fetch('http://localhost:5001/top5').then((res) => {
        return res.json();
    }).then((res) => {

        console.log(res);
        
        if (!res.ok) {
            console.error('Sorry, some error happend');
            return;
        }

        topAuthorsBox.innerHTML = ""
        for (let author of res.results) {

            const {name, age, books} = author;

            const authorBox = document.createElement('div');
            const authorText = document.createElement('span');
            authorText.innerHTML = `${name} (age ${age}) wrote ${books} books`;
            authorBox.appendChild(authorText);
            
            topAuthorsBox.appendChild(authorBox);
        }
    });
});