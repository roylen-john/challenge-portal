import {
  ArrowCircleLeftIcon,
  CheckIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { Controller, FieldError, useForm } from 'react-hook-form'
import Button from '../../components/form-components/button/Button'
import TagPicker from '../../components/form-components/tag-picker/TagPicker'
import TextArea from '../../components/form-components/text-area/TextArea'
import TextField from '../../components/form-components/text-field/TextField'
import withAuth from '../../components/hoc/with-auth/WithAuth'
import { iTag } from '../../models/tag'

interface INewChallengeFormValues {
  title: string
  description: string
  tags: iTag[]
}

export const NewChallenge = (): ReactElement => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INewChallengeFormValues>()

  const [submitting, setSubmitting] = useState(false)

  const onSubmit = () => {
    setSubmitting(true)
    // console.log(data)
  }

  return (
    <div>
      <div className="px-2 sm:px-11 fixed top-16 left-0 flex flex-row items-center w-full bg-neutralBg h-16 z-10">
        <button
          className="text-white pr-2 flex items-center focus:outline-none focus:ring focus:border-primaryBold"
          onClick={() => router.back()}
        >
          <ArrowCircleLeftIcon className="h-8 w-8 mr-2" /> <span>Back</span>
        </button>
      </div>
      <div className="h-16" />
      <div className=" flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl w-full bg-white py-6 px-6 rounded-md shadow-lg"
        >
          <div className="mb-4">
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  type="text"
                  label="Title"
                  placeholder="Title"
                  error={!!errors.title}
                  helperText={
                    errors.title?.type === 'required' && 'Title is required'
                  }
                  {...field}
                />
              )}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="tags"
              control={control}
              rules={{
                validate: {
                  atleastOne: (v) => v.length > 0,
                },
              }}
              defaultValue={[]}
              render={({ field }) => (
                <TagPicker
                  label="Tags"
                  placeholder="Please select tags"
                  options={[
                    { id: 1, name: 'Test Tag 1' },
                    { id: 2, name: 'Test Tag 2' },
                    { id: 3, name: 'Test Tag 3' },
                  ]}
                  error={!!errors.tags}
                  helperText={
                    (errors?.tags as Partial<FieldError>)?.type ===
                      'atleastOne' && 'Atleast one tag is required'
                  }
                  {...field}
                />
              )}
            />
          </div>
          <div className="mb-6">
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  label="Description"
                  placeholder="Description"
                  error={!!errors.description}
                  helperText={
                    errors.description?.type === 'required' &&
                    'Description is required'
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
                  <CheckIcon className="h-6 w-6 absolute" />
                )
              }
              disabled={submitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withAuth(NewChallenge)
