import { User } from './user'; 

export class Post {
    public postId:number;
    public postText:string;
    public likeCount: number;
    public shareCount: number;
    public user: User = new User();
    public sharedBy: User[] = [];
}
