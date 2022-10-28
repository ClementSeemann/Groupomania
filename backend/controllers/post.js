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