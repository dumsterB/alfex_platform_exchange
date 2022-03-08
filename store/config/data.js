export const state = () => ({
    languages: [{
            text: "English",
            value: "en"
        },
        {
            text: "Русский",
            value: "ru"
        },
        {
            text: "Deutsch",
            value: "de"
        },
        {
            text: "Polskie",
            value: "pl"
        }
    ],
    default_language: "ru",
    preload_models: ["currency", "arbitrage_company", "wallet"],
    themes: ["Dark", "Light"],
    base_p: "gate"
})

export const getters = {
    languages: state => {
        return state.languages;
    },
    themes: state => {
        return state.themes;
    },
    base_p: state => {
        return state.base_p;
    }
}

export const actions = {

}

export const mutations = {

}