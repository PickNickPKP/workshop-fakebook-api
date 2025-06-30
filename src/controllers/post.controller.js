export const getAllPosts = async (req, res, next) => {
  res.json({ message: "Get all posts" });
};

export const createPost = async (req, res, next) => {
  console.log(req.body.message);
  console.log(req.file);
  res.json({ message: "Create a new post", file: req.file , body: req.body });
};

export const updatePost = async (req, res, next) => {
  res.json({ message: "Update post with ID" });
};

export const deletePost = async (req, res, next) => {
  res.json({ message: "Delete post with ID" });
};
