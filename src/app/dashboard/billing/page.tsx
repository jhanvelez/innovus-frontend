'use client'

import { use, useEffect, useState, useMemo } from 'react'
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline'

import { TableLoader } from "@/components/TableLoader"
import { Pagination } from "@/components/Pagination"
import { Select } from "@/components/Select"

// API hooks (ajusta a tu store/api)
import {
  useBillingsQuery,
  useGenerateBillingByCicleMutation,
} from "@/store/api/billing.api";
import {
  useCyclesQuery,
} from "@/store/api/cycles-routes.api";
import {
  useReadingSessionsQuery,
} from "@/store/api/readings-sessions.api";

// Types
import { Cycle } from "@/types/Cycle"
import { Billing } from "@/types/Billing"
import { ReadingSessions } from "@/types/ReadingSessions"

export default function BillingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cycleId, setCycleId] = useState('');
  const [periodId, setPeriodId] = useState('');

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const shouldFetch = cycleId !== '' && month !== '' && year !== ''

  const { data, isLoading } = useBillingsQuery(
    { cycleId, month, year },
    { skip: !shouldFetch }
  )
  
  const [generateBilling, generateBillingResult] = useGenerateBillingByCicleMutation();

  useEffect(() => {
    if (data) {
      console.log("Datos de facturación:", data);
    }
  }, [data])


  const {
    data: cycles,
    isLoading: isLoadingCycles
  } = useCyclesQuery({ search: "", page: currentPage, limit: 10 });

  const cyclesList = useMemo(() => {
    if (!cycles) return [];

    return cycles.data.map((cycle: Cycle) => {
      return {
        value: cycle.id,
        label: `${cycle.name}`,
      }
    })
  }, [cycles]);


  const {
    data: readingSessions,
    isLoading: isLoadingSessions
  } = useReadingSessionsQuery({ search: "", page: currentPage, limit: 10 });

  const readingSessionsList = useMemo(() => {
    if (!readingSessions) return [];

    return readingSessions.data.map((cycle: ReadingSessions) => {
      return {
        value: cycle.id,
        label: `${cycle.year}-${cycle.month}`,
      }
    })
  }, [readingSessions]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-900">Facturación</h2>
          <p className="mt-2 text-sm text-gray-700">
            Panel de control para la facturación mensual, incluyendo cargos fijos, consumos, subsidios y convenios.
          </p>
        </div>=
      </div>

      <div className="mt-10 grid grid-cols-1 gap-y-8">
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <Select
            label="Cyclo (Ruta)"
            name="cycle"
            value={cycleId}
            onChange={(val) => setCycleId(val.target.value)}
            options={cyclesList}
            span='Obligatrio'
          />
          <Select
            label="Periodo (Mes y Año)"
            name="period"
            value={periodId}
            onChange={(val) => {
              setPeriodId(val.target.value);
              
              const data = readingSessions.data.filter((item: ReadingSessions) => item.id === val.target.value);
              if (data.length === 0) return;

              const { month, year } = data[0];
              setMonth(month);
              setYear(year);
            }}

            options={readingSessionsList}
            span='Obligatrio'
          />

          <div className="bottom-4 mx-auto mt-auto">
            <button
              type="button"
              onClick={() => generateBilling({ cycleId, month, year })}
              disabled={!shouldFetch || generateBillingResult.isLoading}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-5 h-5" />
              Generar facturación
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="-mx-4 mt-8 sm:-mx-0">
        {isLoading ? (
          <TableLoader rows={10} columns={6} />
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Factura #</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Consumo m³</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                  <th className="px-3 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data && data.map((bill: Billing, index: number) => (
                  <tr key={index}>
                    <td className="px-3 py-4 text-sm font-medium">{bill.id}</td>
                    <td className="px-3 py-4 text-sm">{bill.property.subscriber.nameOwner}</td>
                    <td className="px-3 py-4 text-sm">10 m³</td>
                    <td className="px-3 py-4 text-sm font-semibold">${bill.amount}</td>
                    <td className="px-3 py-4 text-sm text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginación */}
            <Pagination
              totalItems={data?.total ?? 0}
              itemsPerPage={10}
              currentPage={data?.currentPage ?? 0}
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          </>
        )}
      </div>
    </div>
  )
}
