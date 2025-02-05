import {PageContainer} from "@ant-design/pro-components";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getVideoRecord} from "@/api/VideoApi";

export default () => {

    const params = useParams()

    const data = useState({})

    useEffect(() => {
        if(params.id){
            getVideoRecord().then(res => {
                console.log(res)
            })
        }else{
            history.back()
        }
    }, [])

    return (
        <PageContainer content="欢迎使用 ProLayout 组件">

        </PageContainer>
    )
}