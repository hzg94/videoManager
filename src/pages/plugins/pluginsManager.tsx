import React from "react";
import {ProList} from "@ant-design/pro-components";
import {DownOutlined, PauseCircleOutlined, SmileOutlined} from "@ant-design/icons";
import {Dropdown, MenuProps, Space} from "antd";


const items: MenuProps['items'] = [
    {
        key: '1',

        label: (
            <a>
                启动
            </a>
        )
    },
];


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
                        return [
                            <Dropdown menu={{ items }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        更多
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        ]
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