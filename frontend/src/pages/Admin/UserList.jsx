import React from "react";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUserQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/UsersApiSlice";
import Message from "../../components/Message";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" >
          {error.data.message || error.error}
      </Message>
      ) : (
        <div className="flex flex-col md: flex-row">
          {/* <AdminMenu /> */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
