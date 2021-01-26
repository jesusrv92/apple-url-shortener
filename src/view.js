const view = (shortURL = '') =>
  `<div style="padding: 20px">
    <h1>URL SHORTENER</h1>
    <form action='/' method="POST">
      <input type='text' name='longURL'/>
      <button>Submit</button>
    <form>
   </div>
  <div>
    ${shortURL ? `<a href="${shortURL}" target="_blank" rel="noopener noreferrer">${shortURL}</a>` : ''}
  </div>
  `

export default view