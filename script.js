const myApiKey = "6CIC4aadBTKaigUkWbpvIraAtrVcikj9";
const searchButton = document.getElementById('search-button');
const gifContainer = document.getElementById('gif-container');

searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value;
    event.preventDefault();
    gifSearch(searchInput);
});

async function gifSearch(searchItem) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${myApiKey}&q=${searchItem}&limit=30`);
    const data = await response.json();

    gifContainer.innerHTML = '';

    const gifs = data.data;
    const rows = 10;
    const cols = 3;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < cols; j++) {
            const index = i * cols + j;
            if (index >= gifs.length) break;

            const gif = gifs[index];
            const gifElement = document.createElement('img');
            gifElement.src = gif.images.fixed_height.url;
            gifElement.className = 'gif';

            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.appendChild(gifElement);
            row.appendChild(cell);
        }

        gifContainer.appendChild(row);
    }

    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
}
