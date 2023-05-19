const apiKey = '';
async function OpenaiFetchAPI(apiKey, prompt, element, model) {
    if (model === undefined) {
        model = "gpt-3.5-turbo";
    }
    let body = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}]   
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
        
        return response.json()
       
    }).then(data=>{
        console.log(data)
        let res = data.choices[0].message.content
        element.innerText = res
        myCache.set(body, res)
        
    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });

}

