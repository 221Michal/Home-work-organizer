import fetch from 'isomorphic-fetch';

export default function callApi(endpoint, method = 'get', body = null, props = null, dispatch) {
    const opts = {
        headers: { 'content-type': 'application/json' },
        method,
        credentials: 'same-origin',
    };
    if (props !== null)
        opts.headers['x-auth-token'] = props.token;

    if (body) opts.body = JSON.stringify(body);
    return fetch(`/${endpoint}`, opts) //${process.env.API_URL} na początku urla
        .then(response => response.json()
            .then(json => ({ json, response }))
            .catch(() => ({ json: {}, response })) // przypadek błędu parsowania body ==> json (np. puste body, źłe formatowanie jsona)
        )
        .then(({ json, response }) => {
            // if (response.status === 403 && json.message === 'Access Denied' && props && props.token && dispatch) dispatch(userLogout());

            // if (!response.ok) {
            //     const message = json && json.message ? json.message : 'Problem with api';
            //     return Promise.reject({ ...json, message, status: response.status });
            // }
            return json;
        });
}