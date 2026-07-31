import { DashboardCardHeader } from '@/components/dashboard/dashboard-card-header'
import { DashboardSection } from '@/components/dashboard/dashboard-section'
import { SiteHeader } from '@/components/dashboard/site-header'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent } from '@/components/ui/card'
import { BdmPerformanceTable } from '@/features/atfx/components/bdm-performance-table'

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
              description='Net deposit, MIB, lots and IB activation'
            >
              <Card>
                <DashboardCardHeader
                  title='Rendimiento BDM'
                  description='Hardcoded from Datos_BDM_Extraidos · Jun + Jul'
                />
                <CardContent className='pb-4'>
                  <BdmPerformanceTable />
                </CardContent>
              </Card>
            </DashboardSection>
          </div>
        </div>
      </Main>
    </>
  )
}
