# WISHLIST - self-hosted present-aggregator

This started as personal project to learn [react](https://facebook.github.io/react/), [node.js](https://nodejs.org) and [express](http://expressjs.com/). While usable, it is still mostly a work in progress.
Also, everything is in German.


In WISHLIST groups (families, friends, co-workers etc) can collect wishes for themselves and others. For each user only the wishes are visible that are either not for him or added by himself.

## Installation
1. Clone the repository
2. Add the path to your mongodb file to config.js
3. Install node and the dependencies with npm install
4. Build the project with [gulp](http://gulpjs.com/)
5. Run bin/www (you might want to use [forever](https://github.com/foreverjs/forever) for this)
6. You can access the wishlist on your-ip:3000

## Adding users
Users have to be added manually for now. The schema is:
```
{
  "name": "NAME", <- the users name
  "key": "UNIQUE KEY", <- a unique key which acts as the password so make it long (what could go wrong)
  "email": "guess_what@email.computer",
  "isAdmin": TRUE OR FALSE, <- admins can edit and delete all wishes
  "group": ANY NUMBER, <- each user can only belong to one group and can't see wishes or users from other groups
  "imageUrl": "USERNAME.jpg", <- put a file with the same name in public/images/user
}
```
Note: admins still cannot see wishes for themselves that were added by another user.

## Todo:
- write better readme, add screenshots
- so much clean-up
- mobile-friendly layout
- better security (atm only a pass-phrase is used and no brute-force detection is implemented)
- multiple language support (at least english)
- admin pages to manage users and wishes
- better support for multiple groups
