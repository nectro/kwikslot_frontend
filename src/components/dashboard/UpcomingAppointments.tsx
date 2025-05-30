import React from 'react';
import { Card, Avatar, Tag, Typography, Space, Divider } from 'antd';
import { UserOutlined, ClockCircleOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  paymentStatus: 'prepaid' | 'partial' | 'pending';
  amount: number;
  amountPaid: number;
}

// Demo data
const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8900',
    service: 'Hair Spa',
    date: 'Today',
    time: '10:30 AM',
    duration: 95,
    paymentStatus: 'prepaid',
    amount: 120,
    amountPaid: 120
  },
  {
    id: '2',
    customerName: 'Michael Chen',
    customerPhone: '+1 234-567-8901',
    service: 'Haircut + Styling',
    date: 'Today',
    time: '11:45 AM',
    duration: 45,
    paymentStatus: 'partial',
    amount: 80,
    amountPaid: 20
  },
  {
    id: '3',
    customerName: 'Emma Davis',
    customerPhone: '+1 234-567-8902',
    service: 'Coloring',
    date: 'Tomorrow',
    time: '2:15 PM',
    duration: 120,
    paymentStatus: 'pending',
    amount: 150,
    amountPaid: 0
  }
];

const getPaymentTag = (status: Appointment['paymentStatus']) => {
  switch (status) {
    case 'prepaid':
      return <Tag color="success" className="rounded-full">Prepaid</Tag>;
    case 'partial':
      return <Tag color="warning" className="rounded-full">Partial Payment</Tag>;
    case 'pending':
      return <Tag color="error" className="rounded-full">Payment Pending</Tag>;
  }
};

const getPaymentStatusColor = (status: Appointment['paymentStatus']) => {
  switch (status) {
    case 'prepaid':
      return 'text-green-600';
    case 'partial':
      return 'text-amber-600';
    case 'pending':
      return 'text-red-600';
  }
};

const UpcomingAppointments: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Title level={4} className="font-quicksand !mb-0">Upcoming Appointments</Title>
        <Text type="secondary">{DEMO_APPOINTMENTS.length} appointments</Text>
      </div>

      <div className='flex flex-col gap-4'>
        {DEMO_APPOINTMENTS.map((appointment) => (
          <Card 
            key={appointment.id}
            className="overflow-hidden hover:shadow-sm hover:cursor-pointer transition-shadow"
          >
            <div className="flex items-center -mx-6 -mt-6 mb-4 px-6 py-3 bg-gray-50">
              <CalendarOutlined className="text-gray-400 mr-2" />
              <Text type="secondary">{appointment.date}</Text>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar 
                  size={48} 
                  icon={<UserOutlined />} 
                  className="bg-brand-primary bg-opacity-10 text-brand-primary flex-shrink-0"
                />
                
                <div className="space-y-2">
                  <div>
                    <Text strong className="text-base block">
                      {appointment.customerName}
                    </Text>
                    <Text type="secondary" className="text-sm">
                      {appointment.customerPhone}
                    </Text>
                  </div>

                  <Space size={4} className="flex flex-wrap gap-y-1">
                    <Tag color="blue" className="rounded-full">
                      {appointment.service}
                    </Tag>
                    {getPaymentTag(appointment.paymentStatus)}
                  </Space>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-1 mb-2">
                  <ClockCircleOutlined className="text-gray-400" />
                  <Text>{appointment.time}</Text>
                  <Text type="secondary" className="text-xs">
                    ({appointment.duration}min)
                  </Text>
                </div>

                <div>
                  <Text strong className={`text-lg block ${getPaymentStatusColor(appointment.paymentStatus)}`}>
                    ${appointment.amount}
                  </Text>
                  {appointment.paymentStatus === 'partial' && (
                    <Text type="secondary" className="text-xs">
                      ${appointment.amountPaid} paid
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments; 