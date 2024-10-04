export type Partial<I> = {
    [P in keyof I]?: I[P];
  };

  export interface IUser {
    id : number;
    name : string;
    email : string;
    password : string;
    accesToken : string; 
    idAdmin : boolean;
    assignedArticles : string;
  }

  export interface IArticle {
    id : number;
    title : string;
    content : string;
    author : string;
    createdAt : Date;
    updatedAt : Date;
  }
  