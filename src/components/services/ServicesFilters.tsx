import React from 'react';
import { Typography, Select, Input, Button, Slider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ServicesFilters: React.FC = () => {
  return (
    <div className="space-y-6">
      <Title level={4} className="font-quicksand">Filters</Title>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <Input
            placeholder="Search services..."
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select
            mode="multiple"
            placeholder="Select categories"
            className="w-full"
            options={[
              { value: 'hair-cutting', label: 'Hair Cutting' },
              { value: 'coloring', label: 'Coloring' },
              { value: 'treatment', label: 'Treatment' },
              { value: 'grooming', label: 'Grooming' },
            ]}
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <Select
            placeholder="Select status"
            className="w-full"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Popularity</label>
          <Select
            mode="multiple"
            placeholder="Select popularity"
            className="w-full"
            options={[
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium mb-2">Price Range ($)</label>
          <Slider
            range
            min={0}
            max={200}
            defaultValue={[0, 200]}
            marks={{
              0: '$0',
              50: '$50',
              100: '$100',
              150: '$150',
              200: '$200+'
            }}
            className="mb-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
          <Slider
            range
            min={15}
            max={180}
            defaultValue={[15, 180]}
            marks={{
              15: '15m',
              60: '1h',
              120: '2h',
              180: '3h+'
            }}
            className="mb-4"
          />
        </div>

        <div className="pt-4">
          <Button type="primary" block>
            Apply Filters
          </Button>
        </div>

        <div>
          <Button type="link" block className="!p-0">
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesFilters; 