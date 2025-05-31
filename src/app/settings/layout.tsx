'use client';

import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { 
  SaveOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import SettingsNavigation from '@/components/settings/SettingsNavigation';
import { usePathname } from 'next/navigation';

const { Title } = Typography;

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getSectionTitle = () => {
    switch (pathname) {
      case '/settings':
        return 'General Settings';
      case '/settings/profile':
        return 'User Profile';
      case '/settings/notifications':
        return 'Notification Settings';
      case '/settings/pricing':
        return 'Pricing & Billing';
      default:
        return 'General Settings';
    }
  };

  const getActiveSection = () => {
    switch (pathname) {
      case '/settings':
        return 'general';
      case '/settings/profile':
        return 'profile';
      case '/settings/notifications':
        return 'notifications';
      case '/settings/pricing':
        return 'pricing';
      default:
        return 'general';
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
              {children}
            </Card>
          </div>
        </Col>

        <Col span={6}>
          <div className="sticky top-0 flex flex-col gap-3">
            <Card className="h-fit">
              <SettingsNavigation 
                activeSection={getActiveSection()}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
} 