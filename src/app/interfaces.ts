export interface ItemCategoria {
    _id: string;
    titulo: string;
}

export interface Categoria {
    _id: string;
    titulo: string;
    subs: ItemCategoria[] | undefined;
}

export interface Post {
    _id: string;
    titulo: string;
    tituloLower: string;
    descricao: string;
    corpo: string;
    banner: string;
    usuario: string;
    createdAt: string;
    visualizacao: number;
}

export interface Reducers {
    AuthState: AuthState
}

export interface Tag {
    _id: string;
    titulo: string;
    qtdePosts: number;
    tituloLower: string;
}

export interface Usuario {
    _id: string;
    nome: string;
    email: string;
    username: string;
    bio: string;
    avatar: string;
    updateAt: string;
}

export interface AuthState {
    user: ReturnedUser
    loggedIn: boolean
}

export interface User {
    nome: string
    username: string
    email: string
    bio?: string
    avatar?: string
    isAdm: boolean
    uniqueId: string
}

export interface ReturnedUser extends User {
    _id: string
    createdAt?: Date
}

export interface DialogData {
    question: string;
}

export interface SubCat {
    catFilha: ItemCategoria;
}

export interface PostsDestaques {
    bigPost: Post;
    postNews: Post[];
}

export interface ComentarioCreate {
    usuario: string;
    texto: string;
    postId: string;
}

export interface CatNoFilter {
    _id: string;
    isSub: boolean;
    titulo: string;
}

export interface Categories {
    _id: string;
    catId: {
        _id: string;
        titulo: string;
    };
}

export interface Comentario {
    _id: string;
    usuario: ReturnedUser
    texto: string;
    postId: string;
    updatedAt: string;
}

export interface Tagers {
    _id: string;
    tagId: {
        _id: string;
        titulo: string;
    };
}

export interface UniquePost {
    post: {
        _id: string;
        titulo: string;
        descricao: string;
        corpo: string;
        banner: string;
        usuario: Usuario;
        updatedAt: string;
        visualizacao: number;
    };
    categorias: Categories[];
    tags: Tagers[];
    comentarios: Comentario[];
}

export interface Visualizar {
    _id: string;
    visualizacao: number;
}

export interface PostCreationBody {
    titulo: string;
    tituloLower: string;
    descricao: string;
    corpo: string;
    usuario: string;
    categorias: string[];
    tags: TagsCadastro[];
    banner: string;
}

export interface TagsCadastro {
    titulo: string;
    tituloLower: string;
}
export interface PostEditionBody extends PostCreationBody {
    _id: string;
    categorias: string[];
    tags: TagsCadastro[];
}

export interface PostData {
    _id: string;
    postId: Post;
}


export interface RemovedTag extends TagsCadastro {
    _id: string;
}