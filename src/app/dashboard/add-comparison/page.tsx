'use client';

import { useState } from 'react';
import { SubmitButton } from '@app/ui/submit-button';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { createComparison } from 'drizzle/queries';

import type { ComparisonField, NewComparison } from 'drizzle/dbTypes';
import { ComparisonWinner } from 'drizzle/schema';

export default function AddComparison() {
  const [comparison, setComparison] = useState<Omit<NewComparison, 'id' | 'authorId'>>({
    leftTitle: '',
    rightTitle: '',
    description: '',
    winnerIs: ComparisonWinner.enumValues[0],
  });

  const [comparisonFields, setComparisonFields] = useState<Omit<ComparisonField, 'id' | 'comparisonId'>[]>([
    {
      title: '',
      leftComparison: '',
      rightComparison: '',
      winnerField: ComparisonWinner.enumValues[0],
    }
  ]);

  const addAnotherComparisonField = () => {
    setComparisonFields(prevState => {
      return [...prevState, {
        title: '',
        leftComparison: '',
        rightComparison: '',
        winnerField: ComparisonWinner.enumValues[0],
      }]
    })
  };

  const deleteComparisonField = (index: number) => {
    setComparisonFields(comparisonFields.filter((_, i) => i !== index))
  };

  const handleComparisonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComparison({
      ...comparison, [event.target.name]: event.target.value
    })
  };

  const handleComparisonFieldChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComparisonFields((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[index] = {
        ...updatedFields[index],
        [event.target.name]: event.target.value,
      }
      return updatedFields
    })
  }

  // Fix this form
  const handleSubmit = async () => {
    try {
      return await createComparison({ comparison, comparisonFields })
    } catch (error) {
      console.log('failed to add:', error);
    }
  }

  return (
    <div className="prose text-center mx-auto">
      <p>Please choose the titles of what you are comparing and add as many input fields as you want for comparison</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="card bg-base-100 grid grid-cols-7 shadow-2xl gap-6 p-6">
          <div className="form-control gird col-span-3">
            <input onChange={(e) => handleComparisonChange(e)} type="text" id="leftTitle" name="leftTitle" placeholder="Title one" className="input input-bordered" />
          </div>
          <span className='font-bold'>VS</span>
          <div className="form-control col-span-3">
            <input onChange={(e) => handleComparisonChange(e)} type="text" id="rightTitle" name="rightTitle" placeholder="Title two" className="input input-bordered" />
          </div>
          <div className="form-control col-span-7">
            <input onChange={(e) => handleComparisonChange(e)} type="text" id="description" name="description" placeholder="Comparison Description" className="input input-bordered" />
          </div>
          <div className="form-control col-span-full">
            <div role="tablist" className="tabs tabs-boxed">
              <input onChange={(e) => handleComparisonChange(e)} checked={comparison.winnerIs === ComparisonWinner.enumValues[0]} type="radio" name="winnerIs" value={ComparisonWinner.enumValues[0]} role="tab" className="tab" aria-label="Left winner" />
              <input
                onChange={(e) => handleComparisonChange(e)}
                checked={comparison.winnerIs === ComparisonWinner.enumValues[1]}
                type="radio"
                name="winnerIs"
                value={ComparisonWinner.enumValues[1]}
                role="tab"
                className="tab rounded-lg"
                aria-label="Right winner" />
            </div>
          </div>
        </div>
        <br />
        {comparisonFields.map((comparisonField, index) => (
          <div key={index} className="card bg-base-100 shadow-2xl p-6 gap-6 mb-6">
            <div className="form-control">
              <input onChange={(e) => handleComparisonFieldChange(index, e)} type="text" name="title" placeholder="State managers, Learning curve, Mobile support..." className="input input-bordered" />
            </div>
            <br />
            <div className="flex flex-row items-center gap-4">
              <div className="form-control flex-1">
                <textarea onChange={(e) => handleComparisonFieldChange(index, e)} name="leftComparison" placeholder="Add info here:" className='input input-bordered min-h-28 py-2 text-sm' />
              </div>
              <span className='font-bold'>/</span>
              <div className="form-control flex-1">
                <textarea onChange={(e) => handleComparisonFieldChange(index, e)} name="rightComparison" placeholder="Add info here:" className='input input-bordered min-h-28 py-2 text-sm' />
              </div>
            </div>
            <div className="form-control col-span-7">
              <div role="tablist" className="tabs tabs-boxed col-span-full">
                <input onChange={(e) => handleComparisonFieldChange(index, e)} checked={comparisonField.winnerField == ComparisonWinner.enumValues[0]} type="radio" name="winnerField" value={ComparisonWinner.enumValues[0]} role="tab" className="tab" aria-label="Left field winner" />
                <input
                  onChange={(e) => handleComparisonFieldChange(index, e)}
                  checked={comparisonField.winnerField == ComparisonWinner.enumValues[1]}
                  type="radio"
                  name="winnerField"
                  value={ComparisonWinner.enumValues[1]}
                  role="tab"
                  className="tab"
                  aria-label="Right field winner" />
              </div>
            </div>

            <button onClick={() => deleteComparisonField(index)} className="btn btn-outline btn-error btn-x mt-8">Delete Field</button>
          </div>
        ))}

        <div onClick={addAnotherComparisonField} className="add-more card bg-base-100 shadow-2xl cursor-pointer flex items-center justify-center p-7 transition-all duration-100 hover:bg-slate-100">
          <PlusCircleIcon className='size-8 text-grey-400' />
          <p className='my-2'>Add another input field</p>
        </div>
        <SubmitButton pendingText='Pending...' className='btn btn-primary mt-6'>Add comparison</SubmitButton>
      </form>
    </div>
  )
}