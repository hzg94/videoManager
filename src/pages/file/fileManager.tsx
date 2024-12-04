import {useSearchParams} from "umi";
import React, {useRef, useState} from "react";
import {ActionType, ProList} from "@ant-design/pro-components";
import {FileType} from "@/common/type/file";
import {getFileList} from "@/api/FileApi";
import {dirname, join} from "pathe";
import {Button, Form, Input} from "antd";
import {FileOutlined, FolderOutlined, LeftOutlined, RedoOutlined} from "@ant-design/icons";

export default () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const nowPath= useRef<string>(searchParams.get('path') ?? './')

    const actionRef = useRef<ActionType>();

    const [form] = Form.useForm();

    const JumpPath = (path: string) => {
        form.setFieldValue('path', path)
        nowPath.current = path
        setSearchParams({
            path: path
        })
        actionRef.current?.reload()
    }

    return (
        <>
            <ProList<FileType>
                rowKey="id"
                headerTitle="文件列表"
                actionRef={actionRef}
                request={async () => {
                    const response = await getFileList(nowPath.current)
                    return response.data
                }}
                toolbar={{
                    menu: {
                        items: [
                            {
                                label: (
                                    <Button
                                        icon={<LeftOutlined/>}
                                        onClick={() => {
                                            if (nowPath.current == '.' || nowPath.current == "/") {
                                                return
                                            }
                                            JumpPath(dirname(nowPath.current))
                                        }}
                                    >

                                    </Button>
                                ),
                                key: 'back',

                            },
                            {
                                label: (
                                    <Button
                                        icon={<RedoOutlined/>}
                                        onClick={() => {
                                            actionRef.current?.reload()
                                        }}
                                    ></Button>
                                ),
                                key: 'refresh',
                            },
                            {
                                key: 'path',
                                label: (
                                    <Form form={form} initialValues={{
                                        path: nowPath.current
                                    }} onFinish={values => JumpPath(values.path)} layout={"inline"}>
                                        <Form.Item name={"path"}>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button htmlType={"submit"} type="primary">GO</Button>
                                        </Form.Item>
                                    </Form>
                                )
                            }
                        ]
                    }
                }}
                metas={{
                    title: {
                        dataIndex: 'name',
                        render: (text, value) => {
                            return value.isDir ? <a onClick={() => {
                                JumpPath(join(nowPath.current, value.name))
                            }}>{text}</a> : <span>{text}</span>
                        }
                    },
                    avatar:{
                      render: (_,value) => {
                          let style = {
                              fontSize: 30
                          }
                          return value.isDir ? <FolderOutlined style={style} /> :<FileOutlined style={style}/>
                      }
                    },
                    description: {
                        dataIndex: 'createTime',
                    },
                    actions: {
                        render: () => {
                            return [
                                <a key="init">重命名</a>,
                                <a key="init">删除</a>
                            ];
                        },
                    },
                }}
            />
        </>
    )
}