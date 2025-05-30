import React from 'react';
import { Typography, Select, DatePicker, Space, Button } from 'antd';

const { Title } = Typography;

// Demo data
const DEMO_STAFF = [
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
];

const DEMO_SERVICES = [
  { value: 'haircut', label: 'Haircut' },
  { value: 'hairspa', label: 'Hair Spa' },
  { value: 'coloring', label: 'Coloring' },
];

const FilterPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <Title level={4} className="font-quicksand text-brand-secondary">Filters</Title>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Staff</label>
          <Select
            mode="multiple"
            placeholder="Select staff members"
            className="w-full"
            options={DEMO_STAFF}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Services</label>
          <Select
            mode="multiple"
            placeholder="Select services"
            className="w-full"
            options={DEMO_SERVICES}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <Space direction="vertical" className="w-full">
            <DatePicker className="w-full" placeholder="Start date" />
            <DatePicker className="w-full" placeholder="End date" />
          </Space>
        </div>

        <div className="pt-4">
          <Button type="primary" block>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 