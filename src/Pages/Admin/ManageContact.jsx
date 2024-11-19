import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../Components/Admin/Ui/Card";
import skbImage from "../../assets/skbcompany2.png";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../Components/Admin/Ui/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@radix-ui/themes";
import { server } from "../../main"; // Ensure the server URL is correct

const ManageContact = () => {
  const [contacts, setContacts] = useState([]); // State to store fetched contacts
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(""); // State to handle errors
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [contactsPerPage] = useState(10); // Number of contacts to show per page

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true); // Set loading to true when fetching data
    setError(""); // Reset error before fetching new data
    try {
      const response = await axios.get(`${server}/contact`);
      setContacts(response.data.contacts); // Set fetched contacts in state
    } catch (error) {
      setError("Error fetching contacts. Please try again."); // Set error message
      console.error("Error fetching contacts:", error); // Log error for debugging
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Calculate the indices for the contacts to display on the current page
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(contacts.length / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Contacts</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            View and manage the list of contacts.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center mt-4 mb-4 p-10 sm:p-20 md:p-20">
            <div className="relative flex justify-center items-center h-14 w-14">
              <div className="absolute animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-purple-500"></div>
              <img
                src={skbImage}
                alt="Avatar thinking"
                className="rounded-full h-10 w-10 z-8" // image inside spinner, smaller than the spinner
              />
            </div>
          </div>
          ) : error ? (
            <p className="text-red-500">{error}</p> // Display error message
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SL No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentContacts.length > 0 ? (
                    currentContacts.map((contact, index) => (
                      <TableRow key={contact.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{contact.name || "N/A"}</TableCell>
                        <TableCell>{contact.email || "N/A"}</TableCell>
                        <TableCell>{contact.mobile || "N/A"}</TableCell>
                        <TableCell>{contact.message || "N/A"}</TableCell>
                        <TableCell>
                          {new Date(contact.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>No contacts available.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                {currentPage > 1 && (
                  <Button
                    onClick={() => paginate(currentPage - 1)}
                    variant="outline"
                    className="px-4 py-2"
                  >
                    &lt; Prev
                  </Button>
                )}
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    onClick={() => paginate(number)}
                    variant="outline"
                    className={`px-4 py-2 ${
                      currentPage === number ? "bg-primary text-white" : ""
                    }`}
                  >
                    {number}
                  </Button>
                ))}
                {currentPage < pageNumbers.length && (
                  <Button
                    onClick={() => paginate(currentPage + 1)}
                    variant="outline"
                    className="px-4 py-2"
                  >
                    Next &gt;
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageContact;
