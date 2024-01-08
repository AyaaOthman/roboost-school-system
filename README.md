# Roboost Student Mangment System

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.11.

#### Deployed Site: [Vercel](https://roboost-school-system.vercel.app/signup)

#### Project structure and organization.

project is formed of 2 modules with routing (auth - dashboard) the dashboard is protected by auth guard and have lazy loading by it's own routing

#### Installation instructions.

npm install

#### Explanation of code structure.

A) Auth Module:
contain sign up and sign in components
B) Dashboard Module:
contains
1- Main Component: getting all students data
2- Search Component: handling search
3- Edit Component: to open edit page and update student data
4- Delete Component
5- Add Component
6- layout to handel diffrent routing
c) Services:
1- Auth to handel login - logout -signup
2- student: to handel get-add-del-edit
D) guard:
to protect routs

#### How to run the application locally.

npm install
ng serve -o

#### additional libraries or dependencies used.

Font Awesome
Bootstrap
Ngx-toaster
