import News from "../models/News.js";
import { IUser } from "../models/User.js";

export const createService = (body: any) => News.create(body);

export const findAllService = async (offset: number, limit: number) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const CountNews = () => News.countDocuments();

export const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = (id: string) => News.findById(id).populate("user");

export const searchByTitleService = async (title: string) =>
    await News.find({
        title: { $regex: `${title || ""}`, $options: "i" }
    }).sort({ _id: -1 }).populate("user");

export const byUserService = (id: String) =>
    News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateService = (id: string, title: string, text: string, banner: string) =>
    News.findOneAndUpdate(
        { _id: id },
        { title, text, banner },
        {
            rawResult: true,
        }
    );

export const eraseService = (id: string) => News.findByIdAndDelete({ _id: id })

export const likeNewsService = async (idNews: string, userId: string) => {

    const news = await News.findById(idNews);

    const isLiked = news?.likes.some(element => element.userId === userId);

    return isLiked
        ? null
        : News.findByIdAndUpdate(
            { _id: idNews, "likes.userId": { $nin: [userId] } },
            { $push: { likes: { userId, created: new Date() } } }
        );
}

export const deleteLikeNewsService = (idNews: string, userId: string) =>
    News.findByIdAndUpdate(
        { _id: idNews },
        { $pull: { likes: { userId } } }
    );

export const addCommentService = (idNews: string, comment: string, userId: string) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);
    console.log(Math.floor(Date.now() * Math.random()));
    return News.findOneAndUpdate(
        { _id: idNews },
        {
            $push: {
                comments: { idComment, userId, comment, createdAt: new Date() },
            },
        },
    );
}

export const deleteCommentService = (idNews: string, idComment: string, userId: string) =>
    News.findOneAndUpdate(
        { _id: idNews },
        { $pull: { comments: { idComment, userId } } }
    );



