const { Thought, User } = require('../models');

module.exports = {
  async getThought(req, res) {
    try {
      const thought = await Thought.find({});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }
  
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }
  
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add Thought Reaction
async addThoughtReaction(req, res) {
  try {
    // Find the thought by its ID and add a new reaction to its "reactions" array
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    // If the thought doesn't exist (i.e., it's not found), return a 404 response
    if (!thought) {
      return res.status(404).json({ message: 'No Thought with this ID!' });
    }

    // Respond with the updated thought document
    res.json(thought);
  } catch (err) {
    // If any errors occur during the process, return a 500 response with the error message
    res.status(500).json(err);
  }
},

// Remove Thought Reaction
async removeThoughtReaction(req, res) {
  try {
    // Find the thought by its ID and remove a specific reaction from its "reactions" array
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    // If the thought doesn't exist (i.e., it's not found), return a 404 response
    if (!thought) {
      return res.status(404).json({ message: 'No Thought with this ID!' });
    }

    // Respond with the updated thought document
    res.json(thought);
  } catch (err) {
    // If any errors occur during the process, return a 500 response with the error message
    res.status(500).json(err);
  }
},
};