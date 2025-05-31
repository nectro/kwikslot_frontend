import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, Avatar, Upload, message, Divider, Space } from 'antd';
import { UserOutlined, EditOutlined, LockOutlined, MailOutlined, PhoneOutlined, UploadOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserProfile: React.FC = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editingProfile, setEditingProfile] = useState(false);

  // Mock user data - in real app this would come from API/context
  const userInfo = {
    name: 'John Doe',
    email: 'john@kwikslot.com',
    phone: '+1 234-567-8900',
    role: 'Administrator',
    avatar: null
  };

  const handleProfileUpdate = (values: any) => {
    console.log('Profile update:', values);
    message.success('Profile updated successfully');
    setEditingProfile(false);
  };

  const handlePasswordChange = (values: any) => {
    console.log('Password change:', values);
    message.success('Password changed successfully');
    passwordForm.resetFields();
  };

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success('Avatar uploaded successfully');
    }
  };

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        {/* Profile Information */}
        <Col xs={24} lg={12}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <Title level={5} className="font-quicksand !mb-0">Profile Information</Title>
              <Button 
                size="small" 
                icon={<EditOutlined />}
                onClick={() => setEditingProfile(!editingProfile)}
                type={editingProfile ? 'primary' : 'default'}
              >
                {editingProfile ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {/* Avatar Section */}
            <div className="text-center mb-6">
              <Avatar size={80} icon={<UserOutlined />} className="bg-gradient-to-br from-brand-primary to-blue-400 mb-3" />
              {editingProfile && (
                <Upload
                  name="avatar"
                  showUploadList={false}
                  action="/api/upload"
                  onChange={handleAvatarUpload}
                >
                  <Button icon={<UploadOutlined />} size="small" className="text-xs">
                    Change Avatar
                  </Button>
                </Upload>
              )}
            </div>

            <Form
              form={profileForm}
              layout="vertical"
              onFinish={handleProfileUpdate}
              initialValues={userInfo}
            >
              <Form.Item 
                name="name" 
                label={<span className="text-xs font-medium">Full Name</span>}
                rules={[{ required: true, message: 'Name is required' }]}
              >
                <Input 
                  size="small" 
                  prefix={<UserOutlined className="text-gray-400" />}
                  disabled={!editingProfile}
                  className="text-xs"
                />
              </Form.Item>

              <Form.Item 
                name="email" 
                label={<span className="text-xs font-medium">Email Address</span>}
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  size="small" 
                  prefix={<MailOutlined className="text-gray-400" />}
                  disabled={!editingProfile}
                  className="text-xs"
                />
              </Form.Item>

              <Form.Item 
                name="phone" 
                label={<span className="text-xs font-medium">Phone Number</span>}
                rules={[{ required: true, message: 'Phone number is required' }]}
              >
                <Input 
                  size="small" 
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  disabled={!editingProfile}
                  className="text-xs"
                />
              </Form.Item>

              <Form.Item 
                name="role" 
                label={<span className="text-xs font-medium">Role</span>}
              >
                <Input 
                  size="small" 
                  disabled
                  className="text-xs bg-gray-50"
                />
              </Form.Item>

              {editingProfile && (
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" size="small">
                      Save Changes
                    </Button>
                    <Button size="small" onClick={() => setEditingProfile(false)}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              )}
            </Form>
          </Card>
        </Col>

        {/* Security Settings */}
        <Col xs={24} lg={12}>
          <Card>
            <Title level={5} className="font-quicksand mb-4">Security Settings</Title>

            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordChange}
            >
              <Form.Item 
                name="currentPassword" 
                label={<span className="text-xs font-medium">Current Password</span>}
                rules={[{ required: true, message: 'Current password is required' }]}
              >
                <Input.Password 
                  size="small" 
                  prefix={<LockOutlined className="text-gray-400" />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  className="text-xs"
                />
              </Form.Item>

              <Form.Item 
                name="newPassword" 
                label={<span className="text-xs font-medium">New Password</span>}
                rules={[
                  { required: true, message: 'New password is required' },
                  { min: 8, message: 'Password must be at least 8 characters' }
                ]}
              >
                <Input.Password 
                  size="small" 
                  prefix={<LockOutlined className="text-gray-400" />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  className="text-xs"
                />
              </Form.Item>

              <Form.Item 
                name="confirmPassword" 
                label={<span className="text-xs font-medium">Confirm New Password</span>}
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  size="small" 
                  prefix={<LockOutlined className="text-gray-400" />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  className="text-xs"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="small">
                  Change Password
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <div className="space-y-3">
              <Text strong className="text-xs block">Password Requirements:</Text>
              <ul className="text-xs text-gray-600 space-y-1 ml-4">
                <li>• At least 8 characters long</li>
                <li>• Mix of uppercase and lowercase letters</li>
                <li>• At least one number</li>
                <li>• At least one special character</li>
              </ul>
            </div>
          </Card>
        </Col>

        {/* Account Information */}
        <Col xs={24}>
          <Card>
            <Title level={5} className="font-quicksand mb-4">Account Information</Title>
            
            <Row gutter={[16, 16]}>
              <Col xs={12} md={6}>
                <div className="text-xs">
                  <Text type="secondary" className="block mb-1">Account Created</Text>
                  <Text strong>January 15, 2024</Text>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="text-xs">
                  <Text type="secondary" className="block mb-1">Last Login</Text>
                  <Text strong>Today, 9:30 AM</Text>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="text-xs">
                  <Text type="secondary" className="block mb-1">Login Count</Text>
                  <Text strong>147 times</Text>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="text-xs">
                  <Text type="secondary" className="block mb-1">Account Status</Text>
                  <Text strong className="text-green-600">Active</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile; 