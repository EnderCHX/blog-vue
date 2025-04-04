import global from "@/config/global.js"
import {TestAccessToken} from "@/api/auth.js"

export const NewComment = async (data) => {
    if (await TestAccessToken() === "Unauthorized") {
        return "Unauthorized"
    }

    let url = global.BlogApiUrl + "/newcomment"
    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    } catch (error) {
        return error
    }
}