import type { Metadata } from 'next';
import { getComparison } from 'drizzle/queries';

type Props = {
  params: {
    comparison: string; // comparison props comes from the folder name [comparison]
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const comparisonData = await getComparison({ id: params.comparison });
  return {
    title: comparisonData ? `EasyCompare - Comparing ${comparisonData?.leftTitle}` : 'Comparing two items',
  };
};

export default async function Comparison({ params }: Props) {
  const comparison = await getComparison({ id: params.comparison });

  return (
    <div className="prose mx-auto flex flex-col items-center">
      {comparison && (
        <>
          <div className="prose mx-auto text-center">
            <p>
              Please choose the titles of what you are comparing and add as many input fields as you want for
              comparison The winner between these two comparisons is: {comparison.winnerIs}
            </p>
            <form className="flex flex-col">
              <div className="card mb-6 grid grid-cols-7 gap-6 bg-base-100 p-6 shadow-2xl">
                <div className="gird form-control col-span-3">
                  <input
                    defaultValue={comparison.leftTitle}
                    type="text"
                    id="leftTitle"
                    name="leftTitle"
                    className="input input-bordered select-none"
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
