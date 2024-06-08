import User from "../models/user.model.js";

// Get all users
const getUsers = async (req, res) => {
  const { page = 1, limit, search = "" } = req.query;
  const skip = (page - 1) * limit;
  const searchQuery = search ? { name: { $regex: search, $options: "i" } } : {};

  try {
    const users = await User.find(searchQuery).skip(skip).limit(parseInt(limit));
    const totalUsers = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({ users, totalPages });
  } catch (error) {
    console.log("Error in getUsers controller", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid user data, can't create user" });
    }
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log("Error in createUser controller", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get user by clerkId
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.id })
      .populate({
        path: 'recentActivity.comments',
        populate: {
          path: 'postId',
          select: 'visibility'
        }
      })
      .populate('recentActivity.posts')
      .populate({
        path: 'favorites',
        options: { sort: {date : -1} }
      })
      

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserById controller", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update user by clerkId
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { clerkId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser controller", error.message);
    res.status(400).json({ error: error.message });
  }
};

export { getUsers, createUser, getUserById, updateUser };
