import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import RulesModal from '../components/modals/RulesModal';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '/' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Nav() {
  const pathname = useLocation().pathname;
  const navigation = [{ name: 'Home', href: '/home', current: false }];
  const auth = localStorage.getItem('user_data');
  const userData = JSON.parse(auth);

  let currentPage = navigation.find((obj) => obj['href'] === pathname);
  if (currentPage) currentPage.current = true;

  function getUserInitials() {
    if (!auth) return '?';

    const userInitials = '?';
      /*userData.firstName.substring(0, 1).toUpperCase() +
      userData.lastName.substring(0, 1).toUpperCase();*/

    return userInitials;
  }

  return (
    <>
      <Disclosure as='nav' className='bg-pr-black'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <Link to={auth ? '/home' : '/'}>
                      <img
                        className='h-12 w-17 text-pr-white'
                        src={require('../images/AppLogo.png')}
                        alt='Your Company'
                      />
                    </Link>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-10 flex items-baseline space-x-4'>
                      <RulesModal
                        classes={
                          'text-pr-yellow hover:bg-pr-gray hover:text-pr-white focus:bg-pr-black focus:text-pr-white px-3 py-2 rounded-md text-sm font-medium'
                        }
                      />
                      {auth
                        ? navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={auth ? item.href : '/'}
                              className={classNames(
                                item.current
                                  ? 'bg-pr-black text-pr-white'
                                  : 'text-pr-yellow hover:bg-pr-gray hover:text-pr-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ))
                        : undefined}
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center md:ml-6'>
                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='sr-only'>Open user menu</span>
                          <div className='flex-none flex justify-center items-center bg-pr-yellow text-pr-white text-xl font-bold h-10 w-10 rounded-full'>
                            <span>{auth ? getUserInitials() : '?'}</span>
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {auth ? (
                            userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.href}
                                    onClick={
                                      item.name === 'Sign out'
                                        ? () => {
                                            localStorage.clear();
                                          }
                                        : undefined
                                    }
                                    className={classNames(
                                      active ? 'bg-pr-yellow rounded-md' : '',
                                      'block px-4 py-2 text-sm text-pr-black'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))
                          ) : (
                            <Menu.Item>
                              <Link
                                to='/'
                                className='bg-gray-100 block px-4 py-2 text-sm text-pr-black hover:bg-pr-yellow rounded-md'
                              >
                                Sign in
                              </Link>
                            </Menu.Item>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='-mr-2 flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='md:hidden'>
              <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
                {auth
                  ? navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={auth ? item.href : '/'}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))
                  : undefined}
              </div>
              <div className='border-t border-gray-700 pt-4 pb-3'>
                <div className='flex items-center px-5'>
                  <div className='flex-none flex justify-center items-center bg-pr-yellow text-pr-white text-xl font-bold h-9 w-9 rounded-full'>
                    <span>{auth ? getUserInitials() : '?'}</span>
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium leading-none text-white'>
                      {auth ? userData.firstName + ' ' + userData.lastName : ''}
                    </div>
                    {/* <div className='text-sm font-medium leading-none text-gray-400'>
                      {user.email}
                    </div> */}
                  </div>
                </div>
                <div className='mt-3 space-y-1 px-2'>
                  <RulesModal
                    classes={
                      'block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                    }
                  />
                  {auth ? (
                    userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.href}
                        onClick={
                          item.name === 'Sign out'
                            ? () => {
                                localStorage.clear();
                              }
                            : undefined
                        }
                        className='block rounded-md max-w-fit px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))
                  ) : (
                    <Disclosure.Button
                      as={Link}
                      to='/'
                      className='block rounded-md max-w-fit px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                    >
                      Sign in
                    </Disclosure.Button>
                  )}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Nav;
