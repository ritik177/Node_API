const users = require("../models/userSchema");
const moment = require("moment"); // hame date bhi import karani hai isliye usse karenge

//create user


exports.userpost = async (req, res) => {
  const { firstname, email, mobile, gender, status } = req.body;
  // agar ek bhi field missing hui to usko error show karayenge
  if (!firstname || !email || !mobile || !gender || !status) {
    res.status(400).json({ error: "All Input is required" });
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ error: "This user already exist in our database" });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const userData = new users({
        firstname,
        email,
        mobile,
        gender,
        status,
        datecreated: dateCreate,
      });

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error ");
  }
};

//get all users
exports.getUsers = async(req,res)=>{

  const search = req.query.search || "";
  const status = req.query.status || "";
  const gender = req.query.gender || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE =req.query.iteams ||4;

  



  const query = {
    firstname:{$regex:search,$options:"i"}
  }
  // regex used for search that is a mongo db key.
  // $options:"i" used for case insensite( it means convert upcase or lowercase both )

   if(status !== 'All'){
    query.status = status;
   }

   if(gender !== 'All'){
    query.gender = gender;
   }

  

  //  console.log(query);

 try {

  //skip  for page
  const skip = (page-1) * ITEM_PER_PAGE;

  //count Document
  const count = await users.countDocuments(query);

  const usersData = await users.find(query)
  .sort({datecreated:sort == "new" ? -1 : 1})
   // FOR PAGE 
   .limit(ITEM_PER_PAGE)
   .skip(skip);

   //page calculation 
    const pageCount = Math.ceil(count/ITEM_PER_PAGE);  // 8/4 =2

     
    
  // res.status(200).json(usersData);
  res.status(200).json({
    pagination:{
      count:pageCount 
    },
    usersData
  });


 } catch (error) {
  res.status(400).json(error);
  console.log("catch block error");
 }
}


//get single user
exports.getSingleuser = async(req,res)=>{
  const {id} = req.params;

  try {
    const singleUserData = await users.findOne({_id:id});

    res.status(200).json(singleUserData );
  } catch (error) {
    res.status(400).json(error);
  console.log("catch block error");
  }
}

//delete user 
 
exports.deleteuser = async(req,res)=>{
  const {id} =req.params;

  try {
    const deleteUserData = await users.findByIdAndDelete({_id:id});
    res.status(200).json(deleteUserData);
  } catch (error) {
    res.status(400).json(error);
  console.log("catch block error");
  } 
}

//update user

exports.updateUser =async(req,res)=>{
  const {id} = req.params;
  const { firstname, email, mobile, gender, status } = req.body;


  try {
    const dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    const updateUserdata = await users.findByIdAndUpdate({_id:id},{
      firstname,
      email,
      mobile,
      gender,
      status,
      dateUpdated: dateUpdate,
    },{new:true});//isko isliye likhe hai kyuni jab bhi hum update karenge to ye update value ko return kare nahi to ye purani value ko hi show karta rahega 
    
    await updateUserdata.save();
    res.status(200).json(updateUserdata);
     
  } catch (error) {
    res.status(400).json(error);
  console.log("catch block error");
  }
}