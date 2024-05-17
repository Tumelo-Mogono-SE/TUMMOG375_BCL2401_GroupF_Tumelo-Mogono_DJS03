
/**
 * @typedef {Object} HtmlElements
 * @prop {Object} list
 * @prop {HTMLElement} list.dataListItem
 * @prop {HTMLElement} list.dataListButton
 * @prop {HTMLElement} list.dataListClose
 * @prop {HTMLElement} list.dataListActive
 * @prop {HTMLElement} list.dataListMessage
 * @prop {HTMLElement} list.dataListBlur
 * @prop {HTMLElement} list.dataListImage
 * @prop {HTMLElement} list.dataListTitle
 * @prop {HTMLElement} list.dataListSubtitle
 * @prop {HTMLElement} list.dataListDescription
 * @prop {Object} header
 * @prop {HTMLElement} header.dataHeaderSearch
 * @prop {HTMLElement} header.dataHeaderSetting
 * @prop {Object} search
 * @prop {HTMLElement} search.dataSearchAuthor
 * @prop {HTMLElement} search.dataSearchCancel
 * @prop {HTMLElement} search.dataSearchGenre
 * @prop {HTMLElement} search.dataSearchOverlay
 * @prop {HTMLElement} search.dataSearchTitle
 * @prop {HTMLElement} search.dataSearchForm
 * @prop {Object} setting
 * @prop {HTMLElement} setting.dataSettingTheme
 * @prop {HTMLElement} setting.dataSettingCancel
 * @prop {HTMLElement} setting.dataSettingOverlay
 * @prop {HTMLElement} setting.dataSettingForm

 */

/**
 * @type {HtmlElements}
 */
export const htmlElements = {
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