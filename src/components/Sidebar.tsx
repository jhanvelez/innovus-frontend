'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  HomeIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  UserGroupIcon,
  UserIcon,
  HomeModernIcon,
  AdjustmentsHorizontalIcon,
  MapIcon,
  CurrencyDollarIcon,
  Bars3BottomLeftIcon,
  ReceiptPercentIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  IdentificationIcon,
  WrenchScrewdriverIcon,
  ChartBarSquareIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

interface PropsSidebar {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
}

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: PropsSidebar) {
  const pathname = usePathname();

  const navigation = useMemo(() => {
    return [
      {
        section: "General",
        items: [
          { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
        ],
      },
      {
        section: "Operación",
        items: [
          { name: "Lecturas", href: "/dashboard/readings", icon: CalendarDaysIcon, current: false },
          { name: "Facturación", href: "/dashboard/billing", icon: BanknotesIcon, current: false },
          { name: "Suscriptores", href: "/dashboard/subscribers", icon: UserGroupIcon, current: false },
          { name: "Inquilinos (usuarios)", href: "/dashboard/tenants", icon: UserIcon, current: false },
          { name: "Predios", href: "/dashboard/properties", icon: HomeModernIcon, current: false },
          { name: "Medidores", href: "/dashboard/meters", icon: AdjustmentsHorizontalIcon, current: false },
          { name: "Rutas de Lectura", href: "/dashboard/routes", icon: MapIcon, current: false },
        ],
      },
      {
        section: "Configuración de facturación",
        items: [
          { name: "Tarifas", href: "/dashboard/rates", icon: CurrencyDollarIcon, current: false },
          { name: "Rangos de Consumo", href: "/dashboard/consumption-ranges", icon: Bars3BottomLeftIcon, current: false },
          { name: "Subsidios", href: "/dashboard/subsidies", icon: ReceiptPercentIcon, current: false },
          { name: "Conceptos de Factura", href: "/dashboard/concepts", icon: ClipboardDocumentListIcon, current: false },
        ],
      },
      {
        section: "Administración",
        items: [
          { name: "Usuarios Internos", href: "/dashboard/users", icon: UsersIcon, current: false },
          { name: "Empleados", href: "/dashboard/employees", icon: IdentificationIcon, current: false },
          { name: "Servicios", href: "/dashboard/services", icon: WrenchScrewdriverIcon, current: false },
        ],
      },
      {
        section: "Reportes",
        items: [
          { name: "Reportes", href: "/dashboard/reports", icon: ChartBarSquareIcon, current: false },
        ],
      },
    ];
  }, []);

  return (
    <>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  {navigation.map((group) => (
                    <li className='mb-0.5' key={group.section}>
                      <div className="text-xs/6 font-semibold text-gray-400">{group.section}</div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {group.items.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <li key={item.name}>
                              <Link href={item.href} className={classNames(
                                isActive
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                              )}>
                                <item.icon
                                  className={classNames(
                                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'size-6 shrink-0'
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {navigation.map((group) => (
                <li className='mb-0.5' key={group.section}>
                  <div className="text-xs/6 font-semibold text-gray-400">{group.section}</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link href={item.href} className={classNames(
                            isActive
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                          )}>
                            <item.icon
                              className={classNames(
                                isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                'size-6 shrink-0'
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                  />
                  Configuración
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}