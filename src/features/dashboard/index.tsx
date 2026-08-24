import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DashboardCardHeader } from '@/components/dashboard/dashboard-card-header'
import { DashboardSection } from '@/components/dashboard/dashboard-section'
import { SiteHeader } from '@/components/dashboard/site-header'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { BdmLeaderboard } from '@/features/atfx/charts/bdm-leaderboard'
import { BdmMetricCharts } from '@/features/atfx/charts/bdm-metric-charts'
import { BdmMovementBoards } from '@/features/atfx/charts/bdm-movement'
import {
  LATEST_SCORECARD_MONTH,
  MONTH_LABELS,
  SCORECARD_MONTHS,
  SCORE_WEIGHTS,
} from '@/features/atfx/charts/bdm-scorecard-data'

const DASHBOARD_PAD = 'w-full px-[clamp(0.75rem,3.5vw,3rem)]'

const WEIGHT_TOOLTIP = `Monthly BDM scorecard. Final score weights Net Deposit ${SCORE_WEIGHTS.netDeposit * 100}%, MIB ${SCORE_WEIGHTS.mibs * 100}%, Active IB ${SCORE_WEIGHTS.activeIbs * 100}% and Lots ${SCORE_WEIGHTS.lots * 100}%. Net Deposit is min-max normalized; MIB, Active IB and Lots are scaled to the month max. Movement compares this rank to the prior month; recognition and awards are derived from the score. Metric values are not shown.`

export function Dashboard() {
  const [month, setMonth] = useState(LATEST_SCORECARD_MONTH)

  return (
    <>
      <Header>
        <div className='ms-auto' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main fluid className='px-0'>
        <div className='@container/main mx-auto flex w-full max-w-none flex-col gap-6 py-6 lg:max-w-[85%]'>
          <div className={DASHBOARD_PAD}>
            <SiteHeader section='Performance' />
          </div>

          <div className={`${DASHBOARD_PAD} flex flex-col gap-8`}>
            <DashboardSection
              title='BDM performance'
              description='Monthly scorecard, movement and recognition'
              action={
                <div className='flex items-center gap-2'>
                  <label
                    htmlFor='bdm-scorecard-month'
                    className='text-sm font-medium'
                  >
                    Month
                  </label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger
                      id='bdm-scorecard-month'
                      size='sm'
                      className='w-32'
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SCORECARD_MONTHS.map((m) => (
                        <SelectItem key={m} value={m}>
                          {MONTH_LABELS[m] ?? m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              }
            >
              <Card>
                <DashboardCardHeader
                  title='BDM monthly scorecard'
                  description={`${MONTH_LABELS[month] ?? month} · ranked by weighted performance score`}
                  tooltip={WEIGHT_TOOLTIP}
                />
                <CardContent className='pb-4'>
                  <BdmLeaderboard month={month} />
                </CardContent>
              </Card>

              <BdmMovementBoards month={month} />

              <BdmMetricCharts month={month} />
            </DashboardSection>
          </div>
        </div>
      </Main>
    </>
  )
}
