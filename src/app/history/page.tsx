'use client';

import { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Button, Space } from 'antd';
import { 
  DollarOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  TrophyOutlined,
  DownloadOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import RevenueChart from '@/components/history/RevenueChart';
import ServicePopularityChart from '@/components/history/ServicePopularityChart';
import BookingHistory from '@/components/history/BookingHistory';
import HistoryFilters from '@/components/history/HistoryFilters';

const { Title } = Typography;

export default function HistoryPage() {
  const [dateRange, setDateRange] = useState<string>('last30');

  // Demo stats data
  const stats = {
    totalRevenue: 45250,
    totalBookings: 342,
    totalCustomers: 189,
    avgBookingValue: 132,
    previousRevenue: 38950,
    previousBookings: 298,
    previousCustomers: 156,
    previousAvgBookingValue: 131
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="h-full">
      <Row gutter={[8, 8]} className="h-full !m-0 overflow-y-auto">
        <Col span={18}>
          <div className="flex flex-col gap-3">
            {/* Revenue Statistics Cards */}
            <Row gutter={[16, 16]} className="mb-3">
              <Col xs={24} sm={12} lg={6}>
                <Card className="h-full">
                  <Statistic
                    title={<span className="text-gray-600 font-medium">Total Revenue</span>}
                    value={stats.totalRevenue}
                    precision={0}
                    prefix={<DollarOutlined className="text-brand-primary" />}
                    suffix={
                      <div className="text-xs text-green-600 mt-1">
                        +{calculateGrowth(stats.totalRevenue, stats.previousRevenue)}%
                      </div>
                    }
                    valueStyle={{ color: '#484848', fontSize: '24px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="h-full">
                  <Statistic
                    title={<span className="text-gray-600 font-medium">Total Bookings</span>}
                    value={stats.totalBookings}
                    prefix={<CalendarOutlined className="text-brand-primary" />}
                    suffix={
                      <div className="text-xs text-green-600 mt-1">
                        +{calculateGrowth(stats.totalBookings, stats.previousBookings)}%
                      </div>
                    }
                    valueStyle={{ color: '#484848', fontSize: '24px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="h-full">
                  <Statistic
                    title={<span className="text-gray-600 font-medium">Unique Customers</span>}
                    value={stats.totalCustomers}
                    prefix={<UserOutlined className="text-brand-primary" />}
                    suffix={
                      <div className="text-xs text-green-600 mt-1">
                        +{calculateGrowth(stats.totalCustomers, stats.previousCustomers)}%
                      </div>
                    }
                    valueStyle={{ color: '#484848', fontSize: '24px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="h-full">
                  <Statistic
                    title={<span className="text-gray-600 font-medium">Avg. Booking Value</span>}
                    value={stats.avgBookingValue}
                    prefix={<TrophyOutlined className="text-brand-primary" />}
                    suffix={
                      <div className="text-xs text-green-600 mt-1">
                        +{calculateGrowth(stats.avgBookingValue, stats.previousAvgBookingValue)}%
                      </div>
                    }
                    valueStyle={{ color: '#484848', fontSize: '24px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Charts Row */}
            <Row gutter={[16, 16]} className="mb-3">
              <Col xs={24} lg={14}>
                <Card className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <Title level={4} className="font-quicksand !mb-0">Revenue Trend</Title>
                  </div>
                  <RevenueChart dateRange={dateRange} />
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <Title level={4} className="font-quicksand !mb-0">Service Popularity</Title>
                  </div>
                  <ServicePopularityChart />
                </Card>
              </Col>
            </Row>

            {/* Booking History */}
            <Card className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <Title level={4} className="font-quicksand !mb-0">Booking History</Title>
                <Space>
                  <Button icon={<DownloadOutlined />} size="small">
                    Export
                  </Button>
                  <Button icon={<PrinterOutlined />} size="small">
                    Print
                  </Button>
                </Space>
              </div>
              <BookingHistory />
            </Card>
          </div>
        </Col>

        <Col span={6}>
          <div className="sticky top-0 flex flex-col gap-3">
            <div className='flex flex-row gap-2'>
              <Button className='flex-1' type="primary">
                Generate Report
              </Button>
              <Button className='flex-1' variant='outlined'>
                Analytics
              </Button>
            </div>
            <Card className="h-fit">
              <HistoryFilters 
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
} 