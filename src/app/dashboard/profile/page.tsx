import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Profile settings"
}

export default function Profile() {
  return (
    <div className="prose prose-xl">
      <h1>Profile</h1>
    </div>
  )
}