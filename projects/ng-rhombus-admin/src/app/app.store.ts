import { inject } from "@angular/core";
import { NavigationStart, NavigationEnd, Router } from "@angular/router";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from "rxjs";
import { NgRhombusAdminAuthenticationService } from "./services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

type AppState = {
    loading: boolean;
};

const initialState: AppState = {
    loading: false,
};

export const NgRhombusAdminAppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (
            store,
            authService = inject(NgRhombusAdminAuthenticationService),
            router = inject(Router),
            snackbar = inject(MatSnackBar)
        ) => ({
            login: async (email: string, password: string) => {
                if (!email || !password) {
                    return;
                }

                try {
                    patchState(store, { loading: true });
                    await authService.login(email, password);
                    router.navigate(['/']);
                } catch (error) {
                    snackbar.open('Invalid email or password', 'Close', {
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                    });
                } finally {
                    setTimeout(() => {
                        patchState(store, { loading: false });
                    }, 500)
                }
            },
            logout: async () => {
                patchState(store, { loading: true });
                await authService.logout();
                patchState(store, { loading: false });
                router.navigate(['/login']);
            },
            startLoading: () => {
                patchState(store, { loading: true });
            },
            stopLoading: () => {
                patchState(store, { loading: false });
            },
            loaderOnNavigation: rxMethod<any>(
                pipe(
                    tap((event) => {
                        if (event instanceof NavigationStart) {
                            patchState(store, { loading: true });
                        } else if (event instanceof NavigationEnd) {
                            patchState(store, { loading: false });
                        }
                    }),
                )
            ),
        })
    ),
    withHooks((store, router = inject(Router)) => ({
        onInit() {
            store.loaderOnNavigation(router.events);
        },
    }))
)