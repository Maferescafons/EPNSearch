/**
 * Created by CEDIA on 24/07/2017.
 *
 */
declare var module;
declare var sails;
declare var Articulo;
declare var file;
declare var Wkx_category;
declare var Wkx_collection;
declare var Wkx_creator;
declare var Wkx_keyword;
declare var Wkx_publisher;
declare var Wkx_resource_category;
declare var Wkx_resource;
declare var Wkx_resource_creator;
declare var CategoryId;
declare var collectionId;
declare var Wkx_resource_keyword;
declare var Wkx_resource_misc;
declare var Wkx_resource_page;
declare var Wkx_resource_text;
declare var Wkx_resource_year;
declare var numero_authors;
declare var CreatorSurname1;
declare var PublisherId;
declare var ResourceId;
declare var User;
declare var busqueda;
// /Saludo/crearMiArticulo

module.exports = {
  crearArticuloQuemado: (req, res) => {
    req.cookies.User
    let parametros = req.allParams(); //obtenemos todos los datos del artículo

    let nuevaCategoria = {

      categoryCategory:parametros.category
    };
    let nuevoCollection = {

      collectionTitle:parametros.journal,
      collectionType:parametros.typejournal
    };

    let nuevoAuthor = {

      creatorFirstname:parametros.nombreAuthores,
      creatorSurname:parametros.apellidoAuthores,
      creatorInitials:parametros.ap,
      creatorPrefix:parametros.ap,
      creatorSameAs:0
    };

    let nuevoAuthor1 = {

      creatorFirstname:parametros.nombreAuthores1,
      creatorSurname:parametros.apellidoAuthores1,
      creatorInitials:parametros.ap,
      creatorPrefix:parametros.ap,
      creatorSameAs:0
    };


    let nuevoAuthor2 = {

      creatorFirstname:parametros.nombreAuthores2,
      creatorSurname:parametros.apellidoAuthores2,
      creatorInitials:parametros.ap,
      creatorPrefix:parametros.ap,
      creatorSameAs:0
    };


    let nuevoAuthor3 = {

      creatorFirstname:parametros.nombreAuthores3,
      creatorSurname:parametros.apellidoAuthores3,
      creatorInitials:parametros.ap,
      creatorPrefix:parametros.ap,
      creatorSameAs:0
    };
    let nuevoAuthor4 = {

      creatorFirstname:parametros.nombreAuthores4,
      creatorSurname:parametros.apellidoAuthores4,
      creatorInitials:parametros.ap,
      creatorPrefix:parametros.ap,
      creatorSameAs:0
    };

    let nuevoAuthor5 = {

      creatorFirstname:parametros.nombreAuthores5,
      creatorSurname:parametros.apellidoAuthores5,
      creatorInitials:parametros.ap,
      creatorPrefix:parametros.ap,
      creatorSameAs:0
    };
    numero_authors=parametros.numero_autores;
    sails.log.info("Parametros",numero_authors);
    let nuevoKeyword = {
      keywordKeyword:parametros.keywords,
    };
    let nuevoPublisher = {
      publisherLocation:parametros.country,
      publisherName:parametros.editorial,
      publisherType: ""
    };

    let nuevoResourse = {
      resourceType: "journal_article",
      resourceTitle:parametros.title,
      resourceSubtitle: parametros.tit,
      resourceShortTitle:parametros.tit,
      resourceTransTitle:parametros.tit,
      resourceTransSubtitle:parametros.tit,
      resourceTransShortTitle:parametros.tit,
      resourceTitleSort:parametros.tit,
      resourceField1:parametros.volume,
      resourceField2:parametros.tit,
      resourceField3:parametros.tit,
      resourceField4:parametros.tit,
      resourceField5:parametros.tit,
      resourceField6:parametros.tit,
      resourceField7:parametros.tit,
      resourceField8:parametros.tit,
      resourceField9:parametros.tit,
      resourceNoSort:parametros.tit,
      resourceTransNoSort:parametros.tit,
      resourceIsbn:parametros.tit,
      resourceBibtexKey:parametros.apellidoAuthores+parametros.year,
      resourceDoi:parametros.doi
    };

    let nuevoArticulo = {

      country: parametros.country,
      number: parametros.number,
      title: parametros.title,
      volume: parametros.volume,
      year: parametros. year,
      journal: parametros. journal,
      editorial: parametros. editorial,
      abstract: parametros.abstract,
      issns:parametros.issns,
      language:parametros.language,
      keywords:parametros.keywords,
      link:parametros.link,
      authores:parametros.authores,
      category:parametros.category,
      pages: parametros. pages,
      notas:parametros.notas,
      fkIdUser:parametros.fkIdUser,
      busqueda:parametros.busqueda,
       doi:parametros.doi

    };

    Articulo.create(nuevoArticulo)
      .exec(
        (error,articuloCreado)=>{
          if(error){
            return res.serverError(error);
          }
          else{
            busqueda=articuloCreado.busqueda
          }
        }
      )

      Wkx_collection.create(nuevoCollection)
        .exec(
          (error,articuloCreado)=>{
            if(error){
              return res.serverError(error);
            }else{
              collectionId=articuloCreado.collectionId,
                Wkx_publisher.create(nuevoPublisher)
                  .exec(
                    (error,articuloCreado)=>{
                      if(error){
                        return res.serverError(error);
                      }else{
                        PublisherId=articuloCreado.publisherId,
                          Wkx_resource_misc.create({
                            resourcemiscCollection:collectionId,
                            resourcemiscPublisher: PublisherId,
                            resourcemiscAddUserIdResource:1,
                            resourcemiscAccesses:2,
                            resourcemiscAccessesPeriod:2,
                            resourcemiscMaturityIndex:0,
                            resourcemiscPeerReviewed:"N",
                            resourcemiscQuarantine:"N"
                          })
                            .exec(
                              (error,articuloCreado)=>{
                                if(error){
                                  return res.serverError(error);
                                }}

                            )
                      }

                    }
                  )
            }
          }
        ),

      Wkx_category.create(nuevaCategoria)
        .exec(
          (error,articuloCreado)=>{
            if(error){
              return res.serverError(error);
            }else{
              CategoryId=articuloCreado.categoryId
              Wkx_resource.create(nuevoResourse)
                .exec(
                  (error,articuloCreado)=>{
                    if(error){
                      return res.serverError(error);
                    }else{
                      ResourceId=articuloCreado.resourceId
                      Wkx_resource_category.create({
                        resourcecategoryResourceId:articuloCreado.resourceId,
                        resourcecategoryCategoryId:CategoryId
                      }).exec(
                        (error,articuloCreado)=>{
                          if(error){
                            return res.serverError(error);
                          }else{
                            Wkx_creator.create(nuevoAuthor)
                              .exec(
                                (error,articuloCreado)=>{
                                  if(error){
                                    return res.serverError(error);
                                  }else{

                                    Wkx_resource_creator.create({
                                      resourcecreatorResourceId:ResourceId,
                                      resourcecreatorCreatorId:articuloCreado.creatorId,
                                      resourcecreatorOrder:1,
                                      resourcecreatorRole:1,
                                      resourcecreatorCreatorMain:articuloCreado.creatorId,
                                      resourcecreatorCreatorSurname:articuloCreado.creatorSurname
                                    }).exec(
                                      (error,articuloCreado)=>{
                                        if(error){
                                          return res.serverError(error);
                                        }else{
                                          CreatorSurname1=articuloCreado.creatorSurname

                                          if(numero_authors >=2){
                                            Wkx_creator.create(nuevoAuthor1)
                                              .exec(
                                                (error,articuloCreado)=>{
                                                  if(error){
                                                    return res.serverError(error);
                                                  }else{
                                                    Wkx_resource_creator.create({
                                                      resourcecreatorResourceId:ResourceId,
                                                      resourcecreatorCreatorId:articuloCreado.creatorId,
                                                      resourcecreatorOrder:1,
                                                      resourcecreatorRole:1,
                                                      resourcecreatorCreatorMain:articuloCreado.creatorId,
                                                      resourcecreatorCreatorSurname:CreatorSurname1
                                                    }).exec(
                                                      (error,articuloCreado)=>{
                                                        if(error){
                                                          return res.serverError(error);
                                                        }else{
                                                          if(numero_authors >=3){
                                                            Wkx_creator.create(nuevoAuthor2)
                                                              .exec(
                                                                (error,articuloCreado)=>{
                                                                  if(error){
                                                                    return res.serverError(error);
                                                                  }else{
                                                                    Wkx_resource_creator.create({
                                                                      resourcecreatorResourceId:ResourceId,
                                                                      resourcecreatorCreatorId:articuloCreado.creatorId,
                                                                      resourcecreatorOrder:1,
                                                                      resourcecreatorRole:1,
                                                                      resourcecreatorCreatorMain:articuloCreado.creatorId,
                                                                      resourcecreatorCreatorSurname:CreatorSurname1
                                                                    }).exec(
                                                                      (error,articuloCreado)=>{
                                                                        if(error){
                                                                          return res.serverError(error);
                                                                        }else{
                                                                          if(numero_authors >=4){
                                                                            Wkx_creator.create(nuevoAuthor3)
                                                                              .exec(
                                                                                (error,articuloCreado)=>{
                                                                                  if(error){
                                                                                    return res.serverError(error);
                                                                                  }else{
                                                                                    Wkx_resource_creator.create({
                                                                                      resourcecreatorResourceId:ResourceId,
                                                                                      resourcecreatorCreatorId:articuloCreado.creatorId,
                                                                                      resourcecreatorOrder:1,
                                                                                      resourcecreatorRole:1,
                                                                                      resourcecreatorCreatorMain:articuloCreado.creatorId,
                                                                                      resourcecreatorCreatorSurname:CreatorSurname1
                                                                                    }).exec(
                                                                                      (error,articuloCreado)=>{
                                                                                        if(error){
                                                                                          return res.serverError(error);
                                                                                        }else{
                                                                                          if(numero_authors >=5){
                                                                                            Wkx_creator.create(nuevoAuthor4)
                                                                                              .exec(
                                                                                                (error,articuloCreado)=>{
                                                                                                  if(error){
                                                                                                    return res.serverError(error);
                                                                                                  }else{
                                                                                                    Wkx_resource_creator.create({
                                                                                                      resourcecreatorResourceId:ResourceId,
                                                                                                      resourcecreatorCreatorId:articuloCreado.creatorId,
                                                                                                      resourcecreatorOrder:1,
                                                                                                      resourcecreatorRole:1,
                                                                                                      resourcecreatorCreatorMain:articuloCreado.creatorId,
                                                                                                      resourcecreatorCreatorSurname:CreatorSurname1
                                                                                                    }).exec(
                                                                                                      (error,articuloCreado)=>{
                                                                                                        if(error){
                                                                                                          return res.serverError(error);
                                                                                                        }else{
                                                                                                          if(numero_authors ==6){
                                                                                                            Wkx_creator.create(nuevoAuthor5)
                                                                                                              .exec(
                                                                                                                (error,articuloCreado)=>{
                                                                                                                  if(error){
                                                                                                                    return res.serverError(error);
                                                                                                                  }else{
                                                                                                                    Wkx_resource_creator.create({
                                                                                                                      resourcecreatorResourceId:ResourceId,
                                                                                                                      resourcecreatorCreatorId:articuloCreado.creatorId,
                                                                                                                      resourcecreatorOrder:1,
                                                                                                                      resourcecreatorRole:1,
                                                                                                                      resourcecreatorCreatorMain:articuloCreado.creatorId,
                                                                                                                      resourcecreatorCreatorSurname:CreatorSurname1
                                                                                                                    }).exec(
                                                                                                                      (error,articuloCreado)=>{
                                                                                                                        if(error){
                                                                                                                          return res.serverError(error);
                                                                                                                        }
                                                                                                                      }
                                                                                                                    )
                                                                                                                  }
                                                                                                                }
                                                                                                              )
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    )
                                                                                                  }
                                                                                                }
                                                                                              )
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    )
                                                                                  }
                                                                                }
                                                                              )
                                                                          }
                                                                        }
                                                                      }
                                                                    )
                                                                  }
                                                                }
                                                              )
                                                          }
                                                        }
                                                      }
                                                    )
                                                  }
                                                }
                                              )
                                          }
                                          Wkx_keyword.create(nuevoKeyword)
                                            .exec(
                                              (error,articuloCreado)=>{
                                                if(error){
                                                  return res.serverError(error);
                                                }else{
                                                  Wkx_resource_keyword.create({
                                                    resourcekeywordResourceId:ResourceId,
                                                    resourcekeywordQuoteId:articuloCreado.key,
                                                    //resourcekeywordParaphraseId:articuloCreado.key,
                                                    // resourcekeywordMusingId:articuloCreado.key,
                                                    resourcekeywordKeywordId:articuloCreado.keywordId
                                                  }).exec(
                                                    (error,articuloCreado)=>{
                                                      if(error){
                                                        return res.serverError(error);
                                                      }else{
                                                        Wkx_resource_page.create({
                                                          resourcepageId:ResourceId,
                                                          resourcepagePageStart:parametros.starpage,
                                                          resourcepagePageEnd:parametros.endpage
                                                        }).exec(
                                                          (error,articuloCreado)=>{
                                                            if(error){
                                                              return res.serverError(error);
                                                            }else{
                                                              Wkx_resource_text.create({
                                                                resourcetextId:ResourceId,
                                                                resourcetextAddUserIdNote:articuloCreado.key,//estos que parecen que no son nada es para que se guarden null en la base
                                                                resourcetextEditUserIdNote:articuloCreado.key,
                                                                resourcetextAddUserIdAbstract:articuloCreado.key,
                                                                resourcetextEditUserIdAbstract:articuloCreado.key,
                                                                resourcetextNote:articuloCreado.key,
                                                                resourcetextAbstract:parametros.abstract,
                                                                resourcetextUrls:parametros.link,
                                                                resourcetextUrlText:articuloCreado.key
                                                              }).exec(
                                                                (error,articuloCreado)=>{
                                                                  if(error){
                                                                    return res.serverError(error);
                                                                  }else{
                                                                    Wkx_resource_year.create({
                                                                      resourceyearId:ResourceId,
                                                                      resourceyearYear1:parametros.year,
                                                                      resourceyearYear2:articuloCreado.y,
                                                                      resourceyearYear3:articuloCreado.y,
                                                                      resourceyearYear4:articuloCreado.y
                                                                    }).exec(
                                                                      (error,articuloCreado)=>{
                                                                        if(error){
                                                                          return res.serverError(error);
                                                                        }else{
                                                                          res.cookie('busqueda',busqueda);
                                                                          //return res.redirect('/bibliotecaUser');
                                                                          return res.redirect('/busquedaMrDlib');
                                                                          //return res.created('Nuevo articulo creado.');
                                                                          //  return res.view('Biblioteca')

                                                                        }
                                                                      }
                                                                    )
                                                                  }
                                                                }
                                                              )
                                                            }
                                                          }
                                                        )

                                                      }
                                                    }
                                                  )
                                                }
                                              }
                                            )
                                        }
                                      }
                                    )
                                  }
                                }
                              )
                          }

                        }
                      )

                    }
                  }
                )
            }
          }
        )
  },
  Busqueda:(req,res)=>{

    Articulo.find().exec((err,articulos)=>{
      if(err) return res.negotiate(err);

      return res.view('bilioteca',{
        articulos:articulos
      })
    })
  },
  bibliotecaUser:(req,res)=>{
   req.cookies.User;
   // req.cookies.busqueda;
    res.clearCookie("busqueda");
   // res.send('Cookie seteada',req.cookies.User)
    var parametros = req.allParams();
      User
        .findOne()
        .where({
          id: req.cookies.User
        })
        .exec(function (err,User) {
          if (err){
            return res.negotiate(err);}
          if (User) {
            //Si encontro
            // User:User
            if(!parametros.biblioteca){
              parametros.biblioteca ='';
              parametros.idUsuario =req.cookies.User;
            }
            Articulo.find()
              .where({
                fkIdUser:req.cookies.User,
                title:{
                  contains:parametros.biblioteca
                }
              }).exec(function (err, articulos) {
              if (err) {
                return res.serverError(err);
              }
              if (!articulos) {
                return res.view('/busqueda');
              }
              return res.view('biblioteca',{
                articulos:articulos,
                User:User
              });

            });
          }
          else {
            //No encontro
            return res.redirect('/');
          }
        });

  },
  crearUsuario:(req,res)=>{
    return res.view('busqueda')
  },

}
