import React from 'react';
import { Typography, Menu } from 'antd';
import Link from 'next/link';
import { 
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  SecurityScanOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Title } = Typography;

interface SettingsNavigationProps {
  activeSection: string;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ 
  activeSection
}) => {
  const menuItems = [
    {
      key: 'general',
      icon: <SettingOutlined className="text-sm" />,
      label: <Link href="/settings" className="text-xs">General Settings</Link>,
    },
    {
      key: 'profile',
      icon: <UserOutlined className="text-sm" />,
      label: <Link href="/settings/profile" className="text-xs">User Profile</Link>,
    },
    {
      key: 'notifications',
      icon: <BellOutlined className="text-sm" />,
      label: <Link href="/settings/notifications" className="text-xs">Notifications</Link>,
    },
    {
      key: 'pricing',
      icon: <CreditCardOutlined className="text-sm" />,
      label: <Link href="/settings/pricing" className="text-xs">Pricing & Billing</Link>,
    },
  ];

  return (
    <div className="space-y-6">
      <Title level={5} className="font-quicksand">Settings</Title>
      
      <Menu
        mode="vertical"
        selectedKeys={[activeSection]}
        className="border-none"
        items={menuItems}
      />
    </div>
  );
};

export default SettingsNavigation; 