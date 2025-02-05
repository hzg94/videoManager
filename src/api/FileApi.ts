import axios from "axios";
import {FileType} from "@/common/type/file";
import {BaseResponseType} from "@/common/type";


export const FileApiUrl = {
    List: "/api/file/ls",
    getPic: '/api/file/getPic'
}


export const getFileList = (path:string) => {
    return axios.get<BaseResponseType<FileType[]>>(FileApiUrl.List, {
        params: {
            path
        }
    })
}