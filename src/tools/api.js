

export const fetchData = (endpoint, success) => {
  let header = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'multipart/form-data'
  });
  let sentData={
      method: "GET",
      mode: 'cors',
      header: header
  };

  fetch('http://localhost:3001/api/' + endpoint, sentData)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      success(json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
}

export const postData = (endpoint, data, success) => {
  var headers = new Headers();

  headers.append('Content-Type', 'application/json');
  let sentData={
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
  };
  fetch('http://localhost:3001/api/' + endpoint, sentData)
    .then(response => {
      return response.json()
    }).then(json => {
      success(json.wish)
    }).catch(ex => {
      console.log('parsing failed', ex)
    })
}
