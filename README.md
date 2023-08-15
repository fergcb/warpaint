# Warpaint
**A GraphQL API for miniature wargaming paints & related tools.**

Warpaint is a GraphQL API that serves data about popular miniature wargaming paints, including their names, brands, Hex/RGB/HSL colour values, and their similarity to other paints.

## Documentation

### Getting Started
To start exploring the API, you can use the Apollo Studio sandbox at https://warpaint.fergcb.uk/api/v1/. From here, you can browse the Schema, and prototype queries that you can then transfer over to your GraphQL client of choice. This page should contain all the information you need to access all aspects of the API.

Below are some example queries to get you started.

### Search for Paints by Name
The API will return any paints whose names include the provided text. Here, we want a list of paints whose names contain the word "pink":
#### Query
```graphql
query {
  paints(name: "pink") {
    range
    type
    name
    hex
  }
}
```

#### Results
<details>
  <summary>Click to reveal</summary>

  ```json
  {
    "data": {
      "paints": [
        {
          "name": "Changeling Pink",
          "hex": "#f4b7d3"
        },
        {
          "name": "Fulgrim Pink",
          "hex": "#f4b7d3"
        },
        {
          "name": "Pink Horror",
          "hex": "#96325c"
        },
        {
          "name": "Screamer Pink",
          "hex": "#821a41"
        },
        {
          "name": "Volupus Pink",
          "hex": "#900845"
        }
      ]
    }
  }
  ```
</details>

### Filter Paints by Type
#### Query
Valid types include "base", "layer", "shade", "contrast", "dry", "technical", "texture" and "glaze". Here, we want a list of shades:
```graphql
query {
  paints(type: "shade") {
    name
    rgb
  }
}
```

#### Results
<details>
  <summary>Click to reveal</summary>

  ```json
  {
    "data": {
      "paints": [
        { "name": "Agrax Earthshade", "rgb": [ 71, 66, 37 ] },
        { "name": "Agrax Earthshade Gloss", "rgb": [ 71, 66, 37 ] },
        { "name": "Athonian Camoshade", "rgb": [ 92, 122, 19 ] },
        { "name": "Berserker Bloodshade", "rgb": [ 192, 62, 97 ] },
        { "name": "Biel-Tan Green", "rgb": [ 0, 135, 66 ] },
        { "name": "Carroburg Crimson", "rgb": [ 166, 9, 97 ] },
        { "name": "Casandora Yellow", "rgb": [ 253, 198, 0 ] },
        { "name": "Coelia Greenshade", "rgb": [ 0, 110, 101 ] },
        { "name": "Cryptek Armourshade Gloss", "rgb": [ 134, 103, 103 ] },
        { "name": "Drakenhof Nightshade", "rgb": [ 7, 83, 150 ] },
        { "name": "Druchii Violet", "rgb": [ 106, 32, 115 ] },
        { "name": "Fuegan Orange", "rgb": [ 183, 94, 25 ] },
        { "name": "Kroak Green", "rgb": [ 152, 198, 164 ] },
        { "name": "Mortarion Grime", "rgb": [ 191, 183, 78 ] },
        { "name": "Nuln Oil", "rgb": [ 0, 0, 0 ] },
        { "name": "Nuln Oil Gloss", "rgb": [ 0, 0, 0 ] },
        { "name": "Poxwalker", "rgb": [ 130, 173, 174 ] },
        { "name": "Reikland Fleshshade", "rgb": [ 175, 36, 9 ] },
        { "name": "Reikland Fleshshade Gloss", "rgb": [ 175, 36, 9 ] },
        { "name": "Seraphim Sepia", "rgb": [ 206, 105, 29 ] },
        { "name": "Soulblight Grey", "rgb": [ 182, 177, 179 ] },
        { "name": "Targor Rageshade", "rgb": [ 125, 110, 127 ] },
        { "name": "Tyran Blue", "rgb": [ 75, 158, 205 ] }
      ]
    }
  }
  ```
</details>

### Omit Metallic Paints
#### Query
Oftentimes, metallic paints just aren't what we need. To exclude them from your searches, use the `metallic` flag. Here, we get a list of all the non-metallic base paints, but by passing `true` instead of `false`, we would see _only_ metallic paints.

```graphql
query {
  paints(type: "base", metallic: false) {
    name,
    hsl
  }
}
```

#### Results

<details>
  <summary>Click to reveal</summary>

  ```json
  {
    "data": {
      "paints": [
        {
          "name": "Abaddon Black",
          "hsl": [ 0, 0, 0 ]
        },
        {
          "name": "Averland Sunset",
          "hsl": [ 44, 100, 49 ]
        },
        {
          "name": "Barak-Nar Burgundy",
          "hsl": [ 331, 31, 23 ]
        },
        {
          "name": "Bugman's Glow",
          "hsl": [ 11, 35, 41 ]
        },
        {
          "name": "Caledor Sky",
          "hsl": [ 212, 46, 42 ]
        },
        {
          "name": "Caliban Green",
          "hsl": [ 151, 100, 12 ]
        },
        {
          "name": "Castellan Green",
          "hsl": [ 85, 39, 21 ]
        },
        {
          "name": "Catachan Fleshtone",
          "hsl": [ 14, 23, 25 ]
        },
        {
          "name": "Celestra Grey",
          "hsl": [ 180, 10, 65 ]
        },
        {
          "name": "Ceramite White",
          "hsl": [ 0, 0, 100 ]
        },
        {
          "name": "Corax White",
          "hsl": [ 0, 0, 93 ]
        },
        {
          "name": "Corvus Black",
          "hsl": [ 60, 4, 11 ]
        },
        {
          "name": "Daemonette Hide",
          "hsl": [ 252, 12, 49 ]
        },
        {
          "name": "Death Guard Green",
          "hsl": [ 70, 20, 40 ]
        },
        {
          "name": "Death Korps Drab",
          "hsl": [ 70, 9, 27 ]
        },
        {
          "name": "Deathworld Forest",
          "hsl": [ 65, 42, 30 ]
        },
        {
          "name": "Dryad Bark",
          "hsl": [ 32, 12, 21 ]
        },
        {
          "name": "Gal Vorbak Red",
          "hsl": [ 339, 26, 26 ]
        },
        {
          "name": "Grey Seer",
          "hsl": [ 0, 0, 78 ]
        },
        {
          "name": "Hobgrot Hide",
          "hsl": [ 44, 59, 40 ]
        },
        {
          "name": "Incubi Darkness",
          "hsl": [ 181, 66, 16 ]
        },
        {
          "name": "Ionrach Skin",
          "hsl": [ 32, 35, 80 ]
        },
        {
          "name": "Jokaero Orange",
          "hsl": [ 8, 85, 48 ]
        },
        {
          "name": "Kantor Blue",
          "hsl": [ 219, 71, 18 ]
        },
        {
          "name": "Khorne Red",
          "hsl": [ 7, 96, 21 ]
        },
        {
          "name": "Lupercal Green",
          "hsl": [ 184, 92, 10 ]
        },
        {
          "name": "Macragge Blue",
          "hsl": [ 219, 66, 29 ]
        },
        {
          "name": "Mechanicus Standard Grey",
          "hsl": [ 185, 7, 29 ]
        },
        {
          "name": "Mephiston Red",
          "hsl": [ 3, 87, 33 ]
        },
        {
          "name": "Morghast Bone",
          "hsl": [ 42, 39, 65 ]
        },
        {
          "name": "Mournfang Brown",
          "hsl": [ 7, 84, 22 ]
        },
        {
          "name": "Naggaroth Night",
          "hsl": [ 267, 22, 27 ]
        },
        {
          "name": "Night Lords Blue",
          "hsl": [ 207, 92, 20 ]
        },
        {
          "name": "Nocturne Green",
          "hsl": [ 159, 25, 16 ]
        },
        {
          "name": "Orruk Flesh",
          "hsl": [ 103, 38, 61 ]
        },
        {
          "name": "Phoenician Purple",
          "hsl": [ 290, 62, 20 ]
        },
        {
          "name": "Rakarth Flesh",
          "hsl": [ 37, 13, 63 ]
        },
        {
          "name": "Ratskin Flesh",
          "hsl": [ 21, 43, 49 ]
        },
        {
          "name": "Rhinox Hide",
          "hsl": [ 2, 21, 25 ]
        },
        {
          "name": "Screamer Pink",
          "hsl": [ 338, 67, 31 ]
        },
        {
          "name": "Steel Legion Drab",
          "hsl": [ 41, 34, 30 ]
        },
        {
          "name": "Stegadon Scale Green",
          "hsl": [ 198, 98, 19 ]
        },
        {
          "name": "The Fang",
          "hsl": [ 206, 25, 39 ]
        },
        {
          "name": "Thondia Brown",
          "hsl": [ 9, 33, 25 ]
        },
        {
          "name": "Thousand Sons Blue",
          "hsl": [ 196, 97, 23 ]
        },
        {
          "name": "Waaagh! Flesh",
          "hsl": [ 119, 37, 25 ]
        },
        {
          "name": "Wraithbone",
          "hsl": [ 43, 44, 82 ]
        },
        {
          "name": "XV-88",
          "hsl": [ 32, 63, 29 ]
        },
        {
          "name": "Zandri Dust",
          "hsl": [ 47, 32, 50 ]
        }
      ]
    }
  }
  ```
</details>



### Find Similar Colours
#### Query
One of Warpaint's most powerful features is the ability to search for colours that are similar to a particular other colour, using the `similarTo` query argument. 

The `target` colour can be either a `rgb` or `hsl` triplet, or a `hex` code.

The `maxDistance` sets the cut-off percentage for how different the returned colours can be from our target colour. A value of `0` would require an exact match, and `100` would allow completely different colours to be returned from the search.

When using the `similarTo` argument, an additional field is added to the data model: `distance`. This is a numerical value indicating how different the colour is from the provided target, with `0` being an exact match, and higher values being more further from the target. This is the value used to decide which paints are cut off by the `maxDistance` argument.

By default when using the `similarTo` argument, results will be listed in ascending order of `distance` (most similar colours first), even if the `distance` field isn't included in the query.

Here, we provide an RGB colour code (a fairly bright red, in this case), and search for colours with a difference of 15% or less from our target colour.

```graphql
query($similarTo: SimilarColour) {
  paints(similarTo: $similarTo) {
    name
    distance
  }
}
```
##### Variables
```json
{
  "similarTo": {
    "maxDistance": 15,
    "target": {
      "rgb": [150, 0, 0]
    }
  }
}
```

#### Results
<details>
  <summary>Click to reveal</summary>

  ```json
  {
    "data": {
      "paints": [
        {
          "name": "Wazdakka Red",
          "distance": 2.049021612382414
        },
        {
          "name": "Evil Sunz Scarlet",
          "distance": 10.107724383250032
        },
        {
          "name": "Tuskgor Fur",
          "distance": 11.77085423955177
        },
        {
          "name": "Word Bearers Red",
          "distance": 14.286324360538035
        }
      ]
    }
  }
  ```
</details>
