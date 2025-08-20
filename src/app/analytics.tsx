"use client";

import React from 'react'
import dynamic from 'next/dynamic'

const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => mod.Analytics), { ssr: false })
const SpeedInsights = dynamic(() => import('@vercel/speed-insights/react').then(mod => mod.SpeedInsights), { ssr: false })

function AnalyticsComponent() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default AnalyticsComponent