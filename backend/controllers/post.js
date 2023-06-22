const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  if (req.file != null) {
    let userId = req.body.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let legend = req.body.legend;
    let likes = req.body.likes;
    let usersLiked = req.body.usersLiked;
    delete userId;

    const post = new Post({
      userId: req.auth.userId,
      firstName: firstName,
      lastName: lastName,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      legend: legend,
      likes: likes,
      usersLiked: usersLiked,
    });

    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Post enregistré !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {

    let userId = req.body.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let legend = req.body.legend;
    let likes = req.body.likes;
    let usersLiked = req.body.usersLiked;
    delete userId;

    const post = new Post({
      userId: req.auth.userId,
      firstName: firstName,
      lastName: lastName,
      legend: legend,
      imageUrl: req.file, 
      likes: likes,
      usersLiked: usersLiked,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Post enregistré !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
      .sort({ _id: "desc" }) 
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file
      ? 
        {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : 
        { ...req.body };
    delete postObject._userId;
  
    Post.findOne({ _id: req.params.id }) 
      .then((post) => {
        const userIdCreator = post.userId;
  
        User.findOne({ _id: req.auth.userId }) 
          .then((user) => {
            if ((post.userId = req.auth.userId) || user.isAdmin) {
              if (!postObject.imageUrl) {
  
                if (postObject.image == "deleteImg" && post.imageUrl != "") {
  
                  if (user.isAdmin) {
                    const filename = post.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                      Post.updateOne(
                        { _id: req.params.id },
                        {
                          ...postObject,
                          userId: userIdCreator,
                          firstName: post.firstName,
                          lastName: post.lastName,
                          imageUrl: "",
                          _id: req.params.id,
                        }
                      )
                        .then(() =>
                          res
                            .status(200)
                            .json({ message: "Post modifié par Admin !" })
                        )
                        .catch((error) => res.status(401).json({ error }));
                    });
                  } else {
                    const filename = post.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                      Post.updateOne(
                        { _id: req.params.id },
                        { ...postObject, imageUrl: "", _id: req.params.id }
                      )
                        .then(() =>
                          res.status(200).json({ message: "Post modifié!" })
                        )
                        .catch((error) => res.status(401).json({ error }));
                    });
                  }
                }
                if (!post.imageUrl && !postObject.image) {
  
                  if (user.isAdmin) {
                    Post.updateOne(
                      { _id: req.params.id },
                      {
                        ...postObject,
                        userId: userIdCreator,
                        firstName: post.firstName,
                        lastName: post.lastName,
                        _id: req.params.id,
                      }
                    )
                      .then(() =>
                        res
                          .status(200)
                          .json({ message: "Post modifié par Admin !" })
                      )
                      .catch((error) => res.status(401).json({ error }));
                  } else {
                    Post.updateOne(
                      { _id: req.params.id },
                      { ...postObject, _id: req.params.id }
                    )
                      .then(() =>
                        res
                          .status(200)
                          .json({ message: "Texte du post modifié!" })
                      )
                      .catch((error) => res.status(401).json({ error }));
                  }
                }
                if (!postObject.image && post.imageUrl) {
  
                  if (user.isAdmin) {
                    Post.updateOne(
                      { _id: req.params.id },
                      {
                        ...postObject,
                        userId: userIdCreator,
                        firstName: post.firstName,
                        lastName: post.lastName,
                        _id: req.params.id,
                      }
                    )
                      .then(() =>
                        res
                          .status(200)
                          .json({ message: "Post modifié par Admin !" })
                      )
                      .catch((error) => res.status(401).json({ error }));
                  } else {
                    Post.updateOne(
                      { _id: req.params.id },
                      { ...postObject, _id: req.params.id }
                    )
                      .then(() =>
                        res.status(200).json({ message: "Post modifié !" })
                      )
                      .catch((error) => res.status(401).json({ error }));
                  }
                }
              }
              if (postObject.imageUrl && post.imageUrl && !postObject.image) {
  
                if (user.isAdmin) {
                  const filename = post.imageUrl.split("/images/")[1];
                  fs.unlink(`images/${filename}`, () => {
                    Post.updateOne(
                      { _id: req.params.id },
                      {
                        ...postObject,
                        userId: userIdCreator,
                        firstName: post.firstName,
                        lastName: post.lastName,
                        _id: req.params.id,
                      }
                    )
                      .then(() =>
                        res
                          .status(200)
                          .json({ message: "Post modifié par Admin !" })
                      )
                      .catch((error) => res.status(401).json({ error }));
                  });
                } else {
                  const filename = post.imageUrl.split("/images/")[1];
                  fs.unlink(`images/${filename}`, () => {
                    Post.updateOne(
                      { _id: req.params.id },
                      { ...postObject, _id: req.params.id }
                    )
                      .then(() =>
                        res.status(200).json({ message: "Post modifié !" })
                      )
                      .catch((error) => res.status(401).json({ error }));
                  });
                }
              }
              if (postObject.imageUrl && !post.imageUrl && !postObject.image) {
  
                if (user.isAdmin) {
                  Post.updateOne(
                    { _id: req.params.id },
                    {
                      ...postObject,
                      userId: userIdCreator,
                      firstName: post.firstName,
                      lastName: post.lastName,
                      imageUrl: postObject.imageUrl,
                      _id: req.params.id,
                    }
                  )
                    .then(() =>
                      res.status(200).json({ message: "Post modifié par Admin!" })
                    )
                    .catch((error) => res.status(401).json({ error }));
                } else {
                  Post.updateOne(
                    { _id: req.params.id },
                    {
                      ...postObject,
                      imageUrl: postObject.imageUrl,
                      _id: req.params.id,
                    }
                  )
                    .then(() =>
                      res.status(200).json({ message: "Post modifié !" })
                    )
                    .catch((error) => res.status(401).json({ error }));
                }
              }
            } else {
              res.status(401).json({ message: "Not authorized" });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
};
  
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }) 
      .then((post) => {
        User.findOne({ _id: req.auth.userId })
          .then((user) => {
            if ((post.userId = req.auth.userId) || user.isAdmin) {
              if (post.imageUrl) {
                const filename = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({ _id: req.params.id })
                    .then(() => {
                      return res.status(200).json({ message: "Post deleted !" });
                    })
                    .catch((error) => res.status(401).json({ error }));
                });
              } else {
                Post.deleteOne({ _id: req.params.id })
                  .then(() => {
                    return res.status(200).json({ message: "Post deleted !" });
                  })
                  .catch((error) => res.status(401).json({ error }));
              }
            } else {
              return res.status(401).json({ message: "Not authorized" });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};

// Liking post part

exports.likePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }) 
      .then((post) => {
          if (req.body.like == 1) {
            if (!post.usersLiked.includes(req.auth.userId)){
              post.likes++;
              post.usersLiked.push(req.body.userId);
            } else {
              res.status(401).json({
                error : "Post déjà Liké",
              });
              return;
            }
        }
        else if (req.body.like == -1) {
          let userFound = post.usersLiked.findIndex(
            (userId) => userId == req.body.userId
          );
          if (userFound != -1) {
            post.usersLiked.splice(userFound, 1);
            post.likes--; 
          }
        }
        post.save();
        res.status(201).json({ message: "Avis modifiée !" });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
};