import { inject } from "@angular/core";
import { NavigationStart, NavigationEnd, Router } from "@angular/router";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

type AppState = {
    loading: boolean;
};

const initialState: AppState = {
    loading: false,
};

export const NgRhombusAppAppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (
            store,
            router = inject(Router),
            snackbar = inject(MatSnackBar)
        ) => ({
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