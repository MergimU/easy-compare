import Link from 'next/link';
import { getComparisons } from 'drizzle/queries';

export default async function Dashboard() {
  let dbComparisons = await getComparisons();

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {!!dbComparisons &&
        dbComparisons.map((comparison, key) => (
          <div key={key} className="card prose min-w-80 bg-base-100 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-center">{`${comparison.leftTitle} vs ${comparison.rightTitle}`}</h2>
              <p>{comparison.description}</p>
              <div className="card-actions justify-end">
                <Link href={`/dashboard/${comparison.id}`} className="btn btn-primary w-full text-white">
                  Show comparison
                </Link>
              </div>
            </div>
          </div>
        ))}
      <div className="card prose min-w-80 bg-base-100 shadow-2xl">
        <div className="card-body text-center">
          <h2 className="card-title inline">Add new</h2>
          <p>Click here to start adding a new comparison.</p>
          <div className="card-actions justify-end">
            <Link href="/dashboard/add-comparison" className="btn w-full">
              Add +
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
