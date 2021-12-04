# Server Side Rendring App

### API (https://react-ssr-api.herokuapp.com/)

#### Till the "add users router and babel polyfill to work async await properly" commit

Now that we have a redux application in place, we can get back to figuring out how we're going to solve our four big challenges around server side rendering with Redux.
Remember that we have kind of already taken care of the first problem.
We have set up two separate copies of Redux, one on the server and one on the client.

The next big problem that we're going to tackle here is focusing on how we can detect that data loading has been completed during the server side rendering process.

Now, this is not an issue on the client side.
And we know that because right now, when we run our application on the client, everything works out.

#### See "see (react router config lib) comment to (waiting for Data Load Completion)" commit

we discussed the first possible solution for waiting on all of our data loading of our application, but we immediately saw that there were two very large issues with it. Here, we're going to discuss an alternate solution, and this is going to be the solution that we end up implementing. Now, this alternate solution has its own list of pros and cons. It is certainly not perfect, but it is the solution that you're going to see in every single server side rendered Redux app out there. And you can go and look at a lot of the public boilerplates that includes server side rendering. And you're going to see that they all take this type of approach. very popular next Js framework does its data loading and essentially the same kind of idea.

The key to the solution is that we are going to attach a little function to all of our components that describes the data that component needs to load in order to be rendered. So then, whenever a request comes into our server, we're going to look at the url that the request is trying to access and use that to figure out what set of components need to be rendered. Then for each component that needs to be rendered, we will call that new little function that is attached to each of those components to initiate the data loading process. So the key here is that we are not doing some initial render of the application here. We just have a set of components. Each one says, hey, here's a resource I need, here's a resource I need. Then whenever someone makes a request, we look at the set of components that we should need to render to get the page to show up for them. And we'll take all those components. We'll take these little data loading requirement functions that are attached to them and we'll call each of those. Once each of those little data loading functions are complete, we will then detect that they are finished in some fashion and then render the app with all that collected data and send the response back to the user.

Now, let's break this down into the advantages and disadvantages of the second approach. What's the deal with this one?
So with this approach, we only have to render the app one time, which is obviously a dramatic difference compared to rendering the app twice. That's going to take probably just twice as long to get a response back to the user.

In addition, by making those special data loading functions and tying them to each component and makes the data loading requirements of each component far more obvious and clear for the server side rendering phase, because every fetch request that is intended to take place on the server will be confined to just a few very small functions. And so you as an engineer, to figure out what data loading requirements you have for some given requirement are assuming for some given component. You can look at these small little data loading functions and say, OK, this is what this component needs to show up on the screen during the server side rendering process. On the flip side, this approach takes a tremendous amount of customized code, especially around the react router side of things. Remember, with our current code setup for react router to decide what components it needs to show, it really does have to render the application. When we set up that static router and pass in the url and render the app, we are rendering the entire application, react Router has to render the app to decide what set of components to show according to our current setup. So to get react router to figure out what set of components to show without rendering twice, we're going to have to write a lot more of customized and very special code and change the way in which we structure some of the routing inside of our application.

#### react router config lib and updating route used commit

the entire purpose of all this stuff that we're doing right now is making sure that we can
figure out what set of components are about to be rendered given some particular URL.

#### Note: we are doing cookies base auth process in this app
