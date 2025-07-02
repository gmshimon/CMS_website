import role from "./role.model.js"

export const getRole = async(req,res,next)=>{
    try {
        const data = await role.find({})
        res.status(200).json({
            status:'success',
            message:"fetched the role successfully",
            data:data
        })
    } catch (error) {
        res.status(400).json({
            status:'Fail',
            message:"Failed to get role"
        })
    }
}