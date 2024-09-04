import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject, of, switchMap, tap } from 'rxjs';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { AuthService } from '../auth/auth.service';

const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Accueil',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home'
    },
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboard.commandes',
                title: 'Commandes',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: '/dashboards/commandes'
            },
            {
                id: 'dashboard.factures',
                title: 'Factures',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/dashboards/factures'
            },
            {
                id: 'dashboard.articles',
                title: 'Articles',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/dashboards/articles'
            }
        ]
    }
];

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _authService = inject(AuthService);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._authService.hasRole('admin').pipe(
            switchMap(isAdmin => {
                // Clone the default navigation to avoid mutating the original
                const navigation = JSON.parse(JSON.stringify(defaultNavigation));

                if (isAdmin) {
                    // Add admin-specific navigation items
                    navigation[1].children.push({
                        id: 'dashboard.clients',
                        title: 'Clients',
                        type: 'basic',
                        icon: 'heroicons_outline:user-group',
                        link: '/dashboards/clients'
                    });
                }

                // Add detailed routes for Leave Requests, Stage Requests, and Absences
                const detailedRoutes: FuseNavigationItem[] = [
                    {
                        id: 'leaverequests',
                        title: 'Leave Requests',
                        type: 'group',
                        icon: 'heroicons_outline:calendar',
                        children: [
                            {
                                id: 'leaverequests.list',
                                title: 'List',
                                type: 'basic',
                                icon: 'heroicons_outline:table',
                                link: '/dashboards/leaverequests'
                            },
                            {
                                id: 'leaverequests.new',
                                title: 'New Request',
                                type: 'basic',
                                icon: 'heroicons_outline:plus',
                                link: '/dashboards/leaverequests/new'
                            },
                            {
                                id: 'leaverequests.details',
                                title: 'Details',
                                type: 'basic',
                                icon: 'heroicons_outline:info',
                                link: '/dashboards/leaverequests/:id'
                            }
                        ]
                    },
                    {
                        id: 'stage-requests',
                        title: 'Stage Requests',
                        type: 'group',
                        icon: 'heroicons_outline:clipboard',
                        children: [
                            {
                                id: 'stage-requests.list',
                                title: 'List',
                                type: 'basic',
                                icon: 'heroicons_outline:table',
                                link: '/dashboards/stage-requests'
                            },
                            {
                                id: 'stage-requests.new',
                                title: 'New Request',
                                type: 'basic',
                                icon: 'heroicons_outline:plus',
                                link: '/dashboards/stage-requests/new'
                            },
                            {
                                id: 'stage-requests.details',
                                title: 'Details',
                                type: 'basic',
                                icon: 'heroicons_outline:info',
                                link: '/dashboards/stage-requests/:id'
                            }
                        ]
                    },
                    {
                        id: 'absences',
                        title: 'Absences',
                        type: 'group',
                        icon: 'heroicons_outline:clock',
                        children: [
                            {
                                id: 'absences.list',
                                title: 'List',
                                type: 'basic',
                                icon: 'heroicons_outline:table',
                                link: '/dashboards/absences'
                            },
                            {
                                id: 'absences.new',
                                title: 'New Absence',
                                type: 'basic',
                                icon: 'heroicons_outline:plus',
                                link: '/dashboards/absences/new'
                            },
                            {
                                id: 'absences.details',
                                title: 'Details',
                                type: 'basic',
                                icon: 'heroicons_outline:info',
                                link: '/dashboards/absences/:id'
                            }
                        ]
                    }
                ];

                // Add detailed routes
                navigation[1].children.push(...detailedRoutes);

                const navigationData: Navigation = {
                    compact: navigation,
                    default: navigation,
                    futuristic: navigation,
                    horizontal: navigation,
                };

                // Emit the navigation data to the _navigation ReplaySubject
                this._navigation.next(navigationData);

                // Return the navigation data as an Observable
                return of(navigationData);
            })
        );
    }
}
