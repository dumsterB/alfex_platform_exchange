
export default function ({ $axios, redirect, env }, inject) {

    $axios.onRequest(config => {
        config.crossdomain = true
        return config
    })

    $axios.setBaseURL(env.API_BASE)

}

