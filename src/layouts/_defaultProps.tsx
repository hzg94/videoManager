import {CrownFilled, DesktopOutlined, InboxOutlined, PieChartOutlined} from '@ant-design/icons';
import React from "react";

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                name: '首页(Beta)',
                icon: <DesktopOutlined />,
            },
            {
                path: 'video',
                name: '视频管理',
                icon: <DesktopOutlined />,
                routes: [
                    {
                        path: 'index',
                        name: '视频管理(Beta)',
                        icon: <DesktopOutlined />,
                    },
                    {
                        path: 'file',
                        name: '文件管理(Beta)',
                        icon: <PieChartOutlined />,
                    },
                ],
            },
            {
                path: 'subscribe',
                name: '订阅管理(Feature)',
                icon: <InboxOutlined />,
            },
            {
                path: 'plugins',
                name: '插件管理(Feature)',
                icon: <InboxOutlined />,
            },
            {
                path: 'setting',
                name: '设置',
                icon: <InboxOutlined />,
            },
        ],
    },
    location: {
        pathname: '/',
    },
};