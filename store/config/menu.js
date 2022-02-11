export const state = () => ({
    menu_items: [{
        icon: 'mdi-home-outline',
        title: 'user_dashboard',
        key: 'Main',
        to: '/account',
        badge_color: 'primary',
    },{
        icon: 'mdi-cog-outline',
        title: 'settings_page',
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
