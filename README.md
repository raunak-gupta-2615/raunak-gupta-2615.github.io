Assumptions:

1. once a page is viewed after laoding, if that page is viewed again then view doesnt log as an event
that is for eg if i load a page at 20.19 and view all the pages one by one i.e. scroll to the bottomest
of the website and now if i scroll up again and view those pages again, the view event doesnt log this time
(that is the second time). For the view event to log for any page again you'll need to load the sit again.

2. the cv gets downloaded in the same page/tab, i.e. on clicking the download cv button the page relaods into the cv page and not a new tab gets opened for the cv document.

3. for the event tracker it counts view event for all the elements in a page instead of just the page, and for the click event it tracks whether an image or a text has been clicked
