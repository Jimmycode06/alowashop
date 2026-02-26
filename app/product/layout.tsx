import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alowa Ring | ALOWA',
  description: 'ALOWA Magnetic Therapy Ring — natural pain relief and improved circulation. Premium stainless steel with therapeutic-grade magnets.',
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
