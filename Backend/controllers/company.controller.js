import Company from "../models/company.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "You cannot register same Company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company Registered Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(400).json({
        message: "No companies found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Companies fetched successfully",
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company fetched successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;
    const file = req.file;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

      if(file){
      const cloudinaryResponse = await uploadOnCloudinary(file);

      if (!cloudinaryResponse) {
        return res.status(500).json({
          message: "Failed to upload logo",
          success: false,
        });
      }
        company.logo = cloudinaryResponse.secure_url;
      }

    const companyUpdated = await Company.findByIdAndUpdate(
      companyId,
      {
        name,
        description,
        website,
        location,
        logo: company.logo,
    }
      ,
      { returnDocument: 'after' }
    );

    return res.status(200).json({
      message: "Company information updated",
      companyUpdated,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export{
    registerCompany,
    getCompanies,
    getCompanyById,
    updateCompany
}
