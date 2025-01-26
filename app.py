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
tree = ET.parse(f"{config['path_xml']}/livemap_static.xml")
livemap_static = tree.getroot()

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

# iterate over all the elements in the xml file
elements = []
elements.append({
	'type': 'server',
	'mapName': livemap_static.get('mapName'),
	'mapSize': livemap_static.get('size'),
})
for data in livemap_static:
	for entry in data:
		if entry.tag == 'Field':
			field_data = {}
			field_data['type'] = "field"
			field_data['id'] = entry.get('id')
			field_data['price'] = entry.get('price')
			field_data['fruitColor'] = entry.get('fruitColor')
			field_data['fruitName'] = entry.get('fruitName')
			field_data['farmland'] = entry.get('farmland')
			field_data['farmlandPrice'] = entry.get('farmlandPrice')
			field_data['farmlandArea'] = entry.get('farmlandArea')
			field_data['farmlandOwner'] = entry.get('farmlandOwner')
			field_data['polygons'] = []
			polygons = entry.find('Polygons')
			if polygons is not None:
				for polygon in polygons.findall('Polygon'):
					points = [[point.get('x'), point.get('z')] for point in polygon.findall('Point')]
					field_data['polygons'].append(points)
			elements.append(field_data)

# create a json file in the ./www output folder with all elements
with open(f"{config['path_website']}/livemap.json", 'w') as json_file:
	json.dump(elements, json_file, indent=4)