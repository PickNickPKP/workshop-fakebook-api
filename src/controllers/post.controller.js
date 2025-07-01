import fs from "fs/promises";
import path from "path";
import cloudinary from "../config/cloudinary.config.js";
import prisma from "../config/prisma.config.js";

export const getAllPosts = async (req, res, next) => {
  const resp = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc", // order by createdAt in descending order
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
  });
  res.json({ posts: resp });
};

export const createPost = async (req, res, next) => {
  const { message } = req.body; // text message from the user
  console.log(req.file);
  let uploadResult = null;
  // if a file is uploaded, we can upload it to cloudinary
  let haveFile = !!req.file; // check if a file is uploaded
  if (haveFile) {
    uploadResult = await cloudinary.uploader.upload(req.file.path, {
      overwrite: true,
      public_id: path.parse(req.file.path).name,
    }); // upload the file to cloudinary
    // //path.parse(req.file.path).name will give us the file name without extension(.jpg, .png, etc.)
    fs.unlink(req.file.path); // delete the file from the server after uploading to cloudinary
    // console.log(uploadResult);
  }
  const data = {
    message,
    image: uploadResult?.secure_url || '', // secure_url is the url of the image in cloudinary
    userId: req.user.id, // user id from the token
  };

  const rs = await prisma.post.create({
    data,
  });

  res.status(201).json({ message: "Create a new post", result: rs });
};

export const updatePost = async (req, res, next) => {
  res.json({ message: "Update post with ID" });
};

export const deletePost = async (req, res, next) => {
  res.json({ message: "Delete post with ID" });
};
