import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { htmlElements } from './elements.js';

/**
 * Creates a book element.
 * @param {Object} book - The book data.
 * @param {string} book.author - The author of the book.
 * @param {string} book.id - The book ID.
 * @param {string} book.image - The URL of the book image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLElement} The book element.
 */
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

/**
 * Renders book previews.
 * @param {DocumentFragment} documentFragment - The document fragment to append book elements to.
 * @param {Object[]} bookList - The list of books to render.
 */
export const renderBookPreviews = (documentFragment, bookList) => {
    for ( const book of bookList) {
        documentFragment.appendChild(createBookElement(book));
    };
    htmlElements.list.dataListItem.appendChild(documentFragment);
};

/**
 * Sets up genre options in the search form.
 */
export const setupGenreOptions = () => {
    const genreHtml = document.createDocumentFragment()
    genreHtml.appendChild(createOptionElement('any', 'All Genres'))

    for (const [id, name] of Object.entries(genres)) {
        genreHtml.appendChild(createOptionElement(id, name));
    }

htmlElements.search.dataSearchGenre.appendChild(genreHtml)
}

/**
 * Sets up author options in the search form.
 */
export const setupAuthorOptions = () => {
    const authorsHtml = document.createDocumentFragment();
    authorsHtml.appendChild(createOptionElement('any', 'All Authors'));

    for (const [id, name] of Object.entries(authors)) {
        authorsHtml.appendChild(createOptionElement(id, name))
    }

    htmlElements.search.dataSearchAuthor.appendChild(authorsHtml)
};

/**
 * Creates an option element.
 * @param {string} value - The value of the option.
 * @param {string} name - The display name of the option.
 * @returns {HTMLOptionElement} The option element.
 */
export function createOptionElement(value, name) {
    const element = document.createElement('option');
    element.value = value;
    element.innerText = name;
    return element;
};

/**
 * Sets the theme properties.
 * @param {string | File } theme - The theme to set ('night' or 'day').
 */
export const setThemeProperties = (theme) => {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    };
};

/**
 * Applies the user's preferred theme based on their system settings.
 */
export const applyPreferredTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElements.setting.dataSettingTheme.value = 'night';
        setThemeProperties('night');
    } else {
        htmlElements.setting.dataSettingTheme.value = 'day';
        setThemeProperties('day');
    };
};

/**
 * Updates the "Show More" button text and state.
 */
export function showMoreButton(page, matches) {
    htmlElements.list.dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
    let remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    htmlElements.list.dataListButton.disabled = remainingBooks <= 0

    htmlElements.list.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
};

export const handleListItemOnClick = (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        };
    };
    
    if (active) {
        htmlElements.list.dataListActive.open = true;
        htmlElements.list.dataListBlur.src = active.image;
        htmlElements.list.dataListImage.src = active.image;
        htmlElements.list.dataListTitle.innerText = active.title;
        htmlElements.list.dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        htmlElements.list.dataListDescription.innerText = active.description;
    };
}


