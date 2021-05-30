import React, { ReactElement, useState } from 'react'
import TextField from '../components/form-components/text-field/TextField'

import { Controller, useForm } from 'react-hook-form'
import Button from '../components/form-components/button/Button'
import { LoginIcon } from '@heroicons/react/outline'
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline'
import { useAuth } from '../context/auth/AuthContext'
import Link from 'next/link'

interface ILoginFormValues {
  emp_id: string
  password: string
}

function Login(): ReactElement {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>()
  const { login } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (data) => {
    setSubmitting(true)
    login(data)
      .then(() => setSubmitting(false))
      .catch(() => setSubmitting(false))
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <Controller
              name="emp_id"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  type="text"
                  label="Employee id"
                  placeholder="Employee id"
                  error={!!errors.emp_id}
                  helperText={
                    errors.emp_id?.type === 'required' &&
                    'Employee id is required'
                  }
                  {...field}
                />
              )}
            />
          </div>
          <div className="mb-6">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  type="password"
                  label="Password"
                  placeholder="Password"
                  error={!!errors.password}
                  helperText={
                    errors.password?.type === 'required' &&
                    'Password is required'
                  }
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex flex-col items-center">
            <Button
              variant="primary"
              type="submit"
              fullWidth
              icon={
                submitting ? (
                  <DotsCircleHorizontalIcon className="h-6 w-6 absolute" />
                ) : (
                  <LoginIcon className="h-6 w-6 absolute" />
                )
              }
              disabled={submitting}
            >
              Sign In
            </Button>
            <Link href="/register">
              <a className="inline-block align-baseline font-bold text-sm mt-5 text-blue-500 hover:text-blue-800">
                Not registered? Sign Up
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
