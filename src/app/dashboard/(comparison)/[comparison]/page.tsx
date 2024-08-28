import type { Metadata } from 'next';
import { getComparison } from 'drizzle/queries';

type Props = {
  params: {
    comparison: string; // comparison is a folder name [comparison]
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const comparisonData = await getComparison({ id: params.comparison });
  return {
    title: comparisonData ? `Comparing ${comparisonData?.leftTitle}` : 'Comparing two items',
  };
};

export default async function Comparison({ params }: Props) {
  const comparisonData = await getComparison({ id: params.comparison });

  return (
    <div className="prose flex flex-col items-center">
      {comparisonData && (
        <>
          <h1>{`${comparisonData?.leftTitle} vs ${comparisonData.rightTitle}`}</h1>
        </>
      )}
    </div>
  );
}
