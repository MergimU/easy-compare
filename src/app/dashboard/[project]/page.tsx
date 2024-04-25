export default function Project({ params }: { params: { project: string } }) {
  console.log(params);
  return (
    <div className='prose flex flex-col items-center'>
      <h1>Project name: {params.project}</h1>
    </div>
  )
}