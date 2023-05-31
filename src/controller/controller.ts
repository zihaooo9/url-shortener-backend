import { Repository } from "typeorm";
import { Url } from "../entity/Url"
import {
  Context,
  DefaultContext,
  DefaultState,
  ParameterizedContext,
} from "koa";
import { AppDataSource } from "../data-source";
import crypto from "crypto";

export async function createShortenedUrl(ctx: Context): Promise<void> {
    const urlRepository: Repository<Url> = AppDataSource.getRepository(Url);
    const data = ctx.request.body["url"];

    const alreadyExists = await urlRepository.findOne({
        where: { originalUrl: data },
    });

    if (alreadyExists) {
        ctx.status = 200;
        ctx.body = alreadyExists;
        return;
    }

    while (true) {
        const randomGeneratedUrl = crypto.randomBytes(8).toString('base64url').substring(0,8);

        if (
          await urlRepository.findOne({
            where: { shortenedUrl: randomGeneratedUrl },
          })
        ) {
          continue;
        }
        let url: Url = new Url();
        url.originalUrl = data;
        url.shortenedUrl = randomGeneratedUrl;
        url = await urlRepository.save(url);
        ctx.status = 200;
        ctx.body = url;
        return;
    }
}

export async function getFullUrl(ctx:Context): Promise<void> {
    const urlRepository: Repository<Url> = AppDataSource.getRepository(Url);
    const data = ctx.request.body["shortenedUrl"];
   
    const url: Url = await urlRepository.findOne({
      where: { shortenedUrl: data },
    });

    if (url) {
      ctx.status = 200;
      ctx.body = url;
    } else {
      ctx.status = 404;
      ctx.body = "URL does not exist";
    }
}
