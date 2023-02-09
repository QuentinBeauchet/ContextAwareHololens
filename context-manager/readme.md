POST request on `http://localhost:3000/pred`

```json
{
  "test": {
    "formula": "(A && B) || (C && D) || A",
    "values": {
      "A": false,
      "B": true,
      "C": false,
      "D": true
    }
  },
  "mains libres": {
    "formula": "((Droite || Gauche) && Activité une main) || (Droite && Gauche)",
    "values": {
      "Droite": true,
      "Gauche": true,
      "Activité une main": false
    }
  }
}
```

```json
{
  "test": false,
  "mains libres": true
}
```
