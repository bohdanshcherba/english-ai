import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';

import { Home, ListTodo } from 'lucide-react';

const tabs = [
  {
    icon: Home,
    href: '/'
  },
  {
    icon: ListTodo,
    href: '/quiz'
  }
];

export function BottomTabNavigator() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className='bg-background border-sm fixed right-0 bottom-0 left-0 border-t'>
      <div className='flex items-center justify-around'>
        {tabs.map((tab) => (
          <Link
            href={tab.href}
            key={tab.href}
            className={cn(
              'flex h-full w-full items-center justify-center p-2 pb-3',
              isActive(tab.href) && 'bg-accent'
            )}>
            <tab.icon size={30} />
          </Link>
        ))}
      </div>
    </div>
  );
}
