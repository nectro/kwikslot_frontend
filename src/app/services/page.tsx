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
      className="h-full hover:shadow-lg transition-all duration-200 border-0 shadow-sm"
      extra={
        <Dropdown menu={getActionMenu(service)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} className="text-gray-400 hover:text-gray-600" />
        </Dropdown>
      }
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="text-center mb-3">
          <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-brand-primary to-blue-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg text-white font-semibold">
              {service.name.charAt(0)}
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-1 font-quicksand text-gray-800">{service.name}</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-sm text-gray-600 font-medium">{service.category}</p>
            <Tag color={service.status === 'active' ? 'green' : 'red'} className="text-xs">
              {service.status.toUpperCase()}
            </Tag>
          </div>
          <Tag color={getPopularityColor(service.popularity)} className="text-xs mb-2">
            {service.popularity.toUpperCase()} DEMAND
          </Tag>
        </div>

        {/* Price and Duration Section */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-brand-primary">${service.price}</div>
              <div className="text-xs text-gray-500 uppercase font-medium">Price</div>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-gray-700">{service.duration}</div>
              <div className="text-xs text-gray-500 uppercase font-medium">Minutes</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 px-1">
          <p className="text-xs text-gray-600 line-clamp-3">{service.description}</p>
        </div>
      </div>
    </Card>
  );

  const renderListCard = (service: Service) => (
    <Card
      key={service.id}
      className="mb-3 hover:shadow-lg transition-all duration-200 border-0 shadow-sm"
      extra={
        <Dropdown menu={getActionMenu(service)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} className="text-gray-400 hover:text-gray-600" />
        </Dropdown>
      }
    >
      <div className="flex items-start gap-3">
        {/* Service Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-lg text-white font-semibold">
            {service.name.charAt(0)}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg mb-1 font-quicksand text-gray-800 truncate">{service.name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 font-medium">{service.category}</span>
                <div className="flex gap-1">
                  <Tag color={service.status === 'active' ? 'green' : 'red'} className="text-xs">
                    {service.status.toUpperCase()}
                  </Tag>
                  <Tag color={getPopularityColor(service.popularity)} className="text-xs">
                    {service.popularity.toUpperCase()}
                  </Tag>
                </div>
              </div>
            </div>
            
            {/* Price and Duration */}
            <div className="bg-gray-50 rounded-lg p-2 ml-3 text-center min-w-0">
              <div className="text-lg font-bold text-brand-primary">${service.price}</div>
              <div className="text-xs text-gray-500">{service.duration} min</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
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