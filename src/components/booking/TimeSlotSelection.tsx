'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Calendar, Badge, Tag } from 'antd';
import { ArrowLeftIcon, ClockIcon, DollarSignIcon, UserIcon, CalendarIcon } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';

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

interface TimeSlotSelectionProps {
  companyName: string;
  selectedService: Service;
  onTimeSlotSelect: (timeSlot: { date: string; slot: TimeSlot; service: Service }) => void;
  onBack: () => void;
}

const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({ 
  companyName, 
  selectedService, 
  onTimeSlotSelect, 
  onBack 
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  // Mock time slots - in real app this would come from API based on selected date and service
  const getTimeSlotsForDate = (date: Dayjs): TimeSlot[] => {
    const slots: TimeSlot[] = [
      { id: '1', time: '09:00', available: true, staffMember: 'Sarah Johnson' },
      { id: '2', time: '09:30', available: false },
      { id: '3', time: '10:00', available: true, staffMember: 'Mike Wilson' },
      { id: '4', time: '10:30', available: true, staffMember: 'Sarah Johnson' },
      { id: '5', time: '11:00', available: false },
      { id: '6', time: '11:30', available: true, staffMember: 'Emma Davis' },
      { id: '7', time: '12:00', available: false },
      { id: '8', time: '12:30', available: true, staffMember: 'Mike Wilson' },
      { id: '9', time: '13:00', available: true, staffMember: 'Sarah Johnson' },
      { id: '10', time: '13:30', available: false },
      { id: '11', time: '14:00', available: true, staffMember: 'Emma Davis' },
      { id: '12', time: '14:30', available: true, staffMember: 'Mike Wilson' },
      { id: '13', time: '15:00', available: true, staffMember: 'Sarah Johnson' },
      { id: '14', time: '15:30', available: false },
      { id: '15', time: '16:00', available: true, staffMember: 'Emma Davis' },
      { id: '16', time: '16:30', available: true, staffMember: 'Mike Wilson' },
      { id: '17', time: '17:00', available: false },
      { id: '18', time: '17:30', available: true, staffMember: 'Sarah Johnson' },
    ];

    return slots;
  };

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : [];

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const disabledDate = (current: Dayjs) => {
    // Disable past dates
    return current && current < dayjs().startOf('day');
  };

  const dateCellRender = (value: Dayjs) => {
    // Show availability indicator as small dots that don't interfere with date numbers
    const availableSlots = getTimeSlotsForDate(value).filter(slot => slot.available).length;
    if (availableSlots > 0 && value >= dayjs().startOf('day')) {
      const getDotColor = (count: number) => {
        if (count > 5) return 'bg-green-500';
        if (count > 2) return 'bg-yellow-500';
        return 'bg-red-500';
      };
      
      const getDotCount = (count: number) => {
        if (count > 5) return 3;
        if (count > 2) return 2;
        return 1;
      };

      const dotColor = getDotColor(availableSlots);
      const dotCount = getDotCount(availableSlots);

      return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-0.5">
          {Array.from({ length: dotCount }).map((_, index) => (
            <div 
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Service Info */}
      <div className="bg-gradient-to-r from-brand-primary/5 via-brand-primary/10 to-brand-primary/5 border border-brand-primary/20 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <Button
            type="link"
            icon={<ArrowLeftIcon size={16} />}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-brand-primary hover:bg-white/50 !px-0 rounded-lg transition-all"
          >
            <span className="text-sm font-medium">Back to Services</span>
          </Button>
          
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Step 2 of 3</div>
            <div className="text-xs text-gray-400">Select Date & Time</div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Title level={3} className="font-quicksand !mb-0 text-xl text-gray-800">
                Book {selectedService.name}
              </Title>
              <Tag className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 font-medium">
                {selectedService.category}
              </Tag>
            </div>
            <Text className="text-gray-600 leading-relaxed block">
              {selectedService.description}
            </Text>
          </div>
          
          <div className="flex lg:flex-col gap-4 lg:gap-2 bg-white/60 px-4 py-3 rounded-xl lg:text-right">
            <div className="flex items-center lg:justify-end gap-2">
              <ClockIcon size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{selectedService.duration} minutes</span>
            </div>
            <div className="flex items-center lg:justify-end gap-2">
              <DollarSignIcon size={18} className="text-brand-primary" />
              <span className="text-xl font-bold text-brand-primary">${selectedService.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Row gutter={[24, 24]} className="min-h-[500px]">
        {/* Calendar */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-brand-primary" />
                <span className="font-quicksand text-lg">Select Date</span>
              </div>
            }
            className="h-full rounded-2xl shadow-sm border-gray-200/60"
          >
            <Calendar
              fullscreen={false}
              value={selectedDate || undefined}
              onSelect={onDateSelect}
              disabledDate={disabledDate}
              cellRender={dateCellRender}
              className="border-none custom-calendar"
            />
            <div className="mt-6 p-4 bg-gray-50/80 rounded-xl">
              <Text className="text-sm font-medium block mb-3 text-gray-700">Availability Legend</Text>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-600">Many slots available (5+)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  </div>
                  <span className="text-gray-600">Few slots available (3-5)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-gray-600">Limited slots (1-2)</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Time Slots - Grid Layout */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <ClockIcon size={18} className="text-brand-primary" />
                <span className="font-quicksand text-lg">
                  Available Times - {selectedDate?.format('MMM DD')}
                </span>
              </div>
            }
            className="h-full rounded-2xl shadow-sm border-gray-200/60 overflow-y-auto"
          >
            {timeSlots.length > 0 ? (
              <div>
                <Row gutter={[8, 8]} className="!mx-0">
                  {timeSlots.map(slot => (
                    <Col xs={12} sm={8} key={slot.id}>
                      <div
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer text-center ${
                          slot.available
                            ? 'border-gray-200 hover:border-brand-primary hover:bg-brand-primary/5 hover:shadow-sm'
                            : 'border-gray-100 bg-gray-50/80 cursor-not-allowed opacity-60'
                        }`}
                        onClick={() => {
                          if (slot.available && selectedDate) {
                            onTimeSlotSelect({
                              date: selectedDate.format('YYYY-MM-DD'),
                              slot,
                              service: selectedService
                            });
                          }
                        }}
                      >
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">
                            {slot.time}
                          </div>
                          {slot.available && slot.staffMember && (
                            <div className="text-xs text-gray-500 truncate">
                              {slot.staffMember}
                            </div>
                          )}
                          {!slot.available && (
                            <div className="text-xs text-red-500">
                              Unavailable
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ClockIcon size={32} className="opacity-50" />
                </div>
                <Title level={5} className="font-quicksand text-gray-500 !mb-2">No Slots Available</Title>
                <Text className="text-sm">Please select a different date</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TimeSlotSelection; 