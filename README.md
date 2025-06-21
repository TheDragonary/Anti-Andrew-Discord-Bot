# Anti-Andrew-Discord-Bot
 
The enemy of [Andrew Bot](https://github.com/SpookedDoor/Andrew-Discord-Bot)

In other words... not stupid.

This bot cooks every time Andrew bot says something absolutely moronic.


![literally anti-andrew](https://github.com/user-attachments/assets/b91d4b30-fabe-4c6a-b5a0-47921eb64543)

----------------------------

# BEFORE YOU USE THIS
~~This bot REQUIRES [Andrew Bot](https://github.com/SpookedDoor/Andrew-Discord-Bot). You can manually modify the code to make it respond to anybody, or a similar bot, but by default, you NEED to have Andrew in your server for this bot to work, as he only responds to Andrew as-is.~~

Bot is still best used with Andrew-Bot, but as of now he doesn't respond to Andrew anymore. But either way, he's gonna be able to respond to both Andrew AND others.

Well, now for the content warning; Like Andrew-Bot, this bot was made as an inside-joke and it can say some hella out of pocket offensive shit. Also, unlike Andrew, this is purely a LLM as of writing this, and it will probably stay that way.

Now, let's get started with the real shit, shall we?

# THE REQUIREMENTS FOR THE EVEN LESSER GROUP OF THOSE WHO'LL NEED IT
## CLONING
As always, you'd have to clone the repo first, using:
```
git clone https://github.com/TheDragonary/Anti-Andrew-Discord-Bot.git
```
Or you could use Github Desktop! Doesn't matter, whatever gets the job done.

![Anti preparing to insult Andrew](https://github.com/user-attachments/assets/1d6b7ca8-3655-4132-935d-aa67886ed4cc)

## THE DRAGON ON THE SLAYER ~~🤣🤣~~

~~Because this bot requires Andrew-bot, I'll hope you already read the discord.js guide and everything. For the most part, the rest of this is MOSTLY copied from Andrew's version of this section, but there are a few cruical parts changed, since Anti-Andrew does NOT have the exact same file structure.~~

For the most part, this proccess is the same as Andrew's aside from a few cruical details.

You're still required to install ``npm install discord.js openai axios dotenv node-fetch`` in your terminal, though.

Afterwards, you WILL need to have an ``.env`` file and have it look like this:
```js
DISCORD_TOKEN=YOURTOKENHERE
BRAVE_API_KEY=YOURKEYHERE
GOOGLE_API_KEY=YOURKEYHERE
GOOGLE_CSE_ID=YOURIDHERE
```
And a ``config.json`` that looks something like this. 
```json
{
    "token": "YOURTOKENHERE",
    "clientId": "YOURCLIENTID"
}
```

~~As of now, Openrouter IS still supported for Anti-Andrew (not permanently, since it will soon mainly start to use local AI backends soon. Hell, I even use Anti with Kobold, but it's not yet the main method).~~

Chutes is now the default method. But Openrouter and KoboldCPP are still options. The instructions for them are already in ``aiSettings.js``.

### Local AI Method
If you want to use the local AI method, you'll of course have to use a local AI backend such as [KoboldCPP](https://github.com/LostRuins/koboldcpp). But more importantly, make sure to obtain an [AI model](https://huggingface.co/models?library=gguf&sort=trending), but of course make sure it's a GGUF and that your PC can handle it. (Which means you shouldn't bother with Deepseek unless your PC is EXTREMELY good. Just use Chutes or Openrouter for that.)  

For vision to work locally, download the correct [mmproj](https://huggingface.co/koboldcpp/mmproj/tree/main). For example, if you are using a model based on Llama3, download the one that says Llama3, then you would insert it into Loaded Files > Vision mmproj.

Once you have KoboldCPP installed and set up, make sure to set your ``baseURL`` in ``./aiSettings.js``. It should look something like this:  
```dotenv js
	baseURL: "http://localhost:5001/v1",
	apiKey: "0"
```

And then you make sure all the model variables are set to: ``"koboldcpp"``.

It's as shrimple as that!

## Differences between the AI methods and which one you should choose
Well, of course there's both pros and cons to the methods you choose, and I wouldn't blame you for being confused on which to choose.

For instance, if your PC is lower end, I recommend using Openrouter/Chutes. But if your PC is more capable, then I'd recommend a local AI backend, like Kobold.

Now, let's start off with Openrouter's pros and cons.

![considering-how-young-kiryu-kazama-was-in-yakuza-0-and-he-v0-4t83zlkg4hsb1](https://github.com/user-attachments/assets/156e79da-7da3-4784-8d0e-46288956c7ab)

## Openrouter
Pros:

-Decently fast, and easier on your PC, since you don't need to be running models directly on your PC.

-You can use most of the models on the site for Anti.

Cons:

-There is a daily limit on certain models, such as Deepseek V3, (which is actually why we're making the switch to local AIs).

-Sometimes the responses take a hell of a long time (for me it would sometimes take around 5 minutes, which also contributed to me switching).

-It ain't Kobold

-----

## KoboldCPP
While any local backend can be used of course, I'm gonna focus on Kobold since that's the only one I've used.

Now that we're done with Openrouter's pros and cons, it's time to see Kobold's. 

Pros:

-Much faster responses 

-No daily limit or anything of the sort

-You can download any model and run it locally

Cons:

-You need a good PC. Or at least a fairly decent one.

-----
## Overall
Regardless of which one you choose, the bot will work. Just the efficiency will vary.

If you choose to use Openrouter solely because of your PC or the convenience, that's very understandable. 

(Unfinished README. I'll continue this later, but for the most part all the important info is here lmao.)

Editor's note: I had alotta bias towards Kobold at the time lmao. The other methods are just as good, if not more convenient and efficient. Chutes in particular is peak. It's free unlike Openrouter and it's also pretty solid. 

I'll definitely need to give a bigger update on the README, but I wanted to at least do a quick update for the rework. Especially since it's MASSIVELY outdated now.

![GAPNgWvXQAADpdI](https://github.com/user-attachments/assets/199b866c-274b-483b-a283-5b880d0cf70a)
