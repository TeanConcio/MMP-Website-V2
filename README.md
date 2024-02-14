# MMP-Website
This is a website for Mission Ministries Philippines' Certificate Course in Early Childhood Education. It primarily contains initial features needed for the administrative side of the program.

# FOR BOTH
**Reminders**
- **MAKE SURE YOU ARE WORKING ON THE RIGHT BRANCH**
- Don't forget to install dependencies ```npm install```
- Include nodemon for an easier life ```npm install nodemon -g```
  
**Git commands in order**
```
git add (use --all for to stage all changes)
git commit (press i to start typing, and then esc->type :wq to save)
git push
```
For more git commands, check this [cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf).

# FOR CLIENT
**Project Setup**

**[Tailwind CSS](https://tailwindcss.com/docs/installation)** and **[Flowbite](https://flowbite.com/docs/getting-started/vue/)** are already configured.

Input this in your terminal step-by-step
```sh
cd client
npm install
npm install nodemon -g
npm run dev
```

# FOR SERVER
Go backend devs!

### Route Structure
Legend:
Bold - Actual Pages
Non-Bold - Headers for Organization
In Parenthesis - URL

*Landing Page* ('/')
|__ *Login Page* ('/login')
|__ *Register Page* ('/register')
|__ *About Page* ('/about')
|__ *Enrollment Page* ('/enroll')
|__ Student ('/student')
    |__ *Profile Page* ('/profile')
|__ Teacher ('/teacher')
    |__ *Profile Page* ('/profile')
    |__ *Courses Main Page* ('/courses')
        |__ *Course Page* ('/:course_id')
            |__ *Student Page* ('/:student_id')
|__ Admin ('/admin')
    |__ *Profile Page* ('/profile')
    |__ *Enrollment Records Page* ('/records')
        |__ *Filtered Records Page* ('/:query_filter')
        |__ *Edit Records Page* ('/:student_id')
    |__ *Faculty Page* ('/faculty')

Note: course_id is modulename + year (e.g. ModuleName2023)

### DB API Endpoints
Naming Scheme: rootURL/API/TableName/:params

### Prisma Schema Commands
Migrate Prisma Schema to Database: npx prisma migrate dev
Generate Prima Client Functions: npx prisma generate

### PostgreSQL Guide
1. Download PostgreSQL version 16.
2. Run the installer and use "postgres" as the username and "admin12-3" as the password.
3. Open pgAdmin and go to databases (under servers go under PostgreSQL you should see databases). Right click databases and create a new database named "CSSWENG".
4. Run npx prisma migrate dev
5. PostgreSQL should now be configured

### ID Format Guide
Format: |Year|-|Account Type Code|ID Number|
Ex: 20XX-Y00ZZZ

Account Type Codes:
000 to 599 - Students
600 to 899 - Teachers
900 to 999 - Admins

Notes:
- ID increments for Students, Teachers, and Admins are independent
- Only increment account type code once ID Number > 999
- IDs reset on new year
- It is possible for Account Type Codes to overflow, but very unlikely

