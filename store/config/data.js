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
    preload_models: ["currency", "arbitrage_company"],
    themes: ["Dark", "Light"]
})

export const getters = {
    languages: state => {
        return state.languages;
    },
    themes: state => {
        return state.themes;
    }
}

export const actions = {

}

export const mutations = {

}