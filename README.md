# Developers' Guide

## **Description**

This project consists of form util which will auto generate
Angular reactive form with any object type.

If you need userform, we need to define it as given below.
```
contactForm = new FormGroup({
    firstname: new FormControl('',Validators.required]),
    lastname: new FormControl('',Validators.required]),
    email: new FormControl('',Validators.required]),
    country: new FormControl('',Validators.required])
  })
```

In order to get rid of writing above code for each form creation,
we have created a util class which does such job for you with just
passing object as parameter.

```
//Need to extend FormBaseComponent to avail this feature
export class UserFormComponent extends FormBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    const user =  {email: '', firstname: '', lastname: ''};
    //the code below will generate formgroup and assign it to form property.
    this.configureForm(user);
  }
```
### Example: 
 There is a sample demo app created where this feature can 
 be tested. You can run this app using `yarn install && yarn start`
