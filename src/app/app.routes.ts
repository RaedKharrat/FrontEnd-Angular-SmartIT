import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { RoleGuard } from './core/auth/guards/role.guard';
import { LeaveRequestListComponent } from './modules/admin/dashboards/leave-request/leave-request-list/leave-request-list.component';
import { LeaveRequestFormComponent } from './modules/admin/dashboards/leave-request/leave-request-form/leave-request-form.component';
import { LeaveRequestDetailComponent } from './modules/admin/dashboards/leave-request/leave-request-detail/leave-request-detail.component';
import { StageRequestFormComponent } from './modules/admin/dashboards/stage-request/stage-request-form/stage-request-form.component';
import { StageRequestListComponent } from './modules/admin/dashboards/stage-request/stage-request-list/stage-request-list.component';
import { StageRequestDetailComponent } from './modules/admin/dashboards/stage-request/stage-request-detail/stage-request-detail.component';
import { AbsenceListComponent } from 'app/modules/admin/dashboards/absence/absence-list/absence-list.component';
import { AbsenceFormComponent } from 'app/modules/admin/dashboards/absence/absence-form/absence-form.component';
import { AbsenceDetailComponent } from './modules/admin/dashboards/absence/absence-detail/absence-detail.component';
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
        
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
            // Dashboards
            {path: 'dashboards', children: [
                {path: 'commandes', loadChildren: () => import('app/modules/admin/dashboards/commandes/commandes.routes')},
                {path: 'commandes-pdf/:id', loadChildren: () => import('app/modules/admin/dashboards/commandes/commandes-pdf/commandes-pdf.routes')},
                {path: 'factures', loadChildren: () => import('app/modules/admin/dashboards/factures/factures.routes')},
                {path: 'factures-pdf/:nfact/:rs', loadChildren: () => import('app/modules/admin/dashboards/factures/factures-pdf/factures-pdf.routes')},
                { path: 'leaverequests', component: LeaveRequestListComponent },
                { path: 'leaverequests/new', component: LeaveRequestFormComponent },
                { path: 'leaverequests/:id', component: LeaveRequestDetailComponent },
                { path: 'stage-requests', component: StageRequestListComponent },
                { path: 'stage-requests/new', component: StageRequestFormComponent },
                { path: 'stage-requests/:id', component: StageRequestDetailComponent },
                { path: 'absences', component: AbsenceListComponent },
                { path: 'absences/new', component: AbsenceFormComponent },
                { path: 'absences/:id', component: AbsenceDetailComponent },
                
                {path: 'contacts',
                    canActivate: [RoleGuard],
                    data: { requiredRole: 'admin' },
                    loadChildren: () => import('app/modules/admin/dashboards/clients/clients.routes')},

                {path: 'clients',
                    canActivate: [RoleGuard],
                    data: { requiredRole: 'admin' },
                    loadChildren: () => import('app/modules/admin/dashboards/contacts/contacts.routes')},

                {path: 'articles', loadChildren: () => import('app/modules/admin/dashboards/articles/articles.routes')},
            ]},
            {path: 'pages', children:[
                {path: 'profile', loadChildren: () => import('app/modules/admin/pages/profile/profile.routes')},
                {path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.routes')},
            ]}
        ]
    }
];
