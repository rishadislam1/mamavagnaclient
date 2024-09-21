import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../public/config';
import { Circles } from 'react-loader-spinner';
import Swal from 'sweetalert2';

const AllUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users data from the backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}allUser.php`);
                setUsers(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Delete user function
    const deleteUser = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post(`${BASE_URL}deleteUser.php`, { id });
                    setUsers(users.filter(user => user.id !== id));
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              });
            // Update the state after delete
        } catch (err) {
            setError('Error deleting user.');
        }
    };

    if (loading) {
        return <div className='flex justify-center items-center mt-[10%]'><Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">All Users</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Position</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2 text-center">{user.id}</td>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                            <td className="border border-gray-300 p-2">{user.name}</td>
                            <td className="border border-gray-300 p-2">{user.position}</td>
                            <td className="border border-gray-300 p-2">{user.phone}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsersPage;
