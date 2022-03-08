export const state = {
    messages:[]
}

export const mutations = {
    create(state, message) {
        let msg = {
            id: message.id,
            text: message.text,
            title: message.title,
            color: message.color,
            created_at: new Date()
        }
        state.messages.push(msg);
    },
    remove(state, id) {
        const index = state.messages.findIndex(item => item.id === id);
        if (index !== -1) {
            state.messages.splice(index, 1);
        }
    },
}

export const getters = {
    allMessages(state){
        return state.messages
    }
}