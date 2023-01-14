console.log("background.js loaded")
browser.webRequest.onHeadersReceived.addListener(details => {
    try {
        console.log("request received", details)
        const res = {
            responseHeaders: [
                ...details.responseHeaders.map(h => {
                    if (h.name.toLowerCase() === "content-type") {
                        return {
                            name: h.name,
                            value: "application/octet-stream"
                        }
                    } else if (h.name.toLowerCase() === "server") {
                        return {
                            name: h.name,
                            value: "webextension"
                        }
                    } else {
                        return h
                    }
                }),
                { name: "Access-Control-Expose-Headers", value: "Content-Type, Server" },
            ]
        }
        console.log("header replaceted", res)
        return res
    } catch(e) {
        console.error(e)
        throw e
    }
}, {
    "urls": ["https://httpbin.org/get"]
}, ["responseHeaders", "blocking"])