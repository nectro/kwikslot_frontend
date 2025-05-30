import React from 'react';
import { Typography, Select, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const StaffFilters: React.FC = () => {
  return (
    <div className="space-y-6">
      <Title level={4} className="font-quicksand">Filters</Title>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <Input
            placeholder="Search staff members..."
            prefix={<SearchOutlined />}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <Select
            mode="multiple"
            placeholder="Select roles"
            className="w-full"
            options={[
              { value: 'senior-stylist', label: 'Senior Stylist' },
              { value: 'hair-colorist', label: 'Hair Colorist' },
              { value: 'junior-stylist', label: 'Junior Stylist' },
            ]}
          />
        </div>

        <div>
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
          <label className="block text-sm font-medium mb-2">Specialties</label>
          <Select
            mode="multiple"
            placeholder="Select specialties"
            className="w-full"
            options={[
              { value: 'hair-cutting', label: 'Hair Cutting' },
              { value: 'coloring', label: 'Coloring' },
              { value: 'styling', label: 'Styling' },
              { value: 'highlights', label: 'Highlights' },
              { value: 'balayage', label: 'Balayage' },
            ]}
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

export default StaffFilters; 