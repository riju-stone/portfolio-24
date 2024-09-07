export default function SanityLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <body>{children}</body>;
}
