'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Avatar, Tag, Space, Dropdown, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, AppstoreOutlined, UnorderedListOutlined, MoreOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
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
      className="h-full hover:shadow-md transition-shadow"
      extra={
        <Dropdown menu={getActionMenu(staffMember)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <div className="text-center">
        <Avatar size={64} className="mb-3 bg-brand-primary bg-opacity-20 text-brand-primary">
          {staffMember.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <h3 className="font-semibold text-lg mb-1 font-quicksand">{staffMember.name}</h3>
        <p className="text-gray-500 mb-3">{staffMember.role}</p>

        <div className="space-y-2 mb-4">
          <div className="text-sm text-gray-600">
            <MailOutlined className="mr-2" />
            {staffMember.email}
          </div>
          <div className="text-sm text-gray-600">
            <PhoneOutlined className="mr-2" />
            {staffMember.phone}
          </div>
        </div>

        <div className="mb-3">
          <Tag color={staffMember.status === 'active' ? 'green' : 'red'}>
            {staffMember.status.toUpperCase()}
          </Tag>
        </div>

        <div className="space-y-1">
          {staffMember.specialties.map(specialty => (
            <Tag key={specialty} color="blue" className="mb-1">
              {specialty}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );

  const renderListCard = (staffMember: Staff) => (
    <Card
      key={staffMember.id}
      className="mb-4 hover:shadow-md transition-shadow"
      extra={
        <Dropdown menu={getActionMenu(staffMember)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <div className="flex items-center gap-4">
        <Avatar size={56} className="bg-brand-primary bg-opacity-20 text-brand-primary">
          {staffMember.name.split(' ').map(n => n[0]).join('')}
        </Avatar>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1 font-quicksand">{staffMember.name}</h3>
              <p className="text-gray-500 mb-2">{staffMember.role}</p>
            </div>
            <Tag color={staffMember.status === 'active' ? 'green' : 'red'}>
              {staffMember.status.toUpperCase()}
            </Tag>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-sm text-gray-600 mb-1">
                <MailOutlined className="mr-2" />
                {staffMember.email}
              </div>
              <div className="text-sm text-gray-600">
                <PhoneOutlined className="mr-2" />
                {staffMember.phone}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">
                Experience: {staffMember.experience}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {staffMember.specialties.map(specialty => (
              <Tag key={specialty} color="blue">
                {specialty}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="h-full">
      <Row gutter={[8, 8]} className="h-full !m-0 overflow-y-auto">
        <Col span={18}>
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
              <div>
                {staff.map(staffMember => renderListCard(staffMember))}
              </div>
            )}
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
                type="primary"
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