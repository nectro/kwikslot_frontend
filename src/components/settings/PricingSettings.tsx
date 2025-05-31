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

  // Current usage data (removed storage)
  const currentUsage = {
    bookingsUsed: 87,
    servicesUsed: 4
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

  // Pricing tiers (removed storage from features)
  const pricingTiers = [
    {
      name: 'Starter',
      price: 499,
      bookings: 50,
      services: 3,
      features: ['Basic Dashboard', 'Email Support', 'Standard Analytics'],
      popular: false
    },
    {
      name: 'Salon Pro',
      price: 999,
      bookings: 100,
      services: 5,
      features: ['Advanced Dashboard', 'Priority Support', 'Advanced Analytics', 'Custom Reports'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 1999,
      bookings: 250,
      services: 15,
      features: ['Custom Dashboard', '24/7 Support', 'Premium Analytics', 'API Access', 'White-label Options'],
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
    return '#4E4FEB'; // Use brand color for normal usage
  };

  const getUsageStatus = (percentage: number) => {
    if (percentage >= 90) return 'Critical';
    if (percentage >= 75) return 'High';
    if (percentage >= 50) return 'Moderate';
    return 'Good';
  };

  const bookingUsagePercent = Math.round((currentUsage.bookingsUsed / currentPlan.bookings) * 100);
  // Updated calculation without storage
  const overallUsagePercent = Math.round(((currentUsage.bookingsUsed / currentPlan.bookings) + (currentUsage.servicesUsed / currentPlan.services)) / 2 * 100);

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
      {/* Stats Cards Row - Top Priority */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card className="border h-24">
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarOutlined className="text-gray-600 text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <Text className="!text-xs text-gray-500 block leading-none">Monthly Savings</Text>
                <Text className="!text-lg font-bold block leading-tight mt-1">₹200</Text>
                <Text className="!text-xs text-gray-400 block leading-none mt-0.5">vs. competitors</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="border h-24">
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CalendarOutlined className="text-gray-600 text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <Text className="!text-xs text-gray-500 block leading-none">Next Bill Date</Text>
                <Text className="!text-lg font-bold block leading-tight mt-1">{dayjs(currentPlan.endDate).format('MMM DD')}</Text>
                <Text className="!text-xs text-gray-400 block leading-none mt-0.5">{dayjs(currentPlan.endDate).fromNow()}</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="border h-24">
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <ExclamationCircleOutlined className="text-red-500 text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <Text className="!text-xs text-gray-500 block leading-none">Pending Amount</Text>
                <Text className="!text-lg font-bold text-red-600 block leading-tight mt-1">₹1,149</Text>
                <Text className="!text-xs text-gray-400 block leading-none mt-0.5">2 invoices due</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="border h-24">
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <ThunderboltOutlined className="text-brand-primary text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <Text className="!text-xs text-gray-500 block leading-none">Overall Usage</Text>
                <Text className="!text-lg font-bold block leading-tight mt-1" style={{ color: getUsageColor(overallUsagePercent) }}>
                  {overallUsagePercent}%
                </Text>
                <Text className="!text-xs text-gray-400 block leading-none mt-0.5">{getUsageStatus(overallUsagePercent)}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Current Subscription - Full Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card>
            <Title level={5} className="font-quicksand mb-6">Current Subscription & Usage</Title>
            
            <Row gutter={[24, 24]}>
              {/* Subscription Details */}
              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center">
                        <TrophyOutlined className="text-white text-xl" />
                      </div>
                      <div>
                        <Text className="text-lg font-bold block">{currentPlan.name}</Text>
                        <Text className="text-xs text-gray-600">Premium Plan</Text>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <Text className="text-3xl font-bold text-brand-primary">₹{currentPlan.price}</Text>
                        <Text className="text-xs text-gray-500 block">/month</Text>
                      </div>
                      <div className="text-right">
                        <Text className="text-xs text-gray-600 block">Renews on</Text>
                        <Text className="text-xs font-medium">{dayjs(currentPlan.endDate).format('MMM DD, YYYY')}</Text>
                      </div>
                    </div>
                  </div>

                  <Row gutter={[16, 16]}>
                    <Col xs={12}>
                      <Card size="small" className="text-center border">
                        <Statistic 
                          title={<span className="text-xs">Bookings</span>}
                          value={currentPlan.bookings}
                          suffix={<span className="text-xs">/month</span>}
                          valueStyle={{ fontSize: '16px' }}
                        />
                      </Card>
                    </Col>
                    <Col xs={12}>
                      <Card size="small" className="text-center border">
                        <Statistic 
                          title={<span className="text-xs">Services</span>}
                          value={currentPlan.services}
                          suffix={<span className="text-xs">max</span>}
                          valueStyle={{ fontSize: '16px' }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Usage Meter */}
              <Col xs={24} md={12}>
                <div className="text-center">
                  <Title level={5} className="font-quicksand mb-4">Usage Meter</Title>
                  
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
                  <Row gutter={[16, 16]}>
                    <Col xs={12}>
                      <div className="text-center">
                        <Progress
                          type="circle"
                          percent={bookingUsagePercent}
                          size={50}
                          strokeColor="#4E4FEB"
                          strokeWidth={6}
                          format={() => <span className="text-xs font-bold">{bookingUsagePercent}%</span>}
                        />
                        <Text className="text-xs block mt-1">Bookings</Text>
                        <Text className="text-xs text-gray-500">{currentUsage.bookingsUsed}/{currentPlan.bookings}</Text>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="text-center">
                        <Progress
                          type="circle"
                          percent={(currentUsage.servicesUsed / currentPlan.services) * 100}
                          size={50}
                          strokeColor="#666"
                          strokeWidth={6}
                          format={() => <span className="text-xs font-bold">{Math.round((currentUsage.servicesUsed / currentPlan.services) * 100)}%</span>}
                        />
                        <Text className="text-xs block mt-1">Services</Text>
                        <Text className="text-xs text-gray-500">{currentUsage.servicesUsed}/{currentPlan.services}</Text>
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
      </Row>

      {/* Pricing Calculator Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card>
            <Title level={5} className="font-quicksand mb-6">
              <CalculatorOutlined className="mr-2" />
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
                      Bookings per month: <span className="text-brand-primary font-bold">{calculatorBookings}</span>
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
                      trackStyle={{ backgroundColor: '#4E4FEB' }}
                      handleStyle={{ borderColor: '#4E4FEB' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-3">
                      Number of services: <span className="text-gray-600 font-bold">{calculatorServices}</span>
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
                      trackStyle={{ backgroundColor: '#666' }}
                      handleStyle={{ borderColor: '#666' }}
                    />
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={8}>
                <div className="border border-gray-200 p-6 rounded-lg h-full flex flex-col justify-center">
                  <div className="text-center">
                    <Text className="text-xs font-medium text-gray-600 block mb-2">Estimated Price</Text>
                    <Text className="text-4xl font-bold text-brand-primary block">
                      ₹{calculatePrice().toLocaleString()}
                    </Text>
                    <Text className="text-xs text-gray-500 mb-4">
                      {billingCycle === 'annual' ? 'per year' : 'per month'}
                    </Text>
                    
                    {billingCycle === 'annual' && (
                      <div className="bg-green-50 text-green-700 text-xs p-2 rounded mb-4 border border-green-200">
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
                <CreditCardOutlined className="mr-2" />
                Pending Bills & Invoices
              </Title>
              <Button size="small" icon={<DownloadOutlined />} className="!text-xs">
                Download All
              </Button>
            </div>
            
            <div className="space-y-6">
              <Alert
                message={<span className="text-xs"><strong>Payment Required:</strong> You have 2 pending bills totaling ₹1,149. Please settle to avoid service interruption.</span>}
                type="warning"
                showIcon
                icon={<ExclamationCircleOutlined />}
                className="!text-xs !mb-3"
              />

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Table
                  columns={billColumns}
                  dataSource={pendingBills}
                  pagination={false}
                  size="small"
                  className="!text-xs"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Text className="!text-sm font-bold block">Total Outstanding: ₹1,149</Text>
                    <Text className="!text-xs text-gray-500">Next due: Feb 10, 2024</Text>
                  </div>
                  <Button type="primary" size="small" className="!text-xs px-6">
                    Pay All Bills (₹1,149)
                  </Button>
                </div>
              </div>
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
                    className={`h-full relative ${tier.name === currentPlan.name ? 'border-2 border-brand-primary shadow-md' : 'border border-gray-200'} ${tier.popular ? 'transform scale-105' : ''}`}
                    size="small"
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-brand-primary text-white text-xs px-4 py-1 rounded-full font-medium">
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