export const getAllPosts = async (req, res, next) => {
  res.json({ message: "Get all posts" });
};

export const createPost = async (req, res, next) => {
  res.json({ message: "Create a new post" });
};

export const updatePost = async (req, res, next) => {
  res.json({ message: "Update post with ID" });
};

export const deletePost = async (req, res, next) => {
  res.json({ message: "Delete post with ID" });
};
