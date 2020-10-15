const url = 'api/storage/Characters/123/456';
//const body = {};
const optionalParameters = {
    //headers: {
    //    "content-type":"application/json; charset=UTF-8"
    //},
    //body: body,
    method: "GET"
};

fetch(url, optionalParameters)
    .then(response =>
        response.json())
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error:', error);
    });