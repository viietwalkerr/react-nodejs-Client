

export interface Post {
    id: number;
    title: string;
    postText: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    Likes: [
        {
            id: string;
            createdAt: string;
            updatedAt: string;
            PostId: number;
            UserId: number;
        }
    ]
}

export interface Likes {
    PostId: number;
    UserId: number;
    createdAt: string;
    id: number;
    updatedAt: string;
}

export interface LikesObject {
    id: number;
    createdAt: string;
    updatedAt: string;
    PostId: number;
    UserId: number;
}

export interface Comment {
    id: number;
    commentBody: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    PostId: number;
}

export interface PostFormData {
    title: string;
    postText: string;
}