'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Skeleton from "@/app/components/Skeleton"
import { getServerSession } from 'next-auth';
import authOptions from './auth/authOptions';





const NavBar = () => {

  return (
    <div>
      <nav className=' border-b mb-5 px-5 py-3 '>
        <Flex justify="between">
          <Flex align="center" gap="3"> 
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </nav>
    </div>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width="3rem"  />;
  
  if (status === 'unauthenticated') return <Link href="http://localhost:3000/api/auth/signin">Login</Link>;
  
  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar src={session?.user?.image || ""} fallback="?" size="2" radius="full" className="cursor-pointer" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text className="text-gray-950">{session!.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="http://localhost:3000/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const path = usePathname();
  
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  
  return (
    <ul className='flex ml-5 space-x-6 '>
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={classnames({
            'text-zinc-900': link.href === path,
            'text-zinc-500': link.href !== path,
            'hover:text-zinc-800 transition-colors': true
          })}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
