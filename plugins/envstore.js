export default function ({ $axios, redirect, env }, inject) {

    Object.keys(env).forEach((k) => {
        let $env = (ek) => {return env[ek]}
        inject('env', $env)

        localStorage.setItem('conf.' + k, env[k])
    })

}