const topAuthorsBox = document.querySelector('#top-authors-records');

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

            const authorRecord = document.createElement('div');
            authorRecord.className = 'columns';
            
            for (let item of [name, age, books]) {
                const itemBox = document.createElement('div');
                itemBox.innerHTML = item;
                authorRecord.appendChild(itemBox);
            }

            topAuthorsBox.appendChild(authorRecord);
        }
    });
});