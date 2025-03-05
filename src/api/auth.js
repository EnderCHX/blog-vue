import global from "@/config/global.js"
import sha256 from 'crypto-js/sha256.js'

export const Login = async (username, password) => {
    password = sha256(password).toString()
    let url = global.PassportApiUrl + "/login"

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
            return data
        }

        return false

    } catch (e) {
        return e
    }
}

export const Register = async (username, password, email, avatar, signature) => {
    password = sha256(password).toString()

    let url = global.PassportApiUrl + "/register"
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

    } catch (e) {
        return e
    }
}

export const GetUserInfo = async () => {
    let access_token = sessionStorage.getItem('access_token')
    let url = global.PassportApiUrl + "/user/info"
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
    } catch (e) {
        return e
    }
}

export const RefreshToken = async () => {
    let refresh_token = localStorage.getItem('refresh_token')
    let url = global.PassportApiUrl + "/refresh"
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
    } catch (e) {
        return e
    }
}

export const TestAccessToken = async () => {
    let data = await GetUserInfo()
    if (data.code !== "Success") {
        if (localStorage.getItem('refresh_token') === null) {
            return "Unauthorized"
        }
        return await RefreshToken()
    }

    return true
}
