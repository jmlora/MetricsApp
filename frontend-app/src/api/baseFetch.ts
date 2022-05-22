
function baseFetch<TBody, TResponse>(url:string, method:string, body?:TBody):Promise<TResponse> {
    return fetch(url, {
        method,
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
}

function getFetch<T>(url:string):Promise<T> {
    return baseFetch(url, 'get');
}

function postFetch<TBody, T>(url:string, body:TBody):Promise<T> {
    return baseFetch(url, 'post', body);
}

export { getFetch, postFetch }