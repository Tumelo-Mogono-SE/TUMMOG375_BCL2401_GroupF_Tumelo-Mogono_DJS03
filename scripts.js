import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

const htmlElements = {
    list: {
        dataListItem: document.querySelector('[data-list-items]'),
        dataListButton: document.querySelector('[data-list-button]'),
        dataListClose: document.querySelector('[data-list-close]'),
        dataListActive: document.querySelector('[data-list-active]'),
        dataListMessage: document.querySelector('[data-list-message]'),
        dataListBlur: document.querySelector('[data-list-blur]'),
        dataListImage: document.querySelector('[data-list-image]'),
        dataListTitle: document.querySelector('[data-list-title]'),
        dataListSubtitle: document.querySelector('[data-list-subtitle]'),
        dataListDescription: document.querySelector('[data-list-description]')
    },
    header: {
        dataHeaderSearch: document.querySelector('[data-header-search]'),
        dataHeaderSetting: document.querySelector('[data-header-settings]')
    },
    search: {
        dataSearchAuthor: document.querySelector('[data-search-authors]'),
        dataSearchCancel: document.querySelector('[data-search-cancel]'),
        dataSearchGenre: document.querySelector('[data-search-genres]'),
        dataSearchOverlay: document.querySelector('[data-search-overlay]'),
        dataSearchTitle: document.querySelector('[data-search-title]'),
        dataSearchForm: document.querySelector('[data-search-form]')
    },
    setting: {
        dataSettingTheme: document.querySelector('[data-settings-theme]'),
        dataSettingCancel: document.querySelector('[data-settings-cancel]'),
        dataSettingOverlay: document.querySelector('[data-settings-overlay]'),
        dataSettingForm: document.querySelector('[data-settings-form]')
    },
}

let page = 1;
let matches = books

const createBookElement = (book) => {
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

const renderBookPreviews = (documentFragment, bookList) => {
    for ( const book of bookList) {
        documentFragment.appendChild(createBookElement(book));
    };
    htmlElements.list.dataListItem.appendChild(documentFragment);
    showMoreButton();
};


const setupGenreOptions = () => {
    const genreHtml = document.createDocumentFragment()
    genreHtml.appendChild(createOptionElement('any', 'All Genres'))

    for (const [id, name] of Object.entries(genres)) {
        genreHtml.appendChild(createOptionElement(id, name));
    }

htmlElements.search.dataSearchGenre.appendChild(genreHtml)
}


const setupAuthorOptions = () => {
    const authorsHtml = document.createDocumentFragment();
    authorsHtml.appendChild(createOptionElement('any', 'All Authors'));

    for (const [id, name] of Object.entries(authors)) {
        authorsHtml.appendChild(createOptionElement(id, name))
    }

    htmlElements.search.dataSearchAuthor.appendChild(authorsHtml)
};


function createOptionElement(value, name) {
    const element = document.createElement('option');
    element.value = value;
    element.innerText = name;
    return element;
};

const setThemeProperties = (theme) => {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    };
};

const applyPreferredTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElements.setting.dataSettingTheme.value = 'night';
        setThemeProperties('night');
    } else {
        htmlElements.setting.dataSettingTheme.value = 'day';
        setThemeProperties('day');
    };
};

function showMoreButton() {
    htmlElements.list.dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
    const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    htmlElements.list.dataListButton.disabled = remainingBooks <= 0

    htmlElements.list.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
};

htmlElements.search.dataSearchCancel.addEventListener('click', () => {
    htmlElements.search.dataSearchOverlay.open = false;
});

htmlElements.setting.dataSettingCancel.addEventListener('click', () => {
    htmlElements.setting.dataSettingOverlay.open = false;
});

htmlElements.header.dataHeaderSearch.addEventListener('click', () => {
    htmlElements.search.dataSearchOverlay.open = true ;
    htmlElements.search.dataSearchTitle.focus();
});

htmlElements.header.dataHeaderSetting.addEventListener('click', () => {
    htmlElements.setting.dataSettingOverlay.open = true ;
});

htmlElements.list.dataListClose.addEventListener('click', () => {
    htmlElements.list.dataListActive.open = false;
});

htmlElements.setting.dataSettingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    setThemeProperties(theme);
    
    htmlElements.setting.dataSettingOverlay.open = false;
});

htmlElements.search.dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        htmlElements.list.dataListMessage.classList.add('list__message_show')
    } else {
        htmlElements.list.dataListMessage.classList.remove('list__message_show')
    }

    htmlElements.list.dataListItem.innerHTML = ''
    const newItems = document.createDocumentFragment();
    renderBookPreviews(newItems, result.slice(0, BOOKS_PER_PAGE));
    
    showMoreButton();

    window.scrollTo({top: 0, behavior: 'smooth'});
    htmlElements.search.dataSearchOverlay.open = false
});

htmlElements.list.dataListButton.addEventListener('click', () => {
    page += 1;
    const fragment = document.createDocumentFragment();
    const newBooks = matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);
    renderBookPreviews(fragment, newBooks);
    
});

htmlElements.list.dataListItem.addEventListener('click', (event) => {
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
});

function initialization() {
    const starting = document.createDocumentFragment();
    renderBookPreviews(starting, matches.slice(0, BOOKS_PER_PAGE));

    setupAuthorOptions();
    setupGenreOptions();
};

initialization();
applyPreferredTheme();