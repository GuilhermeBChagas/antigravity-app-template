import { RequireAuth, RequirePermission } from '@/components/auth/RequirePermission';
import { AppShell } from '@/components/layout/AppShell';
import { AppLoadingScreen } from '@/components/ui';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const ItemsPage = lazy(() =>
  import('@/features/_example/components/ItemsPage').then((m) => ({ default: m.ItemsPage }))
);
const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);
const AdminPermissionsPage = lazy(() =>
  import('@/features/admin/components/AdminPermissionsPage').then((m) => ({
    default: m.AdminPermissionsPage,
  }))
);
const ForbiddenPage = lazy(() =>
  import('@/pages/ForbiddenPage').then((m) => ({ default: m.ForbiddenPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function LazyRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<AppLoadingScreen />}>{children}</Suspense>;
}

/** Roteador principal com code-splitting por rota e guarda RBAC Default Deny. */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <LazyRoute>
        <LoginPage />
      </LazyRoute>
    ),
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <RequirePermission permission="dashboard.read">
              <DashboardPage />
            </RequirePermission>
          </LazyRoute>
        ),
      },
      {
        path: 'items',
        element: (
          <LazyRoute>
            <RequirePermission permission="items.read">
              <ItemsPage />
            </RequirePermission>
          </LazyRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <LazyRoute>
            <RequirePermission permission="settings.read">
              <SettingsPage />
            </RequirePermission>
          </LazyRoute>
        ),
      },
      {
        path: 'admin/permissoes',
        element: (
          <LazyRoute>
            <RequirePermission permission="admin.roles.manage">
              <AdminPermissionsPage />
            </RequirePermission>
          </LazyRoute>
        ),
      },
      {
        path: '403',
        element: (
          <LazyRoute>
            <ForbiddenPage />
          </LazyRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <LazyRoute>
        <NotFoundPage />
      </LazyRoute>
    ),
  },
]);
