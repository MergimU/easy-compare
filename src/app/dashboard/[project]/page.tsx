import { notFound } from 'next/navigation'
import type { Metadata } from 'next';

type Props = {
  params: {
    project: string; // project is a folder name [project]
  }
}

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Product ${params.project}`
  }
}

export default async function Project({ params }: Props) {
  let getId = params.project.split('-')[1]; // path is project-[project-id-here]

  if (parseInt(getId) > 100) {
    notFound();
  }

  return (
    <div className='prose flex flex-col items-center'>
      <h1>Project name: {params.project}</h1>
    </div>
  )
}