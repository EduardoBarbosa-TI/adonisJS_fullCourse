// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import CreateArticleValidator from "App/Validators/CreateArticleValidator"

export default class ArticlesController {

  public async index({ view }) {
    const articles = await Database.from("articles").select("*")
    return view.render("article.view", { articles })
  }

  public create({ view }){
    return view.render("article.create")
  }

  public async show({view,params}){
    const article = await Database.from("articles").where("slug", params.slug).first()

    return view.render("article/show",{article})
  }

  public async store({request, response}){
    const payload = await request.validate(CreateArticleValidator)
    await Database.table("articles").insert({
        ...payload,
        slug: payload.title.replace(" ","-") + +new Date()
      })
    return response.redirect().back()
  }

  public async edit({ view, params }){
    const {slug} = params
    const article = await Database.from("articles").where("slug", slug).first()
    return view.render("article.edit", { article })
  }

  public async update({request,response, params}){
    const payload = await request.validate(CreateArticleValidator)
    await Database.from("articles").where('slug',params.slug).update(payload)
    return response.redirect().back()
  }

  public async destroy({params, response}){
    await Database.from("articles").where("slug", params.slug).delete()
    return response.redirect().back()
  }
}
