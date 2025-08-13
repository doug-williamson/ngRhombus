import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { IBlog, NgRhombusBlogService } from "../../../../../ng-rhombus";
<<<<<<< HEAD
import { NgRhombusAppStore } from "../../app.store";

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

export const NgRhombusAppBlogStore = signalStore(
	{ providedIn: 'root', protectedState: false },
	withState(initialBlogState),
	withMethods(
		(store, blogService = inject(NgRhombusBlogService), appStore = inject(NgRhombusAppStore)) => ({

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
=======
import { NgRhombusAppAppStore } from "../../app.store";


type BlogState = {
    blogPosts: IBlog[] | undefined,
    blogPost: IBlog | undefined,
    loading: boolean;
}

const initialBlogState: BlogState = {
    blogPosts: undefined,
    blogPost: undefined,
    loading: false
}

export const NgRhombusAppBlogStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialBlogState),
    withMethods(
        (store, blogService = inject(NgRhombusBlogService), appStore = inject(NgRhombusAppAppStore)) => ({

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
            },
            async loadLatest() {
                patchState(store, { loading: true });

                const post = await blogService.fetchLatestBlogPost();
                patchState(store, { blogPost: post, loading: false });
            }
        })
    )
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
)