import Student from '../../model/Student.js';

export const submitForm = async (req, res) => {
    try {
      const { fullname, dob, age, email, mobileno, gender,address } = req.body;
           // Server-side validation
     if (!fullname  || !dob || !age || !email || !mobileno || !gender ||  !address) {
        return res.status(400).send({
          success: false,
          message: 'All fields are required',
        });
      }
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({
          success: false,
          message: 'Please provide a valid email address',
        });
      }
      const mobileRegex = /^[6-9][0-9]{9}$/;
      if (!mobileRegex.test(mobileno)) {
        return res.status(400).send({
          success: false,
          message: 'Please provide a valid 10-digit mobile number',
        });
      }
      const exisitingStudent = await Student.findOne({ email });
      //exisiting user
      if (exisitingStudent) {
        return res.status(200).send({
          success: false,
          message: "student already exist",
        });
      }
      const formData = await new Student({
        fullname,
        dob,
        age,
        email,
        mobileno,
        gender,
        address
      }).save();
      res.status(201).send({
        success: true,
        message: "student added Successfully",
        formData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Adding data!!!!!",
        error,
      });
    }
  };