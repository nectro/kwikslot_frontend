'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Tag, Space, Dropdown, Modal, Form, Input, Select, InputNumber } from 'antd';
import { PlusOutlined, AppstoreOutlined, UnorderedListOutlined, MoreOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import ServicesFilters from '@/components/services/ServicesFilters';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  status: 'active' | 'inactive';
  popularity: 'high' | 'medium' | 'low';
}

const DEMO_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Premium Hair Cut',
    category: 'Hair Cutting',
    price: 45,
    duration: 45,
    description: 'Professional haircut with wash and styling',
    status: 'active',
    popularity: 'high'
  },
  {
    id: '2',
    name: 'Hair Coloring',
    category: 'Coloring',
    price: 120,
    duration: 120,
    description: 'Full hair coloring service with conditioning treatment',
    status: 'active',
    popularity: 'high'
  },
  {
    id: '3',
    name: 'Hair Spa Treatment',
    category: 'Treatment',
    price: 80,
    duration: 90,
    description: 'Relaxing hair spa with deep conditioning',
    status: 'active',
    popularity: 'medium'
  },
  {
    id: '4',
    name: 'Beard Trim',
    category: 'Grooming',
    price: 25,
    duration: 30,
    description: 'Professional beard trimming and styling',
    status: 'inactive',
    popularity: 'low'
  }
];

export default function ServicesPage() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [services, setServices] = useState<Service[]>(DEMO_SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Service',
      content: 'Are you sure you want to delete this service?',
      onOk: () => {
        setServices(services.filter(s => s.id !== id));
      }
    });
  };

  const handleSubmit = (values: any) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...values } : s));
    } else {
      const newService: Service = {
        ...values,
        id: Date.now().toString(),
      };
      setServices([...services, newService]);
    }
    setIsModalOpen(false);
  };

  const getActionMenu = (service: Service) => ({
    items: [
      {
        key: 'edit',
        label: 'Edit',
        icon: <EditOutlined />,
        onClick: () => handleEdit(service)
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: <DeleteOutlined />,
        onClick: () => handleDelete(service.id),
        danger: true
      }
    ]
  });

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'high': return 'green';
      case 'medium': return 'orange';
      case 'low': return 'red';
      default: return 'default';
    }
  };

  const renderGridCard = (service: Service) => (
    <Card
      key={service.id}
      className="h-full hover:shadow-md transition-shadow"
      extra={
        <Dropdown menu={getActionMenu(service)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 bg-brand-primary bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-2xl text-brand-primary">
            {service.name.charAt(0)}
          </span>
        </div>

        <h3 className="font-semibold text-lg mb-1 font-quicksand">{service.name}</h3>
        <p className="text-gray-500 mb-3">{service.category}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2">
            <DollarOutlined className="text-gray-400" />
            <span className="font-semibold text-brand-primary">${service.price}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ClockCircleOutlined className="text-gray-400" />
            <span className="text-sm text-gray-600">{service.duration} min</span>
          </div>
        </div>

        <div className="mb-3 space-x-2">
          <Tag color={service.status === 'active' ? 'green' : 'red'}>
            {service.status.toUpperCase()}
          </Tag>
          <Tag color={getPopularityColor(service.popularity)}>
            {service.popularity.toUpperCase()}
          </Tag>
        </div>

        <p className="text-sm text-gray-600">{service.description}</p>
      </div>
    </Card>
  );

  const renderListCard = (service: Service) => (
    <Card
      key={service.id}
      className="mb-4 hover:shadow-md transition-shadow"
      extra={
        <Dropdown menu={getActionMenu(service)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-brand-primary bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xl text-brand-primary">
            {service.name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg mb-1 font-quicksand">{service.name}</h3>
              <p className="text-gray-500">{service.category}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-lg text-brand-primary">${service.price}</div>
              <div className="text-sm text-gray-500">{service.duration} minutes</div>
            </div>
          </div>

          <p className="text-gray-600 mb-3">{service.description}</p>

          <div className="flex items-center gap-2">
            <Tag color={service.status === 'active' ? 'green' : 'red'}>
              {service.status.toUpperCase()}
            </Tag>
            <Tag color={getPopularityColor(service.popularity)}>
              {service.popularity.toUpperCase()} DEMAND
            </Tag>
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
                {services.map(service => (
                  <Col key={service.id} xs={24} sm={12} lg={8}>
                    {renderGridCard(service)}
                  </Col>
                ))}
              </Row>
            ) : (
              <div>
                {services.map(service => renderListCard(service))}
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
                Add Service
              </Button>
            </div>
            <Card className="h-fit">
              <ServicesFilters />
            </Card>
          </div>
        </Col>
      </Row>

      <Modal
        title={editingService ? 'Edit Service' : 'Add Service'}
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
                label="Service Name"
                rules={[{ required: true, message: 'Please enter service name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select>
                  <Select.Option value="Hair Cutting">Hair Cutting</Select.Option>
                  <Select.Option value="Coloring">Coloring</Select.Option>
                  <Select.Option value="Treatment">Treatment</Select.Option>
                  <Select.Option value="Grooming">Grooming</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price ($)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Duration (minutes)"
                rules={[{ required: true, message: 'Please enter duration' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
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
                name="popularity"
                label="Popularity"
                rules={[{ required: true, message: 'Please select popularity' }]}
              >
                <Select>
                  <Select.Option value="high">High</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="low">Low</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
} 