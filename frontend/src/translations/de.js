export default {
  about: {
    and: "und",
    description1: " ist eins der vom ",
    description2: " geförderten Projekte.",
  },
  annotation: {
    browse: "Computer durchsuchen",
    drop: "Ziehe eine %{formats} Datei hierhin.",
    fetching_tags_failed_toast:
      "Das Laden der Klassennamen für die manuelle Annotation ist fehlgeschlagen.",
    metric: {
      f1: "F1-Maß",
      f2: "F2-Maß",
      falseNegatives: "Falsch Negativ",
      falsePositives: "Falsch Positiv",
      precision: "Genauigkeit",
      recall: "Trefferquote",
      truePositives: "Richtig Positiv",
    },
    na: "n.a.",
    or: "oder",
    scores: "Metriken",
    scores_description:
      "Die folgenden Metriken bewerten die automatische Erkennung von personenbezogenen Daten im Vergleich zu Ihren manuellen Anpassungen.",
    scores_note:
      "Beachten Sie, dass die Aussagekraft der Metriken von Ihren Anpassungen abhängt.",
  },
  anonymization: {
    anonymization: "Anonymisierung",
    advanced_settings: "Pro Kategorie einstellen",
    do_not_anonymize: "Nicht anonymisieren",
    default: "Default Mechanismus",
    use_default: "Default benutzen",
    generalization: {
      name: "Generalisierung",
      replacement: "Ersetzen mit",
      tooltip: "Ersetze mit einem allgemeineren Ausdruck",
    },
    options: "Optionen",
    pseudonymization: {
      name: "Pseudonymisierung",
      format_string: "Ersetzen mit",
      format_string_hint: "benutze {} einmal als Platzhalter",
      counter_value: "Initialer Wert",
      counter_value_hint: "gib eine Zahl größer 0 sein",
      tooltip: "Ersetze mit einem Pseudonym",
    },
    stateful: "Zustandsbehaftet",
    suppression: {
      as_original: "wie im Original",
      name: "Schwärzen",
      custom_length: "Länge",
      redact: "Schwärzen",
      suppression_char: "Ersetzen mit",
      custom_length_hint:
        "lasse das Feld leer oder gib eine Zahl größer 0 sein",
      tooltip: "Ersetze jedes Zeichen mit einem anderen",
    },
  },
  app: {
    fetching_recognizers_failed_toast:
      "Das Laden der verfügbaren Erkennungsmechanismen ist fehlgeschlagen.",
    network_error_toast: "Der Server ist nicht erreichbar.",
    rendering_error: "Unerwarteter Fehler",
    rendering_error_action: "Bitte versuche die Seite erneut zu laden.",
  },
  disclaimer: {
    text:
      "Bitte nutze diese Software nicht zur Anonymisierung von Dokumenten. Bitte benutze aus dieser Software heruntergeladene Dokumente nicht weiter.",
    title: "Dies ist ein Prototyp",
  },
  help: {
    intro:
      "Die folgenden Schritte skizzieren kurz den Anonymisierungs-Prozess:",
    item1: "Lade das Dokument hoch, dass Du anonymisieren willst.",
    item2:
      "Erweitere und korrigiere was automatisch als personenbezogene Daten erkannt wurde in der linken Dokumentenansicht.",
    item3: "Konfiguriere die Anonymisierung nach Deinen Anforderungen.",
    item4:
      "Überprüfe die Vorschau der Anonymisierung in der rechten Dokumentenansicht und lade dein anonymisiertes Dokument herunter.",
    tip:
      "Tipp: Viele Elemente zeigen einen Hilfetext an, wenn du mit dem Mauszeiger über sie gehst.",
  },
  main: {
    anonymize_file_failed_toast:
      "Das Erstellen der anonymisierten Datei ist fehlgeschlagen.",
    anonymizing_piis_failed_toast:
      "Das Anonymisieren der personenbezogenen Daten ist fehlgeschlagen.",
    computing_scores_failed_toast:
      "Die Berechnung statistischer Maße für die automatische Identifizierung persönlicher Daten ist fehlgeschlagen.",
    download: "Herunterladen",
    find_piis_failed_toast: "Die Verarbeitung der Datei ist fehlgeschlagen.",
    new_document: "Neues Dokument",
  },
  nav: {
    about: "Über OpenRedact",
    help: "Hilfe",
    settings: "Einstellungen",
  },
  settings: {
    recognizers: {
      description:
        "Aktiviere Erkenner um nach personenbezogene Daten für eine Kategorie zu suchen.",
      names: {
        decountryrecognizer: "Suche nach Namen von Ländern",
        dephonenumberrecognizer: "Suche nach Telefonnummern",
        emailrecognizer: "Suche nach E-Mail Adressen",
        flairstatisticalrecognizer:
          "Nutze flair um nach Personen, Orten, Organisationen, und weiteren zu suchen",
        spacystatisticalrecognizer:
          "Nutze spaCy um nach Personen, Orten, Organisationen, und weiteren zu suchen",
      },
      title: "Kategorien",
    },
  },
  tags: {
    email: "E-Mail",
    gpe: "Geopolitische Entitäten",
    loc: "Orte",
    misc: "Andere",
    org: "Organisationen",
    per: "Personen",
    phone: "Telefonnummern",
  },
};
