# Anti-Andrew-Discord-Bot
The enemy of [Andrew Bot](https://github.com/SpookedDoor/Andrew-Discord-Bot)

In other words... not stupid.

This bot cooks every time Andrew Bot says something absolutely moronic.

![literally anti-andrew](https://github.com/user-attachments/assets/b91d4b30-fabe-4c6a-b5a0-47921eb64543)

----------------------------

# BEFORE YOU USE THIS
You SHOULD use this with Andrew Bot, but if you for whatever reason wanna use it WITHOUT Andrew, then just go ahead and follow this quick [tutorial](https://github.com/TheDragonary/Anti-Andrew-Discord-Bot/wiki/Removing-Andrew-Integration) of sorts.

Well, now for the content warning; Like Andrew Bot, this bot was made as an inside-joke and it can say some hella out of pocket offensive shit. Also, unlike Andrew, this is purely an LLM, and it will most definitely stay that way.

Now, let's get started with the real shit, shall we?

# THE REQUIREMENTS FOR THE EVEN LESSER GROUP OF THOSE WHO'LL NEED IT
## CLONING
As always, you will need to clone the repo first:
```
git clone https://github.com/TheDragonary/Anti-Andrew-Discord-Bot.git
```

![Anti preparing to insult Andrew](https://github.com/user-attachments/assets/1d6b7ca8-3655-4132-935d-aa67886ed4cc)

## THE DRAGON ON THE SLAYER ~~🤣🤣~~
For the most part, this process is the same as Andrew's aside from a few cruical details.

First of all, do ``npm install``.

And then rename your ``template.env`` to simply ``.env``. It'll look like this:
```js
DISCORD_TOKEN=0
DISCORD_CLIENT_ID=0
OPENROUTER_API_KEY=0
GEMINI_API_KEY=0
MISTRAL_API_KEY=0
BRAVE_API_KEY=0
GOOGLE_API_KEY=0
GOOGLE_CSE_ID=0
ANDREW_ID=0
```

(Although, if you chose to remove Andrew bot's integration, then you can just remove ``ANDREW_ID`` entirely. Otherwise, set it to the ID you'll be using for Andrew.)

We use Google Gemini for AI (same goes for Andrew bot). Instructions for them are in ``aiSettings.js``. Although it's already set up by default, all you need to do is provide your API key in ``.env``. Feel free to switch to any other AI service you want, it's pretty easy to do so.

Finally, just run ``node index.js``. It's that easy!

### Local AI Method
If you want to use the local AI method, you'll of course have to use a local AI backend such as [KoboldCPP](https://github.com/LostRuins/koboldcpp). But more importantly, make sure to obtain an [AI model](https://huggingface.co/models?library=gguf&sort=trending), but of course make sure it's a GGUF and that your PC can handle it, which means you shouldn't bother with Deepseek unless your PC is EXTREMELY good. Just use Openrouter for that.

For vision to work locally, download the correct [mmproj](https://huggingface.co/koboldcpp/mmproj/tree/main). For example, if you are using a model based on Llama3, download the one that says Llama3, then you would insert it into Loaded Files > Vision mmproj.

Once you have KoboldCPP installed and set up, make sure to set your ``baseURL`` in ``./aiSettings.js``. For KoboldCPP, that would be ``http://localhost:5001/v1``. Then, set both model variables to ``koboldcpp``.

It's as shrimple as that!

## Overall
Editor's note: I had alotta bias towards Kobold at the time lmao. The other methods are just as good, if not more convenient and efficient. Chutes in particular is **SHIT**. It's **PAID FROM THE GET-GO** unlike Openrouter/Gemini/Mistral and it's also pretty **LIQUID LIKE DIARRHOEA**. 

![GAPNgWvXQAADpdI](https://github.com/user-attachments/assets/199b866c-274b-483b-a283-5b880d0cf70a)