import React from 'react';
import { Form, Input, Switch, Card, Row, Col, Typography, Select, Button, Alert, Table } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, DeleteOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SecuritySettings: React.FC = () => {
  const [form] = Form.useForm();

  // Demo active sessions data
  const activeSessions = [
    {
      key: '1',
      device: 'Chrome on Windows',
      location: 'New York, US',
      ipAddress: '192.168.1.1',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      key: '2',
      device: 'Safari on iPhone',
      location: 'New York, US',
      ipAddress: '192.168.1.5',
      lastActive: '1 hour ago',
      current: false,
    },
    {
      key: '3',
      device: 'Chrome on Android',
      location: 'California, US',
      ipAddress: '10.0.0.1',
      lastActive: '2 days ago',
      current: false,
    },
  ];

  const sessionColumns = [
    {
      title: <span className="text-xs font-medium">Device</span>,
      dataIndex: 'device',
      key: 'device',
      render: (text: string) => <Text className="text-xs">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Location</span>,
      dataIndex: 'location',
      key: 'location',
      render: (text: string) => <Text className="text-xs">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">IP Address</span>,
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      render: (text: string) => <Text className="text-xs">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Last Active</span>,
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (text: string) => <Text className="text-xs">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Action</span>,
      key: 'action',
      render: (_: any, record: any) => (
        record.current ? (
          <Text className="text-xs text-green-600">Current Session</Text>
        ) : (
          <Button 
            type="link" 
            size="small" 
            icon={<DeleteOutlined />} 
            className="!p-0 text-xs"
          >
            Terminate
          </Button>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          twoFactorEnabled: false,
          passwordRequirements: true,
          sessionTimeout: 30,
          loginNotifications: true,
          ipRestrictions: false,
          autoLock: true,
          autoLockTime: 15,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Password & Authentication</Title>
              
              <Form.Item 
                name="currentPassword" 
                label={<span className="text-xs font-medium">Current Password</span>}
              >
                <Input.Password 
                  size="small" 
                  className="text-xs"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item 
                name="newPassword" 
                label={<span className="text-xs font-medium">New Password</span>}
              >
                <Input.Password 
                  size="small" 
                  className="text-xs"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item 
                name="confirmPassword" 
                label={<span className="text-xs font-medium">Confirm New Password</span>}
              >
                <Input.Password 
                  size="small" 
                  className="text-xs"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item 
                name="twoFactorEnabled" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Two-Factor Authentication</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Enable 2FA for enhanced security</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="passwordRequirements" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Strong Password Requirements</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Enforce strong password policies</Text>
                </div>
              </Form.Item>

              <div className="pt-4">
                <Button type="primary" size="small" className="text-xs" icon={<LockOutlined />}>
                  Update Password
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Session Management</Title>
              
              <Form.Item 
                name="sessionTimeout" 
                label={<span className="text-xs font-medium">Session Timeout (minutes)</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value={15}>15 minutes</Select.Option>
                  <Select.Option value={30}>30 minutes</Select.Option>
                  <Select.Option value={60}>1 hour</Select.Option>
                  <Select.Option value={120}>2 hours</Select.Option>
                  <Select.Option value={480}>8 hours</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="autoLock" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Auto Lock</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Lock screen when inactive</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="autoLockTime" 
                label={<span className="text-xs font-medium">Auto Lock Time (minutes)</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value={5}>5 minutes</Select.Option>
                  <Select.Option value={10}>10 minutes</Select.Option>
                  <Select.Option value={15}>15 minutes</Select.Option>
                  <Select.Option value={30}>30 minutes</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="loginNotifications" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Login Notifications</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Notify on new device login</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="ipRestrictions" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">IP Restrictions</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Restrict login to specific IP addresses</Text>
                </div>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Active Sessions</Title>
              
              <Alert
                message={<span className="text-xs">You are currently signed in to KwikSlot on these devices.</span>}
                type="info"
                showIcon
                className="mb-4"
              />

              <Table
                columns={sessionColumns}
                dataSource={activeSessions}
                pagination={false}
                size="small"
                className="text-xs"
              />

              <div className="flex justify-end mt-4">
                <Button type="link" size="small" className="text-xs" icon={<DeleteOutlined />}>
                  Terminate All Other Sessions
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Account Recovery</Title>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="recoveryEmail" 
                    label={<span className="text-xs font-medium">Recovery Email</span>}
                  >
                    <Input 
                      size="small" 
                      className="text-xs" 
                      placeholder="recovery@example.com"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="recoveryPhone" 
                    label={<span className="text-xs font-medium">Recovery Phone</span>}
                  >
                    <Input 
                      size="small" 
                      className="text-xs" 
                      placeholder="+1 (555) 123-4567"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div className="pt-4">
                <Button size="small" className="text-xs">
                  Generate Recovery Codes
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SecuritySettings; 