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
  useUsersQuery,
  useStoreUserMutation,
  useUpdateUserMutation,
  useToggleUserMutation,
} from "@/store/api/user.api"

// Hook
import { useAuth } from '@/hooks/useAuth'

// Types
import { User } from "@/types/User"
import { Formik } from 'formik'

// Schemas
import {
  userInitialValues,
  userValidationSchema,
} from "@/schemas/user.schema"
import Divider from '@/components/Divider'

export default function Users() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch: refetchUsers, isLoading } = useUsersQuery({ search: "", page: currentPage, limit: 10 });
  const [storeUser, storeUserResult] = useStoreUserMutation();
  const [updateUser, updateUserResult] = useUpdateUserMutation();
  const [toggleUser, toggleUserResult] = useToggleUserMutation();

  // Responses
  useEffect(() => {
    if (storeUserResult.isSuccess) {
      toasts.success(
        "Exito",
        "Registro exitoso"
      )
      refetchUsers();
      setOpen(!open);
    }

    if (storeUserResult.isError) {
      toasts.error(
        "error",
        "No se realizo el registro"
      )
    }
  }, [storeUserResult])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Usuarios</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los usuarios de su cuenta, incluyendo su nombre, cargo, correo electrónico y función.
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
                    Nombre completo
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Correo electrónico
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Nº documento
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Dirección
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                { data && data?.data.map((user: User, index: number) => (
                  <tr key={index+1}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {user.firstName}{" "}
                      {user.lastName}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {user.email}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.documentId}</td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {user.address}
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
      initialValues={userInitialValues}
      validationSchema={userValidationSchema}
      onSubmit={(values, formikHelopers) => {
        storeUser(values);
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
                      <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">Crear usuario</h2>
                      <p className="text-sm text-gray-600">Ingrese la información para crear un nuevo usuario.</p>
                    </div>

                    <Divider />

                    <form onSubmit={handleSubmit} action="#" className="mt-10 grid grid-cols-1 gap-y-8">
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <TextField
                          label="Nombre(s)"
                          name="firstName"
                          type="text"
                          span='Obligatrio'
                          autoComplete="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          required
                          error={!!errors.firstName}
                          textError={errors.firstName ?? ''}
                        />
                        <TextField
                          label="Apellidos"
                          name="lastName"
                          type="text"
                          span='Obligatrio'
                          autoComplete="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          required
                          error={!!errors.lastName}
                          textError={errors.lastName ?? ''}
                        />
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <Select
                          label="Tipo de documento"
                          name="documentType"
                          value={values.documentType}
                          onChange={(val) => setFieldValue("documentType", val.target.value)}
                          error={!!errors.documentType}
                          textError={errors.documentType ?? ''}
                          options={[
                            {value: 1, label: "CC"},
                            {value: 2, label: "NIT"},
                            {value: 3, label: "TI"}
                          ]}
                          span='Obligatrio'
                        />
                        <TextField
                          label="N de doocumento"
                          name="documentId"
                          type="text"
                          span='Obligatrio'
                          autoComplete="documentId"
                          value={values.documentId}
                          onChange={handleChange}
                          required
                          error={!!errors.documentId}
                          textError={errors.documentId ?? ''}
                        />
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
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
                        <TextField
                          label="Número telefonico"
                          name="phoneNumber"
                          type="text"
                          span='Obligatrio'
                          autoComplete="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          required
                          error={!!errors.phoneNumber}
                          textError={errors.phoneNumber ?? ''}
                        />
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <TextField
                          label="Correo electrónico"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                          error={!!errors.email}
                          textError={errors.email ?? ''}
                        />
                        <TextField
                          label="Contraseña"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          value={values.password}
                          onChange={handleChange}
                          required
                          error={!!errors.password}
                          textError={errors.password ?? ''}
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
