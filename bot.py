import os
import asyncio
import requests
import discord
from discord.ext import commands

TOKEN = os.getenv("DISCORD_TOKEN", "TWÓJ_TOKEN_BOTA")
API_URL = os.getenv("DOJ_API_ADD_SCHEDULE", "https://doj-backend-ac2o.onrender.com/api/add_schedule")

intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"Bot DOJ jest zalogowany jako {bot.user}")

@bot.command(name="rozprawa")
async def rozprawa(
    ctx,
    sedzia,
    prokurator,
    sala,
    oskarzony,
    adwokat,
    data,
    godzina,
    *,
    opis
):
    payload = {
        "name": f"{oskarzony} - {adwokat}",
        "judge": sedzia,
        "prosecutor": prokurator,
        "defendant": oskarzony,
        "lawyer": adwokat,
        "witnesses": "",
        "room": sala,
        "date": data,
        "time": godzina,
        "parties": f"SA vs {oskarzony}",
        "description": opis
    }

    try:
        def post():
            return requests.post(API_URL, json=payload, timeout=10)
        response = await asyncio.to_thread(post)
        status = response.status_code
        text = response.text if response.text else ""
        if status in (200, 201):
            await ctx.reply("✔ Rozprawa została dodana do DOJ (Render).")
        else:
            await ctx.reply(f"❌ Błąd API: {status} — {text}")
    except requests.RequestException as e:
        await ctx.reply(f"❌ Błąd połączenia z Renderem: {e}")
    except Exception as e:
        await ctx.reply(f"❌ Nieoczekiwany błąd: {e}")

if __name__ == "__main__":
    if TOKEN == "TWÓJ_TOKEN_BOTA" or not TOKEN:
        print("Ustaw token bota w zmiennej DISCORD_TOKEN lub podmień TOKEN w pliku.")
    bot.run(TOKEN)