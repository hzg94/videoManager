import React from "react";
import {ProList} from "@ant-design/pro-components";
import {PauseCircleOutlined} from "@ant-design/icons";


export default () => {

    return (
        <ProList<any>
            headerTitle="插件管理(beta)"
            pagination={{
                defaultPageSize: 8,
                showSizeChanger: false,
            }}
            grid={{gutter: 16, column: 4}}
            metas={{
                title: {},
                subTitle: {},
                type: {},
                content: {},
                avatar: {
                  render: () => {
                      return <PauseCircleOutlined style={{
                          fontSize: 20,
                          marginRight: 5
                      }} />
                  }
                },
                actions: {
                    cardActionProps: 'extra',
                    render: () => {
                        return [<a key="run">启用</a>, <a key="delete">移除</a>]
                    }
                },
            }}
            dataSource={[
                {
                    title: '测试',
                    subTitle: '(beta)',
                    content: "cccccccccccc"
                },
                {
                    title: '测试',
                    subTitle: 'ccc',
                    content: "cccccccccccc"
                },
                {
                    title: '测试',
                    subTitle: 'ccc',
                    content: "cccccccccccc"
                }
            ]}
        />
    )
}