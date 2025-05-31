'use client';

import { useState, useEffect } from 'react';
import { Card, Steps, Typography } from 'antd';
import ServiceSelection from '@/components/booking/ServiceSelection';
import TimeSlotSelection from '@/components/booking/TimeSlotSelection';
import BookingConfirmation from '@/components/booking/BookingConfirmation';

const { Title, Text } = Typography;

interface BookingPageProps {
  params: Promise<{
    companyName: string;
  }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [companyName, setCompanyName] = useState<string>('');

  // Resolve params on component mount
  useEffect(() => {
    params.then(resolvedParams => {
      setCompanyName(resolvedParams.companyName);
    });
  }, [params]);

  const steps = [
    {
      title: 'Select Service',
      description: 'Choose the service you need',
    },
    {
      title: 'Choose Time',
      description: 'Pick your preferred time slot',
    },
    {
      title: 'Confirmation',
      description: 'Review and confirm your booking',
    },
  ];

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const handleTimeSlotSelect = (timeSlot: any) => {
    setSelectedTimeSlot(timeSlot);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingComplete = () => {
    // Handle booking completion
    console.log('Booking completed:', { selectedService, selectedTimeSlot });
  };

  // Don't render until we have the company name
  if (!companyName) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-brand-primary to-brand-primary/70 rounded-full animate-pulse"></div>
          <Title level={4} className="font-quicksand text-gray-600 animate-pulse">Loading your booking experience...</Title>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="inline-block">
          <Title level={1} className="font-quicksand !mb-0 text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-brand-primary to-brand-primary/80 bg-clip-text text-transparent">
            Book Your Appointment
          </Title>
          <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-primary/60 rounded-full mt-2 mx-auto w-24 sm:w-32"></div>
        </div>
      </div> */}

      {/* Progress Steps */}
      <Card className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border-white/40 shadow-sm rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="flex justify-center px-2 sm:px-6 py-4">
          <Steps
            current={currentStep}
            items={steps}
            size="small"
            className="max-w-3xl mx-auto booking-steps"
          />
        </div>
      </Card>

      {/* Step Content */}
      <div className="min-h-[600px] sm:min-h-[700px]">
        <div className="animate-fadeIn">
          {currentStep === 0 && (
            <ServiceSelection
              companyName={companyName}
              onServiceSelect={handleServiceSelect}
            />
          )}

          {currentStep === 1 && (
            <TimeSlotSelection
              companyName={companyName}
              selectedService={selectedService}
              onTimeSlotSelect={handleTimeSlotSelect}
              onBack={handleBack}
            />
          )}

          {currentStep === 2 && (
            <BookingConfirmation
              companyName={companyName}
              selectedService={selectedService}
              selectedTimeSlot={selectedTimeSlot}
              onBack={handleBack}
              onConfirm={handleBookingComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
} 