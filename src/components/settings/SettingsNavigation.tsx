import React from 'react';
import { Typography, Menu } from 'antd';
import { 
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Title } = Typography;

interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const menuItems = [
    {
      key: 'general',
      icon: <SettingOutlined className="text-sm" />,
      label: <span className="text-xs">General Settings</span>,
    },
    {
      key: 'preferences',
      icon: <UserOutlined className="text-sm" />,
      label: <span className="text-xs">User Preferences</span>,
    },
    {
      key: 'notifications',
      icon: <BellOutlined className="text-sm" />,
      label: <span className="text-xs">Notifications</span>,
    },
    {
      key: 'security',
      icon: <SecurityScanOutlined className="text-sm" />,
      label: <span className="text-xs">Security</span>,
    },
    {
      key: 'pricing',
      icon: <CreditCardOutlined className="text-sm" />,
      label: <span className="text-xs">Pricing & Billing</span>,
    },
    {
      key: 'system',
      icon: <DesktopOutlined className="text-sm" />,
      label: <span className="text-xs">System</span>,
    },
    {
      key: 'data',
      icon: <DatabaseOutlined className="text-sm" />,
      label: <span className="text-xs">Data Management</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <Title level={5} className="font-quicksand">Settings</Title>
      
      <Menu
        mode="vertical"
        selectedKeys={[activeSection]}
        onSelect={({ key }) => onSectionChange(key)}
        className="border-none"
        items={menuItems}
      />
    </div>
  );
};

export default SettingsNavigation; 