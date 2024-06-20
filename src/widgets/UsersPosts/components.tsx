// import { Post, getUserAllPosts } from '@/entities/post';
import { ShowAllPostsUsers } from '@/features/show-all-posts-users';


export function UsersPosts() {
    return (
        <>
            <ShowAllPostsUsers />
            {/* <Posts Post={Post} fetchFunction={() => getUserAllPosts('3')} queryKey='post1' /> */}
        </>
    );
}
