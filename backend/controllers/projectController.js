const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (files) => {
  const urls = [];
  if (!files || files.length === 0) return urls;

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "portfolio-projects",
    });
    urls.push(result.secure_url);
    fs.unlinkSync(file.path);
  }
  return urls;
};

const getPublicId = (url) => {
  const parts = url.split("/");
  const file = parts[parts.length - 1];
  return `portfolio-projects/${file.split(".")[0]}`;
};

exports.createProject = async (req, res) => {
  try {
    const imageUrls = await uploadToCloudinary(req.files);

    const projectData = {
      ...req.body,
      images: imageUrls,
    };

    const project = await Project.create(projectData);

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    let images = project.images;

    if (req.files && req.files.length > 0) {
      const newImages = await uploadToCloudinary(req.files);
      images = images.concat(newImages);
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.techStack = req.body.techStack || project.techStack;
    project.githubUrl = req.body.githubUrl || project.githubUrl;
    project.liveUrl = req.body.liveUrl || project.liveUrl;
    project.featured = req.body.featured ?? project.featured;
    project.images = images;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    for (const img of project.images) {
      await cloudinary.uploader.destroy(getPublicId(img));
    }

    await project.deleteOne();
    res.json({ message: "Project and images deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
