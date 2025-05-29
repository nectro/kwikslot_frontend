import { Button, Input, Select, Card, Space, Typography } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ExampleComponent() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={4}>Search and Filter</Title>
          <Space.Compact className="w-full">
            <Input 
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
            />
            <Select
              defaultValue="all"
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'products', label: 'Products' },
                { value: 'services', label: 'Services' },
                { value: 'locations', label: 'Locations' },
              ]}
            />
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          </Space.Compact>
        </div>

        <div>
          <Title level={4}>Quick Actions</Title>
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined />}>
              Add New
            </Button>
            <Button>Export</Button>
            <Button>Import</Button>
            <Button>Settings</Button>
          </Space>
        </div>

        <div>
          <Title level={4}>Advanced Options</Title>
          <Space direction="vertical" className="w-full">
            <Select
              mode="multiple"
              placeholder="Select multiple options"
              className="w-full"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
                { value: 'option4', label: 'Option 4' },
              ]}
            />
            <Input.TextArea 
              placeholder="Additional notes..."
              rows={4}
            />
          </Space>
        </div>
      </Space>
    </Card>
  );
} 