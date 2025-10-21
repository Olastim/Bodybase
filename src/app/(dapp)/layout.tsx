'use client';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { BodyBaseIcon, FoodIcon, RewardIcon, SleepIcon, StepIcon } from '@/components/icons';
import { LayoutDashboard, BarChart3, User, Settings, LogOut, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/wallet', label: 'Wallet', icon: Wallet, tooltip: 'Wallet' },
  { href: '/steps', label: 'Steps', icon: StepIcon, tooltip: 'Steps' },
  { href: '/food', label: 'Food', icon: FoodIcon, tooltip: 'Food' },
  { href: '/sleep', label: 'Sleep', icon: SleepIcon, tooltip: 'Sleep' },
  { href: '/rewards', label: 'Rewards', icon: RewardIcon, tooltip: 'Rewards' },
  { href: '/leaderboard', label: 'Leaderboard', icon: BarChart3, tooltip: 'Leaderboard' },
];

export default function DappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const handleLogout = async () => {
    await logout();
  }

  if (!ready || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r-border/50">
        <SidebarHeader className='p-4'>
          <Link href="/dashboard" className="flex items-center gap-2">
            <BodyBaseIcon className="w-8 h-8 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="text-xl font-bold text-foreground">BodyBase</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.tooltip}>
                  <Link href={item.href}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                  <Link href="/profile">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/settings">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout" className="text-red-400 hover:text-red-400 hover:bg-red-500/10">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end border-b bg-background/80 px-4 backdrop-blur-lg md:px-6">
          <div className="flex items-center gap-4">
             <SidebarTrigger className="md:hidden" />
          </div>
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
