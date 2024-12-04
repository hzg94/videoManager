import axios from "axios";
import {FileType} from "@/common/type/file";
import {BaseResponseType} from "@/common/type";


const FileApiUrl = {
    List: "/api/file/ls",
}


export const getFileList = (path:string) => {
    return axios.get<BaseResponseType<FileType[]>>(FileApiUrl.List, {
        params: {
            path
        }
    })
}