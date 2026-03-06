# Turnos por usuario – Apps Script y Sheet

## 1. Cambios en el Sheet "Usuarios - Menú semanal"

- Agregá una **columna D** con el encabezado **turno**.
- No hace falta llenarla a mano: un script la completa por vos (paso 3).

## 2. Cambios en el script que envía los mails

En la función **enviarLinksMenuSemanal**:

- Donde se leen los datos del Sheet, usar **4 columnas** (A, B, C, D) en lugar de 3.
- Al armar la URL del menú, agregar el parámetro **turno** según la columna D.

Reemplazá el bloque que define `data` y el que arma `url` por esto:

```javascript
  const data = sheet.getRange(2, 1, lastRow, 4).getValues();  // A a D: email, nombre, token, turno

  // ... dentro del forEach, donde tenés (row) ...
  const email = row[0];
  const nombre = row[1] || 'Colaborador';
  const token = row[2];
  const turno = (row[3] === 2 || row[3] === '2') ? 2 : 1;

  const url = APP_BASE_URL
    + '?u=' + encodeURIComponent(token)
    + '&email=' + encodeURIComponent(email)
    + '&name=' + encodeURIComponent(nombre)
    + '&turno=' + turno;
```

Así, cada link que reciba el usuario llevará `turno=1` o `turno=2` y la app mostrará el turno correcto.

## 3. Función para completar la columna "turno" (ejecutar una vez)

Agregá esta función al mismo proyecto de Apps Script y ejecutala **una vez** (menú: ejecutar **asignarTurnosDesdeLista**). Va a rellenar la columna D según las listas de Turno 1 y Turno 2.

```javascript
function asignarTurnosDesdeLista() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Hoja 1');

  var turno1Names = [
    'ADRIANA LIBERATORE','ADRIANA MALDONADO','ANA DEL PADRONE','ANA PALACIO','ANALIA JAIME','ANDREA AVILA','ANTONELA PASQUALI','PAOLA DEL PINO',
    'BRAIAN ULARIAGA','BRENDA GNAZZO','CANDELA KUBAR','CAMILA FABRE','CAROLINA RUIZ','CAROLINA GONZALEZ','CESAR ACOSTA','CLAUDIO LABORET',
    'CLARA MOSER','DANIEL CANTOR','DAVID GONZALEZ','DIEGO ETCHEVERRY','EUGENIA COSTILLA','FRANCISCO BERROTERAN','FRANCO VELAZQUEZ','GABRIEL MACHADO',
    'GUILLERMO RODRIGUEZ','GONZALO GIMENEZ','GONZALO ROMANO','GRACIELA DA SILVA','IVAN AGUIRRE','IVAN KARPILOVSKY','JESICA GARAY','JOSE GUACARE',
    'JOSE LAGUES','JUAN MANUEL BILLIOT','LEANDRO ALVAREZ','LEONARDO HERRERA','LEANDRO ROGNONI','LUCIA FERREYRA','LUCIA FUNES','MAGALI MAYO',
    'MAIDA GONZALEZ','MATIAS TORRES','MARCELA DEL POZO','MARCELO LOPEZ','MARCOS BASALLO','MARIANA PORSIA','MARIELA ARCE','MELANIE MARTINEZ',
    'MERCEDES ORTIGOZA','MONICA CARDILE','NICOLAS MACIA','NOELIA LIPPAY','NOELIA PEREZ','PABLO DE LA IGLESIA','NANCY ZITTERKOPF','RODRIGO PEÑALVA',
    'ROMINA RUFINO','MAIRA CEPEDA','SILVINA ONORATO','SUSANA LOPEZ','VALERIA PIRAY','XIMENA VALLEJOS','YANINA SEGUI','DAVID MAYO','SEBASTIAN MAYO',
    'JORGE','DARIO','URIEL','MATIAS'
  ];

  var turno2Names = [
    'ANAHI MORALES','ANTONELLA GUZZO','ANGEL RAMOS','ALEJANDRO PEREYRA','ARIEL DONADIO','BRAIAN RODRIGUEZ','BRENDA ABRIL','CARLOS GARCIA',
    'CARLOS MELIGENI','CARLOS PEDROSA','CAROLINA FERNANDEZ','CAROLINA MONTEAGUDO','CINTIA CARRANZA','CYNTHIA RE','CLAUDIO MARINI','DIEGO CORDERA',
    'EMANUEL PEREYRA','EVANGELINA BALLARIS','EVANGELINA VERDUN','FABIAN LEZCANO','FEDERICO CARO','FERNANDO DIAZ','FERNANDO PATERNO','FLORENCIA GALVAN',
    'GISELLE MORBELLO','GLORIA AMARILLO','GONZALO ZABALZA','IGNACIO LODERER','IGNACIO DIAZ','IVONNE MARQUEZ','JERSON REYES','JONATAN ITURRIOZ',
    'JUAN DOMINGUEZ','JUAN GALASSI','LEANDRO DE MARCO','LEANDRO PLACONA','SANTIAGO ARAUJO','MARCELA DIAZ','MARCELA ANTICES','MARCELO TESTARD',
    'MARINA BELLO','MAURO ARBELO','MAURO CENTURION','MELISA TORRES','MERCEDES VERGARA','NADIA DA LOMBA NOVO','NAHUEL PICCINNA','NATALIA CIVALE',
    'NICOLAS CODARIN','PABLO LIGUORI','ANAHI CANOVAS','ROCIO SESSOLO','RODRIGO OBREGON','RODRIGO RETAMOZO','SEBASTIAN SAVARESE','SILVANA GARIBALDI',
    'SILVIA INSAURRALDE','SONIA LESCANO','SUSANA PETRALIS','TATIANA RIOS','VIRGINIA PUMAR','YOHANA ZAMBRANO','YANINA GOMEZ','MARCELO DIAZ'
  ];

  function norm(s) {
    return (s || '').toString().toLowerCase().trim().replace(/\s+/g, ' ');
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  var data = sheet.getRange(2, 1, lastRow, 3).getValues();
  var turno1Set = {};
  var turno2Set = {};
  turno1Names.forEach(function(n) { turno1Set[norm(n)] = true; });
  turno2Names.forEach(function(n) { turno2Set[norm(n)] = true; });

  var valores = [];
  for (var i = 0; i < data.length; i++) {
    var nombre = data[i][1];
    var n = norm(nombre);
    var turno = 1;
    if (turno2Set[n]) turno = 2;
    else if (!turno1Set[n] && turno1Names.indexOf(nombre) === -1) {
      for (var t = 0; t < turno2Names.length; t++) {
        if (norm(turno2Names[t]) === n) { turno = 2; break; }
      }
    }
    valores.push([turno]);
  }
  if (valores.length > 0) {
    sheet.getRange(2, 4, lastRow, 4).setValues(valores);
  }
}
```

- Si tu hoja no se llama **Hoja 1**, cambiá en la segunda línea: `getSheetByName('Hoja 1')` por el nombre de tu pestaña.
- Después de ejecutar, revisá la columna D: deberías ver 1 o 2 en cada fila. Si algún nombre no coincide (por acentos o escritura distinta), corregilo a mano en el Sheet o en la lista del script y volvé a ejecutar.

## 4. Horarios de cada turno

En la app, por ahora están fijos:

- **Turno 1:** 13:00 - 14:00  
- **Turno 2:** 14:00 - 15:00  

Si necesitás otros horarios, se pueden cambiar en `App.jsx` en la constante `TURNO_LABELS`.
