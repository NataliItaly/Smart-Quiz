## 23.03.26

t turned out that the bug in searching for a registered user was simply due to incorrect search parameters — I was searching by name instead of the email-name object structure.

I fixed this, and now everything works correctly.

I also added styling for the login page. In the final version of this page, I replaced simple alerts with nice popups. To do this, I created a separate popup class and exported it to use in the login page code.