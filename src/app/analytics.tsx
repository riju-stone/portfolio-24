import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

function AnalyticsComponent() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default AnalyticsComponent