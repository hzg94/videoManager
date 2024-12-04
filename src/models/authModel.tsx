import {message} from "antd";
import {history} from "@@/core/history";
import {proxyWithPersist} from "@/utils/Store/ValtioUtils";
import {UserType} from "@/models/types/AuthType";

//存储key
const UserLocalStorageKey = "nowUser"

const authState = proxyWithPersist<UserType>({

    LoginUser: {
        token: "",
        userId: "",
        username: ""
    }
}, {key: UserLocalStorageKey})


const actions = {
    logout() {
        authState.LoginUser = {}
        message.success("退出成功")
        history.push("/login");
    },
    login(username: string, password: string) {

    }
}

export default {
    authState,
    ...actions
}