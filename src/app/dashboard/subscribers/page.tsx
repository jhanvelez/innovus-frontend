'use client'

import { useState, useEffect } from 'react'
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
  useSubscribersQuery,
  useStoreSubscriberMutation,
  useUpdateSubscriberMutation,
  useToggleSubscriberMutation,
} from "@/store/api/subscriber.api"

// Hook
import { useAuth } from '@/hooks/useAuth'

// Types
import { Subscriber } from "@/types/Subscriber"
import { Formik } from 'formik'

// Schemas
import {
  subscriberInitialValues,
  subscriberValidationSchema,
} from "@/schemas/subscriber.schema"
import Divider from '@/components/Divider'

export default function Susbcribers() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch: refetchUsers, isLoading } = useSubscribersQuery({ search: "", page: currentPage, limit: 10 });
  const [storeSubscriber, storeSubscriberResult] = useStoreSubscriberMutation();
  const [updateSubscriber, updateSubscriberResult] = useUpdateSubscriberMutation();
  const [toggleSubscriber, toggleSubscriberResult] = useToggleSubscriberMutation();

  // Responses
  useEffect(() => {
    if (storeSubscriberResult.isSuccess) {
      toasts.success(
        "Exito",
        "Registro exitoso"
      )
      refetchUsers();
      setOpen(!open);
    }

    if (storeSubscriberResult.isError) {
      toasts.error(
        "error",
        "No se realizo el registro"
      )
    }
  }, [storeSubscriberResult])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Subscriptores</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los usuarios de su cuenta, incluyendo nombre del propietario, correo electrónico y Telefono.
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
                    Nombre Propietario
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Correo electrónico
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Telefono
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Categoría
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                { data && data?.data.map((user: Subscriber, index: number) => (
                  <tr key={index+1}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {user.nameOwner}
                      <p className="mt-1 truncate text-sm text-gray-500">{user.identification}</p>
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user.email}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user.phone}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user.category}
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
        initialValues={subscriberInitialValues}
        validationSchema={subscriberValidationSchema}
        onSubmit={(values, formikHelpers) => {
          storeSubscriber(values);
          formikHelpers.resetForm();
        }}
      >
        {({ handleSubmit, errors, handleChange, values, setFieldValue }) => (
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
                        Registrar suscriptor
                      </h2>
                      <p className="text-sm text-gray-600">
                        Ingrese la información para registrar un nuevo suscriptor.
                      </p>
                    </div>

                    <Divider />

                    <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <TextField
                          label="Matrícula"
                          name="identification"
                          type='number'
                          value={values.identification}
                          onChange={handleChange}
                          required
                          error={!!errors.identification}
                          textError={errors.identification ?? ''}
                          span='Obligatorio'
                        />
                        <TextField
                          label="Nombre del propietario"
                          name="nameOwner"
                          value={values.nameOwner}
                          onChange={handleChange}
                          required
                          error={!!errors.nameOwner}
                          textError={errors.nameOwner ?? ''}
                          span='Obligatorio'
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <TextField
                          label="Teléfono"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          error={!!errors.phone}
                          textError={errors.phone ?? ''}
                          span='Opcional'
                        />
                        <TextField
                          label="Correo electrónico"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          textError={errors.email ?? ''}
                          span='Opcional'
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Select
                          label="Typo"
                          name="category"
                          value={values.category}
                          onChange={(val) => setFieldValue("category", val.target.value)}
                          error={!!errors.category}
                          textError={errors.category ?? ''}
                          options={[
                            { value: 'subsidio', label: 'Subsidio' },
                            { value: 'contribucion', label: 'Contribución' },
                          ]}
                          span='Obligatorio'
                        />
                      </div>

                      <Divider />

                      <div className="sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        >
                          Registrar
                        </button>
                        <button
                          type="button"
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
        )}
      </Formik>
    </div>
  )
}
