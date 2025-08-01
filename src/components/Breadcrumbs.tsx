'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { breadcrumbTitles } from '@/utils/breadcrumbTitles'

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    return {
      name: breadcrumbTitles[segment] || segment,
      href,
      current: index === segments.length - 1,
    }
  })

  return (
    <div className="px-8 mt-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="size-5 shrink-0" aria-hidden="true" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </li>

          {crumbs.map((crumb) => (
            <li key={crumb.href}>
              <div className="flex items-center">
                <ChevronRightIcon className="size-5 shrink-0 text-gray-400" aria-hidden="true" />
                <Link
                  href={crumb.href}
                  className={`ml-4 text-sm font-medium ${
                    crumb.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-current={crumb.current ? 'page' : undefined}
                >
                  {crumb.name}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
