export const HOST = "https://us-central1-mokkapage.cloudfunctions.net/app";

export const APP_HOST = getHost();

export const count = 10;

function getHost(){
    var url = window.location.href;
    var arr = url.split("/");
    return arr[0] + "//" + arr[2];
}

export function loadImages(questions) {
    questions.map((q) => {
        return q.options.map(o => o.url);
    }).reduce((a, b) => a.concat(b), []).forEach((q) => {
        console.log(q)
        const img = new Image();
        img.src = q;
    }
    );
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
