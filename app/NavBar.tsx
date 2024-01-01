'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';



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
              <Link href={link.href} className= {classnames({
                'text-zinc-900':link.href===path,
                'text-zinc-500':link.href!==path,
                'hover:text-zinc-800 transition-colors':true
              })}>
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
