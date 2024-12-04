import {LoginOutlined, MoonOutlined, SunOutlined,} from '@ant-design/icons';
import {PageContainer, ProLayout} from '@ant-design/pro-components';
import {ProConfigProvider} from '@ant-design/pro-provider';
import React, {useEffect, useState} from 'react';
import defaultProps from './_defaultProps';
import {Outlet, useNavigate, useSnapshot} from "umi";
import {Tooltip} from "antd";
import authModel from "@/models/authModel";
import AuthModel from "@/models/authModel";
import SettingModel from "@/models/settingModel";

const SwitchDarkMode = () => {
    SettingModel.settingStore.page.dark = !SettingModel.settingStore.page.dark
}

export default () => {

    const [pathname, setPathname] = useState("/list");

    const navigate = useNavigate();

    const authState = useSnapshot(AuthModel.authState)

    const settingState = useSnapshot(SettingModel.settingStore)

    useEffect(() => {
        setPathname(window.location.pathname)
    }, [window.location.pathname])

    return (
        <ProConfigProvider dark={settingState.page.dark}>
            <ProLayout
                title={"视频管理"}
                {...defaultProps}
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    size: 'small',
                    title: authState.LoginUser.username,
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <Tooltip title="退出">
                            <LoginOutlined onClick={authModel.logout}/>
                        </Tooltip>,
                        settingState.page.dark ? <SunOutlined onClick={SwitchDarkMode}/> : <MoonOutlined onClick={SwitchDarkMode}/>
                    ];
                }}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            //@ts-ignore
                            navigate(item.path)
                            setPathname(item.path || '/welcome');
                        }}
                    >
                        {dom}
                    </a>
                )}
            >
                <PageContainer>
                    <Outlet/>
                </PageContainer>
            </ProLayout>
        </ProConfigProvider>
    );
};