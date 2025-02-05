import React, {useEffect, useState} from "react";
import Card from "@/components/Card";
import {Button, Drawer, Flex, Form, Space} from "antd";
import {VideoData} from "@/common/type/video";
import {getVideoRecord} from "@/api/VideoApi";
import {PageContainer} from "@ant-design/pro-components";
import {DrawerForm} from "@ant-design/pro-form/lib";


export default () => {

    const [videoData, setVideoData] = useState<VideoData[]>([])

    const [form] = Form.useForm<{ name: string; company: string }>();

    useEffect(() => {
        getVideoRecord().then(res => {
            setVideoData(res.data.data)
        })
    }, []);

    return (
        <PageContainer extra={[
            <DrawerForm title={"新增视频"} trigger={<Button type={"primary"}>新增</Button>} />,
            <Button>导入</Button>
        ]}>


            {/*🚧施工中。。。。*/}
            <Space size={[8, 16]} wrap>
                {
                    videoData.map(item => (
                        <Card key={item.id} title={item.title} pic={item.posterPicPath}/>
                    ))
                }
            </Space>
        </PageContainer>
    )
}