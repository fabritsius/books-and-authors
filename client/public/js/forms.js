const forms = document.querySelectorAll('form');
const errorsBox = document.querySelector('#errors-box');

for (let form of forms) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        formData = {}
        Array.from(event.target.elements).forEach(input => {
            if (input.name) {
                formData[input.name] = input.value;
            }
        });

        doPostRequest(form.action, formData).then((res) => {

            if (res.ok) {
                window.location.href = '/';
                return;
            }

            errorsBox.innerHTML = 'Some error happend so please check your inputs';
            errorsBox.classList.remove('hidden');
        });
    });
}

const doPostRequest = (uri, data) => {
    
    const params = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(uri, params).then(
        res => res.json()
    )
}