import React, { useState } from 'react';
import { Table, Tag, Avatar, Button, Space, Typography, Input, Pagination } from 'antd';
import { 
  UserOutlined, 
  SearchOutlined, 
  EyeOutlined, 
  EditOutlined,
  ClockCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Text } = Typography;

interface Booking {
  id: string;
  bookingDate: string;
  bookingTime: string;
  customerName: string;
  customerPhone: string;
  service: string;
  staff: string;
  duration: number;
  amount: number;
  paymentStatus: 'paid' | 'partial' | 'pending' | 'refunded';
  bookingStatus: 'completed' | 'cancelled' | 'no-show';
  paymentMethod: string;
}

// Demo booking data
const DEMO_BOOKINGS: Booking[] = [
  {
    id: 'BK001',
    bookingDate: '2024-01-15',
    bookingTime: '10:30 AM',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8900',
    service: 'Hair Spa + Coloring',
    staff: 'Jane Smith',
    duration: 150,
    amount: 180,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    paymentMethod: 'Card'
  },
  {
    id: 'BK002',
    bookingDate: '2024-01-15',
    bookingTime: '11:45 AM',
    customerName: 'Michael Chen',
    customerPhone: '+1 234-567-8901',
    service: 'Haircut + Styling',
    staff: 'John Doe',
    duration: 45,
    amount: 80,
    paymentStatus: 'partial',
    bookingStatus: 'completed',
    paymentMethod: 'Cash'
  },
  {
    id: 'BK003',
    bookingDate: '2024-01-14',
    bookingTime: '2:15 PM',
    customerName: 'Emma Davis',
    customerPhone: '+1 234-567-8902',
    service: 'Hair Treatment',
    staff: 'Sara Wilson',
    duration: 90,
    amount: 120,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    paymentMethod: 'Card'
  },
  {
    id: 'BK004',
    bookingDate: '2024-01-14',
    bookingTime: '3:30 PM',
    customerName: 'James Wilson',
    customerPhone: '+1 234-567-8903',
    service: 'Highlights',
    staff: 'Jane Smith',
    duration: 120,
    amount: 160,
    paymentStatus: 'refunded',
    bookingStatus: 'cancelled',
    paymentMethod: 'Card'
  },
  {
    id: 'BK005',
    bookingDate: '2024-01-13',
    bookingTime: '9:00 AM',
    customerName: 'Lisa Brown',
    customerPhone: '+1 234-567-8904',
    service: 'Haircut',
    staff: 'Mike Johnson',
    duration: 30,
    amount: 50,
    paymentStatus: 'pending',
    bookingStatus: 'no-show',
    paymentMethod: 'Cash'
  },
  {
    id: 'BK006',
    bookingDate: '2024-01-13',
    bookingTime: '11:00 AM',
    customerName: 'David Miller',
    customerPhone: '+1 234-567-8905',
    service: 'Hair Spa',
    staff: 'Sara Wilson',
    duration: 95,
    amount: 110,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    paymentMethod: 'Card'
  }
];

const BookingHistory: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const getPaymentStatusTag = (status: Booking['paymentStatus']) => {
    const statusConfig = {
      paid: { color: 'success', text: 'Paid' },
      partial: { color: 'warning', text: 'Partial' },
      pending: { color: 'error', text: 'Pending' },
      refunded: { color: 'default', text: 'Refunded' }
    };
    
    const config = statusConfig[status];
    return <Tag color={config.color} className="rounded-full text-xs">{config.text}</Tag>;
  };

  const getBookingStatusTag = (status: Booking['bookingStatus']) => {
    const statusConfig = {
      completed: { color: 'success', text: 'Completed' },
      cancelled: { color: 'error', text: 'Cancelled' },
      'no-show': { color: 'warning', text: 'No Show' }
    };
    
    const config = statusConfig[status];
    return <Tag color={config.color} className="rounded-full text-xs">{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => (
        <Text strong className="text-brand-primary text-xs">{id}</Text>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      width: 120,
      render: (record: Booking) => (
        <div>
          <div className="flex items-center text-xs">
            <CalendarOutlined className="mr-1 text-gray-400 text-xs" />
            {record.bookingDate}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <ClockCircleOutlined className="mr-1 text-xs" />
            {record.bookingTime}
          </div>
        </div>
      ),
    },
    {
      title: 'Customer',
      key: 'customer',
      width: 180,
      render: (record: Booking) => (
        <div className="flex items-center gap-2">
          <Avatar size={24} icon={<UserOutlined />} className="bg-brand-primary bg-opacity-10 text-brand-primary" />
          <div>
            <div className="text-xs font-medium">{record.customerName}</div>
            <div className="text-xs text-gray-500">{record.customerPhone}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      width: 150,
      render: (service: string, record: Booking) => (
        <div>
          <div className="text-xs font-medium">{service}</div>
          <div className="text-xs text-gray-500">by {record.staff}</div>
          <div className="text-xs text-gray-400">{record.duration} min</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (amount: number) => (
        <Text strong className="text-sm">${amount}</Text>
      ),
    },
    {
      title: 'Payment',
      key: 'payment',
      width: 120,
      render: (record: Booking) => (
        <div>
          {getPaymentStatusTag(record.paymentStatus)}
          <div className="text-xs text-gray-500 mt-1">{record.paymentMethod}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'bookingStatus',
      key: 'status',
      width: 100,
      render: (status: Booking['bookingStatus']) => getBookingStatusTag(status),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (record: Booking) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EyeOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  const filteredData = DEMO_BOOKINGS.filter(booking =>
    booking.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchText.toLowerCase()) ||
    booking.service.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-6">
        <Input
          placeholder="Search bookings..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64"
        />
        <Text type="secondary" className='whitespace-nowrap'>
          Showing {filteredData.length} of {DEMO_BOOKINGS.length} bookings
        </Text>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={false}
        scroll={{ x: 1000 }}
        className="bg-white"
        size="small"
      />

      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={setCurrentPage}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total, range) => 
            `${range[0]}-${range[1]} of ${total} bookings`
          }
        />
      </div>
    </div>
  );
};

export default BookingHistory; 