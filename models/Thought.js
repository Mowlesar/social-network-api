const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  );

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLenght: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        reactions: [reactionSchema],
},
);

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;