const topAuthorsRecords = document.querySelector('#top-authors-records');

window.addEventListener('load', (event) => {
    
    fetch('http://localhost/top5').then((res) => {
        return res.json();
    }).then((res) => {

        console.log(res);
        
        if (!res.ok) {
            console.error('Sorry, some error happend');
            return;
        }

        if (res.results.length > 0) {
            topAuthorsRecords.innerHTML = ""
            for (let author of res.results) {
    
                const {name, age, books} = author;
    
                const authorRecord = document.createElement('div');
                authorRecord.className = 'columns';
                
                for (let item of [name, age, books]) {
                    const itemBox = document.createElement('div');
                    itemBox.innerHTML = item;
                    authorRecord.appendChild(itemBox);
                }
    
                topAuthorsRecords.appendChild(authorRecord);
            }
        } else {
            document.querySelector('#top-authors-box div.columns-header')
                .classList.add('hidden');
            topAuthorsRecords.innerHTML = 'No records found';
        }
    });
});