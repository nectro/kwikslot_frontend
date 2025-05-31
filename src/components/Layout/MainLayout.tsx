'use client'

import { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  ToolOutlined,
  HistoryOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/logo.svg';

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Get page title based on pathname
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/staff':
        return 'Staff Management';
      case '/services':
        return 'Services';
      case '/history':
        return 'History';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: '/staff',
      icon: <TeamOutlined />,
      label: <Link href="/staff">Staff</Link>,
    },
    {
      key: '/services',
      icon: <ToolOutlined />,
      label: <Link href="/services">Services</Link>,
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: <Link href="/history">History</Link>,
    },
  ];

  const settingsItem = {
    key: '/settings',
    icon: <SettingOutlined />,
    label: <Link href="/settings">Settings</Link>,
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link href="/settings/profile">Profile</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={220}
      >
        <div className="p-4 flex justify-center items-center">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} w-full`}>
            <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-full">
              <Image
                src={Logo}
                alt="KwikSlot Logo"
                fill
                className="object-contain p-3"
                priority
              />
            </div>
            {!collapsed && (
              <>
                <span className="ml-3 text-2xl font-semibold font-quicksand text-brand-secondary">
                  Kwik
                </span>
                <span className="text-2xl font-semibold font-quicksand text-brand-primary ml-0.5">
                  Slot
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-80px)]">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            className="border-none font-quicksand"
          />

          <div className="border-t border-gray-200">
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              items={[settingsItem]}
              className="border-none font-poppins"
            />

            <div className="p-4 border-t border-gray-200">
              <Dropdown
                menu={{ items: userMenuItems }}
                trigger={['click']}
                placement="topRight"
              >
                <div className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <Avatar icon={<UserOutlined />} size={30} />
                  {!collapsed && (
                    <div className="ml-3">
                      <div className="text-sm font-medium text-black">John Doe</div>
                      <div className="text-xs text-gray-500">Administrator</div>
                    </div>
                  )}
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header className="!bg-transparent !px-4 !py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg hover:bg-gray-100"
            />
            <Title level={3} className="!mb-0 text-gray-800 font-quicksand !font-bold">
              {getPageTitle(pathname)}
            </Title>
          </div>

          <div className="flex items-center gap-3 pr-4">
            <Button
              shape="circle"
              size="large"
              icon={
              <Badge count={5} size="small">
                <BellOutlined className='!text-base' />
              </Badge>
              }
              className="!hover:bg-gray-100 flex items-center justify-center !shadow-none !border-none"
            />
          </div>
        </Header>

        <Content className="mx-4 my-3 h-[calc(100vh-120px)] overflow-y-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
} 