import createCrudModule, { client } from 'vuex-crud';

client.interceptors.request.use(function (config) {
    let auth_token = localStorage.getItem('auth._token.local');
    config.baseURL = localStorage.getItem('conf.API_BASE')
    config.headers.common['Authorization'] = auth_token;
    return config
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
                        "first":"...",
                        "last":"...",
                        "prev":"..",
                        "next":"..."
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
