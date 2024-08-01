<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/rafa-lopes-pt/tea-shop/">
    <img src="/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Tea Shop</h3>

  <p align="center">
    A Fullstack React SPA, using components <em>made from scratch</em> and featuring it's own Express API
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">Visit the Website</a>
    ·
    <a href="https://github.com/rafa-lopes-pt/tea-shop/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/rafa-lopes-pt/tea-shop/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About The Project</a></li>
    <li><a href="#user-story">User Story</a></li>
    <li>
        <a href="#planning">Planning</a>
        <ul>
            <li><a href="#design-and-structuring">Design and Structuring</a></li>
            <li><a href="#frontend">Frontend</a></li>
            <li><a href="#shared">Shared</a></li>
            <li><a href="#backend">Backend</a></li>
            <li><a href="#microservices">Microservices</a></li>
            <li><a href="#database">Database</a></li>
            <li><a href="#hosting--cicd">Hosting & CI/CD</a></li>
        </ul>    
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#notes">Project Notes</a>
        <ul>
            <li><a href="#repository-structure-%EF%B8%8F">Repository Structure</a></li>
            <li><a href="#data-privacy-%EF%B8%8F">Data Privacy</a></li>
        </ul>    
    
    </li>
  </ol>
</details>

<h2 align="center" id="about"> About The Project</h2>

<p align="center">
 <img src="/images/landing-page.png" alt="landing page" width="80%">
</p>

Tea Shop is a dummy project that not only could be adapted to a real world scenario, but it also represents one! Divded into stages, it starts with a social media influencer requesting a website from a single junior developer and while initial code includes lot's of mistakes (as one would expect from a junior dev), it progresses to a more advanced and complex solution, using technologies like **Docker** and implementing a **fully structured CI/CD pipeline**.

The **core goal** of this project is to showcase how I would handle a *"baddly"* structured project, solving problems ranging from the file structure itself, code optimizations, implement tools and features that can improve team workflow and productivity, to the implementation of new features and possibly the simulation of a high traffic scenario where the server would crash.

> In the real world, developers are often assigned ongoing projects with all kinds of problems, and it's our job to solve them!

Therefore you can expect detailed information about **userflows**, **tech stack**, **API documentation**, **security concerns**, **code structure**, **style guides** and others!

  ### Stages
  As mentioned before the project is divided into stages, these represent major deployments and updates.
  The live website renders the most recent version, but the final code of each stage can be found on their respective branches.
  Other relevant resources (like design decisions, or development notes), specific to each stage can be found on their own readme as well.
  - [Stage 0](https://github.com/rafa-lopes-pt/tea-shop/tree/stage-0)
  - ~~Stage 1~~ - Development starting soon 
  - ~~Stage 2~~ - To be created


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h2 align="center" id="user-story">User Story</h2>

### Meet Chuck!
Chuck is a nice guy with a passion for tea. He has a strong social media presence on instagram, facebook and even an youtube channel where he speaks about the different kinds of tea, it's benefits, and why tea is so good!
He's at a point where he'd like to start selling his own products online and would like to have his own website, something fancy!

<p align="center">
 <img src="/images/chuck.webp" alt="chuck" width="80" height="80">
</p>

### Initial Requirements ( Stage 0-1 )
- Since the main source of traffic will come from his social media channels, having a SEO friendly website is **not** a priority.
- The platform must be **responsible** for at least mobile and computer screens
- The user experience should include **smooth transitions and animations**.
- For now the shop will **sell only tea**, but the layout should allow future updates to include other items separated by **sections**
  - i.e. tea mugs and pots or proprietary merch like stickers and t-shirts
- An admin page would be useful for managing the shop products, but for the initial stage they can be hardcoded.
- Users should be able to create **accounts**, and optionally edit or delete them
- Registered users should be able to **see their previous orders**
- Somewhere on the page, **links to his social media** accounts should be displayed

### The Development Team ( Stage 0-1 )
Chuck has a friend who is young software developer (hey that's me!) who has as good grasp on web technologies like **React**, **Javascript**, **CSS** and others... 

Like any other client, Chuck thinks it's a good idea to assign everything to this junior developer, letting him take care of the design, project setup...choosing whatever tech stack he wishes, implementing security features on the server, and even take care of actual payment processing! After all he IS a developer...and it's cheaper than a full team...

<p align="center">
  <img href="/images/whatcouldgowrong.gif" alt="What could possibly go wrong?" width="80" height="80"/>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 align="center" id="planning">Planning</h2>

After hearing the requirements from chuck, I started to break down the project into smaller parts. 
The frontend could be implemented as an SPA, with no specific concerns for speed or memory usage, and it could be hosted on service like Netlify. 
For the backend, a REST API made with ExpressJS connected to a document databse like MongoDB.

### Design and Structuring
Searching for inspiration, ended up finding this awesome concept by [Akib Abdullah](https://dribbble.com/shots/19996698-Tea-web-ui).
<p align="center">
  <img href="/images/concept.jpg" alt="Akib's design" width="80%"/>
</p>

I proceeded to create a [Whimsical board](https://whimsical.com/tea-shop-LxYQkUrFdccPsFU7H4DxR1) where I made a sketch of what the end result should look like, as well as the website's user-flow diagram, server endpoints, and where I documented other technical aspects of the whole app.

<p align="center">
  <img href="/images/whimsical-s0.jpg" alt="Whimsical Board Screenshot" width="100%"/>
</p>

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
 
Since SEO is not important in this case, **React JS** seems like a good option. Allowing me to make use of it's huge community and packages like **framer-motion** to create stunning animations.
- Relevant packages:
  - **Sass** -> A superset of CSS that supports functions, mixins, variables and other important concepts for high quality code
  - **Framer-Motion** -> Facilitates complex component animations in react, specially for transitions where items are removed from the DOM
  - **React-Toastify** -> Displays amazing toast notifications in the easiest, and most costumizable way possible
  - **Font-Awsome** -> Icon library
  - **React-Hook-Form** -> Enhanced form handling library that works quite well with **Zod**

### Shared
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Static Badge](https://img.shields.io/badge/Stripe%20-%20%23008cdd?style=for-the-badge&logo=stripe&logoColor=white)

 
Both front and back ends share code related to, but not limited to entities (i.e login, user and order data), parser functions, data structures and validation.
- Useful libraries to implement this include:
  - **Zod** - A library that allows for typechecking during runtime, and that pairs well with **React Hook Form**
  - **Simple-HTTP-Codes** - Provides constants for HTTP response codes, with jsDocs containing detailed information about each.
  - **Stripe** -> Payment processing
   
### Backend

  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


Considering the simple needs of the project, **Express JS** not only is a good option to implement a REST API, but it also pairs well with React! And since we're going to need a database, MongoDB provides an awsome free service for small projects, and is part of the **MERN** stack (Mongo, Express, React and Node)
- Relevant packages: 
 - **Multer** -> A library that handles files on express
 - **Nodemailer** -> Simplifies the process of sending emails
 - **Sharp** -> Used to convert and compress images

### Micro-services

![Static Badge](https://img.shields.io/badge/Stripe%20-%20%23008cdd?style=for-the-badge&logo=stripe&logoColor=white)
![Static Badge](https://img.shields.io/badge/Google%20APIS%20-%20%23e84234?style=for-the-badge&logo=google%20cloud&logoColor=white)
![Static Badge](https://img.shields.io/badge/Chat%20Bot%20AI%20-%20%23056cff?style=for-the-badge&logo=chatbot&logoColor=white)

The backend will include 3 separate microservices: Mailing, Payment Processing and Chatbot.
These won't all be available from stage 0, nor is the project properly organized to support them.
Their final implementation will be done in stage 2, and all of them will be containerized with docker.

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Both relational and non-relational models can be implemented, each with their own *pros & cons*. Although for a single developer, I would argue that a non-relational approach is much easier as it requires less code (due to less typesafe structures), and while developing, allows me to make bigger changes with less effort. Currently these are the only entities we need to store:
  - Users
    - Authentication data
    - User data
  - Products
  - Orders

It's not complex and mongodb is good in handling large lists of data (which could become a concern for orders).


Therefore **MongoDB** will be used as it perfectly fits this idea, with it's collections & documents model.

Mongoose **will not** be used intentionally in stages 0 and 1 in order to create errors and difficulties for stage 2.

### Hosting & CI/CD

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white&color=black)
![MongoDBAtlas](https://img.shields.io/badge/MongoDB%20Atlas-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Ensuring that the website can grow, both in functionalities and in traffic capacity, I choose Netlify, Render and Mongo DB Altas  as service hosts. 
  - Netlify
      - Free starter plan
      - Easy deploy & build from github
      - Website will be delivered through a CDN, ensuring faster loading times for users
  - Render
      - Free plan
        - Has a downside of suspending the server due inactivity, delaying following requests up to 50s. A warning should be displayed to users, at least when they first visit the site.
      - Takes care of basic server configuration, security, and other details, allowing me to focus on the API itself.
      - Great features that can be later implemented if needed, like Redis or even cron jobs
      - **GDPR DPA** compliant
  - Mongo DB Altas
      - Free starting plan with "pay as you go" options
      - Support for both simple and complex databases

Stage 0 does not include any CI/CD features, as it's primary focus is to develop a final concrete product that *Chuck* can see and comment on. Starting from stage 1, tests, actions, workflows and even hooks will be added.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 align="center" id="roadmap">Roadmap</h2>

### Stage 0 🥉
The primary goal of this stage is to come up with something that *"Chuck"* can use, and give is opinion on.
All the requests features should be implemented, except for payment processing.

> Secure payments are a difficult subject, and there's lot's of room for failure. Wanting to add this project to my portfolio as quickly as possible... I left this single feature for stage 1 development.

For more information, please check this stage's branch. Here's what you can expect:
- Userflow diagram
- Simple design elements
- Basic API diagram
- Authentication/Authorization ( **with intended security flaws** )
- Custom mailing service
- Ability to place orders *without* payment

### Stage 1 🥈
On this stage, the focus is on code optimization, and CI/CD. As you may have noticed stage 0 does not use a monorepo management tool (like **NX** or **Lerna**), there's no code standard, no workflows, deployment is a nightmare, and the components and styling files are messy.

On this branch I will not only take care of these problems, but also implement actual payments with **stripe.js**, and add some unit and end-to-end tests!
### Stage 2 🥇
The final stage is where I will introduce new problems like high server traffic, service overloads and more! As the project grows, Chuck also wants to sell more items, and wants to have access to an admin dashboard where he can easily edit the products.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 align="center" id="notes">Project Notes</h2>

### Repository Structure 🏗️

The project will be developed as a monorepo, and will include the following branches:
- **Intro**
- **Live**
- **main** -> Current development and testing
- **Stage # branch** -> containing the final code that won't ever be changed
- **issues/features** -> used for development only

main, live and stage branches include ***ALL*** the code related to the project, you can compare them to see the application progress.

### Data Privacy ⚠️
Data protection was one of my main concerns on this project, and although I don't share it with any 3rd parties, please ***DO NOT*** input your real information. Keep in mind that I'm still a young developer with lot's to learn and web security is in no way something that is assigned solely to a junior dev.


That beeing said, precautions like origin request restrictions, session states and http-only cookies, have been taken, and the risk of someone attacking my server or database is minimal...however it is still possible!

### Is this it??
For more detailed information, please read each branch's readme file 😃

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h2 align="center" id="notes">Schedule an Interview!</h2>

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-lopes-software-developer/)
[![Gmail](https://img.shields.io/badge/Gmail-0078D4?style=for-the-badge&color=red&logo=gmail&logoColor=white)](mailto:rafalopessecond@gmail.com)