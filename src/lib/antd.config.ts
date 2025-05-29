import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    // Brand Colors
    colorPrimary: '#00D4FF',      // Brand primary - Bright Blue
    colorBgContainer: '#FFFFFF',   // Brand white
    
    // Text Colors based on brand gray
    colorText: '#484848',         // Brand gray for primary text
    colorTextSecondary: '#6B6B6B', // Lighter shade of brand gray
    colorTextTertiary: '#8E8E8E',  // Lightest shade of brand gray
    
    // System State Colors (keeping standard colors for clear user feedback)
    colorSuccess: '#52c41a',      // Standard green for success
    colorWarning: '#faad14',      // Standard gold for warnings
    colorError: '#ff4d4f',        // Standard red for errors
    colorInfo: '#00D4FF',         // Using brand blue for info
    
    // Border and Background Colors
    colorBorder: '#E5E5E5',       // Light gray for borders
    colorBgLayout: '#F5F5F5',     // Light background
    colorBgElevated: '#FFFFFF',   // White for elevated components
    
    // Typography
    fontFamily: 'var(--font-geist-sans)',
    fontSize: 14,
    
    // Component Base Styling
    borderRadius: 6,
    controlHeight: 40,
    
    // Shadows for depth
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.12)',
  },
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 40,
      paddingContentHorizontal: 16,
      // Primary button (brand blue)
      primaryColor: '#FFFFFF',
      // Default button
      defaultBg: '#FFFFFF',
      defaultBorderColor: '#E5E5E5',
      defaultColor: '#484848',
      // Text button
      textHoverBg: 'rgba(0, 212, 255, 0.08)', // Brand blue with opacity
    },
    Input: {
      borderRadius: 6,
      controlHeight: 40,
      paddingContentHorizontal: 12,
      activeBorderColor: '#00D4FF',
      hoverBorderColor: '#33DDFF', // Lighter brand blue
      activeShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)', // Brand blue with opacity
    },
    Select: {
      borderRadius: 6,
      controlHeight: 40,
      paddingContentHorizontal: 12,
      optionSelectedBg: 'rgba(0, 212, 255, 0.08)', // Brand blue with opacity
      optionActiveBg: 'rgba(0, 212, 255, 0.04)',   // Brand blue with less opacity
    },
    Card: {
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    Menu: {
      itemBorderRadius: 6,
      itemSelectedBg: 'rgba(0, 212, 255, 0.08)', // Brand blue with opacity
      itemActiveBg: 'rgba(0, 212, 255, 0.04)',   // Brand blue with less opacity
      itemSelectedColor: '#00D4FF',
    },
    Table: {
      borderRadius: 8,
      headerBg: '#F5F5F5',
      headerColor: '#484848',     // Brand gray
      rowHoverBg: 'rgba(0, 212, 255, 0.04)', // Brand blue with opacity
      headerSplitColor: '#E5E5E5',
      borderColor: '#E5E5E5',
    },
    Modal: {
      borderRadius: 12,
      titleFontSize: 20,
      paddingContentHorizontal: 24,
      paddingContentVertical: 24,
    },
    Drawer: {
      borderRadius: 12,
      paddingContentHorizontal: 24,
    },
    Message: {
      borderRadius: 8,
      contentPadding: 16,
    },
    Notification: {
      borderRadius: 8,
      padding: 16,
    },
    // Additional components that should respect brand colors
    Tabs: {
      itemSelectedColor: '#00D4FF',
      inkBarColor: '#00D4FF',
    },
    Switch: {
      handleBg: '#FFFFFF',
      colorPrimary: '#00D4FF',
      colorPrimaryHover: '#33DDFF',
    },
    Checkbox: {
      borderRadius: 4,
      colorPrimary: '#00D4FF',
    },
    Radio: {
      buttonBg: '#FFFFFF',
      colorPrimary: '#00D4FF',
    },
    Progress: {
      defaultColor: '#00D4FF',
      remainingColor: '#F5F5F5',
    }
  },
};
