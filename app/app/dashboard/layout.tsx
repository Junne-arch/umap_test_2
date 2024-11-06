'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart2,
  Thermometer,
  Users,
  FileText,
  Construction,
  Home,
  Radar,
  Menu as MenuIcon,
  Globe,
  LucideIcon
} from 'lucide-react';
import { CityProvider } from '@/contexts/CityContext';
import { CitySelector } from '@/components/CitySelector';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'City Overview', href: '/app/dashboard' },
  {
    icon: BarChart2,
    label: 'Spatial Analytics',
    href: '/app/dashboard/spatial-analytics',
  },
  {
    icon: Radar,
    label: 'Ground-based Analytics',
    href: '/app/dashboard/ground-based-analytics',
  },
  {
    icon: Thermometer,
    label: 'Cooling Simulator',
    href: '/app/dashboard/cooling-simulator',
  },
  {
    icon: Users,
    label: 'Population Vulnerability',
    href: '/app/dashboard/population-vulnerability',
  },
  {
    icon: FileText,
    label: 'City Summary',
    href: '/app/dashboard/city-summary',
  },
  {
    icon: Construction,
    label: 'Under Construction 1',
    href: '/app/dashboard/under-construction',
  },
  {
    icon: Construction,
    label: 'Under Construction 2',
    href: '/app/dashboard/under-construction-2',
  },
  {
    icon: Construction,
    label: 'Under Construction R&D',
    href: '/app/dashboard/under-construction-rd',
  },
  {
    icon: Globe,
    label: 'Under Construction Globe',
    href: '/app/dashboard/under-construction-globe',
  },
];

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive }) => {
  return (
    <Link href={item.href} className={cn('nav-item', isActive && 'active')}>
      <item.icon className="h-4 w-4 mr-3" />
      <span>{item.label}</span>
    </Link>
  );
};

interface DashboardLayoutContentProps {
  children: React.ReactNode;
}

const DashboardLayoutContent: React.FC<DashboardLayoutContentProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isCitySelectorOpen, setIsCitySelectorOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="h-screen flex flex-col">
      <header className="h-[var(--header-height)] flex-none border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center px-4 shadow-sm">
        <div className="flex items-center flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setIsCitySelectorOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <CitySelector
              open={isCitySelectorOpen}
              onOpenChange={setIsCitySelectorOpen}
            />
          </div>
        </div>
      </header>

      <div className="dashboard-content flex">
        <aside
          className={cn(
            'border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col custom-scrollbar',
            isSidebarCollapsed ? 'w-16' : 'w-64'
          )}
        >
          <nav className="flex-1 py-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={
                  item.href === '/app/dashboard'
                    ? pathname === '/app/dashboard'
                    : pathname === item.href
                }
              />
            ))}
          </nav>
        </aside>

        <main className="dashboard-main flex-1 bg-gray-50 dark:bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <CityProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </CityProvider>
  );
}