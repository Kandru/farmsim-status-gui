# Farming Simulator 25 - Status GUI

[![GitHub release](https://img.shields.io/github/release/Kandru/farmsim-status-gui?include_prereleases=&sort=semver&color=blue)](https://github.com/Kandru/farmsim-status-gui/releases/)
[![License](https://img.shields.io/badge/License-GPLv3-blue)](#license)
[![issues - farmsim-status-gui](https://img.shields.io/github/issues/Kandru/farmsim-status-gui?color=darkgreen)](https://github.com/Kandru/farmsim-status-gui/issues)
[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=C2AVYKGVP9TRG)

This plugin gives a almost complete overview about your Farming Simulator 25 server from your webbrowser. It contains two parts: a LUA plugin and a Python script. The LUA plugin gathers data every minute and writes it to a XML file. The Python script reads this file and creates a website which is updated regularly.

## Current Features

- None yet

## Road Map

- Show Ingame Map
 - fields
 - players
 - point of interests
 - filtering
- Current players
- Current farms
- Reduce polling rate when nobody is online

## Plugin Installation

1. Download and extract the latest release from the [GitHub releases page](https://github.com/Kandru/farmsim-status-gui/releases/)
2. Move the folder to some local path on your gameserver host (needs to have access to the status xml file from our status plugin)
3. Rename config.example.yaml to config.yaml
4. Coming soon

## Plugin Update

Simply overwrite all plugin files with the latest release. You may have to adjust the config.yaml with the settings found in config.example.yaml.

## Configuration

This plugin provides a configuration called `config.yaml`.

```yaml
path_xml: ./
path_website: ./public/
```

### path_xml
Path to the XML file of the LUA plugin of the gameserver.

### path_website
Path where the website files should be created. Should be in the root directory of a website. Best case it is a subdomain like status.farmsim.party.

## License

Released under [GPLv3](/LICENSE) by [@Kandru](https://github.com/Kandru).

## Authors

- [@derkalle4](https://www.github.com/derkalle4)
