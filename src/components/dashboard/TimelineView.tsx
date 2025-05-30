import React from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

interface TimeSlot {
  startTime: string; // in HH:mm format
  duration: number;  // in minutes
  isBooked: boolean;
}

interface ServiceRow {
  serviceName: string;
  slots: TimeSlot[];
  color: string;
}

// Generate 15-minute interval marks for the timeline
const generateTimeMarks = () => {
  const marks: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      marks.push(
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      );
    }
  }
  return marks;
};

// Helper to determine if a time block is in an even hour
const isEvenHourBlock = (index: number) => {
  const hourIndex = Math.floor(index / 4); // 4 blocks per hour
  return hourIndex % 2 === 0;
};

// Calculate position and width for a time slot
const calculateSlotStyle = (startTime: string, duration: number) => {
  const timelineStart = dayjs('09:00', 'HH:mm');
  const slotStart = dayjs(startTime, 'HH:mm');
  const totalTimelineMinutes = 11 * 60; // 11 hours (9:00 to 20:00)
  
  const minutesFromStart = slotStart.diff(timelineStart, 'minute');
  const leftPosition = (minutesFromStart / totalTimelineMinutes) * 100;
  const width = (duration / totalTimelineMinutes) * 100;
  
  return {
    left: `${leftPosition}%`,
    width: `${width}%`
  };
};

// Demo data with varying durations
const DEMO_DATA: ServiceRow[] = [
  {
    serviceName: 'Haircut',
    color: '#4A90E2',
    slots: [
      { startTime: '09:00', duration: 45, isBooked: true },
      { startTime: '10:30', duration: 30, isBooked: true },
      { startTime: '13:15', duration: 45, isBooked: true },
      { startTime: '15:00', duration: 30, isBooked: true }
    ]
  },
  {
    serviceName: 'Hair Spa',
    color: '#F5A623',
    slots: [
      { startTime: '09:30', duration: 95, isBooked: true },
      { startTime: '12:00', duration: 90, isBooked: true },
      { startTime: '14:30', duration: 90, isBooked: true }
    ]
  },
  {
    serviceName: 'Coloring',
    color: '#7E57C2',
    slots: [
      { startTime: '10:00', duration: 120, isBooked: true },
      { startTime: '13:00', duration: 150, isBooked: true },
      { startTime: '16:00', duration: 120, isBooked: true }
    ]
  }
];

const TimelineView: React.FC = () => {
  const timeMarks = generateTimeMarks();

  return (
    <div className="w-full">
      <Title level={4} className="font-quicksand">Today's Schedule</Title>
      
      <div className="relative">
        {/* Fixed Service Names Column */}
        <div className="absolute left-0 top-0 w-32 bg-white z-10">
          <div className="h-10 p-2 font-semibold">
            Service
          </div>
          {DEMO_DATA.map((service) => (
            <div
              key={service.serviceName}
              className="h-16 p-2 font-medium flex items-center"
            >
              {service.serviceName}
            </div>
          ))}
        </div>

        {/* Scrollable Timeline */}
        <div className="overflow-x-auto timeline-scroll ml-32">
          <div className="min-w-[1200px]">
            {/* Timeline Header */}
            <div className="flex h-10">
              {timeMarks.map((time, index) => (
                <div
                  key={time}
                  className={`w-[40px]  p-1 pt-3 text-center text-xs font-medium ${
                    isEvenHourBlock(index) ? 'bg-gray-50' : ''
                  }`}
                >
                  {index % 4 === 0 ? time : ''}
                </div>
              ))}
            </div>

            {/* Timeline Rows */}
            {DEMO_DATA.map((service) => (
              <div key={service.serviceName} className="relative h-16">
                <div className="absolute inset-0 flex">
                  {/* Background time blocks */}
                  {timeMarks.map((_, index) => (
                    <div
                      key={index}
                      className={`w-[30px] ${isEvenHourBlock(index) ? 'bg-gray-50' : ''}`}
                    />
                  ))}
                </div>
                
                {/* Service slots */}
                {service.slots.map((slot, index) => {
                  const style = calculateSlotStyle(slot.startTime, slot.duration);
                  return (
                    <div
                      key={`${service.serviceName}-${slot.startTime}`}
                      className="absolute top-2 bottom-2 rounded-md shadow-sm flex items-center justify-center text-white text-xs"
                      style={{
                        ...style,
                        backgroundColor: service.color,
                        opacity: 0.9
                      }}
                    >
                      {`${slot.duration}min`}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView; 