import createCrudModule, { client } from 'vuex-crud';

let store;
let i18n;
if (process.browser) {
    window.onNuxtReady(({ $store, $i18n }) => {
        store = $store
        i18n = $i18n
    })
}

client.interceptors.request.use(function (config) {
    let auth_token = localStorage.getItem('auth._token.local');
    config.baseURL = localStorage.getItem('conf.API_BASE')
    config.headers.common['Authorization'] = auth_token;
    return config
})

client.interceptors.response.use(function (response) {

    if (store) {
        if (response.config.method != "get") {
            let msg = !response.data.success ? response.data.message : '';
            let title = !response.data.success ? response.config.url : i18n.t('Success');
            let color = !response.data.success ? "error" : "success";
            store.commit('data/notifications/create', {
                id: color + '_' + Math.random()
                    .toString(36),
                title: title,
                text: msg,
                color: color
            });
        }
    }

    return response

})

function createCRUD(module) {
    const base = {
        client: client,

        parseList(response) {
            const { data } = response;
            if (response.data.success) {
                return Object.assign({}, response, {
                    data: data.data,
                    meta: {
                        "current_page": data.current_page,
                        "from": data.from,
                        "last_page": data.last_page,
                        "path": data.path,
                        "per_page": data.per_page,
                        "to": data.to,
                        "total": data.total
                    },
                    links: {
                        "first": "...",
                        "last": "...",
                        "prev": "..",
                        "next": "..."
                    }
                });
            } else {
                return []
            }
        },

        parseSingle(response) {
            const { data } = response;
            if (response.data.success) {
                return Object.assign({}, response, {
                    data: data.data
                });
            } else {
                return {}
            }
        },

        // parseError(response) {
        //     console.log(response);
        // }
    }

    // merge base and module data
    Object.keys(module).forEach((k) => {
        base[k] = module[k]
    })

    return createCrudModule(base)
}

export {
    createCRUD
}
