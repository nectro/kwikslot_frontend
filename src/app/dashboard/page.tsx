'use client';

import { Typography, Card, Row, Col, TimePicker, Select, DatePicker, Button } from 'antd';
import TimelineView from '@/components/dashboard/TimelineView';
import FilterPanel from '@/components/dashboard/FilterPanel';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';

const { Title } = Typography;

export default function Dashboard() {
  return (
    <div className="h-full">
      <Row gutter={[8, 8]} className="h-full !m-0 overflow-y-auto">
        <Col span={18}>  
          <div className="flex flex-col gap-3">
            <Card className="flex-1">
              <TimelineView />
            </Card>
            <Card className="flex-1">
              <UpcomingAppointments />
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="sticky top-0 flex flex-col gap-3">
            <div className='flex flex-row gap-2'>
                <Button className='flex-1' variant='outlined'>
                    Walk-in
                </Button>
                <Button className='flex-1' variant='outlined'>
                    Book
                </Button>
            </div>
            <Card className="h-fit">
              <FilterPanel />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
