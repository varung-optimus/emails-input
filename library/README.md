<p align="center"><img src="demo.png" /></p>

<h1 align="center"> Email Input </h1>

<p align="center"> Emails input component to allow users to be able to create fancy chip style email input </p>

<hr/>

<p> Emails input component to allow users to be able to create fancy chip style email input </p>

<h3> List of features </h3>

<ul>
  <li>Easily create a chip style email input in vanilla project</li>
  <li>Quick & Easy installation using npm</li>
  <li>Customizable events to create chip - blur, enter, comma, space</li>
  <li>Ability to replace/copy the existing long list to the input</li>
  <li>Subscribe/Listen to value changes of the input</li>
</ul>

<h3> Demo -> Show me what you got </h3>

<a href="#"> Link 1 </a>

<a href="#"> Link 2 </a>

<h3> Code Demo </h3>

```javascript

var emailInput = new EmailInput(document.getElementById('emails-input'), { textElementClasses: 'form-control', domain: '@miro.com' });
emailInput.listenToChanges(() => {
    console.log('listened');
});
emailInput.addEmail();
emailInput.addEmail();
emailInput.addEmail();
emailInput.replaceEmails(['something@something.com', 'me@me.com', 'do@something.com']);

```

<h3> Download & Installation </h3>

```shell
$ npm i emails-input
```
<h3>Contributing</h3>
Keep it simple. Keep it minimal. Don't put every single feature just because you can.

<h3>Authors or Acknowledgments</h3>
<ul>
  <li>Varun Goel</li>
</ul>