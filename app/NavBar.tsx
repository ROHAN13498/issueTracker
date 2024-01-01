'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';



const NavBar = () => {

  const path=usePathname();
  
  const Links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <div>
      <nav className='flex border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'>
          <AiFillBug />
        </Link>
        <ul className='flex ml-5 space-x-6 '>
          {Links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className='text-zinc-500 hover:text-zinc-900 transition-colors'>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
