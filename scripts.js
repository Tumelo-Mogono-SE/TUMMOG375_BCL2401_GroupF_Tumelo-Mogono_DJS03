import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { renderBookPreviews, setupGenreOptions, setupAuthorOptions, setThemeProperties, applyPreferredTheme, showMoreButton } from './helper.js';
import { htmlElements } from './elements.js';


let page = 1;
let matches = books;

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
    showMoreButton(page, matches);
    
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
    showMoreButton(page, matches);
};

initialization();
applyPreferredTheme();