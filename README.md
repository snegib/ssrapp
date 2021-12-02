# ssrapp

# API (https://react-ssr-api.herokuapp.com/)

#### Till the "add users router and babel polyfill to work async await properly" commit

Now that we have a redux application in place, we can get back to figuring out how we're going to solve our four big challenges around server side rendering with Redux.
Remember that we have kind of already taken care of the first problem.
We have set up two separate copies of Redux, one on the server and one on the client.

The next big problem that we're going to tackle here is focusing on how we can detect that data loading has been completed during the server side rendering process.

Now, this is not an issue on the client side.
And we know that because right now, when we run our application on the client, everything works out.

We get our list of users on the screen.
Everyone's happy, everything is OK so far.
