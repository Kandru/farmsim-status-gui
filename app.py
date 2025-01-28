import filecmp
import json
import os
import shutil
import xml.etree.ElementTree as ET
import yaml


# Read the config.yaml file
with open('config.yaml', 'r') as config_file:
	config = yaml.safe_load(config_file)
# check boundaries
if config is None:
	raise ValueError('Config file not found')
if 'path_xml' not in config:
	raise ValueError('Config file must contain path_xml to the folder containing the livemap xml files')
if 'path_website' not in config:
	raise ValueError('Config file must contain path_website to the public folder')
# check if path_website folder exists and create if not
if not os.path.exists(config['path_website']):
	os.makedirs(config['path_website'])

# read static xml file
tree = ET.parse(f"{config['path_xml']}/FS25_FarmsimStatusDynamic.xml")
xml_dynamic = tree.getroot()

def sync_directories(src, dest):
	# Compare the directories
	comparison = filecmp.dircmp(src, dest)

	# Delete files and directories in dest that are not in src
	for name in comparison.right_only:
		path = os.path.join(dest, name)
		if os.path.isdir(path):
			shutil.rmtree(path)
		else:
			os.remove(path)

	# Copy files and directories from src to dest
	for name in comparison.left_only + comparison.diff_files:
		src_path = os.path.join(src, name)
		dest_path = os.path.join(dest, name)
		if os.path.isdir(src_path):
			shutil.copytree(src_path, dest_path)
		else:
			shutil.copy2(src_path, dest_path)

# Sync the directories
if config['path_website'] != "./www/": sync_directories('./www', config['path_website'])

## create server json
server_data = {
	'server': {},
	'map': {},
	'mission': {}
}
# add server attributes
for attr in xml_dynamic.attrib:
	server_data['server'][attr] = xml_dynamic.get(attr)
# add map attributes
for entry in xml_dynamic.findall('map'):
	for attr in entry.attrib:
		server_data['map'][attr] = entry.get(attr)
# add all mission attributes
for entry in xml_dynamic.findall('mission'):
	for attr in entry.attrib:
		server_data['mission'][attr] = entry.get(attr)
#save server.json
with open(f"{config['path_website']}/server.json", 'w') as json_file:
	json.dump(server_data, json_file, indent=4, sort_keys=True)

## create farms json
farms_data = {}
# add farm attributes
for farms in xml_dynamic.findall('farms'):
	element = {}
	for farm in farms:
		# add farm attributes
		for attr in farm.attrib:
			element[attr] = farm.get(attr)
		# add farm details
		for entry in farm:
			element[entry.tag] = {}
			# get element attributes
			for attr in entry.attrib:
				element[entry.tag][attr] = entry.get(attr)
			# get sub-elements
			for sub_entry in entry:
				element[entry.tag][sub_entry.tag] = {}
				# get sub-element attributes
				for attr in sub_entry.attrib:
					element[entry.tag][sub_entry.tag][attr] = sub_entry.get(attr)
		if 'farmId' in element:
			farms_data[element['farmId']] = element
#save farms.json
with open(f"{config['path_website']}/farms.json", 'w') as json_file:
	json.dump(farms_data, json_file, indent=4, sort_keys=True)

## create farmlands json
farmlands_data = {}
# add field attributes
for farmlands in xml_dynamic.findall('farmlands'):
	for field in farmlands:
		element = {}
		# add field attributes
		for attr in field.attrib:
			element[attr] = field.get(attr)
		# add field details
		for entry in field:
			element[entry.tag] = {}
			# get element attributes
			for attr in entry.attrib:
				element[entry.tag][attr] = entry.get(attr)
			# get sub-elements
			for sub_entry in entry:
				element[entry.tag][sub_entry.tag] = {}
				# get sub-element attributes
				for attr in sub_entry.attrib:
					element[entry.tag][sub_entry.tag][attr] = sub_entry.get(attr)
		if 'id' in element:
			farmlands_data[element['id']] = element
# save farmlands.json
with open(f"{config['path_website']}/farmlands.json", 'w') as json_file:
	json.dump(farmlands_data, json_file, indent=4, sort_keys=True)
