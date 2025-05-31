'use client';

import { Card, Button, Modal, Typography, Divider } from 'antd';
import { useState, useEffect } from 'react';
import { HelpCircleIcon, PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';

const { Title, Text } = Typography;

interface PublicLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    companyName: string;
  }>;
}

export default function PublicLayout({ children, params }: PublicLayoutProps) {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState<string>('');

  // Resolve params
  useEffect(() => {
    params.then(resolvedParams => {
      setCompanyName(resolvedParams.companyName);
    });
  }, [params]);

  // Mock company data - in real app this would come from API based on companyName
  const companyData = {
    name: "KwikSlot Salon",
    phone: "+1 (555) 123-4567",
    email: "info@kwikslot.com",
    address: "123 Main Street, City, State 12345",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 bg-gray-50">
                <Image
                  src={Logo}
                  alt="KwikSlot Logo"
                  fill
                  className="object-contain p-2 sm:p-3"
                  priority
                />
              </div>
              <div className="ml-3">
                <span className="text-xl sm:text-2xl font-semibold font-quicksand text-brand-secondary">
                  Kwik
                </span>
                <span className="text-xl sm:text-2xl font-semibold font-quicksand text-brand-primary">
                  Slot
                </span>
              </div>
            </div>

            {/* Company Name & Help */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right hidden sm:block">
                <Text className="text-sm font-medium text-gray-900 block">
                  {companyData.name}
                </Text>
                <Text className="text-xs text-gray-500">
                  Book your appointment
                </Text>
              </div>
              
              <Button
                type="text"
                icon={<HelpCircleIcon size={16} />}
                onClick={() => setHelpModalOpen(true)}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors px-2 sm:px-3 rounded-lg"
              >
                <span className="hidden sm:inline text-sm font-medium">Help</span>
                <span className="sm:hidden text-xs font-medium">Help</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Help Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3 pb-2">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <HelpCircleIcon size={20} className="text-brand-primary" />
            </div>
            <span className="font-quicksand text-lg font-semibold">Need Help?</span>
          </div>
        }
        open={helpModalOpen}
        onCancel={() => setHelpModalOpen(false)}
        footer={
          <Button 
            type="primary" 
            onClick={() => setHelpModalOpen(false)}
            className="!bg-gradient-to-r !from-brand-primary !to-brand-primary/90 !border-none !font-medium !rounded-lg w-full sm:w-auto"
          >
            Got it, thanks!
          </Button>
        }
        width={520}
        className="mobile-modal"
      >
        <div className="space-y-2 py-2">
          <div className="bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 p-4 rounded-xl">
            <Title level={5} className="font-quicksand !mb-2 text-gray-800">Contact {companyData.name}</Title>
            <Text className="!text-xs text-gray-600 leading-relaxed">
              Get in touch with us for any questions or assistance with your booking.
            </Text>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-brand-primary/10 rounded-lg flex-shrink-0">
                <PhoneIcon size={16} className="text-brand-primary" />
              </div>
              <div>
                <Text className="!text-sm font-semibold block text-gray-800">Phone</Text>
                <Text className="!text-sm text-gray-600">{companyData.phone}</Text>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-brand-primary/10 rounded-lg flex-shrink-0">
                <MailIcon size={16} className="text-brand-primary" />
              </div>
              <div>
                <Text className="!text-sm font-semibold block text-gray-800">Email</Text>
                <Text className="!text-sm text-gray-600">{companyData.email}</Text>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-brand-primary/10 rounded-lg flex-shrink-0">
                <MapPinIcon size={16} className="text-brand-primary" />
              </div>
              <div>
                <Text className="!text-sm font-semibold block text-gray-800">Address</Text>
                <Text className="!text-sm text-gray-600">{companyData.address}</Text>
              </div>
            </div>
          </div>

          <Divider className="!my-2" />

          <div className="bg-gray-50 p-4 rounded-xl">
            <Text className="!text-sm font-semibold block mb-2 text-gray-800">Business Hours</Text>
            <Text className="!text-sm text-gray-600 leading-relaxed">{companyData.hours}</Text>
          </div>
        </div>
      </Modal>
    </div>
  );
} 