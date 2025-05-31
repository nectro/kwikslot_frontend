import React from 'react';
import { Form, Select, Switch, Card, Row, Col, Typography, Slider, Radio } from 'antd';

const { Title, Text } = Typography;

const UserPreferences: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          theme: 'light',
          primaryColor: '#4E4FEB',
          fontSize: 'small',
          sidebarCollapsed: false,
          showTooltips: true,
          animationsEnabled: true,
          defaultView: 'timeline',
          appointmentDuration: 30,
          bookingReminders: true,
          autoRefresh: true,
          refreshInterval: 30,
          soundNotifications: true,
          desktopNotifications: true,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Appearance</Title>
              
              <Form.Item 
                name="theme" 
                label={<span className="text-xs font-medium">Theme</span>}
              >
                <Radio.Group size="small">
                  <Radio value="light" className="text-xs">Light</Radio>
                  <Radio value="dark" className="text-xs">Dark</Radio>
                  <Radio value="auto" className="text-xs">Auto</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item 
                name="primaryColor" 
                label={<span className="text-xs font-medium">Primary Color</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="#4E4FEB">KwikSlot Blue</Select.Option>
                  <Select.Option value="#52c41a">Green</Select.Option>
                  <Select.Option value="#1890ff">Blue</Select.Option>
                  <Select.Option value="#722ed1">Purple</Select.Option>
                  <Select.Option value="#eb2f96">Pink</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="fontSize" 
                label={<span className="text-xs font-medium">Font Size</span>}
              >
                <Radio.Group size="small">
                  <Radio value="small" className="text-xs">Small</Radio>
                  <Radio value="medium" className="text-xs">Medium</Radio>
                  <Radio value="large" className="text-xs">Large</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item 
                name="sidebarCollapsed" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Sidebar</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Start with sidebar collapsed</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="showTooltips" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Tooltips</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Show helpful tooltips</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="animationsEnabled" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Animations</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Enable UI animations</Text>
                </div>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Dashboard</Title>
              
              <Form.Item 
                name="defaultView" 
                label={<span className="text-xs font-medium">Default View</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="timeline">Timeline View</Select.Option>
                  <Select.Option value="calendar">Calendar View</Select.Option>
                  <Select.Option value="list">List View</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="appointmentDuration" 
                label={<span className="text-xs font-medium">Default Appointment Duration (minutes)</span>}
              >
                <Slider
                  min={15}
                  max={180}
                  step={15}
                  marks={{
                    15: <span className="text-xs">15m</span>,
                    30: <span className="text-xs">30m</span>,
                    60: <span className="text-xs">1h</span>,
                    120: <span className="text-xs">2h</span>,
                    180: <span className="text-xs">3h</span>,
                  }}
                  className="mb-4"
                />
              </Form.Item>

              <Form.Item 
                name="bookingReminders" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Booking Reminders</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Show upcoming appointment alerts</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="autoRefresh" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Auto Refresh</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Automatically refresh data</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="refreshInterval" 
                label={<span className="text-xs font-medium">Refresh Interval (seconds)</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value={15}>15 seconds</Select.Option>
                  <Select.Option value={30}>30 seconds</Select.Option>
                  <Select.Option value={60}>1 minute</Select.Option>
                  <Select.Option value={300}>5 minutes</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Notifications</Title>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="soundNotifications" 
                    valuePropName="checked"
                    label={<span className="text-xs font-medium">Sound Notifications</span>}
                  >
                    <div className="flex items-center gap-2">
                      <Switch size="small" />
                      <Text className="text-xs">Play sound for new bookings</Text>
                    </div>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="desktopNotifications" 
                    valuePropName="checked"
                    label={<span className="text-xs font-medium">Desktop Notifications</span>}
                  >
                    <div className="flex items-center gap-2">
                      <Switch size="small" />
                      <Text className="text-xs">Show desktop notifications</Text>
                    </div>
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

export default UserPreferences; 