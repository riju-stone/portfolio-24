import React from "react";

export default function ProjectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <body>{children}</body>;
}
