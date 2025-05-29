'use client';

import ExampleComponent from '@/components/ExampleComponent';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <Title>Professional Dashboard</Title>
        <Typography.Paragraph className="text-gray-500">
          Example of Ant Design components with professional styling
        </Typography.Paragraph>
      </div>
      <ExampleComponent />
    </div>
  );
}
