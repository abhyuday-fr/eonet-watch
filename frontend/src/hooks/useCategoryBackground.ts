const CATEGORY_BACKGROUNDS: Record<string, string> = {
  '':             '/bg_images/all.jpg',
  'wildfires':    '/bg_images/wildfire.jpg',
  'severeStorms': '/bg_images/storms.jpg',
  'volcanoes':    '/bg_images/volcano.jpg',
  'seaLakeIce':  '/bg_images/ice.jpg',
  'earthquakes':  '/bg_images/earthquake.jpg',
  'floods':       '/bg_images/flod.jpg',
  'landslides':   '/bg_images/landslide.jpg',
  'snow':         '/bg_images/snow.jpg',
  'dustHaze':     '/bg_images/dust_n_haze.jpg',
}

export function getCategoryBackground(category?: string): string {
  return CATEGORY_BACKGROUNDS[category ?? ''] ?? CATEGORY_BACKGROUNDS['']
}
