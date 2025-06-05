import mongoose from 'mongoose'

const conferenceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    category: [String],
    theme: [String],
    presentation_method: [String],
    publication_option: [String],
    workshopOptions:[
        {
            title:{
                type:String
            },
            price:{
                type:Number
            }
        }
    ]
  },
  {
    timestamps: true
  }
)

const conference = mongoose.model('conference', conferenceSchema)

export default conference
