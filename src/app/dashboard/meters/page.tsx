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
  useMetersQuery,
  useStoreMeterMutation,
  useUpdateMeterMutation,
  useToggleMeterMutation, 
} from "@/store/api/meter.api"
import {
  usePropertiesQuery,
} from '@/store/api/property.api'

// Hook
import { useAuth } from '@/hooks/useAuth'

// Types
import { Meter } from '@/types/Meter'
import { Property } from '@/types/Property'

// Schemas
import {
  meterInitialValues,
  meterValidationSchema,
} from "@/schemas/meter.schema"
import Divider from '@/components/Divider'

export default function Meters() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch: refetchMeters, isLoading } = useMetersQuery({ search: "", page: currentPage, limit: 10 })
  const [storeMeter, storeMeterResult] = useStoreMeterMutation()
  const [updateUser, updateUserResult] = useUpdateMeterMutation()
  const [toggleUser, toggleUserResult] = useToggleMeterMutation()

    const { data: properties  } = usePropertiesQuery({ search: "", page: currentPage, limit: 1000 })

  // Responses
  useEffect(() => {
    if (storeMeterResult.isSuccess) {
      toasts.success(
        "Exito",
        "Registro exitoso"
      )
      refetchMeters();
      setOpen(!open);
    }

    if (storeMeterResult.isError) {
      toasts.error(
        "error",
        "No se realizo el registro"
      )
    }
  }, [storeMeterResult]);

  const propertiesList = useMemo(() => {
    if (!properties) return [];

    return properties.data.map((subcripber: Property) => {
      return {
        value: subcripber.id,
        label: `${subcripber.cadastralRecord} - (${subcripber.address})`,
      }
    })
  }, [properties]);

  const handleEdit = (meter: Meter) => {
    console.log(meter)
    setOpen(!open);
  } 

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Medidores</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los medidores, incluyendo su número de serie, marca, modelo, diámetro y más.
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
                    Número de serie
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Marca
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Modelo
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Diámetro
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Fecha instalación
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Instalador
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                { data && data?.data.map((meter: Meter, index: number) => (
                  <tr key={index+1}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {meter.serialNumber}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell">
                      {meter.brand}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{meter.model}</td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {meter.diameter}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {meter.installationDate}
                    </td>
                    <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">
                      {meter.installer}
                    </td>
                    <td className="py-4 pr-4 pl-3 text-start font-medium sm:pr-0">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleEdit(meter)}
                        >
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
        initialValues={meterInitialValues}
        validationSchema={meterValidationSchema}
        onSubmit={(values, formikHelopers) => {
          storeMeter(values);
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
                        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-xl">Registrar medidor</h2>
                        <p className="text-sm text-gray-600">Ingrese la información para registrar un nuevo medidor.</p>
                      </div>

                      <Divider />

                      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <TextField
                            label="Número de serie"
                            name="serialNumber"
                            span='Obligatorio'
                            value={values.serialNumber}
                            onChange={handleChange}
                            required
                            error={!!errors.serialNumber}
                            textError={errors.serialNumber ?? ''}
                          />
                          <TextField
                            label="Marca"
                            name="brand"
                            value={values.brand}
                            onChange={handleChange}
                            error={!!errors.brand}
                            textError={errors.brand ?? ''}
                            span='Opcional'
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <TextField
                            label="Modelo"
                            name="model"
                            value={values.model}
                            onChange={handleChange}
                            error={!!errors.model}
                            textError={errors.model ?? ''}
                            span='Opcional'
                          />
                          <TextField
                            label="Diámetro"
                            name="diameter"
                            type="number"
                            value={values.diameter}
                            onChange={handleChange}
                            required
                            error={!!errors.diameter}
                            textError={errors.diameter ?? ''}
                            span='Obligatorio'
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <TextField
                            label="Tipo"
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                            error={!!errors.type}
                            textError={errors.type ?? ''}
                            span='Opcional'
                          />
                          <TextField
                            label="Fecha de instalación"
                            name="installationDate"
                            type="date"
                            value={values.installationDate}
                            onChange={handleChange}
                            required
                            error={!!errors.installationDate}
                            textError={errors.installationDate ?? ''}
                            span='Obligatorio'
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <TextField
                            label="Instalador"
                            name="installer"
                            value={values.installer}
                            onChange={handleChange}
                            error={!!errors.installer}
                            textError={errors.installer ?? ''}
                            span='Opcional'
                          />
                          <TextField
                            label="Proveedor"
                            name="provider"
                            value={values.provider}
                            onChange={handleChange}
                            error={!!errors.provider}
                            textError={errors.provider ?? ''}
                            span='Opcional'
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <TextField
                            label="Fecha de compra"
                            name="purchaseDate"
                            type="date"
                            value={values.purchaseDate}
                            onChange={handleChange}
                            required
                            error={!!errors.purchaseDate}
                            textError={errors.purchaseDate ?? ''}
                            span='Obligatorio'
                          />
                          <TextField
                            label="Valor"
                            name="value"
                            type="number"
                            value={values.value}
                            onChange={handleChange}
                            required
                            error={!!errors.value}
                            textError={errors.value ?? ''}
                            span='Obligatorio'
                          />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                          <Select
                            label="Predio"
                            name="propertyId"
                            value={values.propertyId}
                            onChange={(val) => setFieldValue("propertyId", val.target.value)}
                            error={!!errors.propertyId}
                            textError={errors.propertyId ?? ''}
                            options={propertiesList}
                            span='Obligatorio'
                          />
                        </div>

                        <Divider />

                        <div className="sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                          >
                            Registrar
                          </button>
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
