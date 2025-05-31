'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Tag } from 'antd';
import { ClockIcon, DollarSignIcon, SparklesIcon } from 'lucide-react';

const { Title, Text } = Typography;

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  image?: string;
  popular?: boolean;
}

interface ServiceSelectionProps {
  companyName: string;
  onServiceSelect: (service: Service) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ companyName, onServiceSelect }) => {
  // Mock services data - in real app this would come from API
  const services: Service[] = [
    {
      id: '1',
      name: 'Hair Cut & Style',
      description: 'Professional haircut with styling and finishing',
      duration: 60,
      price: 45,
      category: 'Hair',
      popular: true,
    },
    {
      id: '2',
      name: 'Hair Color',
      description: 'Full hair coloring with consultation',
      duration: 120,
      price: 85,
      category: 'Hair',
    },
    {
      id: '3',
      name: 'Manicure',
      description: 'Complete nail care with polish application',
      duration: 45,
      price: 25,
      category: 'Nails',
    },
    {
      id: '4',
      name: 'Pedicure',
      description: 'Relaxing foot treatment with nail care',
      duration: 60,
      price: 35,
      category: 'Nails',
      popular: true,
    },
    {
      id: '5',
      name: 'Facial Treatment',
      description: 'Deep cleansing facial with moisturizing',
      duration: 75,
      price: 65,
      category: 'Skincare',
    },
    {
      id: '6',
      name: 'Eyebrow Shaping',
      description: 'Professional eyebrow trimming and shaping',
      duration: 30,
      price: 20,
      category: 'Beauty',
    },
  ];

  const categories = [...new Set(services.map(service => service.category))];

  const getCategoryColor = (category: string) => {
    // const colors: { [key: string]: string } = {
    //   'Hair': 'bg-purple-100 text-purple-700 border-purple-200',
    //   'Nails': 'bg-pink-100 text-pink-700 border-pink-200',
    //   'Skincare': 'bg-green-100 text-green-700 border-green-200',
    //   'Beauty': 'bg-blue-100 text-blue-700 border-blue-200',
    // };
    return 'text-gray-700 border-gray-200';
  };

  const getServicesByCategory = (category: string) => {
    return services.filter(service => service.category === category);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3">
        <Title level={2} className="font-quicksand !mb-0 text-xl sm:text-2xl lg:text-3xl text-gray-800">
          Select a Service
        </Title>
        <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-primary/60 rounded-full mt-2 mx-auto w-24 sm:w-32"></div>
        <Text className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Choose from our available services and treatments
        </Text>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className={`px-4 py-2 rounded-full border ${getCategoryColor(category)} font-medium text-sm sm:text-base`}>
              {category}
            </div>
            <div className="hidden sm:block h-px bg-gradient-to-r from-gray-300 to-transparent flex-1 max-w-20"></div>
          </div>

          <Row gutter={[16, 16]} className="justify-center sm:justify-start">
            {getServicesByCategory(category).map(service => (
              <Col key={service.id} xs={24} sm={12} lg={8} xl={6}>
                <Card
                  className="h-full group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-sm border-gray-200/60 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50"
                  onClick={() => onServiceSelect(service)}
                >
                  <div className="space-y-4 relative">
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <SparklesIcon size={12} />
                        Popular
                      </div>
                    )}

                    <div className="space-y-2">
                      <Title level={4} className="font-quicksand !mb-0 text-base sm:text-lg group-hover:text-brand-primary transition-colors">
                        {service.name}
                      </Title>
                      <Text className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {service.description}
                      </Text>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-gray-500">
                        <ClockIcon size={14} />
                        <span>{service.duration}min</span>
                      </div>
                      <div className="flex items-center gap-1 text-brand-primary font-semibold text-sm sm:text-base">
                        <DollarSignIcon size={14} />
                        <span>{service.price}</span>
                      </div>
                    </div>

                    <Button
                      block
                      type="primary"
                    >
                      Select Service
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelection; 