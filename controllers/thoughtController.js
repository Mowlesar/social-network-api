const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find({});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      // const thoughtId = req.params.thoughtId; // Store the thoughtId in a variable
      // console.log("Received thoughtId:", thoughtId);
      // const thought = await Thought.findOne({ _id });

      const thought = await Thought.findById(req.params.id)

  
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
async createThought (req, res) {
    try {
      // Create the thought
      const thought = await Thought.create(req.body);
  
      // Find the user based on the username from the request body
      const username = req.body.username;
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's thoughts field with the newly created thought's ID
      user.thoughts.push(thought._id);
      await user.save();
  
      // Return the thought
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
  
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
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

async updateThought(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate
      (req.params.id, req.body, {runValidators: true, new: true });

    if (!thought) {
      return res.status(404).json({ message: 'No Thought with this id!' });
    };

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
};