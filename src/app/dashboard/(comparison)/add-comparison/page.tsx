'use client';

import { useState } from 'react';
import { SubmitButton } from '@app/ui/submit-button';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { createComparison } from 'drizzle/queries';

import type { ComparisonField, NewComparison } from 'drizzle/dbTypes';
import { ComparisonWinner } from 'drizzle/schema';

export default function AddComparison() {
  // State default
  const initState = {
    comparison: {
      leftTitle: '',
      rightTitle: '',
      description: '',
      winnerIs: ComparisonWinner.enumValues[0],
    },
    comparisonField: {
      title: '',
      leftComparison: '',
      rightComparison: '',
      winnerField: ComparisonWinner.enumValues[0],
    },
  };

  // State
  const [comparison, setComparison] = useState<Omit<NewComparison, 'id' | 'authorId'>>({
    ...initState.comparison,
  });
  const [comparisonFields, setComparisonFields] = useState<Omit<ComparisonField, 'id' | 'comparisonId'>[]>([
    { ...initState.comparisonField },
  ]);

  // Add more comparison fields
  const addAnotherComparisonField = () => {
    setComparisonFields((prevState) => {
      return [...prevState, { ...initState.comparisonField }];
    });
  };

  // Delete comparison field with (index)
  const deleteComparisonField = (index: number) => {
    setComparisonFields(comparisonFields.filter((_, i) => i !== index));
  };

  // Handle comparison inputs
  const handleComparisonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComparison({
      ...comparison,
      [event.target.name]: event.target.value,
    });
  };

  // Handle comparison filed inputs
  const handleComparisonFieldChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setComparisonFields((prevState) => {
      const updatedFields = [...prevState];
      updatedFields[index] = {
        ...updatedFields[index],
        [event.target.name]: event.target.value,
      };
      return updatedFields;
    });
  };

  // Clear input fields
  const clearInputs = () => {
    setComparison(initState.comparison);
    setComparisonFields([initState.comparisonField]);
  };

  // Handle submit form
  const handleSubmit = async () => {
    try {
      return await createComparison({ comparison, comparisonFields }).then(() => clearInputs());
    } catch (error) {
      console.log('failed to add:', error);
    }
  };

  return (
    <div className="prose mx-auto text-center">
      <p>
        Please choose the titles of what you are comparing and add as many input fields as you want for
        comparison
      </p>
      <button onClick={clearInputs}>Click</button>
      <form className="flex flex-col">
        <div className="card grid grid-cols-7 gap-6 bg-base-100 p-6 shadow-2xl">
          <div className="gird form-control col-span-3">
            <input
              onChange={(e) => handleComparisonChange(e)}
              value={comparison.leftTitle}
              type="text"
              id="leftTitle"
              name="leftTitle"
              placeholder="Title one"
              className="input input-bordered"
            />
          </div>
          <span className="font-bold">VS</span>
          <div className="form-control col-span-3">
            <input
              onChange={(e) => handleComparisonChange(e)}
              value={comparison.rightTitle}
              type="text"
              id="rightTitle"
              name="rightTitle"
              placeholder="Title two"
              className="input input-bordered"
            />
          </div>
          <div className="form-control col-span-7">
            <input
              onChange={(e) => handleComparisonChange(e)}
              value={comparison.description || ''}
              type="text"
              id="description"
              name="description"
              placeholder="Comparison Description"
              className="input input-bordered"
            />
          </div>
          <div className="form-control col-span-full">
            <div role="tablist" className="tabs-boxed tabs">
              <input
                onChange={(e) => handleComparisonChange(e)}
                checked={comparison.winnerIs === ComparisonWinner.enumValues[0]}
                type="radio"
                name="winnerIs"
                value={ComparisonWinner.enumValues[0]}
                role="tab"
                className="tab"
                aria-label="Left winner"
              />
              <input
                onChange={(e) => handleComparisonChange(e)}
                checked={comparison.winnerIs === ComparisonWinner.enumValues[1]}
                type="radio"
                name="winnerIs"
                value={ComparisonWinner.enumValues[1]}
                role="tab"
                className="tab rounded-lg"
                aria-label="Right winner"
              />
            </div>
          </div>
        </div>
        <br />
        {comparisonFields.map((comparisonField, index) => (
          <div key={index} className="card mb-6 gap-6 bg-base-100 p-6 shadow-2xl">
            <div className="form-control">
              <input
                onChange={(e) => handleComparisonFieldChange(index, e)}
                value={comparisonField.title}
                type="text"
                name="title"
                placeholder="State managers, Learning curve, Mobile support..."
                className="input input-bordered"
              />
            </div>
            <br />
            <div className="flex flex-row items-center gap-4">
              <div className="form-control flex-1">
                <textarea
                  onChange={(e) => handleComparisonFieldChange(index, e)}
                  value={comparisonField.leftComparison || ''}
                  name="leftComparison"
                  placeholder="Add info here:"
                  className="input input-bordered min-h-28 py-2 text-sm"
                />
              </div>
              <span className="font-bold">/</span>
              <div className="form-control flex-1">
                <textarea
                  onChange={(e) => handleComparisonFieldChange(index, e)}
                  value={comparisonField.rightComparison || ''}
                  name="rightComparison"
                  placeholder="Add info here:"
                  className="input input-bordered min-h-28 py-2 text-sm"
                />
              </div>
            </div>
            <div className="form-control col-span-7">
              <div role="tablist" className="tabs-boxed tabs col-span-full">
                <input
                  onChange={(e) => handleComparisonFieldChange(index, e)}
                  checked={comparisonField.winnerField == ComparisonWinner.enumValues[0]}
                  type="radio"
                  name="winnerField"
                  value={ComparisonWinner.enumValues[0]}
                  role="tab"
                  className="tab"
                  aria-label="Left field winner"
                />
                <input
                  onChange={(e) => handleComparisonFieldChange(index, e)}
                  checked={comparisonField.winnerField == ComparisonWinner.enumValues[1]}
                  type="radio"
                  name="winnerField"
                  value={ComparisonWinner.enumValues[1]}
                  role="tab"
                  className="tab"
                  aria-label="Right field winner"
                />
              </div>
            </div>

            <button
              onClick={() => deleteComparisonField(index)}
              className="btn-x btn btn-outline btn-error mt-8"
            >
              Delete Field
            </button>
          </div>
        ))}

        <div
          onClick={addAnotherComparisonField}
          className="add-more card flex cursor-pointer items-center justify-center bg-base-100 p-7 shadow-2xl transition-all duration-100 hover:bg-slate-100"
        >
          <PlusCircleIcon className="text-grey-400 size-8" />
          <p className="my-2">Add another input field</p>
        </div>
        <SubmitButton formAction={handleSubmit} pendingText="Pending..." className="btn btn-primary mt-6">
          Add comparison
        </SubmitButton>
      </form>
    </div>
  );
}
