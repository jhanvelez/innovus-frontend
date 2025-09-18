'use client'

import { useState, useEffect, useMemo } from 'react'
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
  usePropertiesQuery,
  useStorePropertyMutation,
  useUpdatePropertyMutation,
  useToggleProopertyMutation,
} from "@/store/api/property.api"
import {
  useSubscribersQuery,
} from '@/store/api/subscriber.api'
import {
  useTenantsQuery,
} from '@/store/api/tanant.api'

// Hook
import { useAuth } from '@/hooks/useAuth'

// Types
import { Property } from "@/types/Property"
import { Subscriber } from "@/types/Subscriber"
import { Tenant } from "@/types/Tenant"

// Schemas
import {
  propertyInitialValues,
  propertyValidationSchema,
} from "@/schemas/property.schema"
import Divider from '@/components/Divider'

export default function Rates() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch: refetchUsers, isLoading } = usePropertiesQuery({ search: "", page: currentPage, limit: 10 });
  const [storePropety, storePropetyResult] = useStorePropertyMutation();
  const [updateUser, updateUserResult] = useUpdatePropertyMutation();
  const [toggleUser, toggleUserResult] = useToggleProopertyMutation();

  const { data: subcripbers  } = useSubscribersQuery({ search: "", page: currentPage, limit: 1000 });
  const { data: tenants  } = useTenantsQuery({ search: "", page: currentPage, limit: 1000 });

  const subcripbersList = useMemo(() => {
    if (!subcripbers) return [];

    return subcripbers.data.map((subcripber: Subscriber) => {
      return {
        value: subcripber.id,
        label: `${subcripber.nameOwner} - (${subcripber.identification})`,
      }
    })
  }, [subcripbers]);

  const tenantsList = useMemo(() => {
    if (!tenants) return [];

    return tenants.data.map((subcripber: Tenant) => {
      return {
        value: subcripber.id,
        label: `${subcripber.fullName} - (${subcripber.identification})`,
      }
    })
  }, [tenants]);

  // Responses
  useEffect(() => {
    if (storePropetyResult.isSuccess) {
      toasts.success(
        "Exito",
        "Registro exitoso"
      )
      refetchUsers();
      setOpen(!open);
    }

    if (storePropetyResult.isError) {
      toasts.error(
        "error",
        "No se realizo el registro"
      )
    }
  }, [storePropetyResult])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Financiación</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todas las financiación, incluyendo su ficha catastral y dirección.
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
                    Fichas catastral
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Dirección
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ciclo
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ruta
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Subscriptor
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Inquilino (Usuario)
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                { data && data?.data.map((user: Property, index: number) => (
                  <tr key={index+1}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {user.cadastralRecord}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user.address}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user.cycle}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user.route}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user?.subscriber?.nameOwner}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user?.tenant?.fullName}
                    </td>
                    <td className="py-4 pr-4 pl-3 text-start font-medium sm:pr-0">
                      <div className="flex items-center gap-2">
                        <button className="text-green-600 hover:text-green-900">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <ToggleField
                          label='Eliminar'
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
      initialValues={propertyInitialValues}
      validationSchema={propertyValidationSchema}
      onSubmit={(values, formikHelopers) => {
        storePropety(values);
        formikHelopers.resetForm();
      }}
    >
      {({ handleSubmit, errors, handleChange, values, setFieldValue }) => {
        return (
          <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all 
                  data-closed:translate-y-4 data-closed:opacity-0 
                  data-enter:duration-300 data-enter:ease-out 
                  data-leave:duration-200 data-leave:ease-in 
                  sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 
                  data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                  <div>
                    <div className="max-w-2xl text-start mb-3">
                      <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">Registrar financiacion</h2>
                      <p className="text-sm text-gray-600">Ingrese la información para registrar un nuevo predio.</p>
                    </div>

                    <Divider />

                    <form onSubmit={handleSubmit} action="#" className="mt-10 grid grid-cols-1 gap-y-8">
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <TextField
                          label="Ficha catastral"
                          name="cadastralRecord"
                          type="text"
                          span='Obligatrio'
                          autoComplete="cadastralRecord"
                          value={values.cadastralRecord}
                          onChange={handleChange}
                          required
                          error={!!errors.cadastralRecord}
                          textError={errors.cadastralRecord ?? ''}
                        />
                        <TextField
                          label="Dirección"
                          name="address"
                          type="text"
                          span='Obligatrio'
                          autoComplete="address"
                          value={values.address}
                          onChange={handleChange}
                          required
                          error={!!errors.address}
                          textError={errors.address ?? ''}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <TextField
                          label="Ciclo"
                          name="cycle"
                          value={values.cycle}
                          onChange={handleChange}
                          required
                          error={!!errors.cycle}
                          textError={errors.cycle ?? ''}
                          span='Obligatrio'
                        />
                        <TextField
                          label="Ruta"
                          name="route"
                          value={values.route}
                          onChange={handleChange}
                          required
                          error={!!errors.route}
                          textError={errors.route ?? ''}
                          span='Obligatrio'
                        />
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <Select
                          label="Subscriptor"
                          name="subscriberId"
                          value={values.subscriberId}
                          onChange={(val) => setFieldValue("subscriberId", val.target.value)}
                          error={!!errors.subscriberId}
                          textError={errors.subscriberId ?? ''}
                          options={subcripbersList}
                          span='Obligatrio'
                        />
                        <Select
                          label="Inquilino (Usiuario)"
                          name="tenantId"
                          value={values.tenantId}
                          onChange={(val) => setFieldValue("tenantId", val.target.value)}
                          error={!!errors.tenantId}
                          textError={errors.tenantId ?? ''}
                          options={tenantsList}
                          span='Obligatrio'
                        />
                      </div>

                      <Divider />

                      <div className="sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          onClick={() => {
                            console.log(errors)
                            handleSubmit();
                          }}
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        >
                          Registrar
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }}
    </Formik>
    </div>
  )
}
