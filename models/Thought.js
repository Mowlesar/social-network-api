const { Schema, model } = require('mongoose');
const reactionSchema = require('./Thought')


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
        reactions: [reactionSchema],
},
{
    toJSON: {
        virtual: true,
        getters: true,
    },
    id:false,
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const User = model('Thought', thoughtSchema);

module.exports = thoughtSchema;