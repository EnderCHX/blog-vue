import global from "@/config/global.js";
import {ref} from 'vue'
import sha256 from 'crypto-js/sha256.js'

const passportApiUrl = ref(global.passportApiUrl)

const Login = async (username, password) => {
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

        if (data.code === "Success") {
            sessionStorage.setItem('access_token', data.data.access_token)
            localStorage.setItem('refresh_token', data.data.refresh_token)
            return true
        } else {
            return false
        }

        return false

    } catch {
        return false
    }
}

const Register = async (username, password, email, avatar, signature) => {
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
                email: email,
                avatar: avatar,
                signature: signature
            })
        })

        let data = await res.json()

        if (data.code === "Success") {
            sessionStorage.setItem('access_token', data.data.access_token)
            localStorage.setItem('refresh_token', data.data.refresh_token)
            return true
        } else {
            return false
        }

    } catch {
        return false
    }
}

const GetUserInfo = async () => {
    let access_token = sessionStorage.getItem('access_token')
    let url = passportApiUrl.value + "/user/info"
    try {
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        })

        let data = await res.json()
        return data
    } catch {
        return null
    }
}

const RefreshToken = async () => {
    let refresh_token = localStorage.getItem('refresh_token')
    let url = passportApiUrl.value + "/refresh"
    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh_token: refresh_token
            })
        })

        let data = await res.json()

        if (data.code === "Success") {
            sessionStorage.setItem('access_token', data.data.access_token)
            return true
        } else {
            return false
        }
    } catch {
        return false
    }
}

const TestAccessToken = async () => {
    let data = await GetUserInfo()
    if (data.code !== "Success") {
        if (localStorage.getItem('refresh_token') === null) {
            return "Unauthorized"
        }
        return await RefreshToken()
    }

    return true
}

export default {
    Login,
    Register,
    GetUserInfo,
    RefreshToken,
    TestAccessToken
}