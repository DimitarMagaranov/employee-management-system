SETUP GUIDE
The app is not deployed so I have to give you instructions how to start it on locale machine. First you need to enter the “Json-server” folder with the command “cd json-server” and install the dependencies with the command “npm install”. Finally start the server with “npm start”. Then you need to repeat the procedure with the client folder.

FOLDER STRUCTURE OVERVIEW AND THE DESCRIPTION OF THE ADDITIONAL FUNCTIONALITIES
I have used “React” to create the application with “npx create-react-app”. When you enter the “src” folder you will be able to see several other folders:
1.	“utils” - contains the firebase file where I wrote the configurations and the function for initialization
2.	“services” -  contains API service for making the queries to the server
3.	“hooks” – contains custom hooks, which I use in the components TaskManagerDashboard, CreateTask and Task. With them, the data we need is loaded and updated.
4.	“components” – contains all the components we need
-	“Login” – logging in the application
-	“Register” – registering in the application
-	“Logout” – logging out the application
-	“Header” – provides the links for the previous components that are mentioned
-	“Sidebar” – provides the links that points to the components, which the manager and the employee needs in their dashboard
-	“MenuItem” ¬– this component is used in the “SideBar”, that is why it is in the SideBar folder. It is used as a link.
The next components are in the “Dashboard” folder in the subfolders “Employee” and “TaskManager”.
-	“EmployeeDashboard” – provides the dashboard that is used by the employees. This component uses the “Sidebar”, “PersonalInformation” and “Tasks” components, which are located in the same folder. “PersonalInformation” provides information for the employee and can be updated by the form in it. Tasks provides the tasks which are gaved to the logged employee. By the employee they can be marked as ready.
-	“TaskManagerDashboard” – provides the dashboard that is used by the task manager. This component uses the “Sidebar”, “AllEmployees”, “EditEmployee”, “NewEmployees” and “Task” components which are located in the same folder. “AllEmployees” renders the all employees which are employed in the company and receiving salary. From there the manager has the opportunity to delete employee. The component “NewEmployees” renders all the employees which are registered in the app but are not started working for a salary yet.  For every rendered employee there is a button which leads to the “EditEmployee” component. Through the component “EditEmployee” the manager can edit the information to the new employees by setting them a salary. After submit the new employee will register in the company and can be seen in the rendering result from the “AllEmployees” component. Also the “TaskManagerDashbord “ provides the top 5 employees for the past month throught “AllEmployees”component by filtering them before. The “Tasks” component provides the opportunity to see already assigned tasks to the employees and create new tasks. Also with this component we can to track statistics for the tasks like completed, uncompleted, completed in the past week and the past month. All of this is completed with the helper components “CreateTask” and “List” which are located in the same directory.
