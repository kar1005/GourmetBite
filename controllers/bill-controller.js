const Bill = require('../models/bill');

exports.getBills = async (req,res)=>{
    try{
        const bills = await Bill.find();
        res.status(200).json(bills);
    }catch{
        res.status(500).send({message: 'Error fetching bills'});
    }
};

exports.getBillByID = async (req,res)=>{
    try{
        const  bill = Bill.findById(req.params.id);
        if(!bill){
            res.status(404).send({message:'Bill not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching bill'});
    }
}

// exports.addBill = async(req,res)=>{
//     try{
//         const mockRequest ={
//             params:{phone:  req.body.phone},

//         };
//         const mockResponse = {
//             status: (code) => ({
//                 json: (data) => console.log('Mock response data:', data),
//             }),
//             json: (data) => console.log('Mock response data:', data),
//         };
//     }catch{

//     }
// }