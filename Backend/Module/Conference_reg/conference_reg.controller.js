import conference_reg from './conference_reg.model.js'

export const getConferenceReg = async (req, res, next) => {
  try {
    const { conference_id } = req.params
    // const { id } = req.user

    const results = await conference_reg
      .find({
        conference: conference_id
        //   createdBy: id
      })
      .populate([
        {
          path: 'conference'
        },
        {
            path:'abstract',
            select:'paper_title theme'
        }
      ])

    res.status(200).json({
      status: 'Success',
      message: 'Fetched the conference registration successfully',
      data: results
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}


export const getSingleConferenceReg = async (req,res,next)=>{
    try {
        const {id} = req.params

        const response = await conference_reg.findOne({
            _id:id
        }).populate([
        {
          path: 'conference'
        },
        {
            path:'abstract',
        }
      ])

      res.status(200).json({
        status:'Success',
        message:"Fetched successfully",
        data:response
      })
    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
}