import React from 'react'
import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../components/UserAuthContext";
import icon from "../assets/PETALERT.png"


const userInfo = {
    name: 'Joaquim',
    email: 'as@gmail.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const userNavigation = [
    { name: 'Your Profile', to: '/petAlert_deploy/profile' }, // Rota de exemplo
    { name: 'Sign out'}, // Rota de logout
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Header({page}) {
    const {user, logout} = useUserAuth();
    const navigate = useNavigate();

    const navigationNoUser = [
        { name: 'Home', href: '/siteTest/', current: page === 'Home' },
        { name: 'Login', href: '/siteTest/login', current: page === 'Login' },
    ]
      
    const navigationLogin = [
        { name: 'Home', href: '/petAlert_deploy', current: page === 'Home' },
        { name: 'Publications', href: '/petAlert_deploy/home', current: page === 'HomeUser' },
    ]


    const handleClick = (to, name) => {
        if (name === "Sign out") {
          if(window.confirm('Deseja realmente sair?')) logout();
        } else {
            navigate(to);  // Navega para a rota especificada em item.to
        }
      };
    
      const renderLinks = (items) => (
        items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              item.current ? 'bg-orange-600 text-white text-sm font-medium' : 'text-white hover:bg-orange-600 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-regular',
            )}
          >
            {item.name}
          </Link>
        ))
      );




  return (
    <div>
        <Disclosure as="nav" className="bg-orange-400 opacity-95 sticky top-0 w-full z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 ">
                  <img
                    alt="Your Company"
                    src={icon}
                    className="h-9 w-9 "
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {!user && renderLinks(navigationNoUser)}
                    {user && renderLinks(navigationLogin)}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  {user && <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-transparent p-1 text-sm hover:border hover:border-gray-200 focus:ring-0 focus:ring-white focus:ring-offset-1">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Button
                              onClick={() => handleClick(item.to, item.name)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-left"
                          >
                              {item.name}
                          </Button>
                      </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {!user && renderLinks(navigationNoUser)}
              {user && renderLinks(navigationLogin)}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img alt="" src={userInfo.imageUrl} className="h-10 w-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-black">{userInfo.name}</div>
                  <div className="text-sm font-medium leading-none text-white">{userInfo.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-black hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Button}
                    onClick={() => handleClick(item.to, item.name)}
                    className="block rounded-md px-3 py-2 text-base w-full text-start font-medium text-white hover:bg-gray-200 hover:text-black"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
    </div>
  )
}
