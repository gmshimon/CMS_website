import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema(
  {
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conference',
      required: true,
      index: true
    },

    // Day-wise scheduling
    day: {
      type: String, // e.g., "Day 1", "Day 2"
      required: true
    },
    date: {
      type: Date,
      required: true
    },

    // Session info
    session: {
      type: String, // e.g., "Session 1", "Session 2"
      required: true
    },
    // track: {
    //   type: String, // e.g., "Computer Science"
    //   required: true
    // },
    // subTrack: {
    //   type: String // e.g., "Artificial Intelligence"
    // },

    // Timing
    startTime: {
      type: String, // store as "HH:mm"
      required: true,
      validate: {
        validator: function (v) {
          return this.endTime ? v < this.endTime : true
        },
        message: 'Start time must be before end time'
      }
    },
    endTime: {
      type: String, // store as "HH:mm"
      required: true
    },

    // Abstract type (presentation/poster, online/offline)
    abstractType: {
      type: String,
      enum: [
        'Paper Presentation Online',
        'Paper Presentation Physical',
        'Poster Presentation Online',
        'Poster Presentation Physical'
      ],
      required: true
    },

    // Meeting info (for online sessions)
    meetingLink: {
      type: String,
      required: function () {
        return this.abstractType.includes('Online')
      }
    },

    // Chair & Moderator
    sessionChair: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    moderator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },

    // Assigned abstracts
    abstracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'abstract'
      }
    ],

    // Location info for physical sessions
    venue: {
      type: new mongoose.Schema({
        building: String,
        hall: String,
        room: String
      }),
      required: function () {
        return this.abstractType.includes('Physical')
      }
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true }
)
const Schedule = mongoose.model('schedule', scheduleSchema)

export default Schedule
