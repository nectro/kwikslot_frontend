import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Quicksand, Poppins } from "next/font/google";
import '../lib/antd-patch';  // Import patch before antd
import { ConfigProvider } from 'antd';
import { theme } from '../lib/antd.config';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ConditionalLayout from "@/components/Layout/ConditionalLayout";
import "./globals.css";


const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "KwikSlot",
  description: "Professional Scheduling System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${quicksand.variable} antialiased bg-gray-50`}
      >
        <ConfigProvider theme={theme}>
          <AntdRegistry>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
