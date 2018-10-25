1) If you don't have npm: install npm

> npm install -g live-server   /!\ Install it globally, this is not a npm project ;)
> cd kiddymaze
> live-server   (you can use a different server if you wish like http-server but this one has hot reload)


2) Please git checkout -b "your_branch" and do Pull Request on master :)

3) If you want to add other JS file, include it in the index.html

4) game.js is a mess and have all responsabilities while it should not, so we'll probably have some refactor to do :)

5) Since variables are all in the DOM, there is no problem of scope in the game: you can basically access any declared variable from any file.
This mean we can split the code easily if we dont wanna all work in the same file (game.js) to avoid conflicts. Feel free to add file and we will clean up afterwards ;-)

6) >>>>>>>>> TODO <<<<<<<<ww
- Add other buttons on the screen: when clicked, add the correct instructions to the stack.
- Add the RUN functionality (use TWEENS (see doc) for making the character move/animate/rotate from the initial position to the goal)
    - Add the collide animation (use whatever spritesheet you want for that before Alexis do it) when the character is through a wall!
    - Add the change color animation (same)
    - Add the success animation (same)


BONUS 
- Add the HINT functionality (that display the character blinking for 4 seconds at the place it should terminate if the code was RUN, it's an helper to have children keep track of were their character is)