'use client';

import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if the current path is a public booking route (dynamic company route)
  const isPublicBookingRoute = pathname.startsWith('/') && 
    !pathname.startsWith('/dashboard') && 
    !pathname.startsWith('/staff') && 
    !pathname.startsWith('/services') && 
    !pathname.startsWith('/history') && 
    !pathname.startsWith('/settings') &&
    pathname !== '/';

  // If it's a public booking route, render children without MainLayout
  if (isPublicBookingRoute) {
    return <>{children}</>;
  }

  // Otherwise, render with MainLayout for admin routes
  return <MainLayout>{children}</MainLayout>;
} 