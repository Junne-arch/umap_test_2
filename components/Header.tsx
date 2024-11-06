"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, Sun } from 'lucide-react';
import { useTheme } from "next-themes"
import { useState } from 'react';
import UMAPLogo from './UMAPLogo';

export default function Header() {
  const { setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/app/dashboard') {
      return pathname.startsWith('/app/dashboard');
    }
    return pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <UMAPLogo className="h-12 text-gray-800 dark:text-white" />
        </Link>
        
        <nav className="hidden md:flex space-x-4">
          <Link href="/app" className={`text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 pb-1 border-b-2 ${isActive('/app') ? 'border-green-500' : 'border-transparent'}`}>Home</Link>
          <Link href="/app/dashboard" className={`text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 pb-1 border-b-2 ${isActive('/app/dashboard') ? 'border-green-500' : 'border-transparent'}`}>Dashboard</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={`text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 pb-1 border-b-2 ${pathname.startsWith('/app/resources') ? 'border-green-500' : 'border-transparent'} flex items-center`}>
              Resources <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/app/resources/academic">Academic Resources</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/app/resources/sensors">Sensors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/app/resources/external">External Resources</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/app/geodata-download" className={`text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 pb-1 border-b-2 ${isActive('/app/geodata-download') ? 'border-green-500' : 'border-transparent'}`}>Geodata Download</Link>
          <Link href="/app/about" className={`text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 pb-1 border-b-2 ${isActive('/app/about') ? 'border-green-500' : 'border-transparent'}`}>About</Link>
          <Link href="/app/todo" className={`text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 pb-1 border-b-2 ${isActive('/app/todo') ? 'border-green-500' : 'border-transparent'}`}>To Do</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800 py-2">
          <Link href="/app" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">Home</Link>
          <Link href="/app/dashboard" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">Dashboard</Link>
          <Link href="/app/resources/academic" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">Academic Resources</Link>
          <Link href="/app/resources/sensors" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">Sensors</Link>
          <Link href="/app/resources/external" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">External Resources</Link>
          <Link href="/app/geodata-download" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">Geodata Download</Link>
          <Link href="/app/about" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">About</Link>
          <Link href="/app/todo" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">To Do</Link>
        </nav>
      )}
    </header>
  );
}