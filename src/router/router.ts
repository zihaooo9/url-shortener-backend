import Router from "koa-router";
import { createShortenedUrl, getFullUrl } from "../controller/controller"

const UrlRouter = new Router({ prefix: "/url" });

// UrlRouter.get("/", url.getUrl);
// UrlRouter.get("/all", url.retrieveAllPages);
UrlRouter.post("/fullUrl", getFullUrl);
// UrlRouter.post("/", url.createUrl);
UrlRouter.post("/create", createShortenedUrl);

export default UrlRouter;