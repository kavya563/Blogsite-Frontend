
export interface CreateBlog {
    category: string;
    article: string;
    authorname: string;
    blogname: string;
}
export interface Blogs {
    id:string;
    article: string;
    authorname: string;
    category: string;
    blogname: string;
    timestamp: string;
    userId: string
}