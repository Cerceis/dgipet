# DGIPET
A fun 8-bit nostalgic side-project inspired by "tamagochi" game.

https://pet.cerceis.net v.0.1a

# Info
For more info visit https://pet.cerceis.net/views/info.html

# Version

+[2021-10-25]: v0.1a 
+[2021-11-24]: v0.11a 

# Screen
```                                                 
┌────────────────────────────────────────────────────────┐
│                                                        │
│                                                        │
│          ┌──────────────────────────────────┐          │
│          │                                  │          │
│          │           Game Screen            │          │
│          │       Rendered by Renderer       │          │
│          │                                  │          │
│          └──────────────────────────────────┘          │
│          ┌──────────────────────────────────┐          │
│          │                                  │          │
│          │              Dialog              │          │
│          │        Rendered by Dialog        │          │
│          │                                  │          │
│          └──────────────────────────────────┘          │
│          ┌──────────────────────────────────┐          │
│          │                                  │          │
│          │         Player Controls          │          │
│          │     Rendered by Controllers      │          │
│          │                                  │          │
│          └──────────────────────────────────┘          │
│                                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Game engine 
While this game is made entirely from scratch. A custom game engine is needed to make life easier. The game engine is basically a bunch of libraries that provide the tools to create a ***Scene***

## Scene
What you see on screen is a ***Scene***, a scene is where we developers compose the story. 
```                                                     
┌───────────────────┐                                   
│      dgipet       │                                   
└───────────────────┘                                   
			┬    ■  ■  ■                                  
			│                                             
			│ ┌───────────────────┐                       
			└▶│        src        │                       
			  └───────────────────┘                       
						│                                 
				■  ■  ■ │                                 
						│                                 
						│  ┌─────────────────────────────┐
						│  │           Scenes            │
						└─▶│ This is where custom scenes │
						   │     should be included.     │
						   └─────────────────────────────┘
```


# List of Game engine tools
- ***Animator*** : To animate classes with given sprites.
- ***Renderer*** : Draw DOMElements/Images on ***game screen***.

- ***Sound*** : Is a wrapper to play sound effects, it will remove itself automatically from the DOM after it's done.

- ***Dialog*** : Is where all the dialog scripts go. Could also embed decorators to execute specific function at certain point of the dialog. ex) Play sound effects.
```
/*
	This is the dialog in UserCreationScene
	[#: Text-Decorator,
	[@: Function-invoker
*/
export default {
	"D001": [
		"Welcome to DGIPET!",
		"You are now in the DGI world!",
		"It's not D-G-I world!",
		"It's pronounced D-G world!",
		"Please tell me Your name!",
	],
	"D002":[
		"So your name is [#playerName ?!",
		"That's definately a weird name...",
		"Anyway to survive in this world, you need a partner!",
		"[@showCandidate DGIPET!",
		"They are digital pet that will protect you.",
		"Protect you from what you asked?",
		"...that's not important!",
		"What's important is that you will need to feed, wash, train and care for your Dgipet.",
		"I know, that's a lot of hassle!",
		"Anyway I have prepared [#numberOfCandidate Dgipet for you to choose.",
		"How did I caught them? ... ...anyway!",
		"You can only choose one life long partner! So choose wisely!"
	]
}
```
- ***KeyboardController*** : Hotkeys

