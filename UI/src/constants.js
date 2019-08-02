export const HOST = "https://us-central1-mokkapage.cloudfunctions.net/app";

export const APP_HOST = "http://localhost:3000"

export const count = 2;

export function loadImages(questions) {
    questions.map((q) => {
        return q.options.map(o => o.url);
    }).reduce((a, b) => a.concat(b), []).forEach((q) => {
        console.log(q)
        new Image().src = q;
    }
    );
}

export async function updateServer(url, method, data) {

    try {
        var resp = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (resp.status >= 200 && resp.status < 300) {
            return resp;
        } else {
            console.log('Somthing happened wrong');
            return false;
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
