import { DashboardCardHeader } from '@/components/dashboard/dashboard-card-header'
import { DashboardSection } from '@/components/dashboard/dashboard-section'
import { SiteHeader } from '@/components/dashboard/site-header'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent } from '@/components/ui/card'
import { BdmLeaderboard } from '@/features/atfx/charts/bdm-leaderboard'
import { BdmMovementBoards } from '@/features/atfx/charts/bdm-movement'
import { RecognitionDistribution } from '@/features/atfx/charts/recognition-distribution'
import { RegionPerformance } from '@/features/atfx/charts/region-performance'

const DASHBOARD_PAD = 'w-full px-[clamp(0.75rem,3.5vw,3rem)]'

export function Dashboard() {
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
            >
              <Card>
                <DashboardCardHeader
                  title='BDM monthly scorecard'
                  description='June · ranked by weighted performance score'
                  tooltip='Monthly BDM scorecard. Final score weights Net Deposit 40%, MIB 20%, Active IB 20% and Lots 20%, each min-max normalized across BDMs. Movement compares this rank to the prior month; recognition and awards are derived from the score.'
                />
                <CardContent className='pb-4'>
                  <BdmLeaderboard />
                </CardContent>
              </Card>

              <BdmMovementBoards />

              <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
                <Card>
                  <DashboardCardHeader
                    title='Recognition distribution'
                    description='Recognition mix across BDMs'
                    tooltip='Share of BDMs in each recognition tier across the full population.'
                  />
                  <CardContent className='pb-4'>
                    <RecognitionDistribution />
                  </CardContent>
                </Card>

                <RegionPerformance />
              </div>
            </DashboardSection>
          </div>
        </div>
      </Main>
    </>
  )
}
