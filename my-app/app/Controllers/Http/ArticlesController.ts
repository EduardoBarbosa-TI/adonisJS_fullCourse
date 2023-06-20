// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import CreateArticleValidator from "App/Validators/CreateArticleValidator"

export default class ArticlesController {

  public async view({ view }) {
    const articles = await Database.from("articles").select("*")
    return view.render("article.view", { articles })
  }

  public async create({ view }){
    return view.render("article.create")
  }

  public async store({request, response}){
    const payload = await request.validate(CreateArticleValidator)
    await Database.table("articles").insert({ ...payload, slug: 'sgis'})
    return response.redirect().back()
  }

  public async edit({ view }){
    return view.render("article/edit")
  }
}
