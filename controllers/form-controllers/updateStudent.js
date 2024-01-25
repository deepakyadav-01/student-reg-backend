import Student from "../../model/Student.js";

export const updateForm = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { fullname, dob, age, email, mobileno, gender, address } = req.body;
    if (
      !fullname ||
      !dob ||
      !age ||
      !email ||
      !mobileno ||
      !gender ||
      !address
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid email address",
      });
    }
    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (!mobileRegex.test(mobileno)) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid 10-digit mobile number",
      });
    }
    const formData = await Student.findById(studentId);
    if (!formData) {
      return res.status(404).json({
        success: false,
        message: "student not found",
      });
    }
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        fullname: fullname || employee.fullname,
        dob: dob || employee.dob,
        age: age || employee.age,
        email: email || employee.email,
        mobileno: mobileno || employee.mobileno,
        gender: gender || employee.gender,
        address: address || employee.address,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "student updated successfully",
      updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating student",
      error,
    });
  }
};
