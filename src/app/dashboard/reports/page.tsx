'use client'

import { useEffect } from 'react'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { ArrowPathIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { TableLoader } from "@/components/TableLoader"
import { Button } from '@/components/Button'
import { toasts } from '@/lib/toasts'

// API
import {
  useReadingSessionsQuery
} from '@/store/api/readings-sessions.api'
import {
  useReportReadingMetersMutation,
} from '@/store/api/reports.api'

// Hook
import { useAuth } from '@/hooks/useAuth'

// Type
import { ReadingSessions } from '@/types/ReadingSessions'


export default function Reports() {
  const { isAuthenticated } = useAuth()

  const {
    data: readingSessions,
    refetch: refetchReadingSessions,
    isLoading,
    isFetching,
  } = useReadingSessionsQuery({});

  const [
    generateReportReadingMeters,
    generateReportReadingMetersResult,
  ] = useReportReadingMetersMutation()

  useEffect(() => {
    if (generateReportReadingMetersResult.isSuccess) {
      toasts.success(
        "Exito",
        "Documento generado y descargado."
      )
    }

    if (generateReportReadingMetersResult.isError) {
      toasts.error(
        "error",
        "No se pudo generar el documento"
      )
    }
  }, [generateReportReadingMetersResult]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Reporte</h1>
          <p className="mt-2 text-sm text-gray-700">
            Genera el reporte de lectura de medidores.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => refetchReadingSessions()}
            className="block rounded-full bg-indigo-600 px-3 py-3 hover:cursor-pointer text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowPathIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        {isLoading || isFetching ? (
          <TableLoader
            rows={10}
            columns={1}
          />
        ):(
          <>
            <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5">
              {readingSessions.map((project: ReadingSessions) => (
                <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm/6 font-semibold text-gray-900 dark:text-black">JULIO - {project.month}</p>

                      {project.endedAt == null ? (
                        <p className="mt-0.5 rounded-md bg-gray-700 px-1.5 py-0.5 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:inset-ring-gray-400/20">
                          En progreso
                        </p>
                      ) : null}
                      {project.endedAt != null ? (
                        <p className="mt-0.5 rounded-md bg-green-700 px-1.5 py-0.5 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-500/20">
                          Completado
                        </p>
                      ) : null}
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-700 dark:text-gray-400">
                      <p className="whitespace-nowrap">
                        Finalizado el <time dateTime={project.endedAt}>{project.endedAt}</time>
                      </p>
                      <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                        <circle r={1} cx={1} cy={1} />
                      </svg>
                      <p className="truncate">Creado por {project.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Button
                      onClick={() => {
                        generateReportReadingMeters({
                          sessionId: project.id
                        });
                      }}
                    >
                      Descargar
                      <DocumentArrowDownIcon className='w-5 h-5 ml-2' />
                    </Button>
                    <Menu as="div" className="relative flex-none">
                      <MenuButton className="relative block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                      </MenuButton>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                      >
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                          >
                            Edit<span className="sr-only">, {project.id}</span>
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                          >
                            Move<span className="sr-only">, {project.id}</span>
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                          >
                            Delete<span className="sr-only">, {project.id}</span>
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
