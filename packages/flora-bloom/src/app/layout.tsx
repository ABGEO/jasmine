import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import theme from '@/theme';
import SessionWrapper from '@/components/SessionWrapper'
import MainLayout from '@/components/layout/MainLayout';
import AuthGuard from '@/components/guards/Auth';

export const metadata: Metadata = {
  title: 'Jasmine Dashboard',
  description: 'Jasmine Dashboard',
}

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SessionWrapper>
              <AuthGuard>
                <MainLayout>
                  {children}
                </MainLayout>
              </AuthGuard>
            </SessionWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
