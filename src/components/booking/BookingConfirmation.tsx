'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Form, Input, Divider, message, Modal } from 'antd';
import { ArrowLeftIcon, ClockIcon, DollarSignIcon, UserIcon, CalendarIcon, CheckCircleIcon, SparklesIcon } from 'lucide-react';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  staffMember?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

interface BookingDetails {
  date: string;
  slot: TimeSlot;
  service: Service;
}

interface BookingConfirmationProps {
  companyName: string;
  selectedService: Service;
  selectedTimeSlot: BookingDetails;
  onBack: () => void;
  onConfirm: () => void;
}

// Helper function to detect if input is email or phone
const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const isPhone = (value: string): boolean => {
  // Remove all non-digit characters and check if it looks like a phone number
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

const validateEmailOrPhone = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Please enter your email or phone number'));
  }
  
  if (isEmail(value)) {
    // Additional email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid email address'));
    }
  } else if (isPhone(value)) {
    // Phone validation - should have at least 10 digits
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 10) {
      return Promise.reject(new Error('Please enter a valid phone number (at least 10 digits)'));
    }
  } else {
    return Promise.reject(new Error('Please enter a valid email address or phone number'));
  }
  
  return Promise.resolve();
};

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  companyName, 
  selectedService, 
  selectedTimeSlot, 
  onBack, 
  onConfirm 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setConfirmModalVisible(true);
    }, 2000);
  };

  const handleFinalConfirm = () => {
    setConfirmModalVisible(false);
    onConfirm();
    message.success('Booking confirmed successfully!');
  };

  const bookingDate = dayjs(selectedTimeSlot.date);
  const endTime = dayjs(`${selectedTimeSlot.date} ${selectedTimeSlot.slot.time}`)
    .add(selectedService.duration, 'minutes');

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Button
          type="link"
          icon={<ArrowLeftIcon size={16} />}
          onClick={onBack}
          className="flex items-center gap-2 !text-gray-600 hover:!text-brand-primary hover:bg-brand-primary/5 !px-0 rounded-lg transition-all"
        >
          <span className="!text-sm font-medium">Back to Time Selection</span>
        </Button>
        
        <div className="!text-right">
          <div className="!text-sm !text-gray-500 mb-1">Step 3 of 3</div>
          <div className="!text-xs !text-gray-400">Confirm Booking</div>
        </div>
      </div>

      <Row gutter={[16, 24]} className="min-h-[600px]">
        {/* Booking Summary */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <SparklesIcon size={16} className="!text-brand-primary" />
                </div>
                <span className="font-quicksand !text-base">Booking Summary</span>
              </div>
            }
            className="h-full rounded-2xl shadow-sm border-gray-200/60"
          >
            <div className="space-y-4">
              {/* Service Details */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                <Text className="!text-xs font-medium !text-gray-500 block mb-2">SERVICE</Text>
                <Title level={5} className="font-quicksand !mb-1 !text-gray-800">
                  {selectedService.name}
                </Title>
                <Text className="!text-xs !text-gray-600 leading-relaxed">
                  {selectedService.description}
                </Text>
              </div>

              <Divider className="!my-3" />

              {/* Date & Time */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CalendarIcon size={14} className="!text-blue-600" />
                  </div>
                  <div>
                    <Text className="!text-xs font-medium !text-gray-500 block">DATE</Text>
                    <Text className="!text-sm font-medium !text-gray-800">
                      {bookingDate.format('dddd, MMMM DD, YYYY')}
                    </Text>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ClockIcon size={14} className="!text-purple-600" />
                  </div>
                  <div>
                    <Text className="!text-xs font-medium !text-gray-500 block">TIME</Text>
                    <Text className="!text-sm font-medium !text-gray-800">
                      {selectedTimeSlot.slot.time} - {endTime.format('HH:mm')} 
                      <span className="!text-xs !text-gray-500 ml-2 font-normal">
                        ({selectedService.duration} min)
                      </span>
                    </Text>
                  </div>
                </div>

                {selectedTimeSlot.slot.staffMember && (
                  <div className="flex items-center gap-3 p-3 bg-green-50/50 rounded-xl">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <UserIcon size={14} className="!text-green-600" />
                    </div>
                    <div>
                      <Text className="!text-xs font-medium !text-gray-500 block">STAFF MEMBER</Text>
                      <Text className="!text-sm font-medium !text-gray-800">{selectedTimeSlot.slot.staffMember}</Text>
                    </div>
                  </div>
                )}
              </div>

              <Divider className="!my-3" />

              {/* Price */}
              <div className="bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <Text className="!text-sm font-medium !text-gray-700">Total Amount</Text>
                  <div className="flex items-center gap-1 !text-xl font-medium !text-brand-primary">
                    <DollarSignIcon size={18} />
                    <span>{selectedService.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Customer Information Form */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <UserIcon size={16} className="!text-brand-primary" />
                </div>
                <span className="font-quicksand !text-base">Your Information</span>
              </div>
            }
            className="h-full rounded-2xl shadow-sm border-gray-200/60"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
              className="space-y-1"
            >
              <Form.Item
                name="name"
                label={<span className="!text-sm font-medium !text-gray-700">Full Name</span>}
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  size="large" 
                  placeholder="Enter your full name" 
                  className="rounded-xl border-gray-200 hover:border-brand-primary focus:border-brand-primary"
                />
              </Form.Item>

              <Form.Item
                name="contact"
                label={<span className="!text-sm font-medium !text-gray-700">Email or Phone Number</span>}
                rules={[{ validator: validateEmailOrPhone }]}
              >
                <Input 
                  size="large" 
                  placeholder="Enter your email address or phone number" 
                  className="rounded-xl border-gray-200 hover:border-brand-primary focus:border-brand-primary"
                />
              </Form.Item>

              <Form.Item
                name="notes"
                label={<span className="!text-sm font-medium !text-gray-700">Special Requests (Optional)</span>}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Any special requests or notes for your appointment..."
                  className="rounded-xl border-gray-200 hover:border-brand-primary focus:border-brand-primary resize-none"
                />
              </Form.Item>

              <div className="pt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  block
                  className="!bg-gradient-to-r !from-brand-primary !to-brand-primary/90 hover:!from-brand-primary/90 hover:!to-brand-primary !border-none !font-medium !rounded-xl !h-12 !!text-base shadow-sm hover:shadow-sm transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Confirming Booking...
                    </span>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal
        open={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        footer={
          <Button 
            type="primary" 
            size="large"
            onClick={handleFinalConfirm}
            className="!bg-gradient-to-r !from-brand-primary !to-brand-primary/90 !border-none !font-medium !rounded-xl w-full sm:w-auto !h-12"
          >
            Perfect, Thank You!
          </Button>
        }
        width={540}
        centered
        className="booking-success-modal"
      >
        <div className="!text-center py-6">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircleIcon size={36} className="!text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <SparklesIcon size={12} className="!text-white" />
            </div>
          </div>
          
          <Title level={3} className="font-quicksand !mb-3 !text-gray-800">
            Booking Confirmed!
          </Title>
          <Text className="!text-gray-600 !text-base leading-relaxed mb-6">
            Your appointment has been successfully booked. We're excited to see you!
          </Text>
          
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 !text-left">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="!text-sm font-medium !text-gray-600">Service:</span>
                <span className="!text-sm font-medium !text-gray-800">{selectedService.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="!text-sm font-medium !text-gray-600">Date:</span>
                <span className="!text-sm font-medium !text-gray-800">{bookingDate.format('MMM DD, YYYY')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="!text-sm font-medium !text-gray-600">Time:</span>
                <span className="!text-sm font-medium !text-gray-800">{selectedTimeSlot.slot.time}</span>
              </div>
              {selectedTimeSlot.slot.staffMember && (
                <div className="flex justify-between items-center">
                  <span className="!text-sm font-medium !text-gray-600">Staff:</span>
                  <span className="!text-sm font-medium !text-gray-800">{selectedTimeSlot.slot.staffMember}</span>
                </div>
              )}
              <Divider className="!my-3" />
              <div className="flex justify-between items-center">
                <span className="!text-sm font-medium !text-gray-600">Total:</span>
                <span className="!text-lg font-bold !text-brand-primary">${selectedService.price}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <Text className="!text-sm !text-blue-700 font-medium block mb-1">
              📧 Confirmation Details
            </Text>
            <Text className="!text-xs !text-blue-600">
              A confirmation email with all details will be sent to you shortly.
            </Text>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingConfirmation; 