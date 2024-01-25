import Student from "../../model/Student.js";

// DELETE request Delete an employee using its ID
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if the employee exists
    const existingStudent = await Student.findById(studentId);

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Remove the employee from the database
    await Student.findByIdAndRemove(studentId);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting student",
      error,
    });
  }
};
