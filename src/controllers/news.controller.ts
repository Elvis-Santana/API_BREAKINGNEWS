import { NextFunction, Request, Response } from "express";
import {
    createService,
    findAllService,
    CountNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deleteLikeNewsService,
    addCommentService,
    deleteCommentService
} from "../services/news.service.js";

import userService from "../services/user.service.js";

import { IUser } from "../models/User.js";

interface IQuery {
    limit: number
    offset: number
}


export const create = async (req: Request, res: Response) => {
    try {


        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({
                message: "Erro ao registrar"
            });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })
        res.status(201).send(201);

    } catch (err) {
        res.status(500).send({ message: `${err}` })

    }
}

export const findAll = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {

    try {

        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);

        if (!limit) limit = 5

        if (!offset) offset = 0

        const news: Array<any> = await findAllService(offset, limit);
        const total = await CountNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total
            ? `${currentUrl}?limit=${limit}&offset=${next}`
            : null;

        const previous = offset - limit < 0 ? null : offset - limit;

        const previousUrl = previous != null
            ? `${currentUrl}?limit=${limit}&offset=${previous}`
            : null;

        console.log(currentUrl)


        console.log(total);




        if (news.length === 0) {
            return res.status(400).send({ message: `Error no registered news` })
        }
        return res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map((itens) => ({
                id: itens._id,
                title: itens.title,
                text: itens.text,
                banner: itens.banner,
                likes: itens.likes,
                comments: itens.comments,
                name: itens.user.name,
                username: itens.user.usename,
                userAvatar: itens.user.avatar

            })),
        });
    } catch (err) {
        res.status(500).send({ message: `${err}` })
    }
}

export const topNews = async (req: Request, res: Response) => {
    try {
        const news = await topNewsService();
        const id: string = String(news?.user?._id);
        const user = await userService.findById(id) as IUser;

        if (!news) {
            return res.status(400).send({ message: "não há postagem registrada" });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: user.name,
                username: user.usename,
                userAvatar: user.avatar,

            }
        });

    } catch (err) {
        res.status(500).send({ message: `${err}` })
    }
}

export const findById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);
        const userId: string = String(news?.user?._id);
        const user = await userService.findById(userId) as IUser;

        if (!news) {
            return res.send({
                message: "id não encontrado"
            })
        }


        return res.send({
            news: {
                id: news?.id,
                title: news?.title,
                text: news?.text,
                banner: news?.banner,
                likes: news?.likes,
                comments: news?.comments,
                name: user.name,
                username: user.usename,
                userAvatar: user.avatar,

            }
        })

    } catch (err) {
        res.status(500).send({ message: `${err}` })
    }
}

export const searchByTitle = async (req: Request, res: Response) => {
    try {
        const { title } = req.query;
        const news = await searchByTitleService(String(title));

        if (news.length === 0) {
            return res
                .status(400)
                .send({ message: `Não existe noticia com  esse titulo` });
        }


        return res.send({


            results: news.map((itens) => ({
                id: itens._id,
                title: itens.title,
                text: itens.text,
                banner: itens.banner,
                likes: itens.likes,
                comments: itens.comments,
                name: async () => {
                    const user = await userService.findById(String(itens.user?._id)) as IUser
                    return user.name;
                },
                username: async () => {
                    const user = await userService.findById(String(itens.user?._id)) as IUser
                    return user.usename;
                },
                userAvatar: async () => {
                    const user = await userService.findById(String(itens.user?._id)) as IUser
                    return user.avatar;
                },
            })),
        });

    } catch (err) {
        return res.status(500).send({ message: `${err}` });
    }
}

export const byUser = async (req: Request, res: Response) => {
    try {
        const id = req.userId;
        const news = await byUserService(id);

        return res.send(
            news.map((itens) => ({
                id: itens._id,
                title: itens.title,
                text: itens.text,
                banner: itens.banner,
                likes: itens.likes,
                comments: itens.comments,
                name: async () => {
                    const user = await userService.findById(String(itens.user?._id)) as IUser
                    return user.name;
                },
                username: async () => {
                    const user = await userService.findById(String(itens.user?._id)) as IUser
                    return user.usename;
                },
                userAvatar: async () => {
                    const user = await userService.findById(String(itens.user?._id)) as IUser
                    return user.avatar;
                },
            }))
        );
    } catch (err) {
        return res.status(500).send({ message: `${err}` });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { title, text, banner } = req.body;
        const { id } = req.params;

        if (!title && !text && !banner) {
            return res.status(400).send({
                message: "falnha a atualização da postagem"
            });
        }

        const news = await findByIdService(id);

        if (String(news?.user?.id) !== req.userId) {
            return res.status(400).send({
                message: "você não pode fazer atualizar ",
            });
        }

        await updateService(id, title, text, banner);
        return res.send({ message: "Post atualizado com sucesso" })
    } catch (err) {
        return res.status(500).send({ message: `${err}` });
    }
}

export const erase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        if (String(news?.user?.id) !== req.userId) {
            return res.status(400).send({
                message: "você não pode deletar esse Post ",
            });
        }
        await eraseService(id);

        return res.send({ message: "Post deletado com sucesso " });

    } catch (err) {
        return res.status(500).send({ message: `${err}` });
    }
}

export const likeNews = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        const userId = req.userId;

        const newsLiked = await likeNewsService(id, userId);
        if (!newsLiked) {
            await deleteLikeNewsService(id, userId);
            return res.status(200).send({ message: "like removido com sucesso!!!" })
        }

        return res.send({ message: "like  efetuado  com  sucesso!!!" });
    } catch (err) {
        return res.status(500).send({ message: `${err}` });
    }

}

export const addComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const comment = req.body;

        if (!comment) {
            return res.status(400).send({ message: "write a message to comment" });
        }

        await addCommentService(id, comment, userId);

        return res
            .send({ message: "comentario adicionado com sucesso" });
    } catch (err) {
        return res.status(500).send({ message: `${err}` });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { idNews, idComment } = req.params;
        const userId = req.userId;

        const commentDeleted = await deleteCommentService(idNews, idComment, userId);


        const comment = commentDeleted?.comments.filter(c => c.idComment === idComment);
        if (!comment) {
            return res
                .status(400)
                .send({ message: "comentario não encontrado" });
        }
        const isUser: any = comment?.some(u => u.userId !== userId);

        if (isUser) {
            return res
                .status(400)
                .send({ message: "você não pode deletar esse comentario" });
        }

        res.send({
            message: "comentario removido"
        });

    } catch (err) {
        return res.status(500).send({ message: `${err}` });
    }
}