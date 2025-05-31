import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Progress, Alert, Table, Tag, Slider, Select, Statistic, Divider, Space } from 'antd';
import { 
  CreditCardOutlined,
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CalculatorOutlined,
  UpOutlined,
  DownloadOutlined,
  TrophyOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;

const PricingSettings: React.FC = () => {
  const [calculatorBookings, setCalculatorBookings] = useState<number>(100);
  const [calculatorServices, setCalculatorServices] = useState<number>(5);
  const [billingCycle, setBillingCycle] = useState<string>('monthly');

  // Current subscription data
  const currentPlan = {
    name: 'Salon Pro',
    price: 999,
    currency: '₹',
    bookings: 100,
    services: 5,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'active'
  };

  // Current usage data
  const currentUsage = {
    bookingsUsed: 87,
    servicesUsed: 4,
    storageUsed: 2.4,
    storageLimit: 10
  };

  // Pending bills
  const pendingBills = [
    {
      key: '1',
      invoiceId: 'INV-2024-001',
      amount: 999,
      dueDate: '2024-02-15',
      status: 'pending',
      description: 'Monthly Subscription - Salon Pro'
    },
    {
      key: '2',
      invoiceId: 'INV-2024-002',
      amount: 150,
      dueDate: '2024-02-10',
      status: 'overdue',
      description: 'Additional Bookings (50 extra)'
    }
  ];

  // Pricing tiers
  const pricingTiers = [
    {
      name: 'Starter',
      price: 499,
      bookings: 50,
      services: 3,
      features: ['Basic Dashboard', 'Email Support', '5GB Storage'],
      popular: false
    },
    {
      name: 'Salon Pro',
      price: 999,
      bookings: 100,
      services: 5,
      features: ['Advanced Dashboard', 'Priority Support', '10GB Storage', 'Analytics'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 1999,
      bookings: 250,
      services: 15,
      features: ['Custom Dashboard', '24/7 Support', '50GB Storage', 'Advanced Analytics', 'API Access'],
      popular: false
    }
  ];

  const calculatePrice = () => {
    let basePrice = 999; // Base price for 100 bookings, 5 services
    let totalPrice = basePrice;

    // Additional booking charges
    if (calculatorBookings > 100) {
      const extraBookings = calculatorBookings - 100;
      totalPrice += Math.ceil(extraBookings / 50) * 150; // ₹150 for every 50 additional bookings
    }

    // Additional service charges
    if (calculatorServices > 5) {
      const extraServices = calculatorServices - 5;
      totalPrice += extraServices * 100; // ₹100 per additional service
    }

    // Discount for annual billing
    if (billingCycle === 'annual') {
      totalPrice = totalPrice * 10; // 10 months price for annual
    }

    return totalPrice;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return '#ff4d4f';
    if (percentage >= 75) return '#faad14';
    if (percentage >= 50) return '#1890ff';
    return '#52c41a';
  };

  const getUsageStatus = (percentage: number) => {
    if (percentage >= 90) return 'Critical';
    if (percentage >= 75) return 'High';
    if (percentage >= 50) return 'Moderate';
    return 'Good';
  };

  const bookingUsagePercent = Math.round((currentUsage.bookingsUsed / currentPlan.bookings) * 100);
  const overallUsagePercent = Math.round(((currentUsage.bookingsUsed / currentPlan.bookings) + (currentUsage.servicesUsed / currentPlan.services) + (currentUsage.storageUsed / currentUsage.storageLimit)) / 3 * 100);

  const billColumns = [
    {
      title: <span className="text-xs font-medium">Invoice ID</span>,
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      render: (text: string) => <Text className="text-xs font-medium">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Description</span>,
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <Text className="text-xs">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Amount</span>,
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <Text className="text-xs font-medium">₹{amount}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Due Date</span>,
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => <Text className="text-xs">{dayjs(date).format('MMM DD, YYYY')}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Status</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag 
          color={status === 'pending' ? 'orange' : 'red'} 
          className="text-xs"
        >
          {status === 'pending' ? 'Pending' : 'Overdue'}
        </Tag>
      ),
    },
    {
      title: <span className="text-xs font-medium">Action</span>,
      key: 'action',
      render: () => (
        <Button type="primary" size="small" className="text-xs">
          Pay Now
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Current Subscription & Usage Speedometer Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="h-full">
            <Title level={5} className="font-quicksand mb-6">Current Subscription & Usage</Title>
            
            <Row gutter={[24, 24]}>
              {/* Subscription Details */}
              <Col xs={24} md={12}>
                <div className="relative">
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Active
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <TrophyOutlined className="text-white text-xl" />
                      </div>
                      <div>
                        <Text className="text-lg font-bold block">{currentPlan.name}</Text>
                        <Text className="text-xs text-gray-600">Premium Plan</Text>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <Text className="text-3xl font-bold text-blue-600">₹{currentPlan.price}</Text>
                        <Text className="text-xs text-gray-500 block">/month</Text>
                      </div>
                      <div className="text-right">
                        <Text className="text-xs text-gray-600 block">Renews on</Text>
                        <Text className="text-xs font-medium">{dayjs(currentPlan.endDate).format('MMM DD, YYYY')}</Text>
                      </div>
                    </div>
                  </div>

                  <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={12}>
                      <Card size="small" className="text-center border-l-4 border-l-blue-500">
                        <Statistic 
                          title={<span className="text-xs">Bookings</span>}
                          value={currentPlan.bookings}
                          suffix={<span className="text-xs">/month</span>}
                          valueStyle={{ fontSize: '16px', color: '#1890ff' }}
                        />
                      </Card>
                    </Col>
                    <Col xs={12}>
                      <Card size="small" className="text-center border-l-4 border-l-green-500">
                        <Statistic 
                          title={<span className="text-xs">Services</span>}
                          value={currentPlan.services}
                          suffix={<span className="text-xs">max</span>}
                          valueStyle={{ fontSize: '16px', color: '#52c41a' }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Usage Speedometer */}
              <Col xs={24} md={12}>
                <div className="text-center">
                  <Title level={5} className="font-quicksand mb-4">
                    <ThunderboltOutlined className="mr-2 text-yellow-500" />
                    Usage Meter
                  </Title>
                  
                  {/* Main Speedometer */}
                  <div className="relative mb-6">
                    <Progress
                      type="circle"
                      percent={overallUsagePercent}
                      size={160}
                      strokeColor={getUsageColor(overallUsagePercent)}
                      strokeWidth={8}
                      format={() => (
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: getUsageColor(overallUsagePercent) }}>
                            {overallUsagePercent}%
                          </div>
                          <div className="text-xs text-gray-500">Overall Usage</div>
                          <div className="text-xs font-medium" style={{ color: getUsageColor(overallUsagePercent) }}>
                            {getUsageStatus(overallUsagePercent)}
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  {/* Individual Metrics */}
                  <Row gutter={[8, 8]}>
                    <Col xs={8}>
                      <div className="text-center">
                        <Progress
                          type="circle"
                          percent={bookingUsagePercent}
                          size={50}
                          strokeColor="#00D4FF"
                          strokeWidth={6}
                          format={() => <span className="text-xs font-bold">{bookingUsagePercent}%</span>}
                        />
                        <Text className="text-xs block mt-1">Bookings</Text>
                        <Text className="text-xs text-gray-500">{currentUsage.bookingsUsed}/{currentPlan.bookings}</Text>
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="text-center">
                        <Progress
                          type="circle"
                          percent={(currentUsage.servicesUsed / currentPlan.services) * 100}
                          size={50}
                          strokeColor="#52c41a"
                          strokeWidth={6}
                          format={() => <span className="text-xs font-bold">{Math.round((currentUsage.servicesUsed / currentPlan.services) * 100)}%</span>}
                        />
                        <Text className="text-xs block mt-1">Services</Text>
                        <Text className="text-xs text-gray-500">{currentUsage.servicesUsed}/{currentPlan.services}</Text>
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="text-center">
                        <Progress
                          type="circle"
                          percent={(currentUsage.storageUsed / currentUsage.storageLimit) * 100}
                          size={50}
                          strokeColor="#722ed1"
                          strokeWidth={6}
                          format={() => <span className="text-xs font-bold">{Math.round((currentUsage.storageUsed / currentUsage.storageLimit) * 100)}%</span>}
                        />
                        <Text className="text-xs block mt-1">Storage</Text>
                        <Text className="text-xs text-gray-500">{currentUsage.storageUsed}GB/{currentUsage.storageLimit}GB</Text>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <div className="mt-6 pt-4 border-t">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Alert
                    message={<span className="text-xs">You have {currentPlan.bookings - currentUsage.bookingsUsed} bookings remaining this month</span>}
                    type="info"
                    showIcon
                    className="text-xs"
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <div className="flex gap-2">
                    <Button type="primary" size="small" icon={<UpOutlined />} className="text-xs flex-1">
                      Upgrade Plan
                    </Button>
                    <Button size="small" className="text-xs flex-1">
                      View Details
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col xs={24} lg={8}>
          <div className="space-y-4 h-full">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xs text-gray-600">Monthly Savings</Text>
                  <Text className="text-xl font-bold text-green-600 block">₹200</Text>
                  <Text className="text-xs text-gray-500">vs. competitors</Text>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <DollarOutlined className="text-white text-xl" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xs text-gray-600">Next Bill Date</Text>
                  <Text className="text-lg font-bold text-blue-600 block">{dayjs(currentPlan.endDate).format('MMM DD')}</Text>
                  <Text className="text-xs text-gray-500">{dayjs(currentPlan.endDate).fromNow()}</Text>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <CalendarOutlined className="text-white text-xl" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xs text-gray-600">Pending Amount</Text>
                  <Text className="text-lg font-bold text-orange-600 block">₹1,149</Text>
                  <Text className="text-xs text-gray-500">2 invoices due</Text>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <ExclamationCircleOutlined className="text-white text-xl" />
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Pricing Calculator Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card>
            <Title level={5} className="font-quicksand mb-6">
              <CalculatorOutlined className="mr-2 text-blue-500" />
              Interactive Pricing Calculator
            </Title>
            
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium mb-3">Billing Cycle</label>
                    <Select 
                      value={billingCycle} 
                      onChange={setBillingCycle}
                      size="small" 
                      className="w-full text-xs"
                    >
                      <Select.Option value="monthly">Monthly Billing</Select.Option>
                      <Select.Option value="annual">Annual Billing (Save 2 months!)</Select.Option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-3">
                      Bookings per month: <span className="text-blue-600 font-bold">{calculatorBookings}</span>
                    </label>
                    <Slider
                      min={50}
                      max={500}
                      step={50}
                      value={calculatorBookings}
                      onChange={setCalculatorBookings}
                      marks={{
                        50: <span className="text-xs">50</span>,
                        100: <span className="text-xs">100</span>,
                        250: <span className="text-xs">250</span>,
                        500: <span className="text-xs">500</span>,
                      }}
                      trackStyle={{ backgroundColor: '#00D4FF' }}
                      handleStyle={{ borderColor: '#00D4FF' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-3">
                      Number of services: <span className="text-green-600 font-bold">{calculatorServices}</span>
                    </label>
                    <Slider
                      min={3}
                      max={20}
                      step={1}
                      value={calculatorServices}
                      onChange={setCalculatorServices}
                      marks={{
                        3: <span className="text-xs">3</span>,
                        5: <span className="text-xs">5</span>,
                        10: <span className="text-xs">10</span>,
                        15: <span className="text-xs">15</span>,
                        20: <span className="text-xs">20</span>,
                      }}
                      trackStyle={{ backgroundColor: '#52c41a' }}
                      handleStyle={{ borderColor: '#52c41a' }}
                    />
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={8}>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200 h-full flex flex-col justify-center">
                  <div className="text-center">
                    <Text className="text-xs font-medium text-gray-600 block mb-2">Estimated Price</Text>
                    <Text className="text-4xl font-bold text-blue-600 block">
                      ₹{calculatePrice().toLocaleString()}
                    </Text>
                    <Text className="text-xs text-gray-500 mb-4">
                      {billingCycle === 'annual' ? 'per year' : 'per month'}
                    </Text>
                    
                    {billingCycle === 'annual' && (
                      <div className="bg-green-100 text-green-700 text-xs p-2 rounded mb-4">
                        <Text className="text-xs font-medium">Save ₹{Math.round(calculatePrice() * 0.17)} annually!</Text>
                      </div>
                    )}
                    
                    <Button type="primary" size="small" className="text-xs w-full">
                      Upgrade to This Plan
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Pending Bills Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <Title level={5} className="font-quicksand !mb-0">
                <CreditCardOutlined className="mr-2 text-orange-500" />
                Pending Bills & Invoices
              </Title>
              <Button size="small" icon={<DownloadOutlined />} className="text-xs">
                Download All
              </Button>
            </div>
            
            <Alert
              message={<span className="text-xs"><strong>Payment Required:</strong> You have 2 pending bills totaling ₹1,149. Please settle to avoid service interruption.</span>}
              type="warning"
              showIcon
              icon={<ExclamationCircleOutlined />}
              className="mb-6 text-xs"
            />

            <Table
              columns={billColumns}
              dataSource={pendingBills}
              pagination={false}
              size="small"
              className="text-xs"
            />

            <div className="flex justify-between items-center mt-6 pt-4 border-t bg-gray-50 -mx-6 -mb-6 px-6 py-4">
              <div>
                <Text className="text-sm font-bold">Total Outstanding: ₹1,149</Text>
                <Text className="text-xs text-gray-500 block">Next due: Feb 10, 2024</Text>
              </div>
              <Button type="primary" size="small" className="text-xs px-6">
                Pay All Bills (₹1,149)
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Available Plans Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card>
            <Title level={5} className="font-quicksand mb-6">Choose Your Perfect Plan</Title>
            
            <Row gutter={[16, 16]}>
              {pricingTiers.map((tier, index) => (
                <Col xs={24} md={8} key={tier.name}>
                  <Card 
                    className={`h-full relative ${tier.name === currentPlan.name ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200'} ${tier.popular ? 'transform scale-105' : ''}`}
                    size="small"
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-4 py-1 rounded-full font-medium">
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-4 pt-2">
                      <Title level={5} className="font-quicksand !mb-1">{tier.name}</Title>
                      {tier.name === currentPlan.name && (
                        <Tag color="blue" className="text-xs mb-2">Current Plan</Tag>
                      )}
                      <Text className="text-3xl font-bold">₹{tier.price}</Text>
                      <Text className="text-xs text-gray-500 block">/month</Text>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <Text className="text-xs">Bookings:</Text>
                        <Text className="text-xs font-medium">{tier.bookings}/month</Text>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <Text className="text-xs">Services:</Text>
                        <Text className="text-xs font-medium">{tier.services} max</Text>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircleOutlined className="text-green-500 text-xs" />
                          <Text className="text-xs">{feature}</Text>
                        </div>
                      ))}
                    </div>

                    <Button 
                      type={tier.name === currentPlan.name ? "default" : "primary"}
                      size="small" 
                      className="text-xs w-full"
                      disabled={tier.name === currentPlan.name}
                    >
                      {tier.name === currentPlan.name ? 'Current Plan' : 'Choose Plan'}
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PricingSettings; 