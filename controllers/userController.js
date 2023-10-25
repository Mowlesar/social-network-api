const {User} = require('../models/');
const mongoose = require("mongoose");

module.exports = {
  async getUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      console.log(req.params);
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addUserFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
  
      const friend = await User.findById(req.params.friendId);
  
      if (!user || !friend) {
        // Send a 404 Not Found response for the case where either user or friend is not found.
        res.status(404).json({ message: 'No user or friend with this id.' });
      } else {
        // Send a 200 OK response with the updated user information.
        res.json(user);
      }
    } catch (err) {
      // Handle the error and send an appropriate error response.
      console.error(err); // Log the error for debugging purposes.
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async removeUserFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      );

      if (!user) {
        res.status(404).json({message: 'No user with this id.'});
      } else {
        res.json('friend deleted!');
      }
    } catch(err) {
      res.status(500).json(err);
    }
  },
};