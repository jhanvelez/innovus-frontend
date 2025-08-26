'use client'

import { useState, useMemo, useEffect } from 'react'

import Divider from '@/components/Divider'
import { Button } from '@/components/Button'
import { Pagination } from "@/components/Pagination"
import { TableLoader } from "@/components/TableLoader"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

import {
  ArrowPathIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline'

// API
import {
  BASE_URL
} from '@/store/api/app.api'
import {
  useReadingsQuery
} from '@/store/api/readings.api'

// Hook
import { useAuth } from '@/hooks/useAuth'

// Types
import { ReadingResponse } from "@/types/Reading"


export default function Readings() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [urlImage, setUrlImage] = useState('')

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    refetch: refetchReadings,
    isLoading,
    isFetching,
  } = useReadingsQuery({ search: "", page: currentPage, limit: 10 });

  const causales = useMemo(() => {
    return [
      { id: "1", name: "Medidor dañado" },
      { id: "2", name: "Cliente ausente" },
      { id: "3", name: "Acceso bloqueado" },
      { id: "4", name: "Perro agresivo en el predio" },
      { id: "5", name: "Dirección incorrecta" },
      { id: "6", name: "Propiedad desocupada" },
      { id: "7", name: "Llave de acceso no entregada" },
      { id: "8", name: "Medidor sumergido en agua" },
      { id: "9", name: "Lectura ilegible" },
      { id: "10", name: "Medidor cubierto por objetos" },
      { id: "11", name: "Usuario negó el acceso" },
      { id: "12", name: "Medidor con vidrio roto" },
      { id: "13", name: "Medidor sin tapa de protección" },
      { id: "14", name: "Instalación peligrosa" },
      { id: "15", name: "Medidor vandalizado" },
      { id: "16", name: "Obra en construcción" },
      { id: "17", name: "Predio cerrado con candado" },
      { id: "18", name: "Medidor enterrado" },
      { id: "19", name: "Condiciones climáticas adversas" },
      { id: "20", name: "Medidor inexistente" },
      { id: "21", name: "Medidor reemplazado sin informar" },
      { id: "22", name: "Número de medidor no corresponde" },
      { id: "23", name: "Medidor manipulado" },
      { id: "24", name: "Riesgo eléctrico en la zona" },
      { id: "25", name: "Cliente impidió la toma de lectura" },
      { id: "26", name: "Medidor congelado" },
      { id: "27", name: "Alarma activa en el predio" },
      { id: "28", name: "Medidor sin sello de seguridad" },
      { id: "29", name: "Zona insegura" },
      { id: "30", name: "Obstáculo natural (árbol, ramas, etc.)" },
    ];
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Lecturas</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todas las lecturas, incluyendo inquilino (usuario), lectura, foto y tipo (evidencia, causal).
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => refetchReadings()}
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
            columns={5}
          />
        ):(
          <>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Inquilino (usuario)
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Lectura anterior
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Lectura
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Evidencia
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                { data && data?.data.map((user: ReadingResponse, index: number) => (
                  <tr key={index+1}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {user.meter.property.tenant.fullName.toUpperCase()}
                      <p className="mt-1 truncate text-sm text-gray-500">{user.meter.property.address.toUpperCase()}</p>
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user.type.toUpperCase()}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user?.evidence?.value}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user?.evidence?.value}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user?.evidence?.photo ? (
                        <Button
                          onClick={() => {
                            setOpen(!open);
                            setUrlImage(BASE_URL+user?.evidence?.photo?.replace("/uploads/", ""))
                          }}
                        >
                          <ViewfinderCircleIcon className="w-5 h-5" />
                        </Button>
                      ) : (
                        causales.filter(causal => causal.id == String(user?.causal?.causalId))[0].name
                      )}
                    </td>                   
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              totalItems={data?.total ?? 0}
              itemsPerPage={10}
              currentPage={data?.currentPage ?? 0}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
              }}
            />
          </>
        )}
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
            >
              <div>
                <div className="max-w-2xl text-start mb-3">
                  <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-xl">
                    Ver imagen
                  </h2>
                </div>

                <Divider />

                <div className="mt-10 grid grid-cols-1 gap-y-8">

                  <div className="h-full border border-gray-300 shadow-md rounded-lg flex justify-center text-center">
                    <img className="object-cover w-full rounded-lg" src={urlImage} />
                  </div>                 

                  <Divider />

                  <div className="sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
