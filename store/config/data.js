export const state = () => ({
    languages: [
        {
            text: "English",
            value: "en"
        },
        {
            text: "Русский",
            value: "ru"
        }
    ],
    themes: ["Dark", "Light"],
})

export const getters = {
    languages: state => {
        return state.languages;
    },
    themes: state => {
        return state.themes;
    },
}

export const actions = {

}

export const mutations = {

}
