<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
>>>>>>> b0c4ac026caae98aa2357de4d6df532f0b0642e3
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "../../Components/Admin/Ui/Card";
<<<<<<< HEAD
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../Components/Admin/Ui/Tabs";
=======
import { Progress } from "../../Components/Admin/Ui/Progress";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../Components/Admin/Ui/Tabs";
>>>>>>> b0c4ac026caae98aa2357de4d6df532f0b0642e3
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../Components/Admin/Ui/Table";
import { Button } from "../../Components/Admin/Ui/Button";
import axios from "axios";
import { server } from "../../main";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [usersResponse, groupsResponse, coursesResponse, categoriesResponse] = await Promise.all([
          axios.get(`${server}/user/getAll`),
          axios.get(`${server}/group/getAll`),
          axios.get(`${server}/course/getAll`),
          axios.get(`${server}/category/getAll`)
        ]);

        setUsers(usersResponse.data);
        setGroups(groupsResponse.data);
        setCourses(coursesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex min-h-screen justify-center items-center text-2xl font-bold">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<<<<<<< HEAD
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>{users.length} total users</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Add User</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Groups</CardTitle>
            <CardDescription>{groups.length} total groups</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Add Group</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>{courses.length} total courses</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Add Course</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>{categories.length} total categories</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Add Category</Button>
          </CardFooter>
        </Card>
      </div>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="groups">
        <Card>
          <CardHeader>
            <CardTitle>Groups</CardTitle>
            <CardDescription>Manage your groups</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.description}</TableCell>
                    <TableCell>{group.createdBy?.name || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>Manage your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Downloads</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>₹{course.price}</TableCell>
                      <TableCell>{course.category.name}</TableCell>
                      <TableCell>{course.downloads}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Courses Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>{(category.courses.length) ? category.courses.length:"NULL"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
=======
    <>
      <Theme>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Users</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Manage your users and view their details.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Add User</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">1,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">5,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Orders</TabsTrigger>
                <TabsTrigger value="month">Products</TabsTrigger>
                <TabsTrigger value="year">Analytics</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <div className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Refunded
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <div className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="week">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>
                    Recent orders from your store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Type
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-background">
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow className="bg-background">
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow className="bg-background">
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow className="bg-background">
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow className="bg-background">
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      {/* Add more table rows here */}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Theme>
    </>
>>>>>>> b0c4ac026caae98aa2357de4d6df532f0b0642e3
  );
}
