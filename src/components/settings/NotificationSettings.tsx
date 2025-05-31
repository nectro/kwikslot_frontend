import React from 'react';
import { Form, Switch, Card, Row, Col, Typography, Select, TimePicker, Checkbox } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const NotificationSettings: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true,
          newBookingEmail: true,
          newBookingSms: false,
          cancellationEmail: true,
          cancellationSms: true,
          reminderEmail: true,
          reminderSms: false,
          paymentEmail: true,
          paymentSms: false,
          quietHoursEnabled: true,
          quietHoursStart: dayjs('22:00', 'HH:mm'),
          quietHoursEnd: dayjs('08:00', 'HH:mm'),
          reminderTiming: ['24h', '2h'],
          emailFrequency: 'immediate',
          marketingEmails: false,
          systemUpdates: true,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card className="h-full">
              <Title level={5} className="font-quicksand mb-4">Notification Channels</Title>
              
              <div className="space-y-4">
                <Form.Item 
                  name="emailNotifications" 
                  valuePropName="checked"
                  label={<span className="text-xs font-medium">Email Notifications</span>}
                >
                  <div className="flex items-center gap-2">
                    <Switch size="small" />
                    <Text className="text-xs">Enable email notifications</Text>
                  </div>
                </Form.Item>

                <Form.Item 
                  name="smsNotifications" 
                  valuePropName="checked"
                  label={<span className="text-xs font-medium">SMS Notifications</span>}
                >
                  <div className="flex items-center gap-2">
                    <Switch size="small" />
                    <Text className="text-xs">Enable SMS notifications</Text>
                  </div>
                </Form.Item>

                <Form.Item 
                  name="pushNotifications" 
                  valuePropName="checked"
                  label={<span className="text-xs font-medium">Push Notifications</span>}
                >
                  <div className="flex items-center gap-2">
                    <Switch size="small" />
                    <Text className="text-xs">Enable browser push notifications</Text>
                  </div>
                </Form.Item>

                <Form.Item 
                  name="emailFrequency" 
                  label={<span className="text-xs font-medium">Email Frequency</span>}
                >
                  <Select size="small" className="text-xs">
                    <Select.Option value="immediate">Immediate</Select.Option>
                    <Select.Option value="hourly">Hourly digest</Select.Option>
                    <Select.Option value="daily">Daily digest</Select.Option>
                    <Select.Option value="weekly">Weekly digest</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="h-full">
              <Title level={5} className="font-quicksand mb-4">Booking Notifications</Title>
              
              <div className="space-y-4">
                <div>
                  <Text className="text-xs font-medium block mb-3">New Bookings</Text>
                  <div className="space-y-2">
                    <Form.Item name="newBookingEmail" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">Email notifications</Text>
                      </div>
                    </Form.Item>
                    <Form.Item name="newBookingSms" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">SMS notifications</Text>
                      </div>
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <Text className="text-xs font-medium block mb-3">Cancellations</Text>
                  <div className="space-y-2">
                    <Form.Item name="cancellationEmail" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">Email notifications</Text>
                      </div>
                    </Form.Item>
                    <Form.Item name="cancellationSms" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">SMS notifications</Text>
                      </div>
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <Text className="text-xs font-medium block mb-3">Payment Updates</Text>
                  <div className="space-y-2">
                    <Form.Item name="paymentEmail" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">Email notifications</Text>
                      </div>
                    </Form.Item>
                    <Form.Item name="paymentSms" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">SMS notifications</Text>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="h-full">
              <Title level={5} className="font-quicksand mb-4">Reminder Settings</Title>
              
              <div className="space-y-4">
                <Form.Item 
                  name="reminderTiming" 
                  label={<span className="text-xs font-medium">Send Reminders</span>}
                >
                  <Checkbox.Group className="flex flex-col gap-2">
                    <Checkbox value="24h" className="text-xs">24 hours before</Checkbox>
                    <Checkbox value="4h" className="text-xs">4 hours before</Checkbox>
                    <Checkbox value="2h" className="text-xs">2 hours before</Checkbox>
                    <Checkbox value="30m" className="text-xs">30 minutes before</Checkbox>
                  </Checkbox.Group>
                </Form.Item>

                <div>
                  <Text className="text-xs font-medium block mb-3">Reminder Channels</Text>
                  <div className="space-y-2">
                    <Form.Item name="reminderEmail" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">Email reminders</Text>
                      </div>
                    </Form.Item>
                    <Form.Item name="reminderSms" valuePropName="checked" className="!mb-2">
                      <div className="flex items-center gap-2">
                        <Switch size="small" />
                        <Text className="text-xs">SMS reminders</Text>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="h-full">
              <Title level={5} className="font-quicksand mb-4">Quiet Hours</Title>
              
              <div className="space-y-4">
                <Form.Item 
                  name="quietHoursEnabled" 
                  valuePropName="checked"
                  label={<span className="text-xs font-medium">Enable Quiet Hours</span>}
                >
                  <div className="flex items-center gap-2">
                    <Switch size="small" />
                    <Text className="text-xs">No notifications during quiet hours</Text>
                  </div>
                </Form.Item>

                <Row gutter={[16, 16]}>
                  <Col xs={12}>
                    <Form.Item 
                      name="quietHoursStart" 
                      label={<span className="text-xs font-medium">Start Time</span>}
                    >
                      <TimePicker 
                        format="HH:mm" 
                        size="small" 
                        className="w-full text-xs" 
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item 
                      name="quietHoursEnd" 
                      label={<span className="text-xs font-medium">End Time</span>}
                    >
                      <TimePicker 
                        format="HH:mm" 
                        size="small" 
                        className="w-full text-xs" 
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="pt-4 border-t border-gray-100">
                  <Text className="text-xs text-gray-500">
                    During quiet hours, only urgent notifications will be sent.
                  </Text>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">System Notifications</Title>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="systemUpdates" 
                    valuePropName="checked"
                    label={<span className="text-xs font-medium">System Updates</span>}
                  >
                    <div className="flex items-center gap-2">
                      <Switch size="small" />
                      <Text className="text-xs">Notify about system updates</Text>
                    </div>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="marketingEmails" 
                    valuePropName="checked"
                    label={<span className="text-xs font-medium">Marketing Emails</span>}
                  >
                    <div className="flex items-center gap-2">
                      <Switch size="small" />
                      <Text className="text-xs">Receive marketing updates</Text>
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

export default NotificationSettings; 