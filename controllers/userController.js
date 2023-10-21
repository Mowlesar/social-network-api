const {User} = require('../models/');

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
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      );

      if (!user) {
        res.status(404).json({message: 'No user with this id.'});
      } else {
        res.json(user);
      }
    } catch(err) {
      res.status(500).json(err);
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
        res.json(user);
      }
    } catch(err) {
      res.status(500).json(err);
    }
  },
};