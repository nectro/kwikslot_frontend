'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Avatar, Tag, Space, Dropdown, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, AppstoreOutlined, UnorderedListOutlined, MoreOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import StaffFilters from '@/components/staff/StaffFilters';

interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  avatar?: string;
  experience: string;
  specialties: string[];
}

const DEMO_STAFF: Staff[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Stylist',
    email: 'sarah@kwikslot.com',
    phone: '+1 234-567-8900',
    status: 'active',
    experience: '5 years',
    specialties: ['Hair Cutting', 'Coloring', 'Styling']
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Hair Colorist',
    email: 'michael@kwikslot.com',
    phone: '+1 234-567-8901',
    status: 'active',
    experience: '3 years',
    specialties: ['Coloring', 'Highlights', 'Balayage']
  },
  {
    id: '3',
    name: 'Emma Davis',
    role: 'Junior Stylist',
    email: 'emma@kwikslot.com',
    phone: '+1 234-567-8902',
    status: 'inactive',
    experience: '1 year',
    specialties: ['Hair Cutting', 'Styling']
  }
];

export default function StaffPage() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [staff, setStaff] = useState<Staff[]>(DEMO_STAFF);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingStaff(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    form.setFieldsValue(staffMember);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Staff Member',
      content: 'Are you sure you want to delete this staff member?',
      onOk: () => {
        setStaff(staff.filter(s => s.id !== id));
      }
    });
  };

  const handleSubmit = (values: any) => {
    if (editingStaff) {
      setStaff(staff.map(s => s.id === editingStaff.id ? { ...s, ...values } : s));
    } else {
      const newStaff: Staff = {
        ...values,
        id: Date.now().toString(),
      };
      setStaff([...staff, newStaff]);
    }
    setIsModalOpen(false);
  };

  const getActionMenu = (staffMember: Staff) => ({
    items: [
      {
        key: 'edit',
        label: 'Edit',
        icon: <EditOutlined />,
        onClick: () => handleEdit(staffMember)
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: <DeleteOutlined />,
        onClick: () => handleDelete(staffMember.id),
        danger: true
      }
    ]
  });

  const renderGridCard = (staffMember: Staff) => (
    <Card
      key={staffMember.id}
      className="h-full hover:shadow-sm transition-all duration-200 border-0 transition-shadow"
      title={<div className='flex items-center gap-2'>
        <Tag color={staffMember.status === 'active' ? 'green' : 'red'} className="text-xs">
          {staffMember.status.toUpperCase()}
        </Tag>
      </div>
    }
      extra={
        <Dropdown menu={getActionMenu(staffMember)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} className="text-gray-400 hover:text-gray-600" />
        </Dropdown>
      }
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="text-center mb-3">
          <Avatar size={56} className="mb-2 bg-gradient-to-br from-brand-primary to-blue-400 text-white font-semibold shadow-lg">
            {staffMember.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <h3 className="font-semibold text-lg mb-1 font-quicksand text-gray-800">{staffMember.name}</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm text-gray-600 font-medium">{staffMember.role}</span>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 rounded px-2 py-1 inline-block">
            {staffMember.experience}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-2 mb-3 space-y-1">
          <div className="flex items-center text-xs text-gray-600">
            <MailOutlined className="mr-1 text-brand-primary text-xs" />
            <span className="truncate">{staffMember.email}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <PhoneOutlined className="mr-1 text-brand-primary text-xs" />
            <span>{staffMember.phone}</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-700 mb-1">Specialties</div>
          <div className="flex flex-wrap gap-1">
            {staffMember.specialties.map(specialty => (
              <Tag key={specialty} color="blue" className="text-xs mb-1 px-1 py-0">
                {specialty}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  const renderListCard = (staffMember: Staff) => (
    <Card
      key={staffMember.id}
      className="mb-3 hover:shadow-sm transition-all duration-200 border-0 transition-shadow"
      extra={
        <Dropdown menu={getActionMenu(staffMember)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} className="text-gray-400 hover:text-gray-600" />
        </Dropdown>
      }
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar size={48} className="bg-gradient-to-br from-brand-primary to-blue-400 text-white font-semibold shadow-lg flex-shrink-0">
          {staffMember.name.split(' ').map(n => n[0]).join('')}
        </Avatar>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg mb-1 font-quicksand text-gray-800 truncate">{staffMember.name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 font-medium">{staffMember.role}</span>
                <Tag color={staffMember.status === 'active' ? 'green' : 'red'} className="text-xs">
                  {staffMember.status.toUpperCase()}
                </Tag>
                <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
                  {staffMember.experience}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-center text-xs text-gray-600 mb-1">
                <MailOutlined className="mr-1 text-brand-primary text-xs" />
                <span className="truncate">{staffMember.email}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <PhoneOutlined className="mr-1 text-brand-primary text-xs" />
                <span>{staffMember.phone}</span>
              </div>
            </div>
            
            {/* Specialties */}
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-xs font-medium text-gray-700 mb-1">Specialties</div>
              <div className="flex flex-wrap gap-1">
                {staffMember.specialties.slice(0, 3).map(specialty => (
                  <Tag key={specialty} color="blue" className="text-xs px-1 py-0">
                    {specialty}
                  </Tag>
                ))}
                {staffMember.specialties.length > 3 && (
                  <Tag className="text-xs px-1 py-0">
                    +{staffMember.specialties.length - 3} more
                  </Tag>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="h-full">
      <Row gutter={[8, 8]} className="h-full !m-0 overflow-y-auto">
        <Col span={18}>
          <div className="flex flex-col gap-3">
            <div className="flex-1 overflow-auto">
              {viewType === 'grid' ? (
                <Row gutter={[16, 16]} className='!m-0 !p-0'>
                  {staff.map(staffMember => (
                    <Col key={staffMember.id} xs={24} sm={12} lg={8}>
                      {renderGridCard(staffMember)}
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className='flex flex-col gap-3'>
                  {staff.map(staffMember => renderListCard(staffMember))}
                </div>
              )}
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className="sticky top-0 flex flex-col gap-3">
            <div className='flex flex-row gap-2'>
              <Space.Compact>
                <Button
                  type={viewType === 'grid' ? 'primary' : 'default'}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewType('grid')}
                />
                <Button
                  type={viewType === 'list' ? 'primary' : 'default'}
                  icon={<UnorderedListOutlined />}
                  onClick={() => setViewType('list')}
                />
              </Space.Compact>
              <Button
                icon={<PlusOutlined />}
                className='flex-1'
                onClick={handleAdd}
              >
                Add Staff Member
              </Button>
            </div>
            <Card className="h-fit">
              <StaffFilters />
            </Card>
          </div>
        </Col>
      </Row>

      <Modal
        title={editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select>
                  <Select.Option value="Senior Stylist">Senior Stylist</Select.Option>
                  <Select.Option value="Hair Colorist">Hair Colorist</Select.Option>
                  <Select.Option value="Junior Stylist">Junior Stylist</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="experience"
                label="Experience"
                rules={[{ required: true, message: 'Please enter experience' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="specialties"
                label="Specialties"
                rules={[{ required: true, message: 'Please select specialties' }]}
              >
                <Select mode="multiple">
                  <Select.Option value="Hair Cutting">Hair Cutting</Select.Option>
                  <Select.Option value="Coloring">Coloring</Select.Option>
                  <Select.Option value="Styling">Styling</Select.Option>
                  <Select.Option value="Highlights">Highlights</Select.Option>
                  <Select.Option value="Balayage">Balayage</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
} 