import { Post, PostsList, getAllUsersPosts } from '@/entities/post'

export function ShowAllPostsUsers() {
    return <PostsList renderProp={Post} fetchFunction={getAllUsersPosts} queryKey='post' titleText='All users posts' />
}
