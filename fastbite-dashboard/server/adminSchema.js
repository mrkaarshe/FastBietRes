import mongoose from "mongoose";
const AdminSchema = mongoose.Schema(
    {
        name:{type : String},
        email:{type : String , required : true},
        password:{type:String , required : true},
        role :{type : String , default : 'user'}
    },
    {
        timestamps : true
    }
)
export default mongoose.model('admin',AdminSchema)