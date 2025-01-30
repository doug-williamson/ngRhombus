import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { NgRhombusBlogService } from "./blog.service"
import { inject } from "@angular/core";
import { IBlog } from "../models/blog";

type BlogState = {
    blogPosts: IBlog[];
    loading: boolean;
}

const initialBlogState: BlogState = {
    blogPosts: [],
    loading: false
}

export const NgRhombusBlogStore = signalStore(
    { providedIn: 'root', protectedState: false },
    withState(initialBlogState),
    withMethods(
        (store, blogService = inject(NgRhombusBlogService)) => ({

            async loadAll() {
                patchState(store, { loading: true });

                const posts = await blogService.fetchBlogPosts();
                patchState(store, { blogPosts: posts, loading: false });
            }
        })
    )
)