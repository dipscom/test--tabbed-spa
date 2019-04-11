# Mock Responsible Tabbed interface

As a test for a potential contract I was asked to code a, not-so small, tabbed component in VUE and document my process.

[Here is a live demo hosted in Netlify](https://gracious-rosalind-840cbf.netlify.com/).

Bellow is my documenting of it.


### The Brief
>Using Vue.JS, create a tabbed SPA which has the following fields:
>
>* Title
>* Service - restrict options to &#39;Service 1&#39;,&#39;Service 2&#39; &amp; &#39;Service 3&#39;
>* Quantity
>* Unit cost
>* &lt;calculated&gt; Total cost
>
>Validation must be provided for editable fields; most importantly that they are filled in.
>
>Each tab title must be &lt;title&gt; - &lt;total cost&gt; for that tab. Please use a tab colour to represent the different &#39;service&#39; option.
>
>The user needs to be able to add, remove and duplicate tabs.
>
>At the bottom of the SPA, please have a &#39;submit&#39; button that will; pending successful field validation; show all of the tab information in JSON format. JSON structure to your choosing.
>
>Most importantly; this must look incredible. Use whatever tricks you can in the short space of time to make the flow and feel for this form great.
>
>Ideally the code will be well contained and easy to add to an existing page; as if it is a form that we want to add to multiple pages.

### The Process

#### Day 1

I spent a bit over two and a half hours sketching the initial concept and doing the blocking of the prototype.

![Image of handwritten notes structuring the brief](https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/TabbedInterface-sketch-0.png)

![Image of handwritten sketch of a desktop layout of the component](https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/TabbedInterface-sketch-1.png)

![Image of handwritten sketch of a mobile layout of the component](https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/TabbedInterface-sketch-2.png)

### Day 2

Moved into refining the blocked out prototype into a higher-fidelity one choosing the colour palette to use, vertical rhythm, general spacing and fonts.

![Image of a screenshot of Adobe XD&#39;s screen with my prototype and variants](https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/TabbedInterface-prototype.png)

I will usually create a visual representation of the major components of the page before starting to code. I find it is easier to move boxes in a graphics editor than to code directly.

Mobile is my preferred device to start due to its limitations and usually less powerful hardware. Then, I move onto desktop, making sure it also accommodates larger tablets. Smaller tablets are based off of the mobile design.

* [The mobile prototype](https://xd.adobe.com/view/4a8b754f-d21c-44a9-50f3-96aae4c4e8c0-3cba/)
* [The simplified desktop prototype](https://xd.adobe.com/view/973597f5-6320-43f3-713f-40866f107052-e104/)

This refining and prototyping took me about three and a half hours.

### Day 3

Started on the actual coding. The scaffolding of this project was done with [Vue CLI](https://cli.vuejs.org/), default presets were fine, no Vuex, no Vue-router. Although the brief describes the final product as being an SPA, it also states at the end of it that the code should be self-contained and able to be dropped into an existing project. That, and the actual behaviour expected, led me to surmise it was not really an SPA but a modular component. I am not sure I got as self-contained as it can be but it&#39;s a pretty decent attempt, if you ask me.

This first day of coding was spent laying out the HTML blocks and styling the CSS. This ended up being close a full day&#39;s work where I clocked about five and three quarters hours on this alone.

As this will never be deployed as in a product, I decided to use CSS variables for the sake of them being great and saving myself the need to add a pre-processor to the build chain.

### Day 4

Final touches on the bulk of the CSS as well as the start of the JavaScript. No major obstacles were found here. Started with the smaller logic: displaying computed data, making the fake SVG `radio` buttons reflect the state of the actual `radio` buttons, created some of the nested components and moved the relevant code into them from the parent component. Along the day, refactored some of the CSS and made a couple of changes on decisions I had made during the design phase.

Big day of work on this. Six and a half hours.

### Day 5

Final day of development. Getting the children components to communicate with each other, checks to make sure if all inputs were filled in before allowing user to &#39;submit data&#39; as well as some bonus animation on top for the fun of it. Had to refactor some chunks from the previous day as I realised I had over-engineered this thing a bit too much. Lesson learnt though.

> Only create a component if you need said component. Do not do it pre-emptively.

Another full day of development in this, now, side-project. Six hours and a quarter.

### Day 6

Wrap up day. I am calling this component done. It&#39;s a test, not a personal passion. As far as I can see, it works, does not seem to break.

Spent just over an hour and a half today creating the images, the prototype links and writing this document up.

Ended up having a good time doing this test, it was just about large enough to feel like a sizeable project but small enough to not drag on for too long. It was nice to have a focus and a goal to achieve. Also important was the fact that I decided to take my time. Not overwork or rushing to complete. Took all the steps I wanted to before opening the code editor, worked a healthy amount of hours and turned off when the day was over.
