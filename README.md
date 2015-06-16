```javascript
app.use(etagSession());
app.use(function *() {
  this.etagSession.set('test', 'abc');
  console.log(this.etagSession.get('test'));
});
```
