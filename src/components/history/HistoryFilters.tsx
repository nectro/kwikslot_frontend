import React from 'react';
import { Typography, Select, DatePicker, Button, Card, Space, Slider } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface HistoryFiltersProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({ 
  dateRange, 
  onDateRangeChange 
}) => {
  return (
    <div className="space-y-6">
      <Title level={4} className="font-quicksand">Filters</Title>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Quick Date Range</label>
          <Select
            value={dateRange}
            onChange={onDateRangeChange}
            className="w-full"
            options={[
              { value: 'today', label: 'Today' },
              { value: 'yesterday', label: 'Yesterday' },
              { value: 'last7', label: 'Last 7 Days' },
              { value: 'last30', label: 'Last 30 Days' },
              { value: 'last90', label: 'Last 90 Days' },
              { value: 'thisMonth', label: 'This Month' },
              { value: 'lastMonth', label: 'Last Month' },
              { value: 'thisYear', label: 'This Year' },
              { value: 'custom', label: 'Custom Range' },
            ]}
          />
        </div>

        {dateRange === 'custom' && (
          <div>
            <label className="block text-sm font-medium mb-2">Custom Date Range</label>
            <RangePicker className="w-full" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Services</label>
          <Select
            mode="multiple"
            placeholder="Select services"
            className="w-full"
            options={[
              { value: 'haircut', label: 'Haircut' },
              { value: 'hairspa', label: 'Hair Spa' },
              { value: 'coloring', label: 'Coloring' },
              { value: 'styling', label: 'Styling' },
              { value: 'highlights', label: 'Highlights' },
              { value: 'treatment', label: 'Treatment' },
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Staff Members</label>
          <Select
            mode="multiple"
            placeholder="Select staff"
            className="w-full"
            options={[
              { value: 'john', label: 'John Doe' },
              { value: 'jane', label: 'Jane Smith' },
              { value: 'mike', label: 'Mike Johnson' },
              { value: 'sara', label: 'Sara Wilson' },
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Payment Status</label>
          <Select
            mode="multiple"
            placeholder="Select payment status"
            className="w-full"
            options={[
              { value: 'paid', label: 'Paid' },
              { value: 'partial', label: 'Partially Paid' },
              { value: 'pending', label: 'Pending' },
              { value: 'refunded', label: 'Refunded' },
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Booking Status</label>
          <Select
            mode="multiple"
            placeholder="Select booking status"
            className="w-full"
            options={[
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
              { value: 'no-show', label: 'No Show' },
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Revenue Range ($)</label>
          <Slider
            range
            min={0}
            max={500}
            defaultValue={[0, 500]}
            marks={{
              0: '$0',
              100: '$100',
              250: '$250',
              500: '$500+'
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

export default HistoryFilters; 