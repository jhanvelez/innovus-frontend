'use client'

import { useState, useEffect, useMemo, use } from 'react'
import { Formik } from 'formik'
import {
  PlusIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { toasts } from '@/lib/toasts'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

import {
  TextField,
  ToggleField,
} from '@/components/Fields'
import { Pagination } from "@/components/Pagination"
import { TableLoader } from "@/components/TableLoader"
import { Select } from "@/components/Select"

// API
import {
  useConsumptionRangeQuery,
  useConsumptionRangesQuery,
  useStoreConsumptionRangeMutation,
  useUpdateConsumptionRangeMutation,
  useToggleConsumptionRangeMutation,
} from "@/store/api/consumption-range.api"
import {
  useStrataQuery,
} from '@/store/api/stratum.api'

// Hook
import { useAuth } from '@/hooks/useAuth'

// Types
import { ConsumptionRange } from "@/types/ConsumptionRange"
import { Stratum } from "@/types/Stratum"

// Schemas
import {
  subsidyContributionInitialValues,
  subsidyContributionValidationSchema,
} from "@/schemas/subsidy-contribution.schema"
import Divider from '@/components/Divider'

export default function SubsidyContributionPage() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch, isLoading } = useConsumptionRangesQuery({ search: "", page: currentPage, limit: 10 });
  const [storeTariff, storeTariffResult] = useStoreConsumptionRangeMutation();
  const [updateTariff, updateTariffResult] = useUpdateConsumptionRangeMutation();
  const [toggleTariff, toggleTariffResult] = useToggleConsumptionRangeMutation();

  const { data: strata  } = useStrataQuery({ search: "", page: currentPage, limit: 1000 });

  const strataList = useMemo(() => {
    if (!strata) return [];

    return strata.data.map((stratum: Stratum) => {
      return {
        value: stratum.id,
        label: `${stratum.name}`,
      }
    })
  }, [strata]);

  // Responses
  useEffect(() => {
    if (storeTariffResult.isSuccess) {
      toasts.success("Éxito", "Tarifa registrada correctamente")
      refetch();
      setOpen(false);
    }
    if (storeTariffResult.isError) {
      if ((storeTariffResult.error as any)?.status === 409) {
        toasts.error(
          "error",
          (storeTariffResult.error as any)?.data?.message
        )
        return;
      }else {
        toasts.error("Error", "No se pudo registrar la tarifa")
      }
    }
  }, [storeTariffResult]);

  useEffect(() => {
    if (toggleTariffResult.isSuccess) {
      toasts.success("Éxito", "Estado de la tarifa actualizado exitosamente.")
      refetch();
      setOpen(false);
    }
    if (toggleTariffResult.isError) {
      toasts.error("Error", "No se pudo actualizar el estado de la tarifa")
    }
  }, [toggleTariffResult])

  

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Rangos de consumo</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los rangos de consumo, incluyendo su tipo y valor.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="block rounded-full bg-indigo-600 px-3 py-3 hover:cursor-pointer text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">

        {isLoading ? (
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
                    Estrato
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Tipo
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Valor
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                { data && data?.data.map((user: ConsumptionRange, index: number) => (
                  <tr key={index+1}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {user.stratum.name}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user.type}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user.rate}
                    </td>
                    <td className="py-4 pr-4 pl-3 text-start font-medium sm:pr-0">
                      <div className="flex items-center gap-2">
                        <button className="text-green-600 hover:text-green-900">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <ToggleField
                          label='Eliminar'
                          checked={user.active}
                          onChange={(e) => {
                            toggleTariff({
                              id: user.id,
                              state: user.active,
                            });
                          }}
                        />
                      </div>
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
      
      <Formik
        enableReinitialize
        initialValues={subsidyContributionInitialValues}
        validationSchema={subsidyContributionValidationSchema}
        onSubmit={(values, helpers) => {
          storeTariff(values)
          helpers.resetForm()
        }}
      >
        {({ handleSubmit, errors, handleChange, values, setFieldValue }) => (
          <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
                  <h2 className="text-xl font-semibold">Registrar Subsidio o Contribución</h2>
                  <Divider />
                  <form onSubmit={handleSubmit} action="#" className="mt-6 grid grid-cols-1 gap-y-8">
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <Select
                        label="Estrato"
                        name="stratumId"
                        value={values.stratumId}
                        onChange={(val) => setFieldValue("stratumId", val.target.value)}
                        error={!!errors.stratumId}
                        textError={errors.stratumId ?? ''}
                        options={strataList}
                        span='Obligatrio'
                      />
                      <Select
                        label="Tipo"
                        name="type"
                        value={values.type}
                        onChange={(val) => setFieldValue("type", val.target.value)}
                        error={!!errors.type}
                        textError={errors.type ?? ''}
                        options={[
                          { value: 'subsidio', label: 'Subsidio' },
                          { value: 'contribucion', label: 'Contribución' },
                        ]}
                        span='Obligatrio'
                      />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <TextField
                        label="Valor"
                        name="value"
                        type="number"
                        value={values.value}
                        onChange={handleChange}
                        error={!!errors.value}
                        textError={errors.value ?? ''}
                      />
                    </div>
                  </form>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="submit"
                      onClick={() => {
                        handleSubmit()
                      }}
                      className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 hover:cursor-pointer"
                    >
                      Registrar
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </Formik>
    </div>
  )
}
