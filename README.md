<a id="readme-top"></a>

<h2 align="center" id="about">Stage 0</h2>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/rafa-lopes-pt/tea-shop/">
    <img src="/frontend/public/media/favicon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Tea Shop</h3>

  <p align="center">
    A Fullstack React SPA, using components <em>made from scratch</em> and featuring it's own Express API
    <br />
    <br />
    <a href="https://tea-shop-rafa-lopes-pt.netlify.app/">Visit the Website</a>
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
    <li>
    <a href="#setup">Project Setup</a>
      <ul>
        <li><a href="#monorepo-management">Monorepo Management</a></li>
        <li><a href="#docker">Docker & Kubernetes</a></li>
      </ul>
    </li>
    <li>
        <a href="#frontend">Frontend</a>
        <ul>
            <li>
              <a href="#routing-tree">Routing & Component Tree</a>
              <ul>
                <li><a href="#routing">Routing</a></li>
                <li><a href="#component-tree">Component Tree</a></li>
                <li><a href="#react-context-vs-other-state-management-libraries">React Context vs other state management libraries</a></li>
                <li><a href="#brief-overview-on-the-auth-context">Brief Overview on the Auth Context</a></li>
                <li><a href="#render-cycles">Render Cycles</a></li>
                <li><a href="#request-handling">Request Handling</a></li>
                <li><a href="#axios">Axios</a></li>
              </ul>
            </li>
            <li>
              <a href="#styling">Styling & UI</a>
              <ul>
                <li><a href="#form-namespace">Form Namespace</a></li>
                <li><a href="#sass">Sass Structure & BEM</a></li>
                <li><a href="#design-note">Design Note</a></li>
              </ul>
            </li>
            </ul>
    </li>
     <li>
              <a href="#shared">Shared Code</a>
              <ul>
                <li><a href="#zod">Zod</a></li>
                <li><a href="#other">Other</a></li>
              </ul>
            </li>
            <li>
              <a href="#backend">Backend</a>
              <ul>
                <li><a href="#overview">Overview</a></li>
                <li>
                  <a href="#security">Security</a>
                  <ul>
                    <li><a href="#cors">Cors & Express Sessions</a></li>
                    <li><a href="#role-based-access">Role based access</a></li>
                    <li><a href="#secrets">Secrets, Hashing & Encryption</a></li>
                    <li><a href="#render-outbound-ips">Render Outbound IPs</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#middlewares">Middleware</a>
                  <ul>
                    <li><a href="#authentication">Authentication</a></li>
                    <li><a href="#body-parser">Body Parser</a></li>
                    <li><a href="#single-image-parser">Single Image Parser</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#microservices">Microservices</a>
                  <ul>
                    <li><a href="#mailing">Mailing</a></li>
                  </ul>
                </li>
            </li>
        </ul>    
        <li>
          <a href="#dbs">Database & Repositories</a>
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#prisma">Prisma & Mongoose</a></li>
            <li><a href="#db-client">DB Client</a></li>
            <li><a href="#repositories">Repositories</a></li>
          </ul>
        </li>
  </ol>
</details>

<h2 align="center" id="about">Introduction</h2>

<p align="center">
 <img src="/images/landing-page.png" alt="landing page" width="80%">
</p>
Wow you're really here!? I'm assuming you've read the <a href="https://github.com/rafa-lopes-pt/tea-shop/tree/Intro" target="_blank"> Intro README </a>
On this file you'll find more detailed technical information, and some explanations about why stuff was done the way it was. The following sections cover the topics I find most relevant.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 align="center" id="setup">Project Setup</h2>

### Monorepo Management

If you're a developer, you might already have noticed a lot of things wrong with those folders...
They might seem organized, and well planned, but they're actually not! There's lot's of duplicate code (especially on the `node_modules` folder), all the folders have dependencies that need to be installed separately and that makes deployment harder and unsafe.

> It's one thing to build something that functions; it's another to build something that consistently delivers.

Although this was intended, [**npm workspaces**](https://docs.npmjs.com/cli/v8/using-npm/workspaces), [**Lerna**](https://lerna.js.org/) or [**NX**](https://nx.dev/) could have been implemented (and will be, on stage 1)

These optimize the development workflow, making things like installing and updating packages, properly sharing code, workflows and actions. Without a proper structure, as the project grows in size and complexity code would be harder to maintain, would get messier and bugs would be inevitable.

<h3 id="docker">Docker & Kubernetes</h3>

Both fantastic tools used in team environments. As a solo developer, "dockerizing" a project right from the start might not be the best idea as it adds more complexity to our codebase. Docker is great when working in teams, or when we really depend on specific software versions and don't wan't to keep installing new things on our machines. Aside from that, this is a really simple project, and doesn't benefit that much from being containerized.

Kubernetes is used for deployment and container management. One of it's awesome features is the ability to restart a service automatically if anything goes wrong!
Although it seems great, and a "must have" on any project, it introduces a LOT of complexity and unnecessary work for such a small project.
This won't definitely be implemented here.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ======================================================================================================================================= -->

<h2 align="center" id="frontend">Frontend</h2>

<h3 align="center" id="routing-tree">Routing & Component Tree</h3>

#### Routing

Using `React Router v6` I defined the routes as follow:

-   /
    -   /login
    -   /item/:id
    -   /cart
    -   /account/:tab
-   /activate/:token/
-   404

`/ (index)` - contains some common elements and renders sub-routes using the `Outlet` component. It's also the same path for rendering the actual shop screen.

`/item/:id` - used to display a specific item from the shop

`/activate/:token/` - When you create your account, this is the page rendered by the activation link.

`React Router v6` introduces some new concepts like `loaders` and `actions`, although they seem useful (and they are), It's a feature that would make the project heavily dependant on this specific library (and possibly version).

I choose not to go with this, and instead implement data fetching in a way that allows me to migrate to a new tool in the future.

> If possible, I always try to come up with solutions that are not tightly coupled to a 3rd party system.

#### Component Tree

Routing is only part of process, a React app usually consists of other components outside the routing logic. In this case they are Contexts and a `ToastContainer` from `react-toastify`

These contexts encapsulate logic and state related to shop items, cart data, and authentication/user data. The component tree, loosely looks like this:

-   ToastContainer
-   Auth Context
    -   ShopData Context
        -   Cart Context
            -   Router

As explained before, the `Router` component is responsible for rendering all the other components. In order to achieve the design goals, all routes contain a `Frame`component, `Social Icons` and a `NavBar`

`Frame` - Displays the animated background abstract lines and yellow squares, outside of the main flow. (absolute position)

`Social Icons` - As per Chuck's request, here is where the youtube, instagram and facebook links would be displayed. Since this is a portfolio project I changed them to my own relevant links.

`NavBar` - Conditionally renders the available pages, based on user authentication.

An `Outlet` component is used to render the appropriate page content, however in order to create visually appealing transitions, `Framer-Motion` introduces 2 components: `AnimatePresence` and `motion`. You can read more about them [here](https://www.framer.com/motion/animate-presence/).

Therefore each "page" is rendered with this structure:

```tsx
  <AnimatePresence>
    <Outlet />
  </AnimatePresence
```

And on each route's component

```tsx
<SectionWrapper {...props}>// content</SectionWrapper>
```

I know what you're thinking... why not wrap the `Outlet` in a `SectionWrapper`? Being a lousy designer & developer... I initially intended for different transitions between some pages, and that would have had to be passed as props to the `SectionWrapper` component. Laziness took the best of me and it ended up being to much work to create different transitions...and also to refractor the code 😆

Data fetching either happens directly on each component, or in the contexts.

#### React Context vs other state management libraries

You might be wondering why I did not opt to use Redux, Jotai, or other library, and that is because I simply did not see the benefit of it! A library would only increase the bundle size (impacting performance), increase the complexity and add yet another dependency.
At the moment, there's no state object, or logic, complex enough to justify handling it with an external tool. In the future if that need arises, all the current context's can be migrated to Redux as middlewares, introducing minimal code changes.

Redux also has a tool called `RTK Query`, which one could argue that is a good data fetching and caching library... but once again it's an overkill for this project.

#### Brief Overview on the Auth Context

The app's authentication/authorization logic contains several security flaws, although it uses an http only cookie to authorize a client's request, some attacks (like CSRF) are still possible. More on this will be covered in the security section.

At the moment, it uses session storage to store an `expiresAt` variable and user data.
When the context first loads, it checks the session storage, and validates the data...if everything is valid, then the user is logged in, otherwise it's redirected to the index page.

But what if a user is currently browsing the shop, and the session expires?
Well...I defined an interval function that checks if the session expired or not...Not the best solution I know, but I didn't wan't to allow a user to access protected routes after session timeout, even if requests are blocked anyways.

On the next stage, this will be improved and it will also include SSO by using [Passport.js](https://www.passportjs.org/) and server sessions.

#### Render Cycles

One of the core concerns a react developer must have, is how components are rendered, and how frequently. State updates cause all the children to re-render, unless some precautions are taken, like `useMemo`, `useCallback` or `useRef` hooks

For instance, if the user reloads the entire page after being logged in, then the whole app re-renders...which causes the `user` state variable to be reset to null. This change triggers a session verification process that tries to retrieve local data, and after successful retrieval...another render is triggered.

This means that when a user reloads the page, 2 renders occur

If the current page happens to be the shop...then it would mean that the client fetches the same shop data 2 times, introducing double the requests to our backend, and in a real production app...heavily increasing server costs! Fortunately...this is not happening 😜

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 align="center" id="api-interaction">API interaction</h3>

#### Request Handling

Once again no external library was used (I'm starting to think I may be a masochist coder...). Using the native fetch function, I created several methods that accept some optional data to be sent to the server, and encapsulate all the properties like request method, headers, etc
These methods can be found in the `src/apis/server.endpoints.ts` file.

In order to apply the DRY (don't repeat yourself) principles of coding, a `responseHandler` function is used to handle the code in the scenario of a failing request.

`requestHandler` has the following signature:

```ts
export default async function responseHandler(
	request: () => Promise<Response>,
	callback: (data: Response) => unknown
): Promise<boolean>;

export default async function responseHandler(
	request: () => Promise<Response>,
	callback: (data: Response, toastId: Id) => unknown
): Promise<boolean>;
```

Using TS's overloading capabilities, if the callback passed to the `responseHandler` uses the `toastId` argument, that means a toast will be shown indicating the state of the promise (loading -> resolved/rejected). If a callback is passed with only 1 parameter, then no toast is shown!

#### Axios

Axios is a great library, standard in many web projects... honestly the only reason I didn't use it was because of the need to learn yet another thing to accomplish the project.
It includes several enhancements over the fetch function, such as interceptors, that would simplify some aspects of the code.

> There will always be a better way, or tool to accomplish a goal, however functionality is more important than perfectionism.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 align="center" id="styling">Styling & UI</h2>

This was by far one my favorite parts! Although it ain't perfect... The only component that was not done by me is the `Toast`. Everything else was coded from scratch 😎. Although it might sound crazy, seeing that there are lot's of component libraries, themes, CSS frameworks, etc out there, personally it was a great learning experience for me. It made me think everything thoroughly, made me wonder about reusability, what properties should my components accept, default values, default behavior, performance, integration with libraries like `React Hook Form`... If you need a Frontend developer to create an UI library, please hire me!!!

Anyways...

I would say that the jewel of my ui is the `Form` namespace. It was designed to work specially with `React Hook Form` but it's far from what it can be! Let me show you

#### Form Namespace

First you need to import the `Form` component, it accepts all the native HTML props of a regular form, plus animation props from `Framer-Motion` and even an **_honeypot_** field!
Then you just need to use as many `Form.Control` components as you need, and of course label them.

It doesn't feel much different than other form related libraries, but by using `React Hook Form` you not only get autocompletion for the labels ;) but it also automatically detects the type of Control it should render! (right now it only supports boolean or text values)

```tsx
<Form
	animationProps={animationProps}
	onSubmit={handleSubmit(onSubmitHandler)}
	honeyPotFieldName="username">
	<Form.Header title="Login">
		<Button
			variant="link"
			onClick={() => onChangeScreen()}>
			Don't have an account yet?
		</Button>
	</Form.Header>

	<Form.Body>
		<Form.Email
			register={register}
			formState={formState}
		/>

		<Form.Password
			register={register}
			formState={formState}
		/>

		<Form.Submit formState={formState}>Login</Form.Submit>
	</Form.Body>
</Form>
```

This is all the jsx code for the login form! On the next update I plan to remove `register` and `formState` props from each component, and instead pass them only to the parent form element, as well as adding more useful components!

<h3 id="sass">Sass Structure & BEM</h3>

Here I'm not so proud... the code is a bit messy and most classes are not reusable (resulting in a lot of duplicates)
The file structuring follows a basic Sass guide (no reason in special...just like this one)

-   base
    -   \_base
    -   \_colors
    -   \_reset
    -   \_typography
-   components
    -   (basically 1 file per component, with some exceptions)
-   pages
    -   ( 1 file per page, or subset of a page in complex cases )
-   utils
    -   \_animations
    -   \_layout
    -   \_media-queries

For class naming I also used a common pattern, called **BEM** ( Block - Element - Modifier ). Here's an example:

```html
<div class="card">
	<div class="card__front card__front--1">...</div>

	<div class="card__back card__back--1">...</div>

	<div class="tooltip">...</div>
</div>
```

The previous code defines a card element with a front and back sides, it also has a tooltip that should be rendered when the user hovers the card.
BEM states that when styling a **Block**, the **elements** that make up that block should use 2 underscores `<block__element>`, and **variants** (or modifiers) of those elements, should use 2 hyphens `<block__element--modifier>`. A misconception many people have when using BEM is that every child is a "block element", which is not true. Even tho the `tooltip` is inside the `card`, it's not actually part of it, that card is merely using a pre-existent tooltip element

Although I tried to implement this at the best of my capacities, I failed in leveraging Sass capabilities with BEM. This is also due to the fact that I was designing the interface "on the fly", structuring elements and classes as I coded my way through the project.
This subject will also be improved on stage 1.

#### Design Note

If you haven't forgotten yet... I'm not a designer, and I'm totally aware that the website itself is not the prettiest thing you've seen on the web. It might not follow design rules, colors might not be the best choices, etc
The focus of this project is to showcase the technical side of the project, and not to deliver an award winning UI.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ======================================================================================================================================= -->

<h2 align="center" id="shared">Shared Code</h2>

<h3 align="center" id="zod">Zod</h3>

Zod ( _not to be confused with the general from the kryptonian army_ ), is a library that brings actual type-safety to javascript during runtime! First we need to define a schema (which is basically the same as a typescript type), then whenever we need to check if an object is valid, we just use the schema to parse it! It's super flexible and you can read more about it [here](https://zod.dev/).

Zod by itself is not a validation tool, but allows us to specify what is valid, and what isn't

```ts
export const LoginSchema = z.object({
	email: ZodValidatorSchema.email,
	password: ZodValidatorSchema.requiredNonEmptyString,
});
```

This defines an object with 2 properties, email and password. `ZodValidatorSchema` is something of my own, it's basically an object that contains common basic type schemas for strings and numbers (i.e email validation, street names, price formats, etc). When parsing a schema, should it fail, zod returns an error object containing customizable detailed information about why it failed.

Furthermore, zod pairs pretty well with typescript, having type inference from schemas

```ts
export type LoginSchemaType = z.infer<typeof LoginSchema>;
```

Being such a neat tool, the project heavily relies on it for data validation (even for database entries 😨... I'll get there soon )

<h3 align="center" id="other">Other</h3>

On the shared folder you can also find data structures like the `Cyclic Array`, or the `HttpError` object that...seemed great at the start, but now I see that the way I'm handling server errors is pretty f@ck!n terrible.
Didn't I say before that assigning a project like this to a junior dev was a bad idea?

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ======================================================================================================================================= -->

<h2 align="center" id="frontend">Backend</h2>

<h3 align="center" id="routing">Overview</h3>

The Rest API is quite simple, contains basic security features, like `cors` and role based access, uses the mongodb nodejs driver to connect to the database and makes use of some middlewares to process data like images, or create and send emails from my own gmail account.

In development I also used Insomnia to test the endpoints, and as much as I would like to share a OpenAPI spec file... please have mercy on my soul...
You can however check this [whimsical board](https://whimsical.com/tea-shop-LxYQkUrFdccPsFU7H4DxR1)

I organized the file structure in the following manner:

-   database
-   mailing microservice
-   repositories
-   routes
    -   controllers
    -   middleware

All endpoints are loaded through a main express router on `src/routes/router.ts`, which basically acts as a "router for routers", since the code relative to the shop, is loaded from the shop router, accounts use the account router...and so on.

On the database folder the `src(database/DatabaseClient.ts` exports an object named dbClient that exposes all the required methods to work with the project's database via a pooled connection system.
The repository class constructor on `src/repositories/Repository.ts` accepts a client object (namely the dbClient), and 2 strings for both database and collection names, properly reusing the same database client.

Side note: I'm not satisfied with the way repositories were implemented... at first it seemed awesome, but after being forced to write all the types for the methods, It doesn't seem good to me...
If you have any suggestions, please contact me! I'd love to hear it 😃

Lastly but not least, a cleanup is performed on the event of a server crash, or unexpected shutdown. Currently it only ensures that database connections are properly closed.

<h3 align="center" id="security">Security</h3>

<h3 id="cors">Overview</h3>

During stage 0 only cors has been set up. In production mode, accepts requests coming only from the frontend website url.
To the lack of my knowledge, I did not specify the allowed headers, nor did I implement sessions.

Sessions take part in storing some "non-persistent" data relative to the user, that can be used on followup requests, or even to store data about a user being already logged in. Although they can be hijacked, when used properly they can add an extra security layer to the application preventing attacks such as **CSRF** ( _Cross Site Redirection Forgery_ ).

CSRF poses a major threat when dealing with things like **SSO** ( _Single Sign-on_ ), because an attacker can intercept the request and redirect the client to a malicious page almost indistinguishable from the real one. For more information on this type of attack read this document from [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

Now you may be wondering... If the mailing microservice uses my own gmail account, is it safe? Yes, following tutorials from the google docs, I'm using OAuth2.0 and express sessions to mitigate possible problems with my own account, but more on that later.

#### Role based access

Access to protected routes is implemented through an authorization middleware, it simply checks the existence and validity of a session cookie (regular BEARER Token), and decodes it in order to obtain the user _email_.
This has several problems, for instance decoding the token on every request negatively impacts performance increasing response times, and even though the cookie is marked with the httpOnly and secure flags, it's still possible to intercept it and use it to access protected routes maliciously (that's a **Man in the Middle Attack**).

> A better solution involves access and refresh tokens, similar to OAuth process. This is an **_intentional behavior_**, as future stages also implement `passport.js` and SSO.

Resources like profile images, are only available to the respective authenticated user.

<h3 id="secrets">Secrets, Hashing & Encryption</h3>

All passwords are hashed before storing on the database, and after account activation, they're never sent back to the client. The project uses `bcrypt` and to achieve this.

_Hashing vs Encryption_

This topic is a slight "rabbit hole", and I'll cover only the basics of it... If you're interested though, check this [link](https://www.thesslstore.com/blog/difference-encryption-hashing-salting/)

One of the key differences between hashing and encrypting is that hashing is a one way function, where encryption can be reversed! It's computationally more expensive to reverse an hashed value than an encrypted one.

Hashing is perfect for password storage, because in the end we just need to validate a given password against it's hashed value. (Note that hashes should also contain a "salt", so it's actually comparing the password plus the salt against the hash). Encryption is more suited for communications (like the HTTPS or TLS protocols) where data should only be readable by "end parties", and not anyone that might be in the middle.

Now you might be wondering that if you can't "read" the hash value...isn't it encrypted? Well...kinda...but...no. Here we're just talking about passwords, small strings of data, but imagine we're dealing with more complex structures. A hash has a fixed length (i.e SHA-256 is an hashing algorithm that produces keys with 256 bits), and even the tiniest variation on the original input can alter the resulting hash! So if I wanted to create an hash table for files (with obviously more than 256 bits each), would be impossible to turn 256 bits of hashed data back into an actual file of "megabytes size".

With encryption, the file size does not change, it's just the content that is unreadable/unusable.

> P't hzavupzolk aoha fvb hjabhssf dhualk av joljr aopz vba! - caesar-cipher

Both hashing and encryption share a common concept: **secrets**

Secrets are essentially a private key that allows authorized entities to read or verify data. Hashes also contain a _salt_ value that is used to prevent hackers from using things like rainbow-tables.
If everyone used the same hashing or encryption algorithm, then they would redundant because common passwords would always be hashed the same way!
By providing a salt, hashing "mySuperStrongPassword" will produce different results based on different salt values.

#### Render Outbound IPs

The platform that hosts the project's backend, Render, has a set of outbound ip's for each project used for secure communication with external services like databases. At the same time, MongoDB Atlas restricts access from unauthorized ip addresses.

<h3 align="center" id="middlewares">Middlewares</h3>

#### Authentication

The authentication middleware decodes the jwt token that was passed as an httpOnly cookie, retrieving session information like the user email. If the token is valid, then it populates `res.locals` with an email property, used on subsequent middlewares and controllers.

#### Body Parser

The client interacts with the API by passing data to the body on some requests. This data needs to be validated, and for that I also use Zod.

```ts
export default function createBodyValidatorMiddleware(schema: z.ZodSchema) {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);

			return next();
		} catch (error) {
			throw new HttpError(
				HTTPCodes.ClientError.BAD_REQUEST,
				"missing or invalid fields at " + req.url,
				{
					error: (error as ZodError).errors,
				}
			);
		}
	};
}
```

When defining an endpoint that requires body validation, calling this function with the appropriate schema returns the actual middleware.

#### Single Image Parser

Using `Multer` and `sharp` packages, a user may upload a single image up to 3mb, in `.jpeg`,`.jpg` or`.png` formats. The middleware is then responsible for resizing, compressing and converting the image to `.webp`, substantially reducing file sizes!

<h3 align="center" id="microservices">Microservices</h3>

On stage 0 you'll only find the **Mailing** microservice implemented. Future stages will include **payment processing**, and **AI**!

#### Mailing

Using `googleapis` and a google cloud project, I allowed access to my gmail account for sending emails only. It uses the OAuth2.0 method, with the appropriate api scopes to request access and refresh tokens from google, which are then stored on the database.

This service allows for token renewal (since tokens expire) and access revoking, invalidating all tokens.

Here's a brief idea of how [OAuth](https://developers.google.com/identity/protocols/oauth2) works:

In order for a client to receive a token, it must first ask for an **authorization code** (sent back after successful authentication in the OAuth screen), that code is then used to request the actual **access** and **refresh** tokens.
The authorization code, and the tokens all have different expiry times, the code being the shortest lived one. When the access token expires, a new one can be issued by using the refresh token, and when this one finally expires, then the user needs to reauthenticate the service with google, passing by the OAuth screen again.

This approach is way more secure, because the OAuth screen redirects back to a specified url that can (and should) be protected against common attacks such as CSRF; tokens can be almost instantaneously revoked; and if token rotation is implemented, then security increases even more!

Sending the actual emails is done with `nodemailer`, a library designed to work with various email providers. Firstly I create an email template, that may receive dynamic data, and then it's sent to the final user.
GCP (google cloud projects) have some limitations on the api calls, however for a portfolio project that's not an actual concern.

For real projects I would have considered a different service provider for a more professional email, and management system.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ======================================================================================================================================= -->

<h2 align="center" id="dbs">Database & Repositories</h2>

#### Overview

Ah... the worst part of stage 0 ...

First we need to understand our options when it comes to databases. There's **Relational** and **Non-Relational** databases (and some others that don't matter for this project), both have their own pros and cons, but I think everyone agrees that non-relational ones are way easier to set up. Now if you're a developer, we may enter in disagreement here because personally I dislike working with databases...Aside from the initial data modeling that comes with **relational** databases, it's somewhat of a boring subject.

Most non-relational databases are associated with "NoSql", but not all of them! NoSql means that it does not rely on the SQL querying language, and it's typically used for unstructured, or loosely structured data. It doesn't mean that the database itself doesn't have a structure, but the way these services work allows for more performant interactions with large lists of data. Here's a more in-depth comparison of [NoSQL vs SQL](https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql).

In accordance to the project needs, it seemed to me that a non-relational, nosql database would be the most adequate. MongoDB not only fits the requirements, but it's also **ACID** (Atomicity, Consistency, Isolation, Durability) compliant! A thing that not many databases of the same type follow.

Furthermore MongoDB also offers the Altas platform, allowing me to deploy a secure database service for free on their servers!

<h3 id="prisma">Prisma & Mongoose</h3>

Prisma is an **ORM** (Object Relational Mapper) tool commonly used with relational databases, but it also integrates with MongoDb. The reason I choose NOT to use it was due to the unnecessary added complexity. As said before the data that needs persistence is quite simple.

Mongoose on the other hand is a node js package built on top of the native mongodb driver, read more about it [here](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/). It offers a way to model data and interact with the database in a more structured way.

Being a foolish junior dev, i deliberately developed my own "wrapper" around the mongodb client...which of course has a lot of problems that will be solved either on stage 1 or 2.
Working with databases is a core responsibility of a backend developer, and often we're not presented with a well structured code base. Therefore a goal in future stages is to solve this specific problem.

One other reason that led me not to use mongoose out of the box was the already existing Zod schemas. As a solo developer I can easily ensure that all data passed to the database is valid, but in a real team environment this would not be a good idea as it might cause several problems with data entries.

#### DB Client

Nevertheless I'll give you a brief overview of my client. It supports only the methods needed, such as `insertOne`, `findAndUpdateOne`, `findAndUpdateMany`, `deleteOne`, `findOne` and `findMany`. It also exposes an `has` method that returns a boolean value from the `findOne` method.

The client works with the following types

```ts
export type DatabaseFilters<dto> = Filter<WithId<dto>>;

export type DatabaseData<dto> = OptionalId<dto>;

export type DatabaseResponse<dto> = Promise<{
	data?: OptionalId<dto> | null;
	error?: unknown;
	message?: string;
}>;
```

`DatabaseFilters` - Defines a MongoDB filter that can be some portion of the schema or a set of [operators](https://www.mongodb.com/docs/manual/reference/operator/)

`DatabaseData` - Defines the schema in question

`DatabaseResponse` - As a way to easily work with database requests, each client method always returns this object, and _NEVER_ directly throws an error. A response may contain data, or and error and/or message.

`dto` - Is a generic type that stands for **data transfer object**, and can literally be anything.

#### Repositories

Repositories use dependency injection to work with a shared client, and automatically pass a database and collection names.
What I really don't like about my code is the duplicated type definitions in the client and repository codes. Aside from that, I'm currently forcing the implementation of all methods, which is not practical, nor intended in some cases.

Repositories are thus simply an object with 3 properties `client`, `database`, `collection`, and the exposed methods from the client.

```ts
export default class Repository<dto> {
	protected client: MongoClientWrapper;
	protected database: string;
	protected collection: string;

	constructor(
		client: MongoClientWrapper,
		database: string,
		collection: string
	) {
		this.client = client;
		this.database = database;
		this.collection = collection;
	}
	insert(data: DatabaseData<dto>): DatabaseResponse<string | ObjectId> {
		return this.client.insertOne(this.database, this.collection, data);
	}
	find(filters: DatabaseFilters<dto>) {
		return this.client.find(this.database, this.collection, filters);
	}
    has(filters: DatabaseFilters<dto>):DatabaseResponse<boolean> {
	  	return this.client.has(this.database, this.collection, filters);
  	}

    ...

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

> If you reached this far...let me thank you for the patience in reading it all! I really appreciate it, and would love to hear your feedback! Feel free to message me, open issues, or comment on the code itself!

<!-- ======================================================================================================================================= -->

<h2 align="center" id="notes">Schedule an Interview!</h2>

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-lopes-software-developer/)
[![Gmail](https://img.shields.io/badge/Gmail-0078D4?style=for-the-badge&color=red&logo=gmail&logoColor=white)](mailto:rafalopessecond@gmail.com)
