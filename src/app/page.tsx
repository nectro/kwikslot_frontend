'use client';

import { Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
      <div>
        <Title level={2}>Dashboard</Title>
        <Typography.Paragraph>
          Welcome to KwikSlot Dashboard
        </Typography.Paragraph>
      </div>
  );
}
