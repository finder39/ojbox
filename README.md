# OJ Box (Office Jukebox, or Orange Juice Box)

## What is OJ Box?
OJ Box is a poor man’s solution to having your own shareable music playlist.
It is targeted towards single room office or home settings. You can search for
songs, add them to a playlist, and vote on the songs in the playlist.

Try out the demo at http://ojbox.meteor.com!

## Installation
OJ Box will currently only work on a Linux installation (and I’m not exactly
sure which versions this extends to). Installation is quite a process: the
instructions at
http://journal.gentlenode.com/meteor-1-deploy-a-meteor-application-on-ubuntu-with-nginx/
detail how to do it. The tarball indicated can be found in the dist folder.

## How does it Work?
OJ Box needs to run on a server. Since this is free software, you will need to
install it on a Linux box that has Node.js and MongoDB installed on it.
Installation instructions are above.

OJ Box is a web application that people can go to using a browser.
There are four components to the interface.

### The Player
OJ Box plays music from only a single device. This device is the host player.
Whoever clicked *YEP* on the set up screen controls the host player. Sound will
only come from this device. The other clients that connect will be able to play
and pause the song, but only the host player can skip to the next song.

### Search
The Search tab is for adding music to the playlist. The music comes from
SoundCloud. OJ Box consumes the SoundCloud API.

### The Playlist
Songs added to the playlist can be viewed on the Playlist tab. Anyone logged in
can add songs to the playlist. If you are not the person who added the song,
you can vote up or down on it. Voting up or down can only be done once per user
per song. The person who added the song also has the permission to remove it
from the playlist.

To make it fun, for playlists with three or more people logged in, if everyone
but the person who added the song votes that song down, the song will be booted
off the playlist.

### Chat
You can also chat with other logged in users on the Chat tab!

## Todo
- Add Youtube API support
- Add Spotify API support (this will require Spotify Premium)
- Turn chat text input to contentEditable input
- Clean up CSS
- Remove console logs
- Add user list on chat page
- Make it work for mobile
- Add Velocity and some animations
- Find other places to make performance boosts in the UI

## Possible future features
- Color theme
- Ability to toggle sound on/off from different clients
- Maybe save chat history?
- Database pruning, like delete users who haven’t logged on for a long time
- Gravatar for chat? and/or ability to upload image
- Settings page: settings include color theme, different modes, changing your
user name, setting your user picture, file location for local music files
- Either put in a list of connected users, or use the chat as a message log
and say when users connect, disconnect, etc.

## Notes
Of course there is a limit to how much the SoundCloud API will allow
streaming if this player becomes popular. Also, the YouTube API expressly
forbids just playing the audio from a video, so YouTube is no longer an
option (unless I show the whole video, but that’s beyond the scope of
the project for now).

I will need to add the ability to add your own music library.
