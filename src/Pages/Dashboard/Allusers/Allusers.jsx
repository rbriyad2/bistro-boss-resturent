import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure]= useAxiosSecure()
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDeleteuser = (user) => {
    fetch(`https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/users/admin/${user?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Account Delete Successfull`,
            showConfirmButton: false,
            timer: 800,
          });
        }
      });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: ` Want to admin (${user?.name}) ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/users/admin/${user?._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user?.name} is Admin Now`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>All Users | Bistro Boss </title>
      </Helmet>
      <button onClick={() => refetch()}></button>
      <h3 className="text-2xl font-bold">TOTAL USERS: {users?.length}</h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="rounded-t-lg rounded-lg bg-[#D1A054] text-white">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?._id} className="hover">
                <th> {index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn bg-yellow-500 btn-outline border-0  btn-error"
                  >
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <FaUserShield className="text-lg text-white" />
                    )}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteuser(user)}
                    className="btn btn-outline border-0 bg-yellow-500 btn-error"
                  >
                    <FaTrashAlt className="text-lg text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
