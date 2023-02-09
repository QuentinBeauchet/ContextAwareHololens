POST request on `http://localhost:3000/pred`

```json
{
  "technicien -> mains libres": {
    "formula": "((Droite || Gauche) && Activité une main) || (Droite && Gauche)",
    "values": {
      "Droite": true,
      "Gauche": false,
      "Activité une main": false
    }
  },
  "technicien -> ecrit": {
    "formula": "Souhait || technicien -> mains libres",
    "values": {
      "Souhait": true,
      "technicien -> mains libres": {
        "formula": "((Droite || Gauche) && Activité une main) || (Droite && Gauche)",
        "values": {
          "Droite": true,
          "Gauche": false,
          "Activité une main": false
        }
      }
    }
  },
  "technicien -> oral": {
    "formula": "!(Confidentiel || Bruit) || !technicien -> mains libres",
    "values": {
      "Confidentiel": true,
      "Bruit": false,
      "technicien -> mains libres": {
        "formula": "((Droite || Gauche) && Activité une main) || (Droite && Gauche)",
        "values": {
          "Droite": true,
          "Gauche": false,
          "Activité une main": false
        }
      }
    }
  },
  "superviseur -> ecrit": {
    "formula": "true",
    "values": {
      "Reunion": true
    }
  },
  "superviseur -> oral": {
    "formula": "!Reunion",
    "values": {
      "Reunion": true
    }
  }
}
```

```json
{
  "technicien -> mains libres": false,
  "technicien -> ecrit": true,
  "technicien -> oral": true,
  "superviseur -> ecrit": true,
  "superviseur -> oral": false
}
```
