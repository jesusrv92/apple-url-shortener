import assert from 'assert';
import view from '../src/view';
import ShortURL from '../src/model';

describe('Functionality testing', () => {
  it('Should render page correctly', () => {
    const defaultPage =
      `<div style="padding: 20px">
    <h1>URL SHORTENER</h1>
    <form action='/' method="POST">
      <input type='text' name='longURL'/>
      <button>Submit</button>
    <form>
   </div>
  <div>
    
  </div>
  `
    const pageWithUrl =
      `<div style="padding: 20px">
    <h1>URL SHORTENER</h1>
    <form action='/' method="POST">
      <input type='text' name='longURL'/>
      <button>Submit</button>
    <form>
   </div>
  <div>
    <a href="test" target="_blank" rel="noopener noreferrer">test</a>
  </div>
  `
    assert.strictEqual(view(), defaultPage);
    assert.strictEqual(view('test'), pageWithUrl);
  });
  it('Should return url object with normalized url', () => {
    const url = 'test.com';
    const normalizedUrl = 'http://test.com';
    const urlObject = new ShortURL(url);
    assert.notStrictEqual(urlObject, url);
    assert.notStrictEqual(urlObject.id, url);
    assert.strictEqual(urlObject.url, normalizedUrl);
  });
  it('Should return same url if page already given', () => {
    const url = 'test.com';
    const urlObject = new ShortURL(url);
    const otherUrlObject = new ShortURL(url);

    assert.strictEqual(urlObject, otherUrlObject);
    assert.strictEqual(urlObject.url, otherUrlObject.url);
    assert.strictEqual(urlObject.id, otherUrlObject.id);
  });
  it('Should redirect to correct page', () => {
    //TODO
    assert.strictEqual(true, !false)
  });
  it('Should return new value for long url if expired', () => {
    //TODO
    assert.strictEqual(true, !false)
  });
  it('Should return main page if short url expired', () => {
    //TODO
    assert.strictEqual(true, !false)
  });
});
