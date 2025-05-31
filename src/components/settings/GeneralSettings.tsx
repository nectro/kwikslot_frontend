import React from 'react';
import { Form, Input, Select, Switch, Card, Row, Col, Typography, TimePicker, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const GeneralSettings: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          businessName: 'KwikSlot Salon',
          businessEmail: 'info@kwikslot.com',
          businessPhone: '+1 (555) 123-4567',
          businessAddress: '123 Main Street, City, State 12345',
          timezone: 'America/New_York',
          dateFormat: 'MM/DD/YYYY',
          timeFormat: '12-hour',
          currency: 'USD',
          language: 'en',
          openTime: dayjs('09:00', 'HH:mm'),
          closeTime: dayjs('20:00', 'HH:mm'),
          autoLogout: true,
          sessionTimeout: 30,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Business Information</Title>
              
              <Form.Item 
                name="businessName" 
                label={<span className="text-xs font-medium">Business Name</span>}
              >
                <Input size="small" className="text-xs" />
              </Form.Item>

              <Form.Item 
                name="businessEmail" 
                label={<span className="text-xs font-medium">Business Email</span>}
              >
                <Input type="email" size="small" className="text-xs" />
              </Form.Item>

              <Form.Item 
                name="businessPhone" 
                label={<span className="text-xs font-medium">Business Phone</span>}
              >
                <Input size="small" className="text-xs" />
              </Form.Item>

              <Form.Item 
                name="businessAddress" 
                label={<span className="text-xs font-medium">Business Address</span>}
              >
                <Input.TextArea rows={3} size="small" className="text-xs" />
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Regional Settings</Title>
              
              <Form.Item 
                name="timezone" 
                label={<span className="text-xs font-medium">Timezone</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="America/New_York">Eastern Time (ET)</Select.Option>
                  <Select.Option value="America/Chicago">Central Time (CT)</Select.Option>
                  <Select.Option value="America/Denver">Mountain Time (MT)</Select.Option>
                  <Select.Option value="America/Los_Angeles">Pacific Time (PT)</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="dateFormat" 
                label={<span className="text-xs font-medium">Date Format</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
                  <Select.Option value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
                  <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="timeFormat" 
                label={<span className="text-xs font-medium">Time Format</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="12-hour">12-hour (AM/PM)</Select.Option>
                  <Select.Option value="24-hour">24-hour</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="currency" 
                label={<span className="text-xs font-medium">Currency</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="USD">USD ($)</Select.Option>
                  <Select.Option value="EUR">EUR (€)</Select.Option>
                  <Select.Option value="GBP">GBP (£)</Select.Option>
                  <Select.Option value="CAD">CAD (C$)</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="language" 
                label={<span className="text-xs font-medium">Language</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="es">Spanish</Select.Option>
                  <Select.Option value="fr">French</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Operating Hours</Title>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="openTime" 
                    label={<span className="text-xs font-medium">Opening Time</span>}
                  >
                    <TimePicker 
                      format="HH:mm" 
                      size="small" 
                      className="w-full text-xs" 
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="closeTime" 
                    label={<span className="text-xs font-medium">Closing Time</span>}
                  >
                    <TimePicker 
                      format="HH:mm" 
                      size="small" 
                      className="w-full text-xs" 
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Security</Title>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="autoLogout" 
                    valuePropName="checked"
                    label={<span className="text-xs font-medium">Auto Logout</span>}
                  >
                    <div className="flex items-center gap-2">
                      <Switch size="small" />
                      <Text className="text-xs">Enable automatic logout</Text>
                    </div>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="sessionTimeout" 
                    label={<span className="text-xs font-medium">Session Timeout (minutes)</span>}
                  >
                    <Select size="small" className="text-xs">
                      <Select.Option value={15}>15 minutes</Select.Option>
                      <Select.Option value={30}>30 minutes</Select.Option>
                      <Select.Option value={60}>1 hour</Select.Option>
                      <Select.Option value={120}>2 hours</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GeneralSettings; 