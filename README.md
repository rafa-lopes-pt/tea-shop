# Tea Shop
Tea Shop is a dummy project that could be adapted to a real world scenario. The sections bellow describe the whole development proccess, starting from a dummy client that needs a website, to which technologies to use, and a future roadmap allowing some scallability

## User story
### Meet Chuck!
Chuck is a nice guy with a passion for tea. He has a strong social media presence on instagram, facebook and even an youtube channel where he speaks about the different kinds of tea, it's benefits, and why tea is so good!
He's at a point where he'd like to start selling he's own products online and would like to have his own website, but not something from a template...something fancy!

### Requirements
- Since the main source of traffic will come from his social media channels, having a SEO friendly website is **not** a priority.
- The platform must be **responsible** for at least mobile and computer screens
- Design should be something more than a regular store made in shopify, with smooth transitions and animations.
- For now the shop will **sell only tea**, but the layout should allow future updates to include other items separated by **sections**
  - i.e. tea mugs and pots or proprietary merch like stickers and t-shirts
- Users should be able to create **accounts**, and optionally edit or delete them
- Registered users should be able to **see their previous orders**
- Somewhere on the page, **links to his social media** accounts should be displayed

## Planning
So after reading the requirements from chuck, I started to break down the project into smaller parts. 
The frontend could be implemented as an SPA, with no specific concerns for speed or memory usage, and it could be hosted on service like Netlify. 
For the backend, a simple REST API that would connect a document databse would do just fine.

### Design and Structuring
Searching for inspiration from website with a huge database of designs, [Akib Abdullah](https://dribbble.com/shots/19996698-Tea-web-ui)'s caught my eye.
I proceeded to create a [whimsical document](https://whimsical.com/tea-shop-LxYQkUrFdccPsFU7H4DxR1) where I made a sketch of what the end result should look like, as well as what components were needed, a proper user-flow diagram, what endpoints were needed, and a database schema.

### Frontend
- Since SEO is not important in this case, **React** seems like a good option. Allowing me to make use of it's huge community and packages like **framer-motion** to create stunning animations.
- Important packages
  - **Sass** -> For absolute control over the styling
  - **Framer-Motion** -> Facilitates complex component animations in react, specially for transitions where items appear and disappear from screen
  - **Headless UI** -> A UI library that provides complex components unstyled
  - **React-Toastify** -> Displays amazing toast notifications in the easiest, and super costumizable way possible
  - **Font-Awsome** -> For icons
  - **Stripe** -> Payment processing
  
### Backend
- Considering the simple needs of the project, **Express JS** not only is a good option to implement a REST API, but it also pairs well with React! And since we're going to need a database, MongoDB provides an awsome free service for small projects, and is part of the **MERN** stack (Mongo, Express, React and Node)
- Important packages
  - **zod** -> For input validation
  - **jsonwebtoken** -> User authentication

Working with a database would be easier with an ORM (Object Relational Mapping) tool. Although at this point it would only add more complexity. The store may never grow beyond selling just tea, but if it does and more functionalities are added, implementing a tool like Prisma is no problem at all!

### Hosting & CI/CD
Ensuring that the website can grow, both in functionalities and in traffic capacity, I choose Mongo DB Altas, Render, and Netlify as service hosts. 
  - Mongo DB Altas
      - Free starting plan with "pay as you go" options
      - Support for both simple and complex databases
  - Render
      - Free plan
      - Takes care of basic server configuration, security, and other details, allowing me to focus on the API itself.
      - Great features that can be later implemented if needed, like Redis or even cron jobs
      - **GDPR DPA** compliant
  - Netlify
      - Free starter plan
      - Easy deploy & build from github
      - Website will be delivered through a CDN, ensuring faster loading times for users

The project will be developed as a monorepo, wihtout the need for containerization (at least for now, being a small project with a single developer).
Although new features should be pushed to their own branch, tested first, and merged to the main branch...for the sake of simplicity as a single developer this will be somewhat ignored.
