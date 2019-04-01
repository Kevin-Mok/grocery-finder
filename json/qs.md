- Layout: overall layout 	      2.0 / 4.0
- Layout: Views               	1.5 / 3.0
- Usability: User interactions 	2.0 / 4.0

- The navigation bar is full of overloaded user interactions. The icons are
  there on every page but they do different things depending on what page
  you're on. This is hard for a user to learn and leads to unintuitive
  behaviour on the application. For example, if you are looking at the list
  of grocery stores, why is there a floppy disk icon that allows you to save
  your current cart? Or when you are looking at grocery stores, what does the
  "All" button do?
  - just remove save?

- Using icons exclusively can also be very confusing to a user. As someone
  who has never used your app, how am I supposed to know what the calculator
  button supposed to do?
  - hover tooltip/text?

- The "All" button is actually redundant because there is an "All" option in
  the "Produce" dropdown.
  - mult. categories

- UI hover states should not be the same as active states. This is confusing
  for the adding items user interaction: since the mouse hover state is
  identical to the "checked" state, you don't know if clicking it did anything
  unless you mouse away. This becomes a more serious problem in a real
  application when clicking a button requires a server call that may fail.
  - https://fontawesome.com/icons/cart-plus?style=solid

- If you go to the page with your current cart or the produce listing, then
  type something in the search bar, it goes to the grocery store list page.
  Why?
  - can't reproduce

A general comment: more effort went into your admin page than required. Admin
pages only need to be able to modify/delete objects on the website, they don't
need to look nice and they don't need to duplicate functionality for regular
users. You can simplify the admin page a lot for your next phase -- even a HTML
table with no CSS would be fine.
- keep?

- Phase 2 marking priority?
