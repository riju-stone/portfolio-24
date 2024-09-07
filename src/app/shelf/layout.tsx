import React from "react";

export default function ShelfLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <body>{children}</body>;
}
