# Grocery Finder

## Table of Contents

  * [Main Features](#main-features)
  * [Server Comments](#server-comments)
  * [User Instructions](#user-instructions)
     * [Login](#login)
     * [Add/Remove Items To Cart](#addremove-items-to-cart)
     * [Save/Restore Carts](#saverestore-carts)
     * [Calculate Best Stores](#calculate-best-stores)
     * [Modify User Settings](#modify-user-settings)
  * [Administrator Instructions](#administrator-instructions)
     * [How to (Properly) Access Admin Page](#how-to-properly-access-admin-page)
     * [Admin Page Instructions](#admin-page-instructions)

## Main Features
- cart to add/remove food items
  - save/restore carts
- filter/sort items
- simulated store calculation
- responsive main page
- admin page

## Server Comments 
Areas in the code where server interaction is required are followed by comments
that start with `SERVER DATA EXCHANGE`.  Please `Ctrl`+`F` or `grep` to find
the string `SERVER DATA EXCHANGE` throughout the code.

## User Instructions
Open index.html. Note that this main page is responsive and will fit all items
based on screen size. The entire navbar will convert to a functional dropdown
one when it is small enough.

### Login
1. Hover over the profile icon on the top left of the navbar.
2. Click 'Login'.
3. Enter 'user' for the username and password and the click 'Login'.
4. The user is now logged in.

### Add/Remove Items To Cart
1. Click on the 'All' button on the navbar, or use the 'Produce' dropdown menu
   to select a food category.
2. Click on any desired grocery items. Clicking on items automatically adds
   them to the cart, displaying a persistent green checkmark on the food item.
   You can toggle the item's current cart status by clicking on it again, where
   you will see an 'X' icon on the item if it's already in your cart.
3. To help locate items, use the search bar to filter the current items, or use
   the sorting dropdown menu to sort items alphabetically.
4. You can view your current cart contents by clicking on the cart button in
   the navbar.

### Save/Restore Carts
Saving and restoring carts can be very useful for groceries because users may
want to buy the same essential groceries over and over again.

**Saving**:
1. To save the current cart, click the floppy disk icon on the navbar.
2. In the popup menu, enter a name for the cart and click 'Save cart'.
3. The cart is saved.

**Restoring**:
1. To restore a cart, click the cart icon on the navbar.
2. Click the 'Saved carts' dropdown menu to view the names of previously saved
   carts.
3. Click on the desired cart to restore.

### Calculate Best Stores
1. Click on the calculator icon on the navbar.

This function is not actually reflective of any actual data and all data is
randomly generated. We will be implementing the algorithm to actually calculate
the best stores in Phase 2. 

We are currently displaying 4 stores with random values. By default, the stores
are ordered by their score, based on how close/cheap their values are compared
to all the other stores in the calculation. You can also sort the stores by
price, distance and alphabetical using the dropdown sorting options beside the
search bar. 

Also note that the store values are colored in relation to the other stores'
values. For example, the lowest cart price will be green, the highest red and
middling values yellow-orange. This applies to all the values.

### Modify User Settings
1. Hover over the profile icon on the top left of the navbar.
2. Click 'Settings'.
3. Edit a field with the pencil button. Press the check to temporarily save the
   changes or the cancel button to revert the changes.
4. Click 'Save Changes' to confirm all changes made; pressing 'Cancel' will not
   save any changes made.

---

## Administrator Instructions
An administrator has access to all functionalities that are available to
standard users. As such, accessing these common functionalities can be achieved
by adhering to the standard user's instructions in the section above.

In addition to the aforementioned functionalities, users with administrative
privileges will also have exclusive access to a 'Manage Users' webpage. It is
from this specific webpage that an administrator will be able to access
administrative processes.

### How to (Properly) Access Admin Page
1.  Hover over the profile icon located on the left side of the navigation bar
    to open a dropdown menu.
2.  Click the 'Login' option.
3.  Sign in using 'admin' as both the username as password.
4.  Open the same dropdown menu from step 1, and click the 'Manage Users'
    option. This will open the 'Manage Users' webpage.

### Admin Page Instructions 
There are two main frames on this webpage. The left frame lists out all
registered users, and the administrator will be able to select a specific user
in order to view/modify that user's account details. If there are a lot of
users, the administrator can filter out users via the provided search bar. The
right frame displays the selected user's account details. 

If the selected user does not have administrative privileges, all of the user's
account details will be visible (and modifiable) to the administrator. If the
selected user does have administrative privileges, then selected user's
password will be censored, and none of their account details can be modified by
the administrator.

If the administrator wishes to return to the index page, there is a button that
is left of the user listing frame that leads to the index page.
