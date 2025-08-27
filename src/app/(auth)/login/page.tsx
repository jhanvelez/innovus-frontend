"use client";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Formik } from "formik"
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'

import {
  authInitialValues,
  authValidationSchema,
} from "@/schemas/auth.schema"

import {
  useLoginMutation
} from "@/store/api/auth.api"

import { toasts } from '@/lib/toasts'

import { setCredentials } from '@/store/slices/authSlice'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, respoonseLogin] = useLoginMutation({})

  useEffect(() => {
    if (respoonseLogin.isSuccess) {
      toasts.success(
        "Exito",
        "Bienvenido a la aplicacion"
      )

      localStorage.setItem("token", respoonseLogin.data.token)
      dispatch(setCredentials({
        user: respoonseLogin.data.user,
        token: respoonseLogin.data.token,
      }))
      router.push('/dashboard')
    }

    if (respoonseLogin.isError) {
      toasts.error(
        "error",
        "Usuario o contraseña incorrectos"
      )
    }
  }, [respoonseLogin])

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Inicie sesión en su cuenta
      </h2>

      <Formik
        enableReinitialize
        initialValues={authInitialValues}
        validationSchema={authValidationSchema}
        onSubmit={(values, formikHelopers) => {
          login(values);
          formikHelopers.resetForm();
        }}
      >
        {({ handleSubmit, errors, handleChange, values }) => {
          return (
            <form onSubmit={handleSubmit} action="#" className="mt-10 grid grid-cols-1 gap-y-8">
              <TextField
                label="Correo electrónico"
                name="email"
                type="email"
                span='Obligatorio'
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                required
                error={!!errors.email}
                textError={errors.email ?? ''}
                placeholder='admin@example.com'
              />
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                span='Obligatorio'
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                required
                error={!!errors.password}
                textError={errors.password ?? ''}
                placeholder='**********'
              />
              <div>
                <Button type="submit" variant="solid" color="blue" className="w-full">
                  <span>
                    Iniciar sesión <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </SlimLayout>
  )
}
