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
})

export const getters = {
    languages: state => {
        return state.languages;
    },
}

export const actions = {

}

export const mutations = {

}
