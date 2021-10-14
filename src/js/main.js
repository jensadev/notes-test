const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const addNoteElement = (data={}) => {
    const template = document.querySelector('template');
    let clone = template.content.cloneNode(true);
    clone.querySelector('.note__date').textContent = data.updatedAt;
    clone.querySelector('.note__text').textContent = data.note;
    clone.querySelector('.note__footer > p').textContent = data.tag;
    document.querySelector('main').appendChild(clone);
}; 

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const fetchNotes = () => {
    const loading = document.querySelector('#loading');
    fetch('http://localhost:3000/notes')
        .then(handleErrors)
        .then((response) => {
            // console.log(response.json());
            return response.json();
        })
        .then((notes) => {
            loading.setAttribute('hidden', true);
            const template = document.querySelector('template');
            notes.forEach((note) => {
                addNoteElement(note);
            });
        })
        .catch(function (error) {
            console.error(error);
        });
};

const postData = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
};

// handle form & post

window.addEventListener('load', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const note = document.querySelector('#note').value;
        const tag = document.querySelector('#tag').value;
        const data = {
            note: note,
            tag: tag
        };
        postData('http://localhost:3000/notes', data)
            .then((data) => {
                console.log(data);
                addNoteElement(data);
                form.reset();
            })
            .catch((error) => {
                console.error(error);
            });
    });
});

// fire on load
fetchNotes();
