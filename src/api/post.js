import global from "@/config/global.js"
import {TestAccessToken} from "@/api/auth.js"

export const NewPost = async (data) => {

    if (await TestAccessToken() === "Unauthorized") {
        return "Unauthorized"
    }

    let url = global.BlogApiUrl + "/newpost"

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    } catch (e) {
        return e
    }
}

export const GetPost = async (id) => {
    let url = global.BlogApiUrl + "/post/" + id
    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return await res.json()
    } catch (e) {
        return e
    }
}

export const GetPostTags = async (id) => {
    let url = global.BlogApiUrl + "/post/" + id + "/tags"
    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return  await res.json()

    } catch (e) {
        return e
    }
}

export const GetPosts = async () => {
    let url = global.BlogApiUrl + "/posts"
    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return await res.json()
    } catch (e) {
        return e
    }
}