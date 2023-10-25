const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  addUserFriend,
  removeUserFriend,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

// Route for adding and removing friends
router.route('/:userId/friends/:friendId')
  .post(addUserFriend) // Adds a friend
  .delete(removeUserFriend); // Removes a friend

// Route for getting all users and creating a new user
router.route('/')
  .get(getUsers) // Get all users
  .post(createUser); // Create a new user

// Route for getting, updating, and deleting a single user
router.route('/:userId')
  .get(getSingleUser) // Get a single user
  .put(updateUser) // Update a user
  .delete(deleteUser); // Delete a user

module.exports = router;
