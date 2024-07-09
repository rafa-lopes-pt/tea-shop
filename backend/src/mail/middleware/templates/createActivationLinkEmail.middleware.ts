import { NextFunction, Request, Response } from "express";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import HTTPCodes from "simple-http-codes";

const FRONTEND_URI = process.env.FRONTEND_URI;

if (!FRONTEND_URI) {
	throw new HttpError(
		HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
		"missing GCP_ID env variable"
	);
}
export default async function createActivationLinkEmailMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//url -> send-activation-link/:email?token=
	const email = req.body.email;
	const token = res.locals.token;

	const activationLink = `${FRONTEND_URI}/activate/${token}/`;

	res.locals.mail = {
		from: "Rafael Lopes <rafalopessecond@gmail.com>",
		to: email,
		subject: "Your Next Hire! Rafael Lopes",
		html: `
		<body
			style="
				margin: 0%;
				background-color: #015d3e2d;
				color: #404741;
				text-align: center;
				display: flex;
				flex-direction: column;
				place-content: center;
				place-items: center;
				flex-wrap: nowrap;
				font-family: Arial, Helvetica, sans-serif;
			">
			<div style="background-color: #003b27; padding: 1em; width: 100%">
				<h1
					style="
						color: #e6ac1a;
						font-family: Arial, Helvetica, sans-serif;
						font-weight: bold;
						text-align: center;
					">
					Tea Shop
				</h1>
				<h2
					style="
						color: #e6ac1a;
						font-family: Arial, Helvetica, sans-serif;
						font-weight: bold;
						text-align: center;
					">
					Activation Email
				</h2>
				<p
					style="
						color: #ebfff8;
						font-size: 1.2rem;
						font-style: italic;
						text-align: center;
						font-family: Arial, Helvetica, sans-serif;
					">
					Hi there dear user! Thank you so much for signing up to our lovely
					shop.
				</p>
				<p
					style="
						color: #ebfff8;
						font-style: italic;
						text-align: center;
						font-family: Arial, Helvetica, sans-serif;
						margin: 0.25rem;
					">
					“There is no trouble so great or grave that cannot be diminished by
					a nice cup of tea.” - Bernard Paul Heroux
				</p>
			</div>
			<div>
				<div style="padding: 1em; text-align: center">
					<p style="text-align: center">
						If you're reading this, then it probably means that you're a
						recruiter. If that's so, then I invite you to visit my links and
						learn a bit more about myself. Feel free to also reply to this
						email and schedule an interview!
					</p>
					<p style="text-align: center"></p>
			
					<h3 style="color: #003b27">Get In Touch</h3>
					<div>
						<a
							href="https://www.linkedin.com/in/rafael-lopes-software-developer/"
							target="_blank"
							rel="noopener noreferrer"
							style="
								display: inline-block;
								text-decoration: none;
								text-align: center;
								color: #003b27;
								font-weight: bold;
								border: 1px solid #003b27;
								padding: 0.5em 1em;
								margin: auto;
								cursor: pointer;
							">
							LinkedIn
						</a>
			
						<a
							href="https://github.com/rafa-lopes-pt/tea-shop"
							target="_blank"
							rel="noopener noreferrer"
							style="
								display: inline-block;
								text-decoration: none;
								text-align: center;
								color: #003b27;
								font-weight: bold;
								border: 1px solid #003b27;
								padding: 0.5em 1em;
								margin: auto;
								cursor: pointer;
							">
							GitHub
						</a>
					</div>
				</div>
				<div style="padding: 1em">
					<p style="text-align: center; margin: 0.25rem">
						This link is only valid for a short period of time
					</p>
					<a
						href="${activationLink}"
						target="_blank"
						rel="noopener noreferrer"
						style="
							display: block;
							text-decoration: none;
							text-align: center;
							color: #003b27;
							font-weight: bold;
							border: 1px solid #003b27;
							margin: auto;
							width: fit-content;
							padding: 0.5em 1em;
							cursor: pointer;
						">
						Click here to activate
					</a>
				</div>
			</div>
		</body>
			
		`,
	};
	next();
}
