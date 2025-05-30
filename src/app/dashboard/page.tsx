'use client';

import { Typography, Card, Row, Col, TimePicker, Select, DatePicker } from 'antd';
import TimelineView from '@/components/dashboard/TimelineView';
import FilterPanel from '@/components/dashboard/FilterPanel';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';

const { Title } = Typography;

export default function Dashboard() {
  return (
    <div className="h-full">
      <Row gutter={[8, 8]} className="h-full !m-0">
        <Col span={18} className='h-full overflow-y-auto !scrollbar-hide'>  
          <div className="flex flex-col h-full gap-4">
            <Card className="flex-1">
              <TimelineView />
            </Card>
            <Card className="flex-1">
              <UpcomingAppointments />
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <Card className="h-fit">
            <FilterPanel />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
