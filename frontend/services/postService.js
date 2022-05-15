import axiosInstance from "./service";

export function getPosts(){
    return axiosInstance.get("/getPosts")
}

export function formatPosts(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}