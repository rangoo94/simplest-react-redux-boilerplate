import dispatchApplication from '../index';

const handleError = res => err => {
    if (err instanceof Error) {
        return res.send(`
            <h1>${err.toString()}</h1>
            <p>${err.stack}</p>
        `)
    }

    return res.send(`
        <h1>Error</h1>
        <p>${JSON.stringify(err)}</p>
    `)
};

const render = (req, res) => {
    Promise.resolve(req.originalUrl)
        // Dispatch application
        .then(dispatchApplication)

        // Render application
        .then(app => res.send(`<pre>${JSON.stringify(app)}</pre>`))

        // Handle error messages
        .catch(handleError(res))
}

module.exports = render
