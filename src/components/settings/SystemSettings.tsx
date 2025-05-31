import React from 'react';
import { Form, Switch, Card, Row, Col, Typography, Select, Button, Progress, Alert, List } from 'antd';
import { DownloadOutlined, UploadOutlined, CloudSyncOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();

  // Demo system info
  const systemInfo = [
    { label: 'Version', value: 'KwikSlot v2.1.4' },
    { label: 'Database', value: 'PostgreSQL 14.2' },
    { label: 'Storage Used', value: '2.4 GB of 10 GB' },
    { label: 'Last Backup', value: '2 hours ago' },
    { label: 'Uptime', value: '7 days, 14 hours' },
  ];

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          autoBackup: true,
          backupFrequency: 'daily',
          backupRetention: 30,
          maintenanceMode: false,
          debugMode: false,
          performanceMode: 'balanced',
          cacheEnabled: true,
          compressionEnabled: true,
          analyticsEnabled: true,
          errorReporting: true,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Backup & Restore</Title>
              
              <Form.Item 
                name="autoBackup" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Automatic Backups</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Enable automatic database backups</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="backupFrequency" 
                label={<span className="text-xs font-medium">Backup Frequency</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="hourly">Hourly</Select.Option>
                  <Select.Option value="daily">Daily</Select.Option>
                  <Select.Option value="weekly">Weekly</Select.Option>
                  <Select.Option value="monthly">Monthly</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="backupRetention" 
                label={<span className="text-xs font-medium">Retention Period (days)</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value={7}>7 days</Select.Option>
                  <Select.Option value={14}>14 days</Select.Option>
                  <Select.Option value={30}>30 days</Select.Option>
                  <Select.Option value={90}>90 days</Select.Option>
                  <Select.Option value={365}>1 year</Select.Option>
                </Select>
              </Form.Item>

              <div className="space-y-2">
                <Button size="small" icon={<CloudSyncOutlined />} className="text-xs mr-2">
                  Backup Now
                </Button>
                <Button size="small" icon={<DownloadOutlined />} className="text-xs mr-2">
                  Download Backup
                </Button>
                <Button size="small" icon={<UploadOutlined />} className="text-xs">
                  Restore Backup
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">System Status</Title>
              
              <div className="space-y-4">
                <div>
                  <Text className="text-xs font-medium block mb-2">Storage Usage</Text>
                  <Progress 
                    percent={24} 
                    size="small" 
                    strokeColor="#00D4FF"
                    format={(percent) => <span className="text-xs">{percent}%</span>}
                  />
                  <Text className="text-xs text-gray-500">2.4 GB of 10 GB used</Text>
                </div>

                <div>
                  <Text className="text-xs font-medium block mb-2">Database Performance</Text>
                  <Progress 
                    percent={87} 
                    size="small" 
                    strokeColor="#52c41a"
                    format={(percent) => <span className="text-xs">{percent}%</span>}
                  />
                  <Text className="text-xs text-gray-500">Excellent performance</Text>
                </div>

                <Alert
                  message={<span className="text-xs">All systems operational</span>}
                  type="success"
                  showIcon
                  className="text-xs"
                />
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Performance</Title>
              
              <Form.Item 
                name="performanceMode" 
                label={<span className="text-xs font-medium">Performance Mode</span>}
              >
                <Select size="small" className="text-xs">
                  <Select.Option value="power-saving">Power Saving</Select.Option>
                  <Select.Option value="balanced">Balanced</Select.Option>
                  <Select.Option value="performance">High Performance</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                name="cacheEnabled" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Enable Caching</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Cache frequently accessed data</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="compressionEnabled" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Data Compression</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Compress data to save space</Text>
                </div>
              </Form.Item>

              <div className="pt-4">
                <Button size="small" icon={<SettingOutlined />} className="text-xs">
                  Optimize Database
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">Maintenance</Title>
              
              <Form.Item 
                name="maintenanceMode" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Maintenance Mode</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Enable maintenance mode</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="debugMode" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Debug Mode</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Enable detailed error logging</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="analyticsEnabled" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Usage Analytics</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Collect anonymous usage data</Text>
                </div>
              </Form.Item>

              <Form.Item 
                name="errorReporting" 
                valuePropName="checked"
                label={<span className="text-xs font-medium">Error Reporting</span>}
              >
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <Text className="text-xs">Send error reports to support</Text>
                </div>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24}>
            <Card>
              <Title level={5} className="font-quicksand mb-4">System Information</Title>
              
              <List
                size="small"
                dataSource={systemInfo}
                renderItem={(item) => (
                  <List.Item className="!py-2">
                    <div className="flex justify-between w-full">
                      <Text className="text-xs font-medium">{item.label}:</Text>
                      <Text className="text-xs">{item.value}</Text>
                    </div>
                  </List.Item>
                )}
              />

              <div className="flex justify-end mt-4 space-x-2">
                <Button size="small" className="text-xs">
                  Check for Updates
                </Button>
                <Button size="small" className="text-xs">
                  System Diagnostics
                </Button>
                <Button size="small" className="text-xs">
                  Clear Cache
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SystemSettings; 