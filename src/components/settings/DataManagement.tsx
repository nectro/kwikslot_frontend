import React from 'react';
import { Card, Row, Col, Typography, Button, Table, Progress, Alert, Select, DatePicker, Space } from 'antd';
import { 
  DownloadOutlined, 
  UploadOutlined, 
  DeleteOutlined, 
  ExportOutlined,
  ImportOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const DataManagement: React.FC = () => {
  // Demo data statistics
  const dataStats = [
    { key: '1', type: 'Appointments', count: '2,543', size: '1.2 MB', lastModified: '2 hours ago' },
    { key: '2', type: 'Customers', count: '1,892', size: '856 KB', lastModified: '1 day ago' },
    { key: '3', type: 'Staff Records', count: '24', size: '45 KB', lastModified: '3 days ago' },
    { key: '4', type: 'Services', count: '156', size: '234 KB', lastModified: '1 week ago' },
    { key: '5', type: 'Payments', count: '3,421', size: '2.1 MB', lastModified: '1 hour ago' },
    { key: '6', type: 'Reports', count: '89', size: '345 KB', lastModified: '2 days ago' },
  ];

  const dataColumns = [
    {
      title: <span className="text-xs font-medium">Data Type</span>,
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <Text className="text-xs font-medium">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Records</span>,
      dataIndex: 'count',
      key: 'count',
      render: (text: string) => <Text className="text-xs">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Size</span>,
      dataIndex: 'size',
      key: 'size',
      render: (text: string) => <Text className="text-xs">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Last Modified</span>,
      dataIndex: 'lastModified',
      key: 'lastModified',
      render: (text: string) => <Text className="text-xs text-gray-500">{text}</Text>,
    },
    {
      title: <span className="text-xs font-medium">Actions</span>,
      key: 'actions',
      render: () => (
        <Space size="small">
          <Button type="link" size="small" icon={<ExportOutlined />} className="!p-0 text-xs">
            Export
          </Button>
          <Button type="link" size="small" icon={<DeleteOutlined />} className="!p-0 text-xs text-red-500">
            Clean
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card>
            <Title level={5} className="font-quicksand mb-4">Data Export</Title>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-2">Export Format</label>
                <Select size="small" className="w-full text-xs" defaultValue="excel">
                  <Select.Option value="excel">Excel (.xlsx)</Select.Option>
                  <Select.Option value="csv">CSV (.csv)</Select.Option>
                  <Select.Option value="pdf">PDF (.pdf)</Select.Option>
                  <Select.Option value="json">JSON (.json)</Select.Option>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2">Date Range</label>
                <RangePicker size="small" className="w-full text-xs" />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2">Data Types</label>
                <Select 
                  mode="multiple" 
                  size="small" 
                  className="w-full text-xs" 
                  placeholder="Select data to export"
                  defaultValue={['appointments', 'customers']}
                >
                  <Select.Option value="appointments">Appointments</Select.Option>
                  <Select.Option value="customers">Customers</Select.Option>
                  <Select.Option value="staff">Staff Records</Select.Option>
                  <Select.Option value="services">Services</Select.Option>
                  <Select.Option value="payments">Payments</Select.Option>
                  <Select.Option value="reports">Reports</Select.Option>
                </Select>
              </div>

              <div className="pt-4 space-y-2">
                <Button type="primary" size="small" icon={<FileExcelOutlined />} className="text-xs w-full">
                  Export to Excel
                </Button>
                <Button size="small" icon={<FilePdfOutlined />} className="text-xs w-full">
                  Export to PDF
                </Button>
                <Button size="small" icon={<DownloadOutlined />} className="text-xs w-full">
                  Export All Data
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card>
            <Title level={5} className="font-quicksand mb-4">Data Import</Title>
            
            <div className="space-y-4">
              <Alert
                message={<span className="text-xs">Importing data will add new records. Existing records with the same ID will be updated.</span>}
                type="info"
                showIcon
                className="text-xs"
              />

              <div>
                <label className="block text-xs font-medium mb-2">Import Type</label>
                <Select size="small" className="w-full text-xs" defaultValue="customers">
                  <Select.Option value="customers">Customer Data</Select.Option>
                  <Select.Option value="appointments">Appointments</Select.Option>
                  <Select.Option value="staff">Staff Records</Select.Option>
                  <Select.Option value="services">Services</Select.Option>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2">File Format</label>
                <Select size="small" className="w-full text-xs" defaultValue="excel">
                  <Select.Option value="excel">Excel (.xlsx)</Select.Option>
                  <Select.Option value="csv">CSV (.csv)</Select.Option>
                  <Select.Option value="json">JSON (.json)</Select.Option>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <UploadOutlined className="text-2xl text-gray-400 mb-2" />
                <Text className="text-xs text-gray-500 block">
                  Drag and drop files here, or click to browse
                </Text>
                <Text className="text-xs text-gray-400">
                  Supported formats: .xlsx, .csv, .json
                </Text>
              </div>

              <div className="pt-4 space-y-2">
                <Button size="small" icon={<ImportOutlined />} className="text-xs w-full">
                  Choose File
                </Button>
                <Button size="small" className="text-xs w-full">
                  Download Template
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24}>
          <Card>
            <Title level={5} className="font-quicksand mb-4">Data Overview</Title>
            
            <div className="mb-4">
              <Text className="text-xs font-medium block mb-2">Storage Usage</Text>
              <Progress 
                percent={35} 
                size="small" 
                strokeColor="#4E4FEB"
                format={(percent) => <span className="text-xs">{percent}% (3.5 GB of 10 GB)</span>}
              />
            </div>

            <Table
              columns={dataColumns}
              dataSource={dataStats}
              pagination={false}
              size="small"
              className="text-xs"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card>
            <Title level={5} className="font-quicksand mb-4">Data Cleanup</Title>
            
            <Alert
              message={<span className="text-xs">Cleanup operations cannot be undone. Please backup your data before proceeding.</span>}
              type="warning"
              showIcon
              icon={<WarningOutlined />}
              className="mb-4 text-xs"
            />

            <div className="space-y-4">
              <div>
                <Text className="text-xs font-medium block mb-2">Clean Old Records</Text>
                <div className="space-y-2">
                  <Button size="small" className="text-xs w-full">
                    Delete appointments older than 1 year
                  </Button>
                  <Button size="small" className="text-xs w-full">
                    Archive completed appointments (90 days)
                  </Button>
                  <Button size="small" className="text-xs w-full">
                    Remove inactive customers (2 years)
                  </Button>
                </div>
              </div>

              <div>
                <Text className="text-xs font-medium block mb-2">System Cleanup</Text>
                <div className="space-y-2">
                  <Button size="small" className="text-xs w-full">
                    Clear system logs
                  </Button>
                  <Button size="small" className="text-xs w-full">
                    Remove temporary files
                  </Button>
                  <Button size="small" className="text-xs w-full">
                    Optimize database tables
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card>
            <Title level={5} className="font-quicksand mb-4">Data Archival</Title>
            
            <div className="space-y-4">
              <div>
                <Text className="text-xs font-medium block mb-2">Archive Settings</Text>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Text className="text-xs">Auto-archive completed appointments</Text>
                    <Select size="small" className="text-xs" defaultValue="90" style={{ width: 100 }}>
                      <Select.Option value="30">30 days</Select.Option>
                      <Select.Option value="60">60 days</Select.Option>
                      <Select.Option value="90">90 days</Select.Option>
                      <Select.Option value="180">180 days</Select.Option>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Text className="text-xs">Archive payment records</Text>
                    <Select size="small" className="text-xs" defaultValue="365" style={{ width: 100 }}>
                      <Select.Option value="180">6 months</Select.Option>
                      <Select.Option value="365">1 year</Select.Option>
                      <Select.Option value="730">2 years</Select.Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button size="small" className="text-xs w-full">
                  Create Archive
                </Button>
                <Button size="small" className="text-xs w-full">
                  View Archived Data
                </Button>
                <Button size="small" className="text-xs w-full">
                  Restore from Archive
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataManagement; 