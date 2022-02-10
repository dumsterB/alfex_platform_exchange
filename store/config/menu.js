export const state = () => ({
    menu_items: [{
        icon: 'mdi-home-outline',
        title: 'Main',
        key: 'Main',
        to: '/account',
        badge_color: 'primary',
    },{
        icon: 'mdi-cog-outline',
        title: 'Settings',
        key: 'Settings',
        to: '/settings',
        badge_color: 'primary',
    }
    ]
})

export const getters = {
    getAllMenu(state) {
        return state.menu_items;
    }
}

export const actions = {

}

export const mutations = {

}
