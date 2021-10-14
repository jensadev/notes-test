# Notes-test
Frontend för att testa och visa notes api.

Du behöver [notes-api](https://github.com/jensnti/notes), instruktioner för hur du får igång det fins i det repot. **Gör detta först!**

Du ska kunna klicka på [localhost:3000/notes](http://localhost:3000/notes)] och se lite json innan du fortsätter.

# Setup

För att klona och starta detta så att du kan testa (se till att du har notes api klart).

```bash
git clone https://github.com/jensnti/notes-test
cd notes-test
npm install
npm start
```

Surfa till http://localhost:8080

# Så vad händer

11ty byggs utan någon särskild config, men utöver detta så används bundlern rollup.

>Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

Rollup låter oss alltså använda paket (NPM) och sno ihop dem till en javascript-fil vi sedan kan använda på webbsidan.

## index, statisk data

[Index](http://localhost:8080) sidan byggs med data från en 11ty-datafil. Denna datafil är en js fil som använder 11tys [cache](https://www.11ty.dev/docs/plugins/cache/) plugin för att hämta data från den tidigare nämnda notes apin.

```
{% for note in notes %}
    <div class="note">
        <div class="note__body">
            <h5 class="note__date">{{ note.updatedAt }}</h5>
            <p class="note__text">{{ note.note }}</p>
        </div>
        <div class="note__footer">
            <p>{{ note.tag }}</p>
        </div>
    </div>
{% endfor %}
```

Syftet med denna sida är att visa hur en API används och cachas när 11ty *byggs*. Den data som används hämtas och är dynamisk, men eftersom sidan byggs blir den statisk.

## browser, dynamisk data

Den andra sidan vi har tillgänglig i detta projekt är [/browser](http://localhost:8080/browser). Denna fil byggs från en njk template och använder sig av den javascript som vi byggt med hjälp av rollup.

Sidan har inget innehåll i sig, men när den laddas hämtar javascriptet data från notes apin. Detta gör att nya notes laddas om de finns och vi kan även skapa nya notes och ladda dem.
Så nya notes laddas på [/browser](http://localhost:8080/browser) men detta sker inte på [Index](http://localhost:8080) så länge du inte *bygger* 11ty igen (vilket sker när du sparar osv. förutsatt du watchar).

### Fetch

För att göra detta på clientsidan används javascripts [fetch-api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). Vill du förstå detta så rekommenderas att du läser och testar innehållet i länken här ovan.

### GET

```js
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
}
```

Fetch hämtar data från [localhost:3000/notes](http://localhost:3000/notes)] och när data hämtats så används javascript för att skapa html-elementen.
Elementen för note-kortet är sparade i ett [template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template). Vill du förstå mer kring templates och web-components så rekommenderas även denna text om [templates](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots). Tips är att läsa och förstå detta särskilt om du är nyfiken på frontend-ramverk.

### POST

För att skicka data så innehåller även javascriptet ett POST exempel. Exemplet är hämtat från MDN med ytterst lite anpassning, så läs länken ovan.

```js
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
```

Studera resten av metoderna och hela js filen, den finns i ```src/js``` mappen.
