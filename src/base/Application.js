import React from 'react'
import { render } from 'react-redux-async-render'

class Application {
    constructor(store) {
        this.store = store
    }

    destroy() {
        this.store.async.destroy()
        this.store.repeat.destroy()
    }

    dispatch(url) {
        this.setUrl(url)

        return new Promise(resolve => {
            const finish = (result, err) => {
                this.destroy()

                if (!result || !result.html) {
                    if (err instanceof Error) {
                        throw err
                    }

                    throw new Error('Something wrong happened')
                }

                resolve(result)
            }

            render(finish, {
                store: this.store,
                createVirtualDom: () => app.vdom(),
                asyncMiddleware: this.store.async,
                repeatMiddleware: this.store.repeat,
                tries: 1
            })
        })
    }

    setUrl(url) {
        this.url = url
    }

    vdom() {
        return (
            <div />
        )
    }
}

export default Application
