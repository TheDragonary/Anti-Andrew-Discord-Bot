# Anti-Andrew-Discord-Bot
 
The enemy of [Andrew Bot](https://github.com/SpookedDoor/Andrew-Discord-Bot)

In other words... not stupid.

This bot cooks every time Andrew bot says something absolutely moronic.

![literally anti-andrew](https://github.com/user-attachments/assets/b91d4b30-fabe-4c6a-b5a0-47921eb64543)

----------------------------

# BEFORE YOU USE THIS

You SHOULD use this with Andrew-Bot, but if you for whatever reason wanna use it WITHOUT Andrew, then just go ahead and follow this quick [tutorial](https://github.com/TheDragonary/Anti-Andrew-Discord-Bot/wiki/Removing-Andrew-Integration) of sorts.

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

For the most part, this proccess is the same as Andrew's aside from a few cruical details.

First of all, do ``npm install discord.js openai axios dotenv node-fetch``.

And then rename your ``template.env`` to simply ``.env``. It'll look like this:
```js
DISCORD_TOKEN=0
CHUTES_API_KEY=0
OPENROUTER_API_KEY=0
GEMINI_API_KEY=0
ANDREW_ID=0
BRAVE_API_KEY=0
GOOGLE_API_KEY=0
GOOGLE_CSE_ID=0
```
(Although, if you chose to remove Andrew's integration, then you can just remove ``ANDREW_ID`` entirely. Otherwise, set it to the ID you'll be using for Andrew.)

You should also have a ``config.json`` that looks like this. 
```json
{
    "token": "YOURTOKENHERE",
    "clientId": "YOURCLIENTID"
}
```

~~As of now, Openrouter IS still supported for Anti-Andrew (not permanently, since it will soon mainly start to use local AI backends soon. Hell, I even use Anti with Kobold, but it's not yet the main method).~~

~~Chutes is now the default method. But Openrouter and KoboldCPP are still options. The instructions for them are already in ``aiSettings.js``.~~

Goddammit, now *Gemini* is the default method. Chutes is no longer free. Instructions for them are in ``aiSettings.js``.

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

## Overall

Editor's note: I had alotta bias towards Kobold at the time lmao. The other methods are just as good, if not more convenient and efficient. Chutes in particular is peak. It's free unlike Openrouter and it's also pretty solid. 

![GAPNgWvXQAADpdI](https://github.com/user-attachments/assets/199b866c-274b-483b-a283-5b880d0cf70a)
