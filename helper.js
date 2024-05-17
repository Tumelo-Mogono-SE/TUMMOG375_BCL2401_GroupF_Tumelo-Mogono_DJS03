import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { htmlElements } from './elements.js';

export const createBookElement = (book) => {
    const { author, id, image, title } = book;
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
            
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
    return element;
}

export const renderBookPreviews = (documentFragment, bookList) => {
    for ( const book of bookList) {
        documentFragment.appendChild(createBookElement(book));
    };
    htmlElements.list.dataListItem.appendChild(documentFragment);
};


export const setupGenreOptions = (genre) => {
    const genreHtml = document.createDocumentFragment()
    genreHtml.appendChild(createOptionElement('any', 'All Genres'))

    for (const [id, name] of Object.entries(genres)) {
        genreHtml.appendChild(createOptionElement(id, name));
    }

htmlElements.search.dataSearchGenre.appendChild(genreHtml)
}


export const setupAuthorOptions = () => {
    const authorsHtml = document.createDocumentFragment();
    authorsHtml.appendChild(createOptionElement('any', 'All Authors'));

    for (const [id, name] of Object.entries(authors)) {
        authorsHtml.appendChild(createOptionElement(id, name))
    }

    htmlElements.search.dataSearchAuthor.appendChild(authorsHtml)
};


export function createOptionElement(value, name) {
    const element = document.createElement('option');
    element.value = value;
    element.innerText = name;
    return element;
};

export const setThemeProperties = (theme) => {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    };
};

export const applyPreferredTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElements.setting.dataSettingTheme.value = 'night';
        setThemeProperties('night');
    } else {
        htmlElements.setting.dataSettingTheme.value = 'day';
        setThemeProperties('day');
    };
};

export function showMoreButton(page, matches) {
    htmlElements.list.dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
    let remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    htmlElements.list.dataListButton.disabled = remainingBooks <= 0

    htmlElements.list.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
};

