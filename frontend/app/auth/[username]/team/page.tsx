"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import useTeam from "@/hooks/useTeam";
import useAddTeam from "@/hooks/use-add-team";
import useUpdateTeam from "@/hooks/use-update-team";
import useDeleteTeam from "@/hooks/use-delete-team";
import Image from "next/image";
import avatar from "../../../../public/avatar.png";

const TeamMembersPage = () => {
  const { data: users, isLoading, isError } = useTeam();
  const addTeamMember = useAddTeam();
  const editTeamMember = useUpdateTeam();
  const deleteTeam = useDeleteTeam();
  const queryClient = useQueryClient();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editedTeamMember, setEditedTeamMember] = useState<{
    image?: File | string;
    fullName: string;
    role: string;
    description: string;
  }>({
    image: undefined,
    fullName: "",
    role: "",
    description: "",
  });
  const [addErrors, setAddErrors] = useState<{ [key: string]: string }>({});
  const [editErrors, setEditErrors] = useState<{ [key: string]: string }>({});
  const [teamMember, setTeamMember] = useState<{
    fullName: string;
    image?: File | string;
    description: string;
    role: string;
  }>({
    fullName: "",
    image: undefined,
    description: "",
    role: "",
  });

  // Compute backend origin once and use safely when building image URLs
  const backendOrigin = "https://webify-software-company.onrender.com";

  const validateAdd = () => {
    const errors: any = {};
    if (!teamMember.fullName.trim()) errors.fullName = "Full name is required.";
    if (!teamMember.description.trim())
      errors.description = "Description is required.";
    if (!teamMember.role.trim()) errors.role = "Role is required.";
    return errors;
  };

  const validateEdit = () => {
    const errors: any = {};
    if (!editedTeamMember.fullName.trim())
      errors.fullName = "Full name is required.";
    if (!editedTeamMember.description.trim())
      errors.description = "Description is required.";
    if (!editedTeamMember.role.trim()) errors.role = "Role is required.";
    return errors;
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setEditedTeamMember(user);
    setEditErrors({});
    setIsEditOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleEditSave = () => {
    const errors = validateEdit();
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    let payload: any = editedTeamMember;
    if (editedTeamMember?.image && editedTeamMember.image instanceof File) {
      const fd = new FormData();
      fd.append("fullName", editedTeamMember.fullName || "");
      fd.append("role", editedTeamMember.role || "");
      fd.append("description", editedTeamMember.description || "");
      fd.append("image", editedTeamMember.image);
      payload = fd;
    }

    editTeamMember.mutate(
      { teamMember: payload, selectedMember: selectedUser },
      {
        onSuccess: () => {
          setIsEditOpen(false);
          queryClient.invalidateQueries({ queryKey: ["team"] });
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    deleteTeam.mutate(selectedUser._id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["team"] });
      },
    });
  };

  const handleAddUser = () => {
    const errors = validateAdd();
    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    let payload: any = teamMember;
    if (teamMember?.image && teamMember.image instanceof File) {
      const fd = new FormData();
      fd.append("fullName", teamMember.fullName || "");
      fd.append("description", teamMember.description || "");
      fd.append("role", teamMember.role || "");
      fd.append("image", teamMember.image);
      payload = fd;
    }

    addTeamMember.mutate(payload, {
      onSuccess: () => {
        setIsAddUserOpen(false);
        setTeamMember({ fullName: "", description: "", role: "", image: "" });
        setAddErrors({});
        queryClient.invalidateQueries({ queryKey: ["team"] });
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Button onClick={() => setIsAddUserOpen(true)}>Add Team Member</Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      )}

      {isError && (
        <p className="text-red-500 font-medium">
          Failed to load users. Please try again later.
        </p>
      )}

      {!isLoading && !isError && users?.length === 0 && (
        <p className="text-gray-600">No members found.</p>
      )}

      {!isLoading && !isError && users?.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <Table className="min-w-[600px] sm:min-w-full">
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any, index: number) => (
                <TableRow
                  key={user._id}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }
                >
                  <TableCell className="font-medium ">{user._id}</TableCell>
                  <TableCell>
                    <img
                      src={
                        user.image
                          ? user.image.startsWith("http")
                            ? user.image
                            : `${backendOrigin}${
                                user.image.startsWith("/")
                                  ? user.image
                                  : `/${user.image}`
                              }`
                          : avatar.src
                      }
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = avatar.src;
                      }}
                      alt={user.fullName || "avatar"}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteModal(user)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-full max-w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={
                  editedTeamMember.image
                    ? editedTeamMember.image instanceof File
                      ? URL.createObjectURL(editedTeamMember.image)
                      : editedTeamMember.image.startsWith("http")
                      ? editedTeamMember.image
                      : `${backendOrigin}${
                          editedTeamMember.image.startsWith("/")
                            ? editedTeamMember.image
                            : `/${editedTeamMember.image}`
                        }`
                    : avatar.src
                }
                onError={(e) => {
                  (e.target as HTMLImageElement).src = avatar.src;
                }}
                alt="avatar"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  setEditedTeamMember({ ...editedTeamMember, image: file });
              }}
            />
            <label className="block font-medium">Full Name</label>
            <Input
              value={editedTeamMember.fullName}
              onChange={(e) =>
                setEditedTeamMember({
                  ...editedTeamMember,
                  fullName: e.target.value,
                })
              }
              placeholder="Enter new full name"
            />
            <label className="block font-medium">Description</label>
            <Input
              value={editedTeamMember.description}
              onChange={(e) =>
                setEditedTeamMember({
                  ...editedTeamMember,
                  description: e.target.value,
                })
              }
              placeholder="Enter new description"
            />
            <label className="block font-medium">Role</label>
            <Input
              value={editedTeamMember.role}
              onChange={(e) =>
                setEditedTeamMember({
                  ...editedTeamMember,
                  role: e.target.value,
                })
              }
              placeholder="Enter new role"
            />
          </div>
          <DialogFooter className="flex flex-wrap justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="w-full max-w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block font-medium">Full Name</label>
            <Input
              value={teamMember.fullName}
              onChange={(e) =>
                setTeamMember({ ...teamMember, fullName: e.target.value })
              }
              placeholder="Enter Full Name"
            />
            <label className="block font-medium">Description</label>
            <Input
              value={teamMember.description}
              onChange={(e) =>
                setTeamMember({ ...teamMember, description: e.target.value })
              }
              placeholder="Enter Description"
            />
            <label className="block font-medium">Role</label>
            <Input
              value={teamMember.role}
              onChange={(e) =>
                setTeamMember({ ...teamMember, role: e.target.value })
              }
              placeholder="Enter Role"
            />
            <div>
              <label className="block font-medium">Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setTeamMember({ ...teamMember, image: file });
                }}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-wrap justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="w-full max-w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="mt-2">
            Are you sure you want to delete {selectedUser?.fullName}?
          </p>
          <DialogFooter className="flex flex-wrap justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamMembersPage;
