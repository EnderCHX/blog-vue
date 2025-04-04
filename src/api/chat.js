import config from '@/config/global.js'
import {io} from 'socket.io-client'
import {TestAccessToken} from "@/api/auth.js"
import {useMessage} from 'naive-ui'
import {useRouter} from "vue-router";

export class Chat {
    constructor() {
        this.getConnect()
    }
    getConnect () {
        console.log(config.BlogApiUrl)
        if (TestAccessToken() === 'Unauthorized') {
            useMessage().error('请先登录')
            useRouter().push('/login')
            return
        }
        this.socket = io(config.BlogApiUrl, {
            extraHeaders: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
            },
            transports: ['websocket'],
            path: 'chat',
            upgrade: true
        })
        this.socket.open()
        console.log(this.socket)
        this.socket.on('connect', () => {
            console.log('连接成功')
        })
        this.socket.on('message', (data) => {
            console.log(data)
        })
        return this.value
    }

    send(data) {
        console.log(JSON.stringify(data))
        this.socket.send(JSON.stringify(data))
    }
}

