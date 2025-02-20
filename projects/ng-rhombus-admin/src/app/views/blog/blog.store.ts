import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { IBlog, NgRhombusBlogService } from "../../../../../ng-rhombus";
import { NgRhombusAdminAppStore } from "../../app.store";

type BlogState = {
    blogPosts: IBlog[];
    blogPost: IBlog,
    loading: boolean;
}

const initialBlogState: BlogState = {
    blogPosts: [],
    blogPost: new IBlog(),
    loading: false
}

export const NgRhombusAdminBlogStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialBlogState),
    withMethods(
        (store, blogService = inject(NgRhombusBlogService), appStore = inject(NgRhombusAdminAppStore)) => ({

            async loadAll() {
                appStore.startLoading();
                patchState(store, { loading: true });

                const posts = await blogService.fetchBlogPosts();
                patchState(store, { blogPosts: posts, loading: false });
                appStore.stopLoading();
            },
            async load(id: string) {
                patchState(store, { loading: true });

                const post = await blogService.fetchBlogPost(id);
                patchState(store, { blogPost: post, loading: false });
            }
        })
    )
)