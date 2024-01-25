import Student from "../../model/Student.js";

export const editStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { fullname, dob, age, email, mobileno, gender, address } = req.body;

    // server side validation for PATCH request
    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate mobile number format
    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (mobileno && !mobileRegex.test(mobileno)) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid 10-digit mobile number",
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "student not found",
      });
    }
// give a variable for update  using spread
    // Update student's information
    const editedStudent = await Student.findByIdAndUpdate(
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
      // check this 
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "student edited successfully",
      editedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while editing student",
      error,
    });
  }
};
