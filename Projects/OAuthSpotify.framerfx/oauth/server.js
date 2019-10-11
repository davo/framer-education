const express = require('express')
const request = require('request')
const querystring = require('querystring')
const inquirer = require('inquirer')
const chalk = require('chalk')
const app = express()

let { log } = console
let port = process.env.PORT || 8888

/* --------------------------------- Prompts -------------------------------- */

let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
let FRONTEND_URI = process.env.FRONTEND_URI
let REDIRECT_URI = `http://localhost:${port}/callback`

const launch = async () => {
	if (!CLIENT_ID) {
		const { clientId } = await inquirer.prompt({
			name: 'clientId',
			type: 'input',
			message: `What's your Spotify Client ID?`,
			validate: () => true,
		})
		CLIENT_ID = clientId
	}

	if (!CLIENT_SECRET) {
		const { clientSecret } = await inquirer.prompt({
			name: 'clientSecret',
			type: 'input',
			message: `What's your Spotify Client Secret?`,
			validate: () => true,
		})
		CLIENT_SECRET = clientSecret
	}

	// REDIRECT_URI = await inquirer.prompt({
	// 	name: 'clientSecret',
	// 	type: 'input',
	// 	message: `What's your redirect URI?`,
	// 	default: 'http://localhost:8888/callback',
	// 	validate: () => true,
	// })

	const { projectURI } = await inquirer.prompt({
		name: 'projectURI',
		type: 'input',
		message: `What's your prototype's local URL?`,
		default: 'http://localhost:4567',
		validate: () => true,
	})

	FRONTEND_URI = projectURI + '/preview/'

	log(chalk.yellow(`Listening on port http://localhost:${port}`))
	log(
		chalk.blue(`Authenticate at`),
		chalk.green(`http://localhost:${port}/login`)
	)

	app.listen(port)
}

/* ----------------------------------- API ---------------------------------- */

const authorize = (req, res) => {
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				client_id: CLIENT_ID,
				response_type: 'code',
				scope: 'user-read-private user-read-email',
				redirect_uri: REDIRECT_URI,
			})
	)
}

const getToken = (req, res) => {
	let code = req.query.code || null
	let authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: code,
			client_id: CLIENT_ID,
			redirect_uri: REDIRECT_URI,
			grant_type: 'authorization_code',
		},
		headers: {
			Authorization:
				'Basic ' +
				Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
		},
		json: true,
	}
	request.post(authOptions, (error, response, body) => {
		const { access_token } = body
		res.redirect(FRONTEND_URI + '?access_token=' + access_token)
	})
}

/* --------------------------------- Routes ---------------------------------- */

app.get('/login', authorize)

app.get('/callback', getToken)

/* --------------------------------- Kickoff -------------------------------- */

launch()
