![CI/CD to Vultr](https://github.com/SDCore/TruckersMP-Server-Stats/workflows/CI/CD%20to%20Vultr/badge.svg?branch=production) ![Discord](https://img.shields.io/discord/664717517666910220?label=Discord%20Server)

**WHILE THIS BOT IS OPEN SOURCE, THERE CURRENTLY WILL BE NO SUPPORT FOR SELF-HOSTING THE BOT.**

# TruckersMP Server Stats Discord Bot

This discord bot allows users to view stats about TruckersMP Servers, such as current player count, amount of people in queue, and other similar information. The information is provided by the [TruckersMP API](https://stats.truckersmp.com/api).

It's currently in a big stage of a rewrite, but it's slowly getting there.

## How to Use

The bot is fairly simple to use, and more detailed usage can be found by running `!!help` in any channel the bot is in.

That being said, here are a few commands:

`!!help`

- Shows basic info about the bot

`!!servers`

- Shows the current server info available to the bot

`!!stats [game] [server]`

- Shows stats about the selected server

## Current Features

- Show current available server list (static, has to be updated manually; plans for dynamic server fetching in the books)
- Show information about each server such as players online, max players, players in queue, whether or not collisions or cars are enabled, and more

## Planned Features

- Dynamic server list loading
- Better caching of server information
- Historic stats about server player counts, uptime, etc.
- Player stats (ie. basic information, ban history, current in-game location/cargo/destination, etc.)

## Support Server

If you'd like to join the discord support server, head on over to [https://discord.gg/f3Pa8vJ](https://discord.gg/f3Pa8vJ).
