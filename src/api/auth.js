import global from "@/config/global.js";
import {ref} from 'vue'
import sha256 from 'crypto-js/sha256.js'

const passportApiUrl = ref(global.passportApiUrl)

const Login = async (username, password) => {
    passportApiUrl.value = removeLastXieGang(passportApiUrl.value)
    password = sha256(password).toString()
    let url = passportApiUrl.value + "/login"

    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        let data = await res.json()
        return data

    } catch {
        return null
    }
}

const Register = async (username, password, email) => {
    passportApiUrl.value = removeLastXieGang(passportApiUrl.value)
    password = sha256(password).toString()

    let url = passportApiUrl.value + "/register"
    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        })

        let data = await res.json()
        return data
    } catch {
        return null
    }
}

const GetUserInfo = async (accecc_token) => {
    passportApiUrl.value = removeLastXieGang(passportApiUrl.value)
    let url = passportApiUrl.value + "/user/info"
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accecc_token
        }
    })
    if (res.status === 200) {
        let data = await res.json()
        return data
    } else {
        return null
    }
}

const RefreshToken = async (refresh_token) => {
    passportApiUrl.value = removeLastXieGang(passportApiUrl.value)
    let url = passportApiUrl.value + "/refresh"
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refresh_token: refresh_token
        })
    })
    if (res.status === 200) {
        let data = await res.json()
        return data
    } else {
        return null
    }
}
const removeLastXieGang = (str) => {
    while (str[str - 1] === "/") {
        str = str.toString().substring(0, str.length - 1)
    }
    return str
}

export default {
    Login,
    Register,
    GetUserInfo,
    RefreshToken
}