import Student from "../../model/Student.js";

export const getAllStudent = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    page = Math.max(1, page);
    // Sorting
    const sortField = req.query.sortBy || "fullname";
    const sortOrder = req.query.order === "desc" ? -1 : 1;

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Search
    const keyword = req.query.search || "";

    // Retrieve student with pagination ,sorting and searching
    const allStudent = await Student.find({
      $or: [
        { fullname: { $regex: keyword, $options: "i" } }, // Case-insensitive substring match
        //   { email: { $regex: keyword, $options: 'i' } },
        // Add more fields for searching as needed
      ],
    })
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "All students retrieved successfully",
      FormData: allStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while retrieving student",
      error,
    });
  }
};

// to get single entry
export const getSingleStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const studentDetails = await Student.findById(studentId);

    if (!studentDetails) {
      return res.status(404).json({
        success: false,
        message: "student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single student details retrieved successfully",
      FormData: studentDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while retrieving student details",
      error,
    });
  }
};
