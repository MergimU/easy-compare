'use client';

import { useState } from 'react';
import { SubmitButton } from '@app/ui/submit-button'
import { PlusCircleIcon } from '@heroicons/react/16/solid'

export type ComparisonField = {
  title: string,
  leftCompare: string,
  rightCompare: string
}

export default function AddComparison() {
  const [formFields, setFormFields] = useState<ComparisonField[]>([
    {
      title: 'Test 1',
      leftCompare: '',
      rightCompare: ''
    },
    {
      title: 'Filled for test',
      leftCompare: 'vue',
      rightCompare: 'react'
    },
    {
      title: '',
      leftCompare: '',
      rightCompare: ''
    },
  ])

  const addAnotherComparisonField = () => {
    setFormFields([...formFields, {
      title: '',
      leftCompare: '',
      rightCompare: ''
    }])
  }

  const deleteComparisonField = (index: number) => {
    setFormFields(formFields.filter((_, i) => i !== index))
  }


  return (
    <div className="prose text-center mx-auto">
      <p>Please choose the titles of what you are comparing and add as many input fields as you want for comparison</p>
      <form className="gap- flex flex-col">
        <div className="card bg-base-100 shadow-2xl gap-4 p-6 flex flex-row">
          <div className="form-control flex-1">
            <label htmlFor="title1" className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title1" placeholder="i.e: ReactJS" autoComplete="username" className="input input-bordered" required />
          </div>
          <span className='font-bold'>VS</span>
          <div className="form-control flex-1">
            <label htmlFor="title2" className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title2" placeholder="i.e: VueJS" autoComplete="username" className="input input-bordered" required />
          </div>
        </div>
        <br />
        {formFields.map((comparisonField, index) => (
          <div key={index} className="card bg-base-100 shadow-2xl p-6 mb-6">
            <div className="form-control">
              <input type="text" name="title" placeholder="State managers, Learning curve, Mobile support..." value={comparisonField.title} autoComplete="username" className="input input-bordered" required />
            </div>
            <br />
            <div className="flex flex-row items-center gap-4">
              <div className="form-control flex-1">
                <textarea name="textarea1" value={comparisonField.leftCompare} placeholder="Add info here:" className='input input-bordered min-h-28 py-2 text-sm' />
              </div>
              <span className='font-bold'>/</span>
              <div className="form-control flex-1">
                <textarea name="textarea1" value={comparisonField.rightCompare} placeholder="Add info here:" className='input input-bordered min-h-28 py-2 text-sm' />
              </div>
            </div>
            <button onClick={() => deleteComparisonField(index)} className="btn btn-outline btn-error btn-x mt-8">Delete Field</button>
          </div>
        ))}

        <div onClick={addAnotherComparisonField} className="add-more card bg-base-100 shadow-2xl cursor-pointer flex items-center justify-center p-7 transition-all duration-100 hover:bg-slate-100">
          <PlusCircleIcon className='size-8 text-grey-400' />
          <p className='my-2'>Add another input field</p>
        </div>
        <SubmitButton className='btn btn-primary mt-6'>Add comparison</SubmitButton>
      </form>
    </div>
  )
}