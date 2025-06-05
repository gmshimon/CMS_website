import conference from "./conference.model.js"

export const createConference = async(req,res,next)=>{
    try {
        const data = req.body

        const response = await conference.create(data)

        res.status(200).json({
            status:200,
            message:'New Conference created',
            data:response
        })
    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
}

export const getConference = async(req,res,next)=>{
    try {
        const data = await conference.findOne({}).lean()

        res.status(200).json({
            status:'success',
            message:'Successfully fetched the data',
            data:data
        })
    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
}