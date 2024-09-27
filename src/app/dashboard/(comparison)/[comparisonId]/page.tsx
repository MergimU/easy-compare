import type { Metadata } from 'next';
import type { ComparisonField, Comparison } from 'drizzle/dbTypes';
import { getComparison } from 'drizzle/queries';
import { comparisonWinnerEnum } from 'drizzle/schema';

type Props = {
  params: {
    comparisonId: string; // comparison props comes from the folder name [comparison]
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const comparisonData = await getComparison({ id: params.comparisonId });
  return {
    title: comparisonData ? `EasyCompare - Comparing ${comparisonData?.leftTitle}` : 'Comparing two items',
  };
};

export default async function Comparison({ params }: Props) {
  const comparison = await getComparison({ id: params.comparisonId });

  // const [comparisonFields, setComparisonFields] = useState<Omit<ComparisonField, 'id' | 'comparisonId'>[]>([]);

  return (
    <div className="prose mx-auto flex flex-col items-center">
      {comparison && (
        <>
          <div className="prose mx-auto text-center">
            {/* Todo: add dynamic value for winner */}
            <p>The winner based on the input fields is: (React)</p>
            <form className="flex flex-col">
              <div className="card mb-6 grid grid-cols-7 gap-6 bg-base-100 p-6 shadow-2xl">
                <div className="gird form-control col-span-3">
                  <input
                    defaultValue={comparison.leftTitle}
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
                    defaultValue={comparison.rightTitle}
                    type="text"
                    id="rightTitle"
                    name="rightTitle"
                    placeholder="Title two"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control col-span-7">
                  <input
                    defaultValue={comparison.description || ''}
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
                      disabled
                      defaultChecked={comparison.winnerIs === comparisonWinnerEnum.enumValues[0]}
                      type="radio"
                      name="winnerIs"
                      defaultValue={comparisonWinnerEnum.enumValues[0]}
                      role="tab"
                      className="tab"
                      aria-label="Left winner"
                    />
                    <input
                      disabled
                      defaultChecked={comparison.winnerIs === comparisonWinnerEnum.enumValues[1]}
                      type="radio"
                      name="winnerIs"
                      defaultValue={comparisonWinnerEnum.enumValues[1]}
                      role="tab"
                      className="tab rounded-lg"
                      aria-label="Right winner"
                    />
                  </div>
                </div>
              </div>

              {comparison.comparisonFields.map((comparisonField, index) => (
                <div key={index} className="card mb-6 gap-6 bg-base-100 p-6 shadow-2xl">
                  <div className="form-control">
                    <input
                      defaultValue={comparisonField.title}
                      type="text"
                      name="title"
                      placeholder="State managers, Learning curve, Mobile support..."
                      className="input input-bordered"
                    />
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <div className="form-control flex-1">
                      <textarea
                        defaultValue={comparisonField.leftComparison || ''}
                        name="leftComparison"
                        placeholder="Add info here:"
                        className="input input-bordered min-h-28 py-2 text-sm"
                      />
                    </div>
                    <span className="font-bold">/</span>
                    <div className="form-control flex-1">
                      <textarea
                        defaultValue={comparisonField.rightComparison || ''}
                        name="rightComparison"
                        placeholder="Add info here:"
                        className="input input-bordered min-h-28 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="form-control col-span-7">
                    <div role="tablist" className="tabs-boxed tabs col-span-full">
                      <input
                        defaultChecked={comparisonField.winnerField === comparisonWinnerEnum.enumValues[0]}
                        disabled
                        type="radio"
                        name={`winnerField-${index}`}
                        defaultValue={0}
                        role="tab"
                        className="tab"
                        aria-label="Left field winner"
                      />
                      <input
                        defaultChecked={comparisonField.winnerField === comparisonWinnerEnum.enumValues[1]}
                        disabled
                        type="radio"
                        name={`winnerField-${index}`}
                        defaultValue={1}
                        role="tab"
                        className="tab"
                        aria-label="Right field winner"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </>
      )}
    </div>
  );
}
