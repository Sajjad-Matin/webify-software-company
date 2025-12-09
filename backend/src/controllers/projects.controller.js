import Project from "../models/Project.js";
import fs from "fs";
import path from "path";

export async function getProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    console.error("Error in getProjects Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createProject(req, res) {
  try {
    const { title, description, link, image, technologies } = req.body;
    if (
      !title ||
      !description ||
      //!image || // image can come from upload (req.file) or body
      !technologies ||
      technologies.length === 0 ||
      !link
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingProject = await Project.findOne({ link });
    if (existingProject) {
      return res
        .status(400)
        .send({ message: "Project with this link already exists" });
    }

    // Normalize technologies: accept array, JSON string, or CSV
    let parsedTechs = technologies;
    if (typeof parsedTechs === "string") {
      try {
        parsedTechs = JSON.parse(parsedTechs);
      } catch (e) {
        // fallback to CSV
        parsedTechs = parsedTechs
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    // If a file was uploaded, move it into public/images/projects and set image path
    let imagePath = image;
    if (req.file) {
      const uploadsDir = path.join(
        process.cwd(),
        "public",
        "images",
        "projects"
      );
      await fs.promises.mkdir(uploadsDir, { recursive: true });

      const filename = req.file.filename || path.basename(req.file.path);
      const srcPath = req.file.path;
      const destPath = path.join(uploadsDir, filename);

      // Move file into projects subfolder
      await fs.promises.rename(srcPath, destPath);

      // Publicly served path (express serves from backend/public as /images)
      imagePath = `/images/projects/${filename}`;
    }

    const newProject = await Project.create({
      title,
      description,
      link,
      image: imagePath,
      technologies: parsedTechs,
    });

    res.status(201).send(newProject);
  } catch (error) {
    console.error("Error in createProject Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateProject(req, res) {
  try {
    const { title, description, link, image, technologies } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    // Handle uploaded image: move to projects folder and delete old image file
    let imagePath = image || project.image;
    if (req.file) {
      const uploadsDir = path.join(
        process.cwd(),
        "public",
        "images",
        "projects"
      );
      await fs.promises.mkdir(uploadsDir, { recursive: true });

      const filename = req.file.filename || path.basename(req.file.path);
      const srcPath = req.file.path;
      const destPath = path.join(uploadsDir, filename);

      await fs.promises.rename(srcPath, destPath);
      imagePath = `/images/projects/${filename}`;

      // Delete old image file if it was in /images/projects
      if (project.image && project.image.startsWith("/images/projects/")) {
        const oldFilename = project.image.replace("/images/projects/", "");
        const oldPath = path.join(
          process.cwd(),
          "public",
          "images",
          "projects",
          oldFilename
        );
        fs.promises.unlink(oldPath).catch(() => {});
      }
    }

    project.title = title;
    project.description = description;
    project.link = link;

    // Normalize technologies on update: accept array, JSON string, or CSV
    let parsedTechs = technologies;
    if (typeof parsedTechs === "string") {
      try {
        parsedTechs = JSON.parse(parsedTechs);
      } catch (e) {
        parsedTechs = parsedTechs
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }
    project.technologies = parsedTechs || project.technologies;
    project.image = imagePath;

    const updatedProject = await project.save();
    if (!updatedProject) {
      return res.status(404).send({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error in updateProject Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteProject(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send({ message: "Project not found" });
    }
    // Remove associated image file if it exists in projects folder
    if (
      deletedProject.image &&
      deletedProject.image.startsWith("/images/projects/")
    ) {
      const filename = deletedProject.image.replace("/images/projects/", "");
      const imgPath = path.join(
        process.cwd(),
        "public",
        "images",
        "projects",
        filename
      );
      fs.promises.unlink(imgPath).catch(() => {});
    }

    res.status(200).send({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error while deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
