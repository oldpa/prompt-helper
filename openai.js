const apiKey = '';
async function OpenaiFetchAPI(apiKey, prompt, element, model) {
    if (model === undefined) {
        model = "gpt-3.5-turbo";
    }
    let body = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "stream": true,
    }
    const res = await myCache.get(body);
    if (res !== null) {
        element.innerText = res;
        return;
    }
    element.innerText = "Loading...";
    var url = "https://api.openai.com//v1/chat/completions";
    var bearer = 'Bearer ' + apiKey;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)


    }).then(response => {
        if (response.ok) {
            return response.body.getReader();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(reader => {
        const decoder = new TextDecoder();
        let result = '';
        function readStream() {
            return reader.read().then(({ value, done }) => {
                let decoded = decoder.decode(value);
                let lines = decoded.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].length < 20) {
                        continue;
                    }
                    let data = JSON.parse(lines[i].substring(5, lines[i].lastIndexOf('}') + 1));
                    let res = data.choices[0].delta.content;
                    if (res !== undefined)
                        result += res;
                }
                element.innerText = result;
                if (done) {
                    myCache.set(body, result);
                    return;
                }
                readStream();
            });
        }
        return readStream();
    }).catch(error => {
        console.log('Something bad happened ' + error);
    });

}

