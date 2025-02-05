import axios from "axios";
import {BaseResponseType} from "@/common/type";
import {VideoData} from "@/common/type/video";


const VideoApiUrl = {
    List: "/api/video/list",
    Find: "/api/video/find",
    AddTVRecord: '/api/video/addTVRecord'
}

export const getVideoRecord = async () => {
    return await axios.get<BaseResponseType<Array<VideoData>>>(VideoApiUrl.List)
}

export const findOneVideoRecord = async (filter: Partial<VideoData>) => {
    return await axios.post<BaseResponseType<VideoData>>(VideoApiUrl.Find, filter)
}

export const AddTVRecord = async (title: string) => {
    return await axios.get<BaseResponseType<Array<VideoData>>>(VideoApiUrl.AddTVRecord,{
        params: {
            title: title
        }
    })
}