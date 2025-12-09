import Team from "../models/Team.js";
import fs from "fs";
import path from "path";

export async function getTeamMembers(req, res) {
  try {
    const teamMembers = await Team.find();

    return res.status(200).send(teamMembers);
  } catch (error) {
    console.error("Error in getTeamMembers controller:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function addTeamMember(req, res) {
  try {
    const { fullName, email, role, description } = req.body;
    if (!fullName || !role || !description) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const existingMember = await Team.findOne({ fullName });
    if (existingMember) {
      return res.status(400).send({ message: "Member already exists" });
    }

    let imagePath = undefined;
    if (req.file) {
      // store a relative path the frontend can fetch from the static public folder
      imagePath = `/images/${req.file.filename}`;
    }

    const newMember = await Team.create({
      fullName,
      email,
      role,
      description,
      image: imagePath,
    });

    res.status(201).send(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Interval Server Error" });
  }
}

export async function updateTeamMember(req, res) {
  try {
    const { fullName, role, description } = req.body;
    let imagePath = undefined;
    if (req.file) {
      imagePath = `/images/${req.file.filename}`;
    }

    const updatePayload = { fullName, role, description };
    if (imagePath) updatePayload.image = imagePath;

    // If a new image was uploaded, attempt to remove the old image file
    if (imagePath) {
      try {
        const existing = await Team.findById(req.params.id).select("image");
        if (existing && existing.image) {
          // existing.image expected like '/images/<filename>' or a full URL
          let filename = existing.image;
          // normalize to filename only
          if (filename.startsWith("/images/"))
            filename = filename.replace(/^\/images\//, "");
          else {
            try {
              const url = new URL(existing.image);
              filename = path.basename(url.pathname);
            } catch (e) {
              filename = path.basename(filename);
            }
          }

          const filePath = path.join(
            process.cwd(),
            "public",
            "images",
            filename
          );
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
            } catch (err) {
              console.warn("Failed to remove old team image:", err.message);
            }
          }
        }
      } catch (err) {
        console.warn(
          "Error while attempting to remove previous image:",
          err.message
        );
      }
    }

    const updatedTeamMember = await Team.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true }
    );
    if (!updatedTeamMember) {
      return res.status(404).send({ message: "User not found" });
    }

    // Return the updated user document
    res.status(200).json(updatedTeamMember);
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteTeamMember(req, res) {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).send({ message: "Member not found" });
    }
    // If the deleted member had a stored image, remove it from disk
    if (deletedTeam.image) {
      try {
        let filename = deletedTeam.image;
        if (filename.startsWith("/images/"))
          filename = filename.replace(/^\/images\//, "");
        else {
          try {
            const url = new URL(deletedTeam.image);
            filename = path.basename(url.pathname);
          } catch (e) {
            filename = path.basename(filename);
          }
        }

        const filePath = path.join(process.cwd(), "public", "images", filename);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.warn("Failed to remove team image on delete:", err.message);
          }
        }
      } catch (err) {
        console.warn("Error removing image after delete:", err.message);
      }
    }

    res.status(200).send({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error while deleting member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
