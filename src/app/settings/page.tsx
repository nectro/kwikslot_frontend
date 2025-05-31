'use client';

import { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { 
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  SecurityScanOutlined,
  SaveOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import SettingsNavigation from '@/components/settings/SettingsNavigation';
import GeneralSettings from '@/components/settings/GeneralSettings';
import UserProfile from '@/components/settings/UserProfile';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PricingSettings from '@/components/settings/PricingSettings';

const { Title } = Typography;

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>('general');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'profile':
        return <UserProfile />;
      case 'notifications':
        return <NotificationSettings />;
      case 'pricing':
        return <PricingSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'general':
        return 'General Settings';
      case 'profile':
        return 'User Profile';
      case 'notifications':
        return 'Notification Settings';
      case 'pricing':
        return 'Pricing & Billing';
      default:
        return 'General Settings';
    }
  };

  return (
    <div className="h-full">
      <Row gutter={[8, 8]} className="h-full !m-0 overflow-y-auto">
        <Col span={18}>
          <div className="flex flex-col gap-3">
            {/* Settings Header */}
            <Card className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <Title level={5} className="font-quicksand !mb-0">{getSectionTitle()}</Title>
                <Space>
                  <Button icon={<ReloadOutlined />} size="small" className="!text-xs">
                    Reset
                  </Button>
                  <Button type="primary" icon={<SaveOutlined />} size="small" className="!text-xs">
                    Save Changes
                  </Button>
                </Space>
              </div>
              {renderActiveSection()}
            </Card>
          </div>
        </Col>

        <Col span={6}>
          <div className="sticky top-0 flex flex-col gap-3">
            <Card className="h-fit">
              <SettingsNavigation 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
} 